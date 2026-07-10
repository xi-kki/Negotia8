/**
 * Shared types for Negoti8
 * 
 * Single source of truth for interfaces used across components.
 * Import from '@/types' instead of redefining locally.
 */

// Re-export emotion types
export type { Emotion, EmotionEvent, NegotiationTurn } from './emotion';

// ─── UI Types ─────────────────────────────────────────────────────────

export type ViewMode = 'select' | 'negotiate' | 'coaching';

export interface Turn {
  userText: string;
  aiText: string;
  emotion: import('./emotion').Emotion;
}

export interface CoachingBreakdown {
  outcome: number;     // 0-3
  tactics: number;     // 0-3
  delivery: number;    // 0-2
  adaptability: number; // 0-2
}

export interface CoachingReportData {
  overallScore: number;
  breakdown: CoachingBreakdown;
  whatYouDidWell: string[];
  missedOpportunities: string[];
  phrasesYouCouldHaveSaid: string[];
  tacticsYouUsed: string[];
  totalFillerWords: number;
  advice: string;
}
