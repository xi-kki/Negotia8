'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Palette } from 'lucide-react';
import type { AvatarProvider } from '@/lib/avatar-utils';

const STORAGE_KEY = 'negoti8-avatar-provider';

/**
 * Persistent avatar provider toggle.
 * Reads/writes localStorage. Renders a sleek pill toggle.
 */
export function useAvatarProvider(): [AvatarProvider, (p: AvatarProvider) => void] {
  const [provider, setProviderState] = useState<AvatarProvider>('uifaces');

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as AvatarProvider | null;
      if (stored === 'uifaces' || stored === 'dicebear') {
        setProviderState(stored);
      }
    } catch {
      // SSR or storage blocked — ignore
    }
  }, []);

  const setProvider = useCallback((p: AvatarProvider) => {
    setProviderState(p);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {
      // ignore
    }
  }, []);

  return [provider, setProvider];
}

interface Props {
  value: AvatarProvider;
  onChange: (p: AvatarProvider) => void;
}

export default function AvatarProviderToggle({ value, onChange }: Props) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '0.25rem',
      }}
    >
      <ToggleOption
        active={value === 'uifaces'}
        onClick={() => onChange('uifaces')}
        icon={<User size={13} />}
        label="Realistic"
      />
      <ToggleOption
        active={value === 'dicebear'}
        onClick={() => onChange('dicebear')}
        icon={<Palette size={13} />}
        label="Illustrated"
      />
    </div>
  );
}

function ToggleOption({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        padding: '0.35rem 0.75rem',
        borderRadius: '20px',
        border: 'none',
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? '#fff' : 'var(--text-muted)',
        fontSize: '0.75rem',
        fontWeight: active ? 600 : 400,
        transition: 'all 0.15s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
