/**
 * 🎯 Negoti8 MVP — Final Deliverable
 *
 * What ships on Day 1. No more. No less.
 *
 * Everything else is Phase 2.
 */

export const MVP_DELIVERABLE = {
  name: 'Negoti8 MVP v0.1',
  tagline: 'Practice negotiations against an AI that REACTS to you.',

  features: [
    {
      id: 1,
      title: 'Voice Loop',
      description: 'Push-to-talk. User speaks, Groq transcribes, Llama responds, ElevenLabs speaks back. <2s round-trip.',
      status: '✅ BUILDING',
    },
    {
      id: 2,
      title: '3D Avatar with Lip-Sync',
      description: 'Ready Player Me avatar in React Three Fiber. OVR Lip Sync matches mouth to every word.',
      status: '🔧 READY TO BUILD',
    },
    {
      id: 3,
      title: '3 Emotional Reactions',
      description: 'Skeptical (raised eyebrow). Frustrated (frown, crossed arms). Happy (smile, nod). Driven by AI sentiment.',
      status: '✅ BUILT',
    },
    {
      id: 4,
      title: '3 Scenarios',
      description: 'Salary negotiation (medium). Startup valuation (hard). Car buying (easy). Full system prompts.',
      status: '🔧 NEEDS PROMPTS',
    },
    {
      id: 5,
      title: 'Post-Negotiation Coaching',
      description: 'Score (0-10). Missed opportunities. Specific phrases. Filler word count.',
      status: '🔧 NEEDS COACHING PROMPT',
    },
    {
      id: 6,
      title: 'Deploy to Vercel + Railway',
      description: 'Live URL. Shareable. Beta testers can use it.',
      status: '⏳ AFTER BUILD',
    },
  ],

  // What the user sees and experiences
  userExperience: `
    ┌─────────────────────────────────────────────────────────────┐
    │                    NEGOTI8 MVP                              │
    ├─────────────────────────────────────────────────────────────┤
    │                                                             │
    │  1. Open negoti8.app → Pick a scenario                     │
    │     → "Salary Negotiation" / "Startup Valuation" / "Car"   │
    │                                                             │
    │  2. 3D avatar appears on screen                            │
    │     → Suit for salary, hoodie for VC, casual for car       │
    │     → Avatar looks at you, breathing, blinking             │
    │                                                             │
    │  3. AI speaks first (voice + lip-sync)                     │
    │     → "Thanks for coming in! We're offering $75K."         │
    │                                                             │
    │  4. Hold spacebar → speak → release                        │
    │     → "I was thinking more like $82K."                     │
    │                                                             │
    │  5. AVATAR REACTS (300ms)                                  │
    │     → 😏 Raised eyebrow, head tilt                         │
    │     → "Skeptical" expression for 1.5 seconds               │
    │                                                             │
    │  6. AI responds with voice + lip-sync                      │
    │     → "Hmm, $82K is above our band..."                     │
    │                                                             │
    │  7. Repeat steps 4-6 until user clicks "End Negotiation"   │
    │                                                             │
    │  8. Coaching report appears                                │
    │     → Score: 7/10 • Missed: anchoring with data            │
    │     → "You should have said: 'Based on market data...'"    │
    │     → Filler words: 3 "um"s                                │
    │                                                             │
    │  9. Retry or try next scenario                             │
    │                                                             │
    └─────────────────────────────────────────────────────────────┘
  `,

  // What does NOT ship in MVP
  notInMVP: [
    'Progress tracking dashboard',
    'Badge system',
    'Custom scenarios (paste job offer)',
    'Multiplayer mode',
    'Mobile app (React Native)',
    'Voice analytics (tone, pace)',
    'More than 3 emotions',
    'Custom avatar creation',
    'PDF export',
    'Enterprise pricing',
    '7+ remaining scenarios',
    'User onboarding flow',
    'Email notifications',
  ],
};

export const FILE_INVENTORY = [
  'src/lib/groq.ts                 — Groq Whisper + Llama 3.3 client',
  'src/lib/emotion-engine.ts        — Sentiment analysis & offer extraction',
  'src/lib/avatar-reactions.ts      — 8 avatar reaction definitions',
  'src/lib/reaction-map.ts          — 15 user action → reaction mappings',
  'src/lib/interaction-loop.ts      — Core interaction timing & flow',
  'src/lib/killer-features.ts       — What makes it different',
  'src/lib/why-this-matters.ts      — The emotional intelligence thesis',
  'src/lib/final-deliverable.ts     — This file',
  'src/types/emotion.ts             — TypeScript types',
  'src/app/api/negotiate/route.ts   — The core API endpoint',
  'src/app/layout.tsx               — Root layout',
  'src/app/page.tsx                 — NOT YET BUILT',
  'src/components/RecordButton.tsx  — NOT YET BUILT',
  'src/components/AvatarCanvas.tsx  — NOT YET BUILT',
  'src/components/CoachingReport.tsx — NOT YET BUILT',
];
