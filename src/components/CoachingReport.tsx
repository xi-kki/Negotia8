'use client';

interface CoachingReportData {
  overallScore: number;
  breakdown: {
    outcome: number;
    tactics: number;
    delivery: number;
    adaptability: number;
  };
  whatYouDidWell: string[];
  missedOpportunities: string[];
  phrasesYouCouldHaveSaid: string[];
  tacticsYouUsed: string[];
  totalFillerWords: number;
  advice: string;
}

interface Props {
  report: CoachingReportData | null;
  onRestart: () => void;
}

export default function CoachingReport({ report, onRestart }: Props) {
  if (!report) return null;

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
        padding: '2rem',
        maxWidth: 600,
        margin: '1.5rem auto',
      }}
    >
      {/* Score */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Overall Score
        </div>
        <div
          style={{
            fontSize: '4rem',
            fontWeight: 700,
            color: getScoreColor(report.overallScore),
            lineHeight: 1,
          }}
        >
          {report.overallScore}
          <span style={{ fontSize: '1.5rem', color: 'var(--text-muted)' }}>/10</span>
        </div>
      </div>

      {/* Breakdown */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {Object.entries(report.breakdown).map(([key, val]) => (
          <div
            key={key}
            style={{
              background: 'var(--bg)',
              borderRadius: '10px',
              padding: '0.75rem',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                textTransform: 'capitalize',
              }}
            >
              {key}
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 600, color: getScoreColor(val) }}>
              {val}/{key === 'outcome' || key === 'tactics' ? 3 : 2}
            </div>
          </div>
        ))}
      </div>

      {/* What you did well */}
      {report.whatYouDidWell.length > 0 && (
        <Section title="✅ What You Did Well">
          {report.whatYouDidWell.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Section>
      )}

      {/* Missed opportunities */}
      {report.missedOpportunities.length > 0 && (
        <Section title="⚠️ Missed Opportunities">
          {report.missedOpportunities.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </Section>
      )}

      {/* Phrases */}
      {report.phrasesYouCouldHaveSaid.length > 0 && (
        <Section title="💬 You Could Have Said">
          {report.phrasesYouCouldHaveSaid.map((item, i) => (
            <li key={i} style={{ fontStyle: 'italic', color: 'var(--accent-hover)' }}>
              "{item}"
            </li>
          ))}
        </Section>
      )}

      {/* Tactics */}
      {report.tacticsYouUsed.length > 0 && (
        <Section title="🎯 Tactics Used">
          {report.tacticsYouUsed.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </Section>
      )}

      {/* Filler words */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
          🗣️ Filler Words
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>
          {report.totalFillerWords} total
          {report.totalFillerWords > 5 && (
            <span style={{ fontSize: '0.8rem', color: 'var(--orange)', marginLeft: '0.5rem' }}>
              — try to reduce these
            </span>
          )}
        </div>
      </div>

      {/* Advice */}
      <div
        style={{
          background: 'var(--bg)',
          borderRadius: '10px',
          padding: '1rem',
          marginBottom: '1.5rem',
          borderLeft: '3px solid var(--accent)',
        }}
      >
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
          📌 Advice
        </div>
        <div style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>{report.advice}</div>
      </div>

      {/* Restart */}
      <button
        onClick={onRestart}
        style={{
          width: '100%',
          padding: '0.75rem',
          borderRadius: '10px',
          border: 'none',
          background: 'var(--accent)',
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        Practice Again
      </button>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        {title}
      </div>
      <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
        {children}
      </ul>
    </div>
  );
}
