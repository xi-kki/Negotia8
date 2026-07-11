'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import type { Emotion } from './AvatarModel';
import VoiceVisualizer from './VoiceVisualizer';

const AvatarScene = dynamic(() => import('./AvatarScene'), { ssr: false });

interface Props {
  emotion?: Emotion;
  isSpeaking?: boolean;
}

/**
 * 3D Avatar with emotional expressions.
 * Uses React Three Fiber with dynamic SSR-safe import.
 *
 * Emotions:
 * 😏 skeptical — raised eyebrow, head tilt, squint
 * 😤 frustrated — lowered brows, frown, tense
 * 😊 happy — raised brows, wide smile, bright
 * 😐 neutral — attentive, relaxed
 */
export default function AvatarCanvas({ emotion = 'neutral', isSpeaking = false }: Props) {
  return (
    <div
      style={{
        width: '100%',
        height: 340,
        borderRadius: '16px',
        background: 'linear-gradient(180deg, #0a0a1a 0%, #14142a 50%, #1a1a2e 100%)',
        border: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Voice visualizer ring */}
      <VoiceVisualizer isActive={isSpeaking} />
      <Suspense fallback={<LoadingFallback />}>
        <AvatarScene emotion={emotion} isSpeaking={isSpeaking} />
      </Suspense>

      {/* Emotion label */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '0.75rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(6px)',
          fontSize: '0.78rem',
          color: formatter(emotion).color,
          textTransform: 'capitalize',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          zIndex: 10,
        }}
      >
        <span>{formatter(emotion).icon}</span>
        <span>{emotion}</span>
      </div>

      {/* Speaking indicator */}
      {isSpeaking && (
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            background: 'rgba(34, 197, 94, 0.15)',
            backdropFilter: 'blur(6px)',
            fontSize: '0.75rem',
            color: 'var(--green)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            zIndex: 10,
          }}
        >
          <Waveform />
          <span>Speaking</span>
        </div>
      )}
    </div>
  );
}

function LoadingFallback() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎭</div>
        <div>Loading avatar...</div>
      </div>
    </div>
  );
}

/** Animated waveform bars for speaking indicator */
function Waveform() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', height: 16 }}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="waveform-bar"
          style={{
            width: 3,
            height: 8,
            borderRadius: '2px',
            background: 'var(--green)',
            animation: `waveform 0.6s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </span>
  );
}

function formatter(emotion: string): { icon: string; color: string } {
  switch (emotion) {
    case 'skeptical':
      return { icon: '😏', color: '#eab308' };
    case 'frustrated':
      return { icon: '😤', color: '#ef4444' };
    case 'happy':
      return { icon: '😊', color: '#22c55e' };
    default:
      return { icon: '😐', color: '#8888a0' };
  }
}
