'use client';

import { useState, useRef, useCallback } from 'react';

interface Props {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

export default function RecordButton({ onTranscript, disabled }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks.current = [];

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm';

      const recorder = new MediaRecorder(stream, { mimeType });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        setIsProcessing(true);
        await transcribeAndRespond(blob);
        setIsProcessing(false);
      };

      mediaRecorder.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      const message = err instanceof DOMException && err.name === 'NotAllowedError'
        ? 'Microphone access denied. Please allow mic permissions in your browser.'
        : 'Could not access microphone. Please check your device settings.';
      setMicError(message);
      // Auto-clear after 5 seconds
      setTimeout(() => setMicError(null), 5000);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current?.state === 'recording') {
      mediaRecorder.current.stop();
    }
    setIsRecording(false);
  }, []);

  const transcribeAndRespond = async (audioBlob: Blob) => {
    try {
      // Convert webm to wav via AudioContext for wider compatibility,
      // or send webm directly — Groq Whisper supports both
      const formData = new FormData();

      // Try to convert to WAV for better compatibility
      let audioFile: File;
      try {
        const wavBlob = await convertWebmToWav(audioBlob);
        audioFile = new File([wavBlob], 'recording.wav', { type: 'audio/wav' });
      } catch {
        // Fallback: send as webm
        audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
      }

      formData.append('file', audioFile);

      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Transcription failed' }));
        console.error('Transcription error:', err.error);
        onTranscript('(Audio recording — could not transcribe)');
        return;
      }

      const data = await res.json();
      onTranscript(data.text || '(No speech detected)');
    } catch (err) {
      console.error('Transcription error:', err);
      onTranscript('(Audio recording — transcription error)');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      {/* Mic error message */}
      {micError && (
        <div
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: 'var(--red)',
            fontSize: '0.82rem',
            textAlign: 'center',
            maxWidth: 280,
          }}
        >
          ⚠️ {micError}
        </div>
      )}
      <button
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onMouseLeave={isRecording ? stopRecording : undefined}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
        disabled={disabled || isProcessing}
        className={isRecording ? 'recording' : ''}
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          border: `3px solid ${isRecording ? 'var(--red)' : 'var(--accent)'}`,
          background: isRecording ? 'var(--red)' : 'var(--bg-card)',
          color: '#fff',
          fontSize: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        {isRecording ? '⏹' : '🎙️'}
      </button>
      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        {isProcessing ? '🔊 Transcribing...' : isRecording ? 'Release to send' : 'Hold to speak'}
      </span>
    </div>
  );
}

/**
 * Convert WebM audio blob to WAV using AudioContext
 */
async function convertWebmToWav(webmBlob: Blob): Promise<Blob> {
  const arrayBuffer = await webmBlob.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  const numChannels = audioBuffer.numberOfChannels;
  const sampleRate = audioBuffer.sampleRate;
  const length = audioBuffer.length;

  // Create WAV buffer
  const wavBuffer = new ArrayBuffer(44 + length * numChannels * 2);
  const view = new DataView(wavBuffer);

  // WAV header
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + length * numChannels * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, length * numChannels * 2, true);

  // Audio data
  let offset = 44;
  for (let i = 0; i < length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(ch)[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }

  audioContext.close();
  return new Blob([wavBuffer], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}
