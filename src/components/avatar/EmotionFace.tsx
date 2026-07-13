'use client';

import { useEffect, useState } from 'react';

type Emotion = 'neutral' | 'skeptical' | 'frustrated' | 'happy';

interface Props {
  emotion?: Emotion;
  isSpeaking?: boolean;
  size?: number;
}

/**
 * Pure SVG animated face — zero dependencies, ~2KB.
 * Shows clear emotion through eyebrows, eyes, mouth.
 */
export default function EmotionFace({ emotion = 'neutral', isSpeaking = false, size = 200 }: Props) {
  const [mouthOpen, setMouthOpen] = useState(0);

  // Lip sync simulation when speaking
  useEffect(() => {
    if (!isSpeaking) {
      setMouthOpen(0);
      return;
    }
    const interval = setInterval(() => {
      setMouthOpen(Math.random() * 0.7 + 0.3);
    }, 100);
    return () => clearInterval(interval);
  }, [isSpeaking]);

  const e = EMOTIONS[emotion] || EMOTIONS.neutral;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ filter: `drop-shadow(0 0 20px ${e.glow})` }}
    >
      {/* Face circle */}
      <circle cx="100" cy="100" r="85" fill={e.skinColor} />

      {/* Cheek blush for happy */}
      {emotion === 'happy' && (
        <>
          <circle cx="55" cy="115" r="15" fill="#ff9999" opacity="0.4" />
          <circle cx="145" cy="115" r="15" fill="#ff9999" opacity="0.4" />
        </>
      )}

      {/* Left eyebrow */}
      <path
        d={e.leftBrow}
        stroke="#3a2a1a"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        style={{ transition: 'd 0.3s ease' }}
      />

      {/* Right eyebrow */}
      <path
        d={e.rightBrow}
        stroke="#3a2a1a"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        style={{ transition: 'd 0.3s ease' }}
      />

      {/* Left eye */}
      <ellipse
        cx="70"
        cy="95"
        rx="12"
        ry={e.eyeHeight}
        fill="white"
        style={{ transition: 'ry 0.3s ease' }}
      />
      <circle cx={70 + e.pupilOffsetX} cy="96" r="6" fill="#1a1a2e" />
      <circle cx={72 + e.pupilOffsetX} cy="94" r="2" fill="white" />

      {/* Right eye */}
      <ellipse
        cx="130"
        cy="95"
        rx="12"
        ry={e.eyeHeight}
        fill="white"
        style={{ transition: 'ry 0.3s ease' }}
      />
      <circle cx={130 + e.pupilOffsetX} cy="96" r="6" fill="#1a1a2e" />
      <circle cx={132 + e.pupilOffsetX} cy="94" r="2" fill="white" />

      {/* Nose */}
      <path d="M97 105 Q100 115 103 105" stroke="#c0a080" strokeWidth="1.5" fill="none" />

      {/* Mouth */}
      {isSpeaking ? (
        // Speaking mouth — animated open/close
        <ellipse
          cx="100"
          cy={135 + mouthOpen * 3}
          rx={18 + mouthOpen * 5}
          ry={3 + mouthOpen * 8}
          fill="#5a3a2a"
          style={{ transition: 'ry 0.08s ease, rx 0.08s ease' }}
        />
      ) : (
        // Static mouth based on emotion
        <path
          d={e.mouth}
          stroke="#5a3a2a"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill={e.mouthFill || 'none'}
          style={{ transition: 'd 0.3s ease' }}
        />
      )}

      {/* Frustrated: stress lines */}
      {emotion === 'frustrated' && (
        <>
          <line x1="85" y1="78" x2="90" y2="72" stroke="#c0a080" strokeWidth="1.5" opacity="0.5" />
          <line x1="115" y1="78" x2="110" y2="72" stroke="#c0a080" strokeWidth="1.5" opacity="0.5" />
        </>
      )}
    </svg>
  );
}

// ─── Emotion definitions ──────────────────────────────────────────
const EMOTIONS: Record<Emotion, {
  leftBrow: string;
  rightBrow: string;
  eyeHeight: number;
  pupilOffsetX: number;
  mouth: string;
  mouthFill?: string;
  skinColor: string;
  glow: string;
}> = {
  neutral: {
    leftBrow: 'M55 78 Q70 73 85 78',
    rightBrow: 'M115 78 Q130 73 145 78',
    eyeHeight: 10,
    pupilOffsetX: 0,
    mouth: 'M80 132 Q100 140 120 132',
    skinColor: '#f0d5b8',
    glow: 'rgba(136,136,160,0.2)',
  },
  skeptical: {
    leftBrow: 'M55 72 Q70 65 85 78',   // Left brow raised
    rightBrow: 'M115 80 Q130 76 145 80', // Right brow flat
    eyeHeight: 7,                          // Squinting
    pupilOffsetX: 3,                       // Looking to side
    mouth: 'M85 135 Q100 130 115 135',   // Slight frown
    skinColor: '#edd5a8',
    glow: 'rgba(234,179,8,0.25)',
  },
  frustrated: {
    leftBrow: 'M55 82 Q70 75 85 76',    // Brows down
    rightBrow: 'M115 76 Q130 75 145 82', // Brows down
    eyeHeight: 8,
    pupilOffsetX: 0,
    mouth: 'M78 138 Q100 128 122 138',  // Frown
    mouthFill: 'none',
    skinColor: '#e8c0a0',
    glow: 'rgba(239,68,68,0.25)',
  },
  happy: {
    leftBrow: 'M55 75 Q70 68 85 73',    // Brows up
    rightBrow: 'M115 73 Q130 68 145 75',
    eyeHeight: 11,                         // Wide open
    pupilOffsetX: 0,
    mouth: 'M75 128 Q100 148 125 128',  // Big smile
    mouthFill: '#5a3a2a',
    skinColor: '#f5ddb8',
    glow: 'rgba(34,197,94,0.25)',
  },
};
