'use client';

import { useState, useEffect } from 'react';
import { Clock, Target, TrendingUp, Trash2, BarChart3, Flame, X } from 'lucide-react';
import {
  getSessions,
  getStats,
  clearSessions,
  deleteSession,
  formatDuration,
  formatRelativeDate,
  type PracticeSession,
} from '@/lib/session-history';

interface Props {
  onClose: () => void;
  onSelectScenario?: (scenarioId: string) => void;
}

export default function PracticeHistory({ onClose, onSelectScenario }: Props) {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    setSessions(getSessions());
    setStats(getStats());
  }, []);

  const handleDelete = (id: string) => {
    deleteSession(id);
    setSessions(getSessions());
    setStats(getStats());
  };

  const handleClearAll = () => {
    clearSessions();
    setSessions([]);
    setStats(getStats());
    setShowConfirmClear(false);
  };

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
        borderRadius: '16px',
        padding: '1.5rem',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <BarChart3 size={20} />
          Practice History
        </h2>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '0.25rem',
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Stats Grid */}
      {stats && stats.totalSessions > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          <StatCard
            icon={<Target size={16} />}
            label="Sessions"
            value={stats.totalSessions.toString()}
            color="var(--accent)"
          />
          <StatCard
            icon={<Clock size={16} />}
            label="Practice Time"
            value={`${stats.totalMinutes}m`}
            color="var(--green)"
          />
          <StatCard
            icon={<TrendingUp size={16} />}
            label="Avg Score"
            value={`${stats.averageScore}/10`}
            color={getScoreColor(stats.averageScore)}
          />
          <StatCard
            icon={<BarChart3 size={16} />}
            label="Best Score"
            value={`${stats.bestScore}/10`}
            color="var(--green)"
          />
          <StatCard
            icon={<Target size={16} />}
            label="Scenarios"
            value={stats.scenariosPlayed.toString()}
            color="var(--accent)"
          />
          <StatCard
            icon={<Flame size={16} />}
            label="Streak"
            value={`${stats.currentStreak}d`}
            color={stats.currentStreak > 0 ? 'var(--orange)' : 'var(--text-muted)'}
          />
        </div>
      )}

      {/* Sessions List */}
      {sessions.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: 'var(--text-muted)',
          }}
        >
          <Target size={40} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <p style={{ margin: 0, fontSize: '0.9rem' }}>No practice sessions yet</p>
          <p style={{ margin: '0.5rem 0 0', fontSize: '0.8rem' }}>
            Complete a negotiation to see your history here
          </p>
        </div>
      ) : (
        <>
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            {sessions.map((session) => (
              <div
                key={session.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  marginBottom: '0.5rem',
                  transition: 'all 0.15s',
                  cursor: onSelectScenario ? 'pointer' : 'default',
                }}
                onClick={() => onSelectScenario?.(session.scenarioId)}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Score */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '12px',
                    background: `${getScoreColor(session.report.overallScore)}15`,
                    border: `1px solid ${getScoreColor(session.report.overallScore)}30`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: getScoreColor(session.report.overallScore),
                      lineHeight: 1,
                    }}
                  >
                    {session.report.overallScore}
                  </span>
                  <span
                    style={{
                      fontSize: '0.55rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    /10
                  </span>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {session.scenarioTitle}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      gap: '0.75rem',
                    }}
                  >
                    <span>{session.turns.length} turns</span>
                    <span>{formatDuration(session.duration)}</span>
                    <span>{formatRelativeDate(session.completedAt)}</span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(session.id);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    opacity: 0.5,
                    transition: 'opacity 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.5')}
                  title="Delete session"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          {/* Clear All */}
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            {showConfirmClear ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                }}
              >
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Clear all sessions?
                </span>
                <button
                  onClick={handleClearAll}
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'var(--red)',
                    color: '#fff',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  Yes, clear
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  style={{
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid var(--border)',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmClear(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  opacity: 0.6,
                }}
              >
                Clear all history
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: 'var(--bg)',
        borderRadius: '10px',
        padding: '0.75rem',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color,
          marginBottom: '0.25rem',
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '0.65rem',
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </div>
    </div>
  );
}
