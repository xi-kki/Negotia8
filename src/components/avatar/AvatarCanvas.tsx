'use client';

import { useMemo } from 'react';
import { CircleDot, Meh, Frown, Smile, Circle } from 'lucide-react';
import type { Emotion } from '@/types';
import AvatarDicebear from '../AvatarDicebear';
import { getCounterpartAvatar } from '@/lib/avatar-utils';

interface Props {
  emotion?: Emotion;
  isSpeaking?: boolean;
  scenarioId?: string;
  provider?: string;
}

const EMOTION_CONFIG: Record<
  string,
  { icon: React.ReactNode; color: string; glow: string; label: string }
> = {
  skeptical: {
    icon: <Meh size={13} />,
    color: '#eab308',
    glow: '0 0 40px rgba(234, 179, 8, 0.35), 0 0 80px rgba(234, 179, 8, 0.15)',
    label: 'Skeptical',
  },
  frustrated: {
    icon: <Frown size={13} />,
    color: '#ef4444',
    glow: '0 0 40px rgba(239, 68, 68, 0.35), 0 0 80px rgba(239, 68, 68, 0.15)',
    label: 'Frustrated',
  },
  happy: {
    icon: <Smile size={13} />,
    color: '#22c55e',
    glow: '0 0 40px rgba(34, 197, 94, 0.35), 0 0 80px rgba(34, 197, 94, 0.15)',
    label: 'Happy',
  },
  neutral: {
    icon: <Circle size={13} />,
    color: '#8888a0',
    glow: '0 0 30px rgba(136, 136, 160, 0.15)',
    label: 'Neutral',
  },
};

export default function AvatarCanvas({
  emotion = 'neutral',
  isSpeaking = false,
  scenarioId = 'salary-entry',
  provider = 'uifaces',
}: Props) {
  const config = EMOTION_CONFIG[emotion] || EMOTION_CONFIG.neutral;
  const avatarConfig = useMemo(
    () => getCounterpartAvatar(scenarioId, provider, 128),
    [scenarioId, provider],
  );

  return (
    <div
      style={{
        width: '100%',
        minHeight: 340,
        borderRadius: '16px',
        background: 'linear-gradient(180deg, #0a0a1a 0%, #14142a 50%, #1a1a2e 100%)',
        border: `1px solid ${config.color}30`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        padding: '2rem',
        transition: 'border-color 0.4s ease',
      }}
    >
      {/* Background pulse when speaking */}
      {isSpeaking && (
        <div
          className="avatar-speaking-pulse"
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at center, ${config.color}10 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Avatar image with emotion glow */}
      <div
        style={{
          position: 'relative',
          transition: 'filter 0.4s ease, transform 0.3s ease',
          filter: isSpeaking
            ? `drop-shadow(${config.glow})`
            : `drop-shadow(${config.glow.replace('0.35', '0.2').replace('0.15', '0.08')})`,
          transform: isSpeaking ? 'scale(1.04)' : 'scale(1)',
        }}
      >
        <img
          src={avatarConfig.url}
          alt="Counterpart"
          width={160}
          height={160}
          style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            border: `3px solid ${config.color}50`,
            objectFit: 'cover',
            background: 'var(--bg-card)',
          }}
        />

        {/* Speaking ring animation */}
        {isSpeaking && (
          <div
            className="avatar-ring"
            style={{
              position: 'absolute',
              inset: -6,
              borderRadius: '50%',
              border: `2px solid ${config.color}40`,
              pointerEvents: 'none',
            }}
          />
        )}
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

      {/* Speaking indicator */}
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

/** Animated waveform bars */
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
            animation: `waveform 0.6s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </span>
  );
}
