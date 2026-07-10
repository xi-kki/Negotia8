/**
 * 📊 Negoti8 — Coaching Engine
 *
 * After every negotiation session, generates a detailed coaching report.
 * Analyzes every turn: what you did well, what you missed,
 * specific phrases you could have said, and a score breakdown.
 */

import type { Emotion } from '@/types/emotion';

export interface CoachingTurn {
  turnNumber: number;
  userText: string;
  aiText: string;
  emotion: Emotion;
  score: number;       // -5 to +5 for this turn
  note: string;        // what happened this turn
  fillerWords: string[];
  tacticUsed: string | null;
  missedTactic: string | null;
  betterPhrase: string | null;
}

export interface CoachingReport {
  overallScore: number;       // 0-10
  breakdown: {
    outcome: number;          // 0-3
    tactics: number;          // 0-3
    delivery: number;         // 0-2
    adaptability: number;     // 0-2
  };
  whatYouDidWell: string[];
  missedOpportunities: string[];
  phrasesYouCouldHaveSaid: string[];
  tacticsYouUsed: string[];
  tacticsAiUsed: string[];
  fillerWordAnalysis: {
    word: string;
    count: number;
    timestamps: number[];
  }[];
  totalFillerWords: number;
  keyMoments: {
    timestamp: number;
    type: 'anchor' | 'counteroffer' | 'concession' | 'silence' | 'good-tactic' | 'missed-opportunity';
    description: string;
    userText: string;
  }[];
  advice: string;
}

const FILLER_WORDS = ['um', 'uh', 'like', 'you know', 'sort of', 'kind of', 'i mean', 'actually', 'basically', 'literally'];

export function generateCoachingReport(turns: CoachingTurn[]): CoachingReport {
  let totalScore = 0;
  const whatYouDidWell: string[] = [];
  const missedOpportunities: string[] = [];
  const phrasesYouCouldHaveSaid: string[] = [];
  const tacticsYouUsed: string[] = [];
  const fillerAnalysis: { word: string; count: number; timestamps: number[] }[] = [];
  const keyMoments: CoachingReport['keyMoments'] = [];
  let totalFillerWords = 0;

  for (const turn of turns) {
    totalScore += turn.score;

    // Track what you did well
    if (turn.tacticUsed && turn.score > 0) {
      if (!tacticsYouUsed.includes(turn.tacticUsed)) {
        tacticsYouUsed.push(turn.tacticUsed);
      }
      whatYouDidWell.push(`${turn.tacticUsed} (turn ${turn.turnNumber}): ${turn.note}`);
    }

    // Track missed opportunities
    if (turn.missedTactic && turn.score <= 0) {
      missedOpportunities.push(`Turn ${turn.turnNumber}: ${turn.missedTactic}`);
    }

    // Track better phrases
    if (turn.betterPhrase) {
      phrasesYouCouldHaveSaid.push(`Turn ${turn.turnNumber}: ${turn.betterPhrase}`);
    }

    // Filler word analysis
    for (const word of turn.fillerWords) {
      totalFillerWords++;
      const existing = fillerAnalysis.find(f => f.word === word);
      if (existing) {
        existing.count++;
      } else {
        fillerAnalysis.push({ word, count: 1, timestamps: [turn.turnNumber] });
      }
    }

    // Key moments
    if (turn.score >= 4) {
      keyMoments.push({
        timestamp: turn.turnNumber,
        type: 'good-tactic',
        description: turn.note,
        userText: turn.userText,
      });
    } else if (turn.score <= -3) {
      keyMoments.push({
        timestamp: turn.turnNumber,
        type: 'missed-opportunity',
        description: turn.missedTactic || turn.note,
        userText: turn.userText,
      });
    }
  }

  // Calculate breakdown scores
  const avgTurnScore = turns.length > 0 ? totalScore / turns.length : 0;
  const outcome = Math.min(3, Math.max(0, Math.round((avgTurnScore + 5) / 10 * 3)));
  const tactics = Math.min(3, Math.max(0, Math.round(tacticsYouUsed.length / 2)));
  const delivery = Math.min(2, Math.max(0, totalFillerWords <= 3 ? 2 : totalFillerWords <= 8 ? 1 : 0));
  const adaptability = Math.min(2, Math.max(0, Math.round((turns.length >= 5 ? 1 : 0) + (missedOpportunities.length <= 2 ? 1 : 0))));

  const overallScore = Math.min(10, Math.round((outcome + tactics + delivery + adaptability) / 8 * 10));

  // Generate advice
  let advice = '';
  if (overallScore >= 8) {
    advice = 'Excellent negotiation! You used multiple tactics effectively, managed your delivery, and adapted to the AI\'s moves. Focus on polishing your remaining weak spots.';
  } else if (overallScore >= 6) {
    advice = 'Solid performance. You have the basics down but need to work on specific areas. Focus on using data-backed anchors and handling silence better.';
  } else if (overallScore >= 4) {
    advice = 'You have potential but need practice. Focus on the fundamentals: always counter the first offer, use data to back your arguments, and don\'t accept immediately.';
  } else {
    advice = 'This is a starting point. Everyone begins somewhere. Focus on one thing: don\'t accept the first offer. Always counter with a specific, justified number.';
  }

  return {
    overallScore,
    breakdown: { outcome, tactics, delivery, adaptability },
    whatYouDidWell,
    missedOpportunities,
    phrasesYouCouldHaveSaid,
    tacticsYouUsed,
    tacticsAiUsed: ['anchoring', 'silence', 'limited-authority'], // Would be populated from AI response
    fillerWordAnalysis: fillerAnalysis,
    totalFillerWords,
    keyMoments,
    advice,
  };
}

