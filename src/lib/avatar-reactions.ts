/**
 * 👤 Negoti8 — Avatar Reaction Catalog
 *
 * Every user action triggers a specific avatar reaction.
 * The avatar NEVER speaks without reacting first.
 * This is the emotional intelligence layer.
 */

export const AVATAR_REACTIONS = {
  // ─── YOU MAKE A WEAK ARGUMENT ──────────────────────
  weakArgument: {
    expression: 'skeptical',
    face: '😏 One eyebrow raised, slight smirk',
    body: 'Tilts head, leans back slightly',
    eyes: 'Narrows slightly, holds eye contact',
    duration: 2000,
    transition: 'slow',
    coaching: 'That argument needs data. Bring research next time.',
  },

  // ─── YOU LOWBALL ───────────────────────────────────
  lowball: {
    expression: 'frustrated',
    face: '😤 Frowns, tight jaw, slight head shake',
    body: 'Crosses arms, leans away',
    eyes: 'Looks down, then back with disappointment',
    duration: 2500,
    transition: 'quick',
    coaching: 'Extreme lowballs kill credibility. Stay within 10-15% of fair range.',
  },

  // ─── YOU USE DATA ──────────────────────────────────
  usesData: {
    expression: 'happy',
    face: '😊 Warm smile, eyebrows raise slightly',
    body: 'Leans forward, open posture, nods',
    eyes: 'Widens slightly — impressed',
    duration: 2500,
    transition: 'smooth',
    coaching: 'Data-backed arguments are powerful. You earned their respect.',
  },

  // ─── YOU GO SILENT ─────────────────────────────────
  strategicSilence: {
    expression: 'neutral',
    face: '😐 Micro-expressions of discomfort — slight lip purse, quick swallow',
    body: 'Shifts weight, fidgets with pen, breaks then re-establishes posture',
    eyes: 'Blinks faster, glances away briefly — silence is working',
    duration: 3000,
    transition: 'slow',
    coaching: 'Silence is a SUPERWEAPON. You made them uncomfortable enough to fill the gap — they will offer more.',
  },

  // ─── YOU GET AGGRESSIVE ────────────────────────────
  aggressive: {
    expression: 'frustrated',
    face: '😠 Flat mouth, tightened jaw',
    body: 'Crosses arms, rigid posture',
    eyes: 'Cold stare, less blinking',
    duration: 2000,
    transition: 'quick',
    coaching: 'Aggression without leverage backfires. Stay professional.',
  },

  // ─── YOU PRESENT STRONG BATNA ──────────────────────
  strongBATNA: {
    expression: 'happy',
    face: '😊 Surprised respect — eyebrows raise, genuine smile',
    body: 'Leans forward — you have their attention now',
    eyes: 'Widens slightly, holds contact longer',
    duration: 2500,
    transition: 'smooth',
    coaching: 'BATNA is your strongest leverage. You shifted from supplicant to equal.',
  },

  // ─── YOU USE A GOOD TACTIC ─────────────────────────
  goodTactic: {
    expression: 'happy',
    face: '😊 Genuine smile, slight nod',
    body: 'Relaxes, open shoulders',
    eyes: 'Warm, engaged',
    duration: 2000,
    transition: 'smooth',
    coaching: 'Nice! That tactic shifted the power dynamic in your favor.',
  },

  // ─── YOU REACH A WIN-WIN ──────────────────────────
  winWin: {
    expression: 'happy',
    face: '😊 Genuine, warm smile — full eye crinkle',
    body: 'Opens posture, extends hand (virtual), relaxed shoulders',
    eyes: 'Warm, connected, appreciative',
    duration: 3500,
    transition: 'slow',
    coaching: 'Win-win is the goal of every negotiation. You found value for both sides — that is MASTER level.',
  },

  // ─── DEAL IS CLOSING ───────────────────────────────
  dealClosing: {
    expression: 'happy',
    face: '😌 Warm, satisfied smile',
    body: 'Relaxes fully, slight lean back',
    eyes: 'Soft, satisfied',
    duration: 3000,
    transition: 'slow',
    coaching: 'You\'re closing the deal. This is when the real terms get locked.',
  },

  // ─── DEFAULT: LISTENING ────────────────────────────
  listening: {
    expression: 'neutral',
    face: '😐 Attentive, calm',
    body: 'Still, professional posture',
    eyes: 'Focused, regular blinking',
    duration: 0,  // held until next trigger
    transition: 'none',
    coaching: '',
  },
} as const;

export type AvatarReactionType = keyof typeof AVATAR_REACTIONS;

/**
 * Get the avatar reaction for a given user input
 */
export function classifyUserInput(text: string): AvatarReactionType {
  const lower = text.toLowerCase();

  // Weak argument patterns
  if (/i think|i feel|maybe|perhaps|i guess|sort of|kind of/.test(lower) &&
      !/(based on|research|data|offer from|market)/.test(lower)) {
    return 'weakArgument';
  }

  // Strong BATNA patterns
  if (/(another offer|competing offer|other offer|i have.*offer|recruiter reached out|interview(ing|ed) with)/.test(lower)) {
    return 'strongBATNA';
  }

  // Lowball patterns (very low numbers)
  const numbers = text.match(/\d+/g);
  if (numbers) {
    const val = parseInt(numbers[0]);
    if (numbers[0].length <= 3 && val < 60) return 'lowball'; // 50K in salary context
  }

  // Data-backed patterns
  if (/(based on|research|data|market|industry|comparable|offer from)/.test(lower)) {
    return 'usesData';
  }

  // Aggressive patterns
  if (/(ridiculous|crazy|absurd|no way|unacceptable|that('s| is) (not|too))/.test(lower)) {
    return 'aggressive';
  }

  // Win-win patterns
  if (/(win.?win|both (benefit|happy|get)|mutual|partnership|long.?term|grow together)/.test(lower)) {
    return 'winWin';
  }

  // Tactic patterns
  if (/(if you|then i|trade|meet in the middle|common ground|understand your)/.test(lower)) {
    return 'goodTactic';
  }

  // Strategic silence — very short or no substantive response
  // User lets the AI's offer hang in the air without filling the gap
  if (text.trim().length === 0 || /^(ok|sure|alright|hmm|i see|right)$/i.test(text.trim())) {
    return 'strategicSilence';
  }

  return 'listening';
}
