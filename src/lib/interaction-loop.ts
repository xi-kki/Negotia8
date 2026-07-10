/**
 * 🔄 Negoti8 — The Core Interaction Loop
 *
 * User speaks → Avatar reacts (expression + body language) → AI responds with voice
 * → Lip-sync matches every word → User hears + sees → User responds → REPEAT
 *
 * This is the loop that makes it feel like a real face-to-face negotiation.
 */

export interface InteractionTurn {
  user: {
    text: string;
    tactic: string;       // what the user did (weak anchor, data counter, etc.)
    offer?: number;
    fillerWords: number;
  };
  avatar: {
    expression: string;   // what they see
    bodyLanguage: string; // posture
    voiceTone: string;    // how the AI delivers the line
    text: string;         // what they hear
  };
  coaching: {
    score: number;        // -5 to +5 for this turn
    note: string;         // immediate feedback
  };
}

/**
 * The Interaction Flow:
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │                       USER SPEAKS                          │
 * │  "I think $75K is fair." (weak anchor)                     │
 * └──────────────────────┬──────────────────────────────────────┘
 *                        │
 *                        ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                 AVATAR REACTS (300ms)                       │
 * │  😏 Raised eyebrow + half-smirk + tilts head               │
 * │  "Skeptical" expression for 1.5 seconds                     │
 * │  → This happens BEFORE the AI speaks                       │
 * └──────────────────────┬──────────────────────────────────────┘
 *                        │
 *                        ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │                 AI RESPONDS (500ms)                         │
 * │  "I see. Well, $75K is what we budgeted for this role."    │
 * │  (friendly tone, but firm — you accepted too easily)       │
 * └──────────────────────┬──────────────────────────────────────┘
 *                        │
 *                        ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │             AVATAR LIP-SYNCS + ANIMATES                     │
 * │  Mouth moves in perfect sync with every syllable           │
 * │  Subtle hand gesture on "well"                             │
 * │  Slight head tilt on "budgeted"                            │
 * └──────────────────────┬──────────────────────────────────────┘
 *                        │
 *                        ▼
 * ┌─────────────────────────────────────────────────────────────┐
 * │              USER HEARS + SEES → RESPONDS                   │
 * │  "Oh, um, I mean... can we do $78K?" (hesitation)          │
 * └──────────────────────┬──────────────────────────────────────┘
 *                        │
 *                        ▼
 *                   REPEAT FROM TOP 🔄
 */

export const INTERACTION_TIMING = {
  // Real-time targets for natural conversation
  avatarReactionDelay: 300,    // ms — avatar reacts BEFORE speaking
  aiResponseLatency: 800,      // ms — total STT → AI → TTS
  lipSyncLatency: 50,          // ms — imperceptible
  expressionHoldMin: 1000,     // ms — minimum expression display
  expressionHoldMax: 3000,     // ms — max before blending back
  idleBreathInterval: 4000,    // ms — breathing loop
  blinkInterval: 3500,         // ms — average between blinks
};
