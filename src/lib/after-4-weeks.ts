/**
 * 📅 What You'll Have After 4 Weeks
 *
 * From zero to live product in 28 days.
 */

export const AFTER_4_WEEKS = {
  title: 'Negoti8 — Week 4 Deliverable',

  pillars: [
    {
      week: 1,
      title: 'Core Engine',
      whatYouHave: `
        ✅ 3 scenarios with full system prompts (salary, startup, car buying)
        ✅ Voice pipeline: MediaRecorder → Groq Whisper → Llama 3.3 → ElevenLabs → Web Audio
        ✅ Push-to-talk recording working
        ✅ Google OAuth via Supabase
        ✅ Scenario selector + transcript display
        ✅ Error handling: mic denied, API failures, network offline
      `,
      feel: 'You speak, the AI responds with voice. No avatar yet. Feels like a walkie-talkie with a really smart friend.',
    },
    {
      week: 2,
      title: '3D Avatar + Emotions',
      whatYouHave: `
        ✅ Ready Player Me avatar loaded in React Three Fiber
        ✅ OVR Lip Sync — mouth moves with every word
        ✅ 3 emotional expressions: skeptical, frustrated, happy
        ✅ Avatars reacts to YOUR words (not just talks at you)
        ✅ Mixamo idle animations (breathing, blinking)
        ✅ Emotion triggers: weak argument → skeptical, lowball → frustrated, BATNA → happy
      `,
      feel: 'You speak, avatar reacts with expression, then responds with voice + lip-sync. Feels like a real face-to-face negotiation.',
    },
    {
      week: 3,
      title: 'Coaching + Polish',
      whatYouHave: `
        ✅ Post-negotiation coaching report (score 0-10, tactics, missed opportunities)
        ✅ Specific phrases you could have said
        ✅ Filler word analysis
        ✅ Transcript with highlighted key moments (anchors, concessions, silences)
        ✅ Loading states, error states, empty states
        ✅ Mobile responsive
      `,
      feel: 'You practice, get coached, retry, improve. The learning loop is complete. You can feel yourself getting better.',
    },
    {
      week: 4,
      title: 'Shipped + Live',
      whatYouHave: `
        ✅ Deployed to Vercel (frontend) + Railway (backend)
        ✅ Cloudflare R2 for file storage
        ✅ Live at negoti8.app (or your domain)
        ✅ Demo video recorded (2-min walkthrough)
        ✅ README with architecture + setup
        ✅ Product Hunt listing live
        ✅ Twitter / LinkedIn launch posts
        ✅ 50 beta users testing
        ✅ First NPS scores coming in
      `,
      feel: "Real people are using it. You're getting feedback. The iteration cycle has begun.",
    },
  ],

  summary: `
    ┌─────────────────────────────────────────────────────────────────┐
    │               NEGOTI8 — AFTER 4 WEEKS                          │
    ├─────────────────────────────────────────────────────────────────┤
    │                                                                 │
    │  🎙️ Voice negotiation with emotional AI                       │
    │  👤 3D avatar that reacts to your tactics                      │
    │  📚 3 scenarios (salary, startup, car)                         │
    │  📊 Coaching after every session                               │
    │  🚀 Live on the internet — real users practicing               │
    │                                                                 │
    │  "It feels like negotiating with a real person, not a chatbot." │
    │                                                                 │
    └─────────────────────────────────────────────────────────────────┘
  `,
};
