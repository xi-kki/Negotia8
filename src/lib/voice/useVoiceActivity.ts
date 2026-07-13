'use client';

import { useRef, useCallback, useState, useEffect } from 'react';

interface VoiceActivityOptions {
  threshold?: number; // 0-1, volume threshold to trigger
  silenceDelay?: number; // ms of silence before auto-stop
  onSpeechStart?: () => void;
  onSpeechEnd?: (blob: Blob) => void;
}

/**
 * Voice Activity Detection — auto start/stop recording.
 * No button holding. Just talk.
 */
export function useVoiceActivity({
  threshold = 0.015,
  silenceDelay = 1500,
  onSpeechStart,
  onSpeechEnd,
}: VoiceActivityOptions = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [volume, setVolume] = useState(0);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animFrameRef = useRef<number>(0);
  const hasDetectedSpeechRef = useRef(false);

  const cleanup = useCallback(() => {
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    analyserRef.current = null;
    setIsRecording(false);
    setIsListening(false);
    setVolume(0);
  }, []);

  const startListening = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up audio analysis
      const ctx = new AudioContext();
      audioContextRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Start monitoring volume
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      let speechStarted = false;
      let lastSpeechTime = 0;

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255;
        setVolume(avg);

        const now = Date.now();

        if (avg > threshold && !speechStarted) {
          // Speech detected — start recording
          speechStarted = true;
          hasDetectedSpeechRef.current = true;
          lastSpeechTime = now;
          onSpeechStart?.();

          // Start MediaRecorder
          const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
            ? 'audio/webm;codecs=opus'
            : 'audio/webm';
          const recorder = new MediaRecorder(stream, { mimeType });
          chunksRef.current = [];

          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) chunksRef.current.push(e.data);
          };

          recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
            if (blob.size > 1000) {
              onSpeechEnd?.(blob);
            }
          };

          recorder.start();
          recorderRef.current = recorder;
          setIsRecording(true);
        }

        if (speechStarted) {
          if (avg > threshold) {
            lastSpeechTime = now;
          }

          // Silence detection — stop after delay
          if (now - lastSpeechTime > silenceDelay) {
            speechStarted = false;
            if (recorderRef.current?.state === 'recording') {
              recorderRef.current.stop();
              setIsRecording(false);
            }
            // Restart listening for next utterance
            hasDetectedSpeechRef.current = false;
          }
        }

        animFrameRef.current = requestAnimationFrame(checkVolume);
      };

      animFrameRef.current = requestAnimationFrame(checkVolume);
      setIsListening(true);
    } catch (err) {
      console.error('Mic access denied:', err);
    }
  }, [threshold, silenceDelay, onSpeechStart, onSpeechEnd]);

  const stopListening = useCallback(() => {
    cleanup();
  }, [cleanup]);

  const cancelRecording = useCallback(() => {
    if (recorderRef.current?.state === 'recording') {
      recorderRef.current.stop();
      setIsRecording(false);
      chunksRef.current = [];
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return {
    isListening,
    isRecording,
    volume,
    startListening,
    stopListening,
    cancelRecording,
  };
}
