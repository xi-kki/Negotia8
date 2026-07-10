# 🎙️ Negoti8 — AI Negotiation Practice That REACTS To You

> **Practice negotiations against an AI with emotional intelligence.**
> Not a chatbot. A living, breathing counterpart who raises an eyebrow when you lowball, frowns when you get aggressive, and smiles when you use data.

[![Stack](https://img.shields.io/badge/stack-Next.js_14_%7C_R3F_%7C_Groq_%7C_Supabase-blue)](https://negoti8.app)
[![Status](https://img.shields.io/badge/status-MVP_building-green)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

---

## 🎯 The Problem

**Most "AI negotiation" tools are just chatbots with a prompt.** You type, they type. No stakes. No pressure. No reality.

**Real negotiation is 80% non-verbal.** The raised eyebrow when you lowball. The crossed arms when you get aggressive. The silence that says *"I'm waiting for a better offer."*

If you can't **see** the other person's reaction, you're practicing blindfolded.

## 💡 The Solution

Negoti8 is a **voice-first AI negotiation simulator** with a **3D avatar that reacts emotionally** to your tactics in real time.

| Other tools | Negoti8 |
|-------------|---------|
| Text-based chat | 🎙️ **Voice conversations** (push-to-talk) |
| No visual feedback | 👤 **3D avatar** with lip-sync + expressions |
| No emotion detection | 🧠 **Emotional intelligence** — reacts to your tactics |
| Generic feedback | 📊 **Detailed coaching** after every session |
| Single scenario | 📚 **12 scenarios** across salary, fundraising, sales, consumer |

---

## 🚀 MVP Features

### 🎙️ Voice Loop
Push-to-talk → Groq Whisper (STT) → Llama 3.3 70B (AI) → ElevenLabs (TTS) → Web Audio playback. **<2s round-trip.**

### 👤 3D Reactive Avatar
Ready Player Me avatar in React Three Fiber. OVR Lip Sync matches mouth to every word. **3 emotional expressions:**

| You do this... | Avatar reacts... | Emotion |
|----------------|-----------------|---------|
| 💬 Weak argument ("I think $75K is fair") | 😏 Raised eyebrow, head tilt, lean back | Skeptical |
| 💰 Lowball offer ($50K on $75K range) | 😤 Frown, crossed arms, head shake | Frustrated |
| 📊 Use data + BATNA | 😊 Smile, lean forward, nod | Happy |
| 🤫 Strategic silence | 😐 Shifts weight, fidgets, breaks eye contact | Uncomfortable |
| 🏆 Win-win proposal | 😌 Warm smile, open posture, extends hand | Satisfied |

### 📚 12 Scenarios (4 categories)

| Category | Scenarios | Difficulty |
|----------|-----------|------------|
| 💼 Salary | Entry-level, Senior counter, Equity vs cash, Employer counteroffer | 🟢🟡🔴🔴 |
| 🚀 Fundraising | Co-founder split, Pre-seed SAFE, Series A term sheet | 🟢🟡🔴 |
| 🤝 Sales & Freelance | Rate negotiation, Scope creep, Vendor pricing | 🟢🟡🔴 |
| 🛒 Consumer | Car buying, Rent negotiation | 🟢🟡 |

### 📊 Coaching Report
After every session:
- **Overall score** (0-10) with breakdown (Outcome, Tactics, Delivery, Adaptability)
- **What you did well** — tactics detected with timestamps
- **Missed opportunities** — what you could have done better
- **Specific phrases you could have said** — exact scripts
- **Filler word analysis** — "um", "uh", "like" count
- **Key moments** — highlights of anchors, counteroffers, concessions

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        BROWSER (React)                               │
│                                                                      │
│  ┌──────────────┐  ┌──────────────────┐  ┌────────────────────────┐ │
│  │ RecordButton  │  │  AvatarCanvas    │  │  CoachingReport        │ │
│  │ (push-to-talk)│  │  (React Three    │  │  (score + feedback)    │ │
│  │              │  │   Fiber + RPM)   │  │                        │ │
│  └──────┬───────┘  └────────┬─────────┘  └────────────────────────┘ │
│         │                   │                                        │
│  ┌──────▼───────────────────▼────────────────────────────────────┐  │
│  │              EmotionController + LipSyncDriver                 │  │
│  │  Reads sentiment tags → drives avatar expressions + mouth     │  │
│  └────────────────────────────┬──────────────────────────────────┘  │
│                               │                                     │
│  ┌────────────────────────────▼──────────────────────────────────┐  │
│  │                  MediaRecorder + Web Audio API                 │  │
│  │  Captures audio blobs → plays TTS responses                  │  │
│  └────────────────────────────┬──────────────────────────────────┘  │
└───────────────────────────────┼─────────────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────────────┐
│                        NEXT.JS API LAYER                            │
│                                                                      │
│  ┌────────────────────┐  ┌────────────────┐  ┌───────────────────┐ │
│  │  /api/negotiate    │  │  /api/coach    │  │  Auth (Supabase)  │ │
│  │  Orchestrates the  │  │  Post-session  │  │  Google OAuth     │ │
│  │  full voice loop  │  │  analysis      │  │                   │ │
│  └────────┬───────────┘  └────────────────┘  └───────────────────┘ │
│           │                                                         │
│  ┌────────▼──────────────────────────────────────────────────────┐ │
│  │                    SERVICE LAYER                               │ │
│  │                                                                 │ │
│  │  ┌──────────────┐  ┌───────────────┐  ┌────────────────────┐  │ │
│  │  │ Groq Whisper  │  │  Llama 3.3    │  │  ElevenLabs /      │  │
│  │  │ large-v3      │  │  70B Versatile│  │  PlayHT TTS        │  │
│  │  │ (STT)         │  │  (AI + Coach) │  │  (Voice synthesis) │  │
│  │  └──────────────┘  └───────────────┘  └────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │                    DATA LAYER                                  │  │
│  │                                                                 │ │
│  │  ┌────────────┐  ┌──────────────┐  ┌───────────────────────┐  │ │
│  │  │ Supabase   │  │ Redis        │  │ Cloudflare R2         │  │ │
│  │  │ (PostgreSQL │  │ (Upstash)   │  │ (Avatar GLBs, audio)  │  │ │
│  │  │  + Auth)   │  │ (Session     │  │                       │  │ │
│  │  │            │  │  state)      │  │                       │  │ │
│  │  └────────────┘  └──────────────┘  └───────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

### Data Flow (Per Turn)

```
User speaks → MediaRecorder captures audio blob
  → POST /api/negotiate → Groq Whisper transcribes
  → Emotion Engine analyzes user text (what tactic, what emotion trigger)
  → Llama 3.3 generates AI response + sentiment tag
  → Returns: { transcript, aiText, emotion, sentiment }
  → Frontend plays TTS audio via Web Audio API
  → EmotionController drives avatar expression (200ms blend)
  → LipSyncDriver maps audio waveform → mouth shapes
  → User hears + sees → responds → REPEAT
```

---

## 🛠️ Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | Next.js 14 (App Router) | SSR + API routes in one project |
| **3D** | React Three Fiber + Three.js | Declarative 3D scene management |
| **Avatar** | Ready Player Me (GLB) | Pre-rigged with ARKit blendshapes |
| **Animations** | Mixamo | 2000+ free body animations |
| **Lip-sync** | OVR Lip Sync (WASM) | Audio waveform → viseme mapping |
| **STT** | Groq Whisper large-v3 | Fastest inference (LPU hardware) |
| **AI** | Groq Llama 3.3 70B | Sub-500ms, roleplay + coaching |
| **TTS** | ElevenLabs / PlayHT | Natural voices, viseme data |
| **Database** | Supabase (PostgreSQL) | Auth + DB + Row Level Security |
| **State** | Zustand (FE) + Redis (BE) | Real-time session state |
| **Storage** | Cloudflare R2 | Zero egress fees for media |
| **Hosting** | Vercel (FE) + Railway (BE) | Auto-deploy, low latency |

---

## 📁 Project Structure

```
negoti8/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Main page (avatar + record + transcript)
│   │   └── api/
│   │       └── negotiate/route.ts      # Core voice pipeline endpoint
│   ├── components/
│   │   ├── RecordButton.tsx            # Push-to-talk
│   │   ├── avatar/
│   │   │   ├── AvatarCanvas.tsx        # R3F canvas wrapper
│   │   │   ├── AvatarModel.tsx         # RPM GLB loader
│   │   │   ├── EmotionController.ts    # Expression blend engine
│   │   │   ├── LipSyncDriver.ts        # OVR Lip Sync integration
│   │   │   └── IdleAnimation.tsx       # Breathing + blinking
│   │   ├── CoachingReport.tsx          # Post-session results
│   │   └── ScenarioSelector.tsx        # Scenario list
│   ├── lib/
│   │   ├── groq.ts                     # Groq SDK client
│   │   ├── emotion-engine.ts           # Sentiment analysis
│   │   ├── avatar-reactions.ts         # 8 reaction definitions
│   │   ├── reaction-map.ts             # 15 user → avatar mappings
│   │   ├── interaction-loop.ts         # Core loop timing
│   │   ├── coaching-engine.ts          # Post-session coaching
│   │   ├── prompts/scenarios.ts        # 12 full scenarios
│   │   └── why-this-matters.ts         # Product philosophy
│   ├── types/
│   │   └── emotion.ts
│   └── index.css
├── public/
│   └── avatars/
│       └── default.glb                 # RPM avatar model
├── package.json
├── tsconfig.json
├── next.config.js
├── .env.example
└── README.md
```

---

## 🚦 Getting Started

```bash
# Clone
git clone https://github.com/YOUR_USER/negoti8.git
cd negoti8

# Install
npm install

# Set up environment
cp .env.example .env.local
# Add your API keys:
#   GROQ_API_KEY=your_groq_key
#   NEXT_PUBLIC_SUPABASE_URL=...
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
#   ELEVENLABS_API_KEY=...

# Run dev server
npm run dev

# Build for production
npm run build
```

### API Keys Needed

| Service | What For | Get It |
|---------|----------|--------|
| Groq | Whisper STT + Llama 3.3 AI | [console.groq.com](https://console.groq.com) |
| Supabase | PostgreSQL + Auth + Storage | [supabase.com](https://supabase.com) |
| ElevenLabs | Text-to-Speech voices | [elevenlabs.io](https://elevenlabs.io) |
| Cloudflare R2 | File/audio storage | [cloudflare.com](https://cloudflare.com) |

---

## 📊 Development Timeline

| Week | Focus | Outcome |
|------|-------|---------|
| 1 | Scenarios + Voice Pipeline | 12 scenarios, STT→AI→TTS loop working |
| 2 | 3D Avatar + Emotions | RPM avatar with lip-sync + expressions |
| 3 | Coaching + Polish | Post-session coaching, transcript, error handling |
| 4 | Deploy + Launch | Live URL, demo video, Product Hunt |

---

## 🧠 Why This Matters

> *"It feels like negotiating with a real person — not a chatbot."*

Real negotiations are **emotional, not just logical.** You learn to:
- **Read body language** and adjust tactics in real time
- **Regulate emotions** when faced with pressure tactics
- **Build muscle memory** through multisensory repetition

Text chatbots teach you *what* to say.
Negoti8 teaches you *when* to say it, *how* to say it, and what to expect in response.

---

## 🗓️ Phase 2 (Post-MVP)

- Progress tracking dashboard
- Badge system (Salary Master, VC Whisperer, etc.)
- Custom scenarios (paste a job offer → AI generates the counterpart)
- Multiplayer mode (negotiate vs real people, AI coaches both)
- Mobile app (React Native)
- Voice analytics (tone, pace, filler word trends)
- More avatar expressions (7+ emotions)
- Custom avatar creation
- PDF export

---

## 📄 License

MIT — build on it, ship it, negotiate better.

---

*Built with ❤️ using Next.js, React Three Fiber, Groq LPU, and a lot of empathy for everyone who's ever frozen in a negotiation.*
