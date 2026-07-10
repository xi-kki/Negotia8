/**
 * 🎭 Negoti8 — Emotional Reaction Map
 *
 * The core differentiator: the avatar REACTS to the user's negotiation tactics.
 * Every user action has a corresponding avatar reaction.
 * This is what makes it feel like a real negotiation.
 */

export interface UserAction {
  type: string;
  example: string;
  avatarReaction: string;
  emotion: 'skeptical' | 'frustrated' | 'happy' | 'neutral';
  coachingNote: string;
}

export const REACTION_MAP: UserAction[] = [
  // ─── WEAK MOVES → AVATAR GETS SKEPTICAL ───
  {
    type: 'Weak anchor',
    example: '"I think $75K is fair."',
    avatarReaction: '😏 Raised eyebrow, half-smirk',
    emotion: 'skeptical',
    coachingNote: 'You accepted their first number! Always counter higher — they expect it.',
  },
  {
    type: 'Hesitation',
    example: '"Um, well, I mean... maybe we can talk about the number?"',
    avatarReaction: '😏 Tilts head, narrows eyes',
    emotion: 'skeptical',
    coachingNote: 'Hesitation signals weakness. Use silence instead of filler words.',
  },
  {
    type: 'Vague reasoning',
    example: '"I just think I deserve more."',
    avatarReaction: '😏 One eyebrow up, unimpressed',
    emotion: 'skeptical',
    coachingNote: 'Always back your ask with data: market research, competing offers, or metrics.',
  },
  {
    type: 'Asking for "fair"',
    example: '"I just want a fair price."',
    avatarReaction: '😏 Smirks, leans back',
    emotion: 'skeptical',
    coachingNote: '"Fair" is subjective. Define what fair means with evidence.',
  },

  // ─── AGGRESSIVE MOVES → AVATAR GETS FRUSTRATED ───
  {
    type: 'Lowball offer',
    example: '"I can do $50K." (when range is $75-85K)',
    avatarReaction: '😤 Frowns, crosses arms, shakes head',
    emotion: 'frustrated',
    coachingNote: 'Extreme lowballs damage rapport. Anchor within 10-15% of reasonable range.',
  },
  {
    type: 'Aggressive dismissal',
    example: '"That\'s ridiculous. No way."',
    avatarReaction: '😤 Tight jaw, narrows eyes',
    emotion: 'frustrated',
    coachingNote: 'Dismissiveness without counter-offer kills negotiation. Always propose an alternative.',
  },
  {
    type: 'Ultimatum',
    example: '"Take it or leave it."',
    avatarReaction: '😤 Leans back, raises both hands',
    emotion: 'frustrated',
    coachingNote: 'Ultimatums early in negotiation signal inexperience. Save them for final offers.',
  },
  {
    type: 'Threatening',
    example: '"I\'ll just go to your competitor."',
    avatarReaction: '😤 Flat expression, cold stare',
    emotion: 'frustrated',
    coachingNote: 'Mentioning competition works ONCE, as leverage. Overuse makes you look difficult.',
  },

  // ─── SMART MOVES → AVATAR GETS HAPPY / RESPECTFUL ───
  {
    type: 'Data-backed counter',
    example: '"Based on market data, the range for this role is $80-95K."',
    avatarReaction: '😊 Smiles, leans forward, nods',
    emotion: 'happy',
    coachingNote: 'Perfect! Data-backed anchors are 3x more effective than opinion-based ones.',
  },
  {
    type: 'Competing offer leverage',
    example: '"I have another offer at $90K. Can you match?"',
    avatarReaction: '😊 Impressed nod, slight surprise',
    emotion: 'happy',
    coachingNote: 'Leverage done right. You didn\'t threaten — you informed. This is power.',
  },
  {
    type: 'Creative trade-off',
    example: '"What if we meet at $80K with an extra week of vacation?"',
    avatarReaction: '😊 Warm smile, open posture',
    emotion: 'happy',
    coachingNote: 'Excellent! Trading on multiple dimensions (salary + benefits) is advanced negotiation.',
  },
  {
    type: 'Finding common ground',
    example: '"I understand your budget constraints. Let\'s find a number that works for both of us."',
    avatarReaction: '😊 Genuine smile, relaxed shoulders',
    emotion: 'happy',
    coachingNote: 'Empathy + problem-solving = master negotiator. You built rapport AND moved toward a deal.',
  },
  {
    type: 'Strategic silence',
    example: '(says nothing after hearing the offer, waits 5 seconds)',
    avatarReaction: '😊 Slight nod of respect, fills the silence with a better offer',
    emotion: 'happy',
    coachingNote: 'Silence is a superpower. You let them feel the discomfort of their own offer. Brilliant.',
  },
];

/**
 * Get the avatar reaction for a specific user action type
 */
export function getReaction(actionType: string): UserAction | undefined {
  return REACTION_MAP.find(r => r.type === actionType);
}

/**
 * Analyze user text against known patterns and return the matching reaction
 */
export function matchReaction(userText: string): UserAction | null {
  const lower = userText.toLowerCase();

  // Weak anchors
  if (/i think\s+\$?\d/.test(lower) || /maybe\s+\$?\d/.test(lower)) {
    return getReaction('Weak anchor') || null;
  }

  // Hesitation
  if (/(^|\s)(um|uh|like|well|i mean|sort of|kind of)(\s|$)/.test(lower)) {
    return getReaction('Hesitation') || null;
  }

  // Vague reasoning
  if (/i (just )?(think|deserve|want) (more|better|fair)/.test(lower)) {
    return getReaction('Vague reasoning') || null;
  }

  // Lowball
  if (/that('s| is) (ridiculous|crazy|absurd|too (much|high|low))/.test(lower)) {
    return getReaction('Aggressive dismissal') || null;
  }

  // Data-backed
  if (/(based on|according to|research|market data|industry standard|comparables)/.test(lower)) {
    return getReaction('Data-backed counter') || null;
  }

  // Competing offer
  if (/(another|competing|other) offer/.test(lower)) {
    return getReaction('Competing offer leverage') || null;
  }

  // Creative trade-off
  if (/what if|how about|trade(-| )off|meet (in the middle|halfway)/.test(lower)) {
    return getReaction('Creative trade-off') || null;
  }

  // Common ground
  if (/(understand|appreciate) (your|the) (position|constraint|perspective)/.test(lower)) {
    return getReaction('Finding common ground') || null;
  }

  return null;
}
