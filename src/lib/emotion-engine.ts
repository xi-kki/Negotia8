/**
 * Negoti8 — Emotion Engine
 *
 * The killer feature: the AI doesn't just respond with words.
 * It reacts emotionally to what you say, in real time.
 * The avatar sees you flinch, hears you stammer, watches you lowball —
 * and responds with a raised eyebrow, a frown, or a smile.
 *
 * This is what makes it feel like a real negotiation.
 */

import type { EmotionEvent } from '@/types/emotion';

/**
 * Analyze a user's negotiation response and determine
 * the avatar's emotional reaction.
 *
 * Rules engine (MVP): pattern-match on text content.
 * Phase 2: LLM-based sentiment analysis for nuance.
 */
export function analyzeEmotion(
  userText: string,
  context: {
    scenario: string;
    turnNumber: number;
    lastOffer?: number;
    targetRange?: [number, number];
  },
): EmotionEvent {
  const lower = userText.toLowerCase();

  // --- Skeptical Triggers ---
  // User makes a weak argument, unrealistic demand, or shows hesitation
  if (
    containsAny(lower, ['fair price', 'market rate', 'i think', 'maybe', 'perhaps', 'i guess']) &&
    !containsAny(lower, ['data shows', 'research indicates', 'offer from'])
  ) {
    return { emotion: 'skeptical', intensity: 0.7, duration: 1500 };
  }

  // User lowballs significantly
  if (context.lastOffer && context.targetRange) {
    const [min] = context.targetRange;
    if (context.lastOffer < min * 0.7) {
      return { emotion: 'skeptical', intensity: 0.9, duration: 2000 };
    }
  }

  // --- Frustrated Triggers ---
  // User is aggressive, dismissive, or wastes time
  if (
    containsAny(lower, [
      'that is ridiculous',
      'that is crazy',
      'no way',
      'absurd',
      'waste of time',
      'come on',
      'seriously?',
      'i want to speak to your manager',
    ])
  ) {
    return { emotion: 'frustrated', intensity: 0.8, duration: 2000 };
  }

  // User rejects without counter (bad negotiation)
  if (
    containsAny(lower, ['no', 'not interested', 'too expensive']) &&
    !containsAny(lower, ['but', 'however', 'what about', 'i can do'])
  ) {
    return { emotion: 'frustrated', intensity: 0.5, duration: 1500 };
  }

  // --- Happy Triggers ---
  // User makes a reasonable offer, shows preparation, uses good tactics
  if (
    containsAny(lower, [
      'based on my research',
      'market data shows',
      'i have an offer from',
      'comparables',
      'industry standard',
    ])
  ) {
    return { emotion: 'happy', intensity: 0.6, duration: 2000 };
  }

  // User meets somewhere reasonable
  if (context.lastOffer && context.targetRange) {
    const [min, max] = context.targetRange;
    if (context.lastOffer >= min && context.lastOffer <= (max ?? Infinity)) {
      return { emotion: 'happy', intensity: 0.8, duration: 2500 };
    }
  }

  // User uses a good negotiation tactic
  if (
    containsAny(lower, [
      'i appreciate that',
      'let is find common ground',
      'what if we',
      'how about we',
      'can we meet in the middle',
      'i can do x if you can do y',
    ])
  ) {
    return { emotion: 'happy', intensity: 0.5, duration: 1800 };
  }

  // --- Default: Neutral attentive listening ---
  return { emotion: 'neutral', intensity: 0.3, duration: 1000 };
}

function containsAny(text: string, patterns: string[]): boolean {
  return patterns.some((p) => text.includes(p));
}

/**
 * Parse a numeric offer from user text.
 * Returns the first number found, or null.
 */
export function extractOffer(text: string): number | null {
  const matches = text.match(/\$?(\d{2,6})(?:\s*k|\s*,000)?/i);
  if (!matches) return null;

  let value = parseInt(matches[1]);
  // Normalize: "80k" → 80000, "$3.5M" → 3500000
  if (text.toLowerCase().includes('k') && value < 1000) value *= 1000;
  if (text.toLowerCase().includes('m')) value *= 1000000;
  if (text.toLowerCase().includes('lakh')) value *= 100000;
  if (text.toLowerCase().includes('crore')) value *= 10000000;

  return value;
}
