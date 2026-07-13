'use client';

import { useState, useRef, useCallback } from 'react';
import { useVoiceActivity } from './useVoiceActivity';
import type { Emotion, Turn } from '@/types';

type AgentState = 'idle' | 'listening' | 'thinking' | 'speaking';

interface VoiceAgentOptions {
  scenarioId: string;
  turns: Turn[];
  onTurnComplete: (turn: Turn) => void;
  onEmotionChange: (emotion: Emotion) => void;
  onAgentStateChange: (state: AgentState) => void;
  onTextChunk?: (text: string) => void;
}

/**
 * Real-time voice agent — Siri-like experience.
 * VAD → Record → Stream → Speak → Repeat
 */
export function useVoiceAgent({
  scenarioId,
  turns,
  onTurnComplete,
  onEmotionChange,
  onAgentStateChange,
  onTextChunk,
}: VoiceAgentOptions) {
  const [agentState, setAgentState] = useState<AgentState>('idle');
  const [isEnabled, setIsEnabled] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const isSpeakingRef = useRef(false);

  const updateState = useCallback(
    (state: AgentState) => {
      setAgentState(state);
      onAgentStateChange(state);
    },
    [onAgentStateChange],
  );

  // Play audio from base64 WAV
  const playAudio = useCallback(async (base64Wav: string): Promise<void> => {
    return new Promise(async (resolve) => {
      try {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioContext();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') await ctx.resume();

        const binary = atob(base64Wav);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

        const audioBuffer = await ctx.decodeAudioData(bytes.buffer);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start(0);

        currentSourceRef.current = source;
        isSpeakingRef.current = true;

        source.onended = () => {
          isSpeakingRef.current = false;
          currentSourceRef.current = null;
          resolve();
        };
      } catch {
        isSpeakingRef.current = false;
        resolve();
      }
    });
  }, []);

  // Stop current playback
  const stopPlayback = useCallback(() => {
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
      } catch {}
      currentSourceRef.current = null;
    }
    isSpeakingRef.current = false;
  }, []);

  // Send audio to voice-stream API
  const processAudio = useCallback(
    async (audioBlob: Blob) => {
      // Cancel any previous stream
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      updateState('thinking');

      try {
        const formData = new FormData();
        formData.append('file', audioBlob, 'recording.webm');
        formData.append('scenarioId', scenarioId);
        formData.append(
          'history',
          JSON.stringify(
            turns.flatMap((t) => [
              { role: 'user', content: t.userText },
              { role: 'assistant', content: t.aiText },
            ]),
          ),
        );
        formData.append('turnNumber', String(turns.length));

        const response = await fetch('/api/voice-stream', {
          method: 'POST',
          body: formData,
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        let audioBase64 = '';
        let emotion: Emotion = 'neutral';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          const lines = text.split('\n').filter(Boolean);

          for (const line of lines) {
            try {
              const msg = JSON.parse(line);

              if (msg.type === 'text') {
                fullText += msg.data;
                onTextChunk?.(msg.data);
              } else if (msg.type === 'audio') {
                audioBase64 = msg.data;
              } else if (msg.type === 'emotion') {
                emotion = msg.data as Emotion;
              } else if (msg.type === 'done') {
                // Play audio
                if (audioBase64) {
                  updateState('speaking');
                  onEmotionChange(emotion);
                  await playAudio(audioBase64);
                }

                // Complete turn
                onTurnComplete({
                  userText: fullText, // Will be overwritten by caller
                  aiText: fullText,
                  emotion,
                });

                updateState('idle');
              }
            } catch {}
          }
        }
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Voice agent error:', err);
          updateState('idle');
        }
      }
    },
    [scenarioId, turns, updateState, onTurnComplete, onEmotionChange, onTextChunk, playAudio],
  );

  // Handle speech end from VAD
  const handleSpeechEnd = useCallback(
    (blob: Blob) => {
      if (isSpeakingRef.current) {
        stopPlayback(); // Interrupt AI if user starts talking
      }
      processAudio(blob);
    },
    [processAudio, stopPlayback],
  );

  // VAD hook
  const { isListening, isRecording, volume, startListening, stopListening } = useVoiceActivity({
    threshold: 0.015,
    silenceDelay: 1500,
    onSpeechStart: () => {
      if (isSpeakingRef.current) {
        stopPlayback(); // User interrupted
      }
      updateState('listening');
    },
    onSpeechEnd: handleSpeechEnd,
  });

  // Toggle agent on/off
  const toggle = useCallback(async () => {
    if (isEnabled) {
      stopPlayback();
      stopListening();
      setIsEnabled(false);
      updateState('idle');
    } else {
      setIsEnabled(true);
      await startListening();
    }
  }, [isEnabled, startListening, stopListening, stopPlayback, updateState]);

  return {
    agentState,
    isListening,
    isRecording,
    volume,
    isEnabled,
    toggle,
  };
}

export type { AgentState };
