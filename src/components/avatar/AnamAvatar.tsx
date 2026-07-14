'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createClient, type AnamClient } from '@anam-ai/js-sdk';
import { Loader2, Video, VideoOff, AlertTriangle } from 'lucide-react';

interface Props {
  /** Whether the avatar should be speaking (triggers streaming) */
  isSpeaking: boolean;
  /** Text for the avatar to speak (when isSpeaking becomes true) */
  speakText?: string;
  /** Emotion label to display */
  emotion?: string;
  /** Called when avatar starts speaking */
  onSpeakingStart?: () => void;
  /** Called when avatar finishes speaking */
  onSpeakingEnd?: () => void;
  /** Disable avatar (fallback to SVG) */
  disabled?: boolean;
}

/**
 * Anam AI Avatar — real-time lip-synced talking head.
 *
 * Flow:
 * 1. Fetch session token from /api/anam-session (server-side, secure)
 * 2. Create Anam client with token
 * 3. Stream to <video> element
 * 4. Send text to avatar for speech via the Anam API
 */
export default function AnamAvatar({
  isSpeaking,
  speakText,
  emotion = 'neutral',
  onSpeakingStart,
  onSpeakingEnd,
  disabled = false,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const clientRef = useRef<AnamClient | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'connected' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const lastSpokenRef = useRef<string>('');

  // Initialize Anam client on mount
  useEffect(() => {
    if (disabled) return;

    let cancelled = false;

    async function init() {
      try {
        setStatus('loading');

        // Get session token from server
        const res = await fetch('/api/anam-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });

        if (!res.ok) {
          throw new Error(`Session token failed: ${res.status}`);
        }

        const { sessionToken } = await res.json();

        if (cancelled) return;

        // Create Anam client
        const client = createClient(sessionToken);
        clientRef.current = client;

        // Start streaming to video element
        if (videoRef.current) {
          await client.streamToVideoElement('anam-video');
          if (!cancelled) {
            setStatus('connected');
          }
        }
      } catch (err: any) {
        if (!cancelled) {
          console.error('Anam init error:', err);
          setStatus('error');
          setErrorMessage(err.message || 'Failed to connect to avatar');
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      clientRef.current?.stopStreaming();
    };
  }, [disabled]);

  // Handle speech — send text to Anam avatar
  useEffect(() => {
    if (!isSpeaking || !speakText || !clientRef.current || status !== 'connected') {
      return;
    }

    // Don't re-send the same text
    if (speakText === lastSpokenRef.current) return;
    lastSpokenRef.current = speakText;

    onSpeakingStart?.();

    // The Anam SDK handles speech when connected to its backend
    // The avatar will speak via the session's LLM when we send messages
    // For now, we rely on the voice-stream API for audio and show the avatar as a visual
    onSpeakingEnd?.();
  }, [isSpeaking, speakText, status, onSpeakingStart, onSpeakingEnd]);

  // Emotion display config
  const emotionConfig: Record<string, { label: string; color: string }> = {
    happy: { label: 'Happy', color: '#22c55e' },
    skeptical: { label: 'Skeptical', color: '#eab308' },
    frustrated: { label: 'Frustrated', color: '#ef4444' },
    neutral: { label: 'Neutral', color: '#8888a0' },
  };

  const emotionInfo = emotionConfig[emotion] || emotionConfig.neutral;

  if (disabled) {
    return null;
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: 320,
        borderRadius: '16px',
        background: 'linear-gradient(180deg, #0a0a1a 0%, #14142a 50%, #1a1a2e 100%)',
        border: `1px solid ${isSpeaking ? '#22c55e40' : '#ffffff10'}`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '1rem',
        transition: 'border-color 0.4s ease',
      }}
    >
      {/* Speaking pulse */}
      {isSpeaking && status === 'connected' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, #22c55e12 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Video element for Anam streaming */}
      <video
        id="anam-video"
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: '100%',
          maxWidth: 280,
          height: 'auto',
          aspectRatio: '3/4',
          borderRadius: '12px',
          objectFit: 'cover',
          display: status === 'connected' ? 'block' : 'none',
        }}
      />

      {/* Loading state */}
      {status === 'loading' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '2rem',
          }}
        >
          <Loader2 size={40} className="animate-spin" style={{ color: 'var(--accent)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Connecting to avatar...
          </span>
        </div>
      )}

      {/* Error state */}
      {status === 'error' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '2rem',
          }}
        >
          <AlertTriangle size={40} style={{ color: 'var(--yellow)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
            {errorMessage || 'Avatar unavailable'}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            Using voice-only mode
          </span>
        </div>
      )}

      {/* Idle state */}
      {status === 'idle' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '2rem',
          }}
        >
          <Video size={40} style={{ color: 'var(--accent)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Avatar ready</span>
        </div>
      )}

      {/* Emotion badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          background: `${emotionInfo.color}15`,
          border: `1px solid ${emotionInfo.color}30`,
          fontSize: '0.82rem',
          fontWeight: 500,
          color: emotionInfo.color,
          textTransform: 'capitalize',
          transition: 'all 0.3s ease',
          position: 'absolute',
          bottom: '1rem',
        }}
      >
        {isSpeaking ? '🗣️ Speaking...' : emotionInfo.label}
      </div>

      {/* Connection status */}
      <div
        style={{
          position: 'absolute',
          top: '0.75rem',
          right: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.7rem',
          color: status === 'connected' ? '#22c55e' : 'var(--text-muted)',
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background:
              status === 'connected' ? '#22c55e' : status === 'error' ? '#ef4444' : '#eab308',
          }}
        />
        {status === 'connected'
          ? 'Live'
          : status === 'loading'
            ? 'Connecting...'
            : status === 'error'
              ? 'Offline'
              : 'Ready'}
      </div>
    </div>
  );
}
