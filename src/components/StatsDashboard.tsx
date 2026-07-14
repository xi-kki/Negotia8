'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Clock, Target, TrendingUp, Flame } from 'lucide-react';
import { getStats } from '@/lib/session-history';

interface Props {
  onViewHistory: () => void;
}

export default function StatsDashboard({ onViewHistory }: Props) {
  const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null);

  useEffect(() => {
    setStats(getStats());
  }, []);

  if (!stats || stats.totalSessions === 0) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'var(--green)';
    if (score >= 6) return 'var(--yellow)';
    if (score >= 4) return 'var(--orange)';
    return 'var(--red)';
  };

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1.5rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.75rem',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '0.85rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <BarChart3 size={14} />
          Your Progress
        </h3>
        <button
          onClick={onViewHistory}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--accent)',
            fontSize: '0.78rem',
            cursor: 'pointer',
          }}
        >
          View All →
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.5rem',
        }}
      >
        <MiniStat
          icon={<Target size={12} />}
          value={stats.totalSessions.toString()}
          label="Sessions"
          color="var(--accent)"
        />
        <MiniStat
          icon={<Clock size={12} />}
          value={`${stats.totalMinutes}m`}
          label="Practice"
          color="var(--green)"
        />
        <MiniStat
          icon={<TrendingUp size={12} />}
          value={`${stats.averageScore}`}
          label="Avg Score"
          color={getScoreColor(stats.averageScore)}
        />
        <MiniStat
          icon={<Flame size={12} />}
          value={`${stats.currentStreak}d`}
          label="Streak"
          color={stats.currentStreak > 0 ? 'var(--orange)' : 'var(--text-muted)'}
        />
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  value,
  label,
  color,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color,
          marginBottom: '0.15rem',
        }}
      >
        {icon}
      </div>
      <div style={{ fontSize: '1rem', fontWeight: 600, color }}>{value}</div>
      <div
        style={{
          fontSize: '0.6rem',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
}
