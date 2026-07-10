'use client';

import { useState } from 'react';

export interface ScenarioOption {
  id: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

const SCENARIOS: ScenarioOption[] = [
  { id: 'salary-entry', title: 'Entry-Level Salary', category: 'Salary', difficulty: 'easy', icon: '💼' },
  { id: 'salary-senior', title: 'Senior Counter-Offer', category: 'Salary', difficulty: 'medium', icon: '💼' },
  { id: 'salary-equity', title: 'Equity vs Cash', category: 'Salary', difficulty: 'hard', icon: '💼' },
  { id: 'salary-counteroffer', title: 'Employer Counteroffer', category: 'Salary', difficulty: 'hard', icon: '💼' },
  { id: 'fundraising-cofounder', title: 'Co-Founder Equity Split', category: 'Fundraising', difficulty: 'easy', icon: '🚀' },
  { id: 'fundraising-preseed', title: 'Pre-Seed SAFE', category: 'Fundraising', difficulty: 'medium', icon: '🚀' },
  { id: 'fundraising-series-a', title: 'Series A Term Sheet', category: 'Fundraising', difficulty: 'hard', icon: '🚀' },
  { id: 'freelance-rate', title: 'Freelance Rate', category: 'Freelance', difficulty: 'easy', icon: '🤝' },
  { id: 'scope-creep', title: 'Scope Creep', category: 'Freelance', difficulty: 'medium', icon: '🤝' },
  { id: 'vendor-pricing', title: 'B2B SaaS Pricing', category: 'Sales', difficulty: 'hard', icon: '🤝' },
  { id: 'car-buying', title: 'Car Dealership', category: 'Consumer', difficulty: 'easy', icon: '🛒' },
  { id: 'rent-negotiation', title: 'Rent Negotiation', category: 'Consumer', difficulty: 'medium', icon: '🛒' },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  easy: 'var(--green)',
  medium: 'var(--yellow)',
  hard: 'var(--red)',
};

interface Props {
  onSelect: (scenarioId: string) => void;
  selectedId: string | null;
}

export default function ScenarioSelector({ onSelect, selectedId }: Props) {
  const [category, setCategory] = useState<string | null>(null);
  const categories = [...new Set(SCENARIOS.map(s => s.category))];

  const filtered = category
    ? SCENARIOS.filter(s => s.category === category)
    : SCENARIOS;

  return (
    <div style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => setCategory(null)}
          style={{
            padding: '0.4rem 1rem',
            borderRadius: '20px',
            border: `1px solid ${!category ? 'var(--accent)' : 'var(--border)'}`,
            background: !category ? 'var(--accent)' : 'transparent',
            color: '#fff',
            fontSize: '0.85rem',
          }}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              border: `1px solid ${category === cat ? 'var(--accent)' : 'var(--border)'}`,
              background: category === cat ? 'var(--accent)' : 'transparent',
              color: '#fff',
              fontSize: '0.85rem',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {filtered.map(s => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '10px',
              border: `1px solid ${selectedId === s.id ? 'var(--accent)' : 'var(--border)'}`,
              background: selectedId === s.id ? 'var(--bg-hover)' : 'var(--bg-card)',
              color: '#fff',
              textAlign: 'left',
              fontSize: '0.9rem',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = selectedId === s.id ? 'var(--bg-hover)' : 'var(--bg-card)')}
          >
            <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500 }}>{s.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.category}</div>
            </div>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: DIFFICULTY_COLORS[s.difficulty],
              }}
              title={s.difficulty}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
