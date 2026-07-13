'use client';

import { Meh, Frown, Smile, Circle, CircleDot } from 'lucide-react';
import type { Emotion } from '@/types';
import EmotionFace from './EmotionFace';

interface Props {
  emotion?: Emotion;
  isSpeaking?: boolean;
  scenarioId?: string;
  provider?: string;
}

const EMOTION_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  skeptical: { icon: <Meh size={13} />, color: '#eab308', label: 'Skeptical' },
  frustrated: { icon: <Frown size={13} />, color: '#ef4444', label: 'Frustrated' },
  happy: { icon: <Smile size={13} />, color: '#22c55e', label: 'Happy' },
  neutral: { icon: <Circle size={13} />, color: '#8888a0', label: 'Neutral' },
};

export default function AvatarCanvas({ emotion = 'neutral', isSpeaking = false }: Props) {
  const config = EMOTION_CONFIG[emotion] || EMOTION_CONFIG.neutral;

  return (
    <div
      style={{
        width: '100%',
        minHeight: 320,
        borderRadius: '16px',
        background: 'linear-gradient(180deg, #0a0a1a 0%, #14142a 50%, #1a1a2e 100%)',
        border: `1px solid ${config.color}30`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1.5rem',
        transition: 'border-color 0.4s ease',
      }}
    >
      {/* Speaking pulse background */}
      {isSpeaking && (
        <div
          className="avatar-speaking-pulse"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at center, ${config.color}12 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* The animated face */}
      <div
        style={{
          transition: 'transform 0.3s ease, filter 0.3s ease',
          transform: isSpeaking ? 'scale(1.04)' : 'scale(1)',
        }}
      >
        <EmotionFace emotion={emotion} isSpeaking={isSpeaking} size={180} />
      </div>

      {/* Emotion badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          background: `${config.color}15`,
          border: `1px solid ${config.color}30`,
          fontSize: '0.82rem',
          fontWeight: 500,
          color: config.color,
          textTransform: 'capitalize',
          transition: 'all 0.3s ease',
        }}
      >
        {config.icon}
        {config.label}
      </div>

      {/* Speaking waveform */}
      {isSpeaking && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.78rem',
            color: config.color,
          }}
        >
          <Waveform color={config.color} />
          <span>Speaking...</span>
        </div>
      )}
    </div>
  );
}

function Waveform({ color = 'var(--green)' }: { color?: string }) {
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
            background: color,
            animation: 'waveform 0.6s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </span>
  );
}