/**
 * Analyze a single turn for tactics, filler words, and scoring
 */
export function analyzeTurn(
  userText: string,
  aiText: string,
  emotion: Emotion,
  turnNumber: number
): CoachingTurn {
  const lower = userText.toLowerCase();
  const fillerWords = FILLER_WORDS.filter(fw => {
    const regex = new RegExp(`\\b${fw}\\b`, 'gi');
    return regex.test(lower);
  });

  // Detect tactics used
  let tacticUsed: string | null = null;
  let missedTactic: string | null = null;
  let betterPhrase: string | null = null;
  let score = 0;

  // Good tactics
  if (/(based on|research|market data|industry standard|comparable)/.test(lower)) {
    tacticUsed = 'Data-backed anchoring';
    score = 4;
  } else if (/(another offer|competing|other offer|i have.*offer)/.test(lower)) {
    tacticUsed = 'BATNA leverage';
    score = 5;
  } else if (/(what if|how about|trade|meet (in the middle|halfway))/i.test(lower)) {
    tacticUsed = 'Creative trade-off';
    score = 4;
  } else if (/(understand|appreciate) (your|the) (position|constraint|perspective)/i.test(lower)) {
    tacticUsed = 'Empathy + problem-solving';
    score = 3;
  }

  // Weak moves
  if (/i think|i feel|maybe|perhaps|i guess/.test(lower) && !/(research|data|offer)/.test(lower)) {
    missedTactic = 'Vague language without data. Use specific numbers and evidence.';
    betterPhrase = '"Based on my research, the market range for this role is $X-$Y."';
    score = -3;
  } else if (/^(ok|sure|alright|fine|deal|done)$/i.test(userText.trim())) {
    missedTactic = 'You accepted too quickly. Always counter first.';
    betterPhrase = '"I appreciate the offer. Let me counter at $X based on..."';
    score = -4;
  } else if (/(ridiculous|crazy|absurd|no way|that('s| is) (not|too))/.test(lower)) {
    missedTactic = 'Dismissive without counter-offer.';
    betterPhrase = '"I see this differently. Here\'s my perspective based on..."';
    score = -3;
  }

  // Filler word penalty
  const fillerPenalty = Math.min(0, -Math.floor(fillerWords.length / 2));

  return {
    turnNumber,
    userText,
    aiText,
    emotion,
    score: score + fillerPenalty,
    note: tacticUsed ? `Great ${tacticUsed}` : missedTactic ? `Missed: ${missedTactic}` : 'Neutral turn',
    fillerWords,
    tacticUsed,
    missedTactic,
    betterPhrase,
  };
}
