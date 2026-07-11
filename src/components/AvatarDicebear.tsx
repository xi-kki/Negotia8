'use client';

import {
  getUIFacesUrl,
  getDiceBearUrl,
  type AvatarProvider,
  type AvatarConfig,
} from '@/lib/avatar-utils';

interface Props {
  config?: AvatarConfig;
  seed?: string;
  provider?: AvatarProvider;
  dicebearStyle?: string;
  size?: number;
  label?: string;
  color?: string;
  showGlow?: boolean;
  showBorder?: boolean;
  rounded?: boolean;
}

/**
 * Realistic human avatar (UI Faces) or illustrated (DiceBear).
 *
 * Realistic:
 *   <AvatarDicebear seed="salary-entry" size={80} />
 *
 * Illustrated:
 *   <AvatarDicebear seed="salary-entry" provider="dicebear" dicebearStyle="lorelei" size={80} />
 */
export default function AvatarDicebear({
  config,
  seed = 'default',
  provider = 'uifaces',
  dicebearStyle = 'lorelei',
  size = 64,
  label,
  color,
  showGlow = true,
  showBorder = true,
  rounded = false,
}: Props) {
  const avatarUrl =
    config?.url ||
    (provider === 'uifaces'
      ? getUIFacesUrl(seed, size * 2)
      : getDiceBearUrl(dicebearStyle, seed, size));

  const accent = config?.color || color || '#6366f1';
  const displayLabel = config?.label || label;
  const radius = rounded ? '16px' : '50%';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        {/* Glow */}
        {showGlow && (
          <div
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${accent}20 0%, transparent 70%)`,
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Image */}
        <img
          src={avatarUrl}
          alt={displayLabel || 'Avatar'}
          width={size * 2}
          height={size * 2}
          loading="lazy"
          style={{
            width: size,
            height: size,
            borderRadius: radius,
            border: showBorder ? `2px solid ${accent}40` : 'none',
            objectFit: 'cover',
            background: 'var(--bg-card)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.06)';
            e.currentTarget.style.boxShadow = `0 4px 20px ${accent}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />

        {/* Provider badge */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: Math.max(10, size * 0.2),
            height: Math.max(10, size * 0.2),
            borderRadius: '50%',
            background: accent,
            border: '2px solid var(--bg)',
          }}
          title={config?.provider || provider}
        />
      </div>

      {displayLabel && (
        <span
          style={{
            fontSize: Math.max(10, Math.min(13, size * 0.16)),
            color: 'var(--text-muted)',
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: size * 1.6,
          }}
        >
          {displayLabel}
        </span>
      )}
    </div>
  );
}

/**
 * User vs Counterpart — side by side with VS badge.
 */
export function AvatarPair({
  userSeed,
  counterpartSeed,
  counterpartColor = '#6366f1',
  provider = 'uifaces',
  size = 56,
}: {
  userSeed: string;
  counterpartSeed: string;
  counterpartColor?: string;
  provider?: AvatarProvider;
  size?: number;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <AvatarDicebear
        seed={userSeed}
        provider={provider}
        size={size}
        color="#8b5cf6"
        showGlow={false}
      />
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: 'var(--bg)',
          border: '2px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: 'var(--text-muted)',
          margin: '0 -8px',
          zIndex: 2,
        }}
      >
        VS
      </div>
      <AvatarDicebear
        seed={counterpartSeed}
        provider={provider}
        size={size}
        color={counterpartColor}
        showGlow={false}
      />
    </div>
  );
}
