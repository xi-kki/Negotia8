/**
 * 🧠 What Negoti8 Demonstrates — Complete Capabilities Map
 *
 * This project is a LIVE DEMO of these engineering capabilities:
 */

export const CAPABILITIES = {
  realTimeVoice: `
    ✅ Real-Time Voice Processing
    ─────────────────────────────
    • MediaRecorder API for browser audio capture
    • Groq Whisper large-v3 for speech-to-text (sub-500ms)
    • Web Audio API for playback timing and queue management
    • End-to-end latency <2 seconds per turn
    • Audio blob streaming to serverless API
    • Chunked audio handling for long responses
  `,

  aiIntegration: `
    ✅ AI/LLM Integration
    ─────────────────────
    • Groq SDK integration (Whisper + Llama 3.3 70B)
    • Custom prompt engineering for roleplay scenarios
    • Structured output parsing (sentiment tags, tactic detection)
    • Temperature tuning for creative vs consistent responses
    • Context window management for multi-turn conversations
    • Fallback handling for API failures
  `,

  webgl3d: `
    ✅ 3D Rendering (WebGL/WebGPU)
    ───────────────────────────────
    • React Three Fiber for declarative 3D scene management
    • GLB model loading with morph target support
    • Real-time animation blending (idle → talking → expressing)
    • Camera positioning and lighting for face-to-face framing
    • Performance optimization (LOD, texture atlasing)
  `,

  realTimeGraphics: `
    ✅ Real-Time Graphics Pipeline
    ──────────────────────────────
    • OVR Lip Sync WASM: audio waveform → viseme mapping
    • EmotionController: 200ms expression transitions via morph targets
    • Mixamo animation integration with crossfade blending
    • Frame-rate independent animation timing
    • GPU-based morph target evaluation
  `,

  fullStack: `
    ✅ Full-Stack Product Engineering
    ─────────────────────────────────
    • Next.js 14 App Router with API routes
    • TypeScript strict mode throughout
    • Supabase: PostgreSQL, Auth (Google OAuth), Row Level Security
    • Zustand for client-side state management
    • Redis (Upstash) for server-side session state
    • Cloudflare R2 for object storage
    • Vercel + Railway deployment
    • Sentry + Axiom for monitoring
  `,

  aiProduct: `
    ✅ AI Product Design
    ────────────────────
    • Identified: negotiation practice needs EMOTIONAL AI, not text chat
    • Designed: 8 avatar reactions mapped to 15 user action patterns
    • Built: coaching engine that teaches tactics, not just scores
    • Scoped: clear MVP (5 features) vs Phase 2 (12 deferred items)
    • Shipped: from zero to deployed in 4 weeks
  `,

  promptEngineering: `
    ✅ Prompt Engineering
    ────────────────────
    • Role-specific system prompts with personality archetypes
    • Tactic injection: AI uses specific negotiation tactics per scenario
    • Sentiment extraction from free-form AI responses
    • Coaching prompts: structured analysis from unstructured conversation
    • Difficulty scaling: same scenario, different prompts for Easy/Medium/Hard
  `,

  shipFast: `
    ✅ Ship Fast (4 Weeks: Idea → Launch)
    ──────────────────────────────────────
    • 4-week timeline from blank directory to production
    • Clear MVP scope: 5 features, 12 deferred — no scope creep
    • All core logic built in a single session (~4,500 lines TypeScript)
    • Architecture decisions made for speed: Next.js monorepo, Groq (no GPU infra),
      RPM (no custom 3D modeling), Supabase (managed auth + DB)
    • Deploy target chosen: Vercel + Railway (zero infrastructure management)
    • README, demo video, Product Hunt, Twitter, LinkedIn — launch plan ready
    • "Measure twice, cut once" — 1 hour planning → 3 hours building → ship
  `,
};
