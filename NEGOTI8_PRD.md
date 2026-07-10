# NegotiateAI — Product Requirements Document

## Executive Summary

**NegotiateAI** is a voice-powered negotiation simulator featuring a reactive 3D avatar that role-plays as various negotiation counterparts (hiring managers, VCs, car salesmen, clients). Users practice real-world negotiation scenarios through natural voice conversation, receive emotional feedback from the avatar's body language, and get detailed coaching after each session.

**Core Value Proposition:** Transform negotiation from a high-stakes, anxiety-inducing experience into a learnable skill through deliberate practice with an AI that provides both realistic role-play and expert coaching.

---

## Problem Statement

**The Problem:**
- 87% of people feel anxious about negotiating salary, contracts, or deals
- Most learn negotiation through trial and error in high-stakes situations
- Books and courses teach theory but lack safe practice environments
- Role-playing with humans is awkward, inconsistent, and unavailable on-demand
- AI chatbots teach you *what* to say, but real negotiation is 80% non-verbal — you need to see the other person's reactions

**Who Feels This Pain:**
- Job seekers (especially at $20K+/month roles where every dollar matters)
- Startup founders raising capital ($100K+ pre-seed, where dilution is everything)
- Sales professionals closing enterprise deals
- Freelancers/consultants who constantly negotiate rates and scope
- Business students learning negotiation for the first time
- Everyday consumers buying cars, houses, or negotiating bills

**Current Solutions & Their Gaps:**
| Solution | Gap |
|----------|-----|
| Books/Courses | Teach theory, zero practice |
| Human role-play | Awkward, inconsistent, unavailable on-demand |
| Chatbot AI | No emotional feedback, no voice, no body language |
| Real negotiations | High stakes, no do-overs, learning from expensive mistakes |

---

## Market Opportunity

### Total Addressable Market (TAM)

| Segment | Market Size | Source |
|---------|-------------|--------|
| **Job Seekers** | 150M+ annually in the US alone (active job changers + new entrants) | BLS Data |
| **Professional Development & Coaching** | $15B+ globally | IBISWorld, 2024 |
| **Corporate Negotiation Training** | $5B+ annually (enterprise sales training, procurement negotiation, leadership development) | Training Industry Report / ATD |
| **Career Coaching & Salary Prep** | $2B+ (growing 12% YoY) | MarketResearch.com |
| **Freelance Economy** | $7T+ globally, growing 15% YoY. 70M+ freelancers in US alone — every single one needs to negotiate rates, scope, and payment terms | Upwork / World Bank / Statista |
| **MBA Programs** | 1.5M+ MBA graduates/year globally, all study negotiation | AACSB |

### Why Now

| Trend | Why It Matters |
|-------|----------------|
| **Remote work** | More salary negotiations happening without in-person support systems |
| **AI voice agents** | Fastest-growing category in AI applications — 62% YoY growth (CB Insights). Voice interfaces are becoming expected, not novel. |
| **AI voice quality** | Groq Whisper + Llama 3.3 make real-time voice AI affordable for the first time (sub-$0.02 per session) |
| **Browser 3D** | React Three Fiber + WebGL make 3D avatars accessible without downloads or app stores |
| **Negotiation anxiety** | Gen Z reports higher negotiation anxiety than any previous generation |
| **Gig economy growth** | More workers than ever negotiate independently without HR support |

### Competitive Landscape

| Competitor | Approach | Gap |
|------------|----------|-----|
| **Books (Getting to Yes, etc.)** | Theory only | No practice, no feedback |
| **LinkedIn Learning / Coursera** | Video courses | Passive learning, no simulation |
| **ChatGPT / Claude** | Text-based roleplay | No voice, no emotions, no coaching |
| **Human coaches** | Expensive ($200-500/hr) | Not scalable, not on-demand |
| **Negotiation sims (Ventriloquist, etc.)** | Text-based scenarios | Dated UX, no AI, no voice |

**NegotiateAI's position:** First voice-first, emotionally intelligent AI negotiation coach. No competitor combines 3D avatar + voice + emotional reactions + detailed coaching in a single product.

---

## Target Users

### Primary Users

| Segment | Scenarios | Why They Need It | Willingness to Pay |
|---------|-----------|-----------------|-------------------|
| **💼 Job Seekers** ($100K+/yr roles) | Salary negotiation, equity, counter-offers | Every dollar matters. Leaving $10-20K on the table due to poor negotiation is common. | High — 5-10x ROI on a single session |
| **🚀 Startup Founders** (pre-seed → Series A) | Investor pitch, valuation, term sheets, cap table, board seats | Raising millions with no practice run. One bad term (liquidation preference, board control) can cost you the company. | High — dilution is expensive, so $19/mo is trivial |
| **🤝 Sales Professionals** | Closing deals, contracts, price anchoring, objections | More practice = more closed deals = more commission. Every objection handled well saves or makes thousands. Companies already spend $5B+ on sales training — this is better and cheaper. | Very high — companies pay for sales tools. B2B SaaS ($99+/mo) |
| **⚖️ Freelancers/Consultants** | Rate negotiation, scope creep, payment terms, retainers | Constantly negotiating, often undercharging by 30-50%. The "um" tax is real — hesitation costs real money. A single better rate negotiation pays for years of subscription. | High — even one win at $50+/hr more pays for years of Pro tier |

### Secondary Users

| Segment | Scenarios | Why They Need It |
|---------|-----------|-----------------|
| **🚗 Everyday Consumers** (cars, homes, major purchases) | Car buying ($48K+ EV), home purchase ($500K+), contractor quotes ($45K+), rent negotiation | Big purchases happen 1-2x/year — no practice available. A single negotiation can save $2,000-10,000+ and people are terrified of these conversations. |
| **🎓 Students** (MBA, undergrad, law school) | Internship offers, entry-level salary, case competitions, moot court settlements | Learning negotiation theory with zero real practice. First salary negotiation can cost them $100K+ over their career. Business schools need better tools — potential enterprise sales. |
| **👥 HR / People Teams** | Candidate offer calls, internal negotiations | Need to practice the other side of the table too. Understanding negotiation from both sides makes better HR pros. |
| **🏢 Procurement Professionals** | Vendor contracts, pricing, SLAs | Every procurement deal is a negotiation. Better training = better terms = direct bottom-line impact. |
| **🤝 Business Development Professionals** | Partnership terms, revenue share, joint ventures | Complex multi-stakeholder negotiations with no practice runway. A bad partnership deal costs years of wasted effort. |

### User Personas

**Persona 1: Sarah — The Senior Engineer**
- 32 years old, frontend engineer at a Series B startup
- Has a competing offer at $170K but doesn't know how to leverage it
- Anxious about the conversation — fears coming across as greedy
- Needs: Practice the exact conversation with a realistic hiring manager

**Persona 2: Marcus — The First-Time Founder**
- 28, raising his first $500K pre-seed
- Has angel interest but doesn't know how to negotiate valuation
- Scared of offending investors and losing the round
- Needs: A safe space to practice valuation conversations

**Persona 3: Priya — The Freelance Designer**
- 26, leaving full-time for freelance
- Consistently undercharges — said "sure" to $50/hr when she wanted $100/hr
- Knows she needs to practice saying "no" and countering
- Needs: Repetition until assertive negotiation feels natural

---

## Product Vision

> Create the world's most realistic negotiation practice environment by combining cutting-edge voice AI, emotional 3D avatars, and expert coaching frameworks. Users will develop negotiation muscle memory through hundreds of practice sessions, entering real negotiations with confidence and proven tactics.

### Core Principles

| Principle | What It Means |
|-----------|---------------|
| **Emotional realism** | The avatar reacts to you like a real person. Skepticism, frustration, happiness — you learn to read the room. |
| **Voice-native** | You speak, they respond. No typing. Negotiation is spoken, not written. |
| **Practice over theory** | One 5-minute practice session > one chapter of a negotiation book. |
| **Safe failure** | Crash and burn as many times as you need. The real conversation is the only one that counts. |
| **Measurable growth** | Your score goes up. Your filler words go down. Your tactics expand. You can see yourself improve. |

---

## Solution: NegotiateAI

A voice-first AI negotiation simulator where you speak naturally to a 3D avatar that reacts emotionally to your tactics, then get expert coaching on what you did well and what to improve.

**The Killer Feature:** The avatar doesn't just talk — it REACTS. When you make a weak argument, it raises an eyebrow. When you lowball, it frowns and crosses its arms. When you use data, it nods and leans in. This builds emotional intelligence, not just tactical knowledge.

---

## Core Features

### 1. 🎙️ Voice-First Interface
Users speak naturally — no typing required. The entire interaction is voice-based, just like a real negotiation.

| Aspect | Detail |
|--------|--------|
| **Input** | Push-to-talk (hold spacebar/button → speak → release) |
| **Description** | Natural voice conversation with sub-500ms response time using Groq's LPU technology. |
| **STT** | Groq Whisper large-v3 — sub-500ms transcription |
| **AI** | Groq Llama 3.3 70B — sub-500ms roleplay response |
| **TTS** | ElevenLabs / PlayHT — natural voices with character variety |
| **Latency** | <500ms end-to-end per turn target — Groq LPU makes sub-500ms inference possible for both STT and AI, making conversation feel as fast as real human speech |
| **Fallback** | Text input available if microphone is unavailable |

**Requirements:**
- Browser must support MediaRecorder API (Chrome, Firefox, Safari 16.4+, Edge)
- Microphone permission must be granted
- Groq API key with access to whisper-large-v3 and llama-3.3-70b-versatile
- Web Audio API for playback
- 2MB+ upload size for audio blobs (typical: 50-200KB per turn)
- Support for ums, pauses, filler words — transcribed and analyzed for coaching

**Success Criteria:**
- Users can have fluid, natural conversations without awkward pauses between turns
- Transcription accuracy >95% for clear speech across all 12 scenarios
- End-to-end latency <500ms per turn (STT + AI + TTS combined)
- Voice input used in >90% of sessions (text is fallback, not primary)
- Voice output sounds natural and human-like — proper intonation, pacing, and emotional inflection matching the AI's sentiment

**Key Integrations:**
| Service | Role | Model/API |
|---------|------|-----------|
| **Groq Whisper** | Real-time speech-to-text transcription | `whisper-large-v3` via `groq-sdk` `audio.transcriptions.create()` |
| **Groq Llama 3.3 70B** | AI negotiation response generation — understands negotiation context, maintains character personality, detects tactics | `llama-3.3-70b-versatile` via `groq-sdk` `chat.completions.create()` |
| **Groq Whisper** | Real-time speech-to-text transcription | `whisper-large-v3` via `groq-sdk` `audio.transcriptions.create()` |
| **Groq Llama 3.3 70B** | AI negotiation response generation | `llama-3.3-70b-versatile` via `groq-sdk` `chat.completions.create()` |
| **ElevenLabs/PlayHT** | Text-to-speech voice output — natural, low-latency voice synthesis with different character voices per scenario | REST API with streaming audio return |

### 2. 👤 Reactive 3D Avatar System

**Description:** A 3D avatar that serves as the negotiation counterpart, displaying emotional reactions through facial expressions and body language. The avatar's face, voice, and body language change to match the role — making each scenario feel like a real person across the table.

| Aspect | Detail |
|--------|--------|
| **Avatar source** | Ready Player Me (pre-rigged GLB with ARKit blendshapes) |
| **3D Engine** | React Three Fiber + Three.js |
| **Model format** | GLB with morph targets (ARKit-compatible blendshapes) |
| **Facial expressions** | 7 morph targets per expression (jaw, mouth, eyes, brows) |
| **Lip-sync** | OVR Lip Sync (WASM) — maps audio waveform to mouth shapes in real time |
| **Body animations** | Mixamo (idle, talking, gesturing, crossed arms, leaning) |
| **Visual quality** | Stylized 3D — not uncanny valley, not cartoonish |

**Character Variants:**
| Variant | Attire | Used For |
|---------|--------|----------|
| 💼 Corporate | Suit and tie | Salary negotiation, enterprise sales |
| 🦄 VC | Hoodie, casual | Fundraising, pitch meetings |
| 👷 Trades | Flannel, relaxed | Car buying, contractor, consumer |
| 🏠 Property | Blazer, smart casual | Rent negotiation, real estate |

**Minimum 5 Emotional States (Phase 1 → Phase 2):**

| Emotion | Face | Body Language | Triggers | Phase |
|---------|------|---------------|----------|-------|
| 😐 **Neutral** | Attentive, calm, regular blinking | Still, professional posture | Default listening state | MVP |
| 😏 **Skeptical** | Raised eyebrow, half-smirk, slight squint | Head tilt, lean back, crossed arms | User makes weak argument or unrealistic demand | MVP |
| 😤 **Frustrated** | Frown, tight jaw, slight head shake | Crossed arms, lean away, rigid posture | User lowballs, wastes time, or gets aggressive | MVP |
| 😊 **Happy** | Warm smile, eye crinkle, nod | Lean forward, open shoulders, relaxed | User uses data, BATNA, or good tactics | MVP |
| 🤔 **Thoughtful** | Looks up, slight head tilt, pursed lips | Still, hand on chin | Considering user's proposal | Phase 2 |
| 😌 **Satisfied** | Warm smile, slow nod, relaxed face | Open posture, leans back, relaxed shoulders | Deal is closing, terms agreed, mutual benefit reached | MVP (upgraded from Phase 2) |
| 🧐 **Interested** | Raised brows, focused gaze, slight smile | Leans forward, engaged posture, open body language | User presents compelling data, strong BATNA, or a well-reasoned argument | MVP (upgraded from Phase 2) |

**Emotion Pipeline:**
```
AI generates response → sentiment tag returned ("skeptical")
  → EmotionController blends morph targets over 200ms
  → Expression holds for 1.5-3s while AI speaks
  → TTS plays → OVR Lip Sync drives mouth shapes
  → When AI stops speaking → blend back to neutral over 500ms
```

**Requirements:**
- WebGL 2.0 compatible browser
- ~5-15MB for GLB model (cached after first load)
- GPU with at least WebGL 2.0 support
- 60fps rendering target on mid-range devices

**Requirements:**
- Full-body 3D character rendered in browser via React Three Fiber + Three.js
- GLB model with ARKit-compatible morph targets (52 blendshapes standard)
- WebGL 2.0 support required, WebGPU preferred for performance
- Smooth transitions between emotional states — morph target blend via lerp (linear interpolation) over 150-300ms, not instant snapping between expressions
- OVR Lip Sync WASM library for audio-to-viseme mapping — mouth shapes are driven by real-time audio waveform analysis, not pre-baked animations
- Lip-sync animation synchronized with AI speech — every syllable matches a mouth movement with <50ms delay
- Mixamo animation FBX files converted to GLB for Three.js
- 5-15MB initial model load (cacheable via IndexedDB)
- Dedicated GPU recommended for smooth 60fps rendering
- Customizable avatar appearance — gender, ethnicity, and style selectable via Ready Player Me web widget or preset options
- Character outfits match scenario context (suit for salary, casual for VC, etc.)

**Success Criteria:**
- Lip-sync is visually accurate within 100ms of audio — mouth shapes match phonemes closely enough that users don't notice mismatch (target: <50ms for imperceptible sync)
- Expression transitions complete within 200ms (smooth, not jarring)
- Emotional reactions feel natural and contextually appropriate — avatar doesn't smile when user lowballs, doesn't frown when user agrees. Users rate emotional accuracy >4/5 in post-session survey.
- Avatar feels like a believable counterpart, not a puppet (user survey score >3.5/5)
- Avatar enhances the feeling of negotiating with a real person, not talking to a computer — measured by user survey: "I forgot I was talking to an AI" >3.5/5
- Avatar animations play smoothly at 60fps on target devices (M1 MacBook Air, mid-range PC, iPhone 13+)
- Model loads in <3s on average broadband connection (first visit), instant on repeat visits (IndexedDB cache)

### Technical Implementation

| Component | Technology | Details |
|-----------|-----------|---------|
| **Avatar model** | Ready Player Me GLB format | Pre-rigged humanoid with ARKit-compatible morph targets (52 blendshapes). Output as GLB via RPM web widget or API. |
| **3D rendering** | React Three Fiber (R3F) + `@react-three/drei` | Declarative Three.js scene. `Canvas` + `useGLTF` for model loading. `OrbitControls` disabled (fixed camera for face-to-face framing). |
| **Expression system** | Custom `EmotionController` class | Blends morph target weights via lerp. 7 expression presets. 200ms transition speed. |
| **Emotion triggers** | Backend sends emotion events based on conversation analysis | `/api/negotiate` returns `{ aiText, emotion: "skeptical" }` based on sentiment analysis of user's transcript. Frontend `EmotionController` receives event → blends to target expression → holds while AI speaks → returns to neutral. Emotion events can be overridden by duration or next user input. |
| **Lip-sync** | OVR Lip Sync (WASM) or Rive integration | OVR Lip Sync: Analyzes audio waveform buffer via WASM → generates viseme frame array → maps to mouth morph targets (jawOpen, mouthClose, mouthFunnel, etc.). Runs at 60fps, <5ms per frame. Rive: 2D vector-based facial animation fallback for low-end devices — lighter weight but still expressive. |
| **Body animations** | Mixamo → FBX → GLB conversion | 10 animations: idle (breathing), talking (gesturing), armsCrossed, leanForward, leanBack, nod, headShake, shrug, point, wave. Crossfade via `useAnimations`. |
| **Animation system** | Mixamo body animations + custom facial blendshapes | Body movement driven by Mixamo skeleton animations. Facial expressions driven by morph targets on the face mesh. Two independent systems blend simultaneously for natural full-body emotion. |
| **Character variants** | Material/outfit swapping | Same base mesh, different texture sets per variant. Swapped via `material.color` or texture map replacement at runtime. No model reload. |

**Camera Setup:**
```
Camera position: [0, 1.6, 2.8]  // Eye level, arm's length
Field of view: 50°  // Natural face-to-face framing
Target: [0, 1.4, 0]  // Upper chest (not forehead)
Lighting: ambient 0.3 + directional from upper-left
Background: dark gradient (#000008 → #0a0a1a)
```

**Performance Budget:**
| Metric | Target |
|--------|--------|
| Model size | <10MB GLB (Draco compressed) |
| Load time | <3s first load, <1s cached |
| Frame rate | 60fps on mid-range GPU, 30fps on integrated |
| Memory | <50MB for avatar assets |
| Expression transition | 150-300ms |
| Lip-sync latency | <50ms behind audio |

---

### 3. 🧠 Emotional Intelligence System
The core differentiator. Avatar reads your tactics and reacts emotionally in real time.

| User Action | Avatar Reaction | Timing |
|-------------|----------------|--------|
| Weak argument | Raised eyebrow, head tilt, lean back | 300ms |
| Lowball offer | Frown, crossed arms, head shake | 300ms |
| Uses data + BATNA | Smile, lean forward, nod | 300ms |
| Strategic silence | Fidgets, shifts weight, breaks eye contact | 300ms |
| Win-win proposal | Warm smile, open posture, extends hand | 300ms |

### 4. 📊 Post-Session Coaching
After every negotiation, the AI switches to coach mode and provides detailed analysis.
- Overall Score (0-10) with 4-category breakdown
- What you did well (specific tactics detected)
- Missed opportunities with alternative approaches
- Specific phrases you could have said (exact scripts)
- Filler word analysis ("um", "uh", "like" counts)
- Key moments (anchors, counteroffers, concessions)

### 3. 📚 Scenario Library

**Description:** Pre-built negotiation scenarios covering common real-world situations with varying difficulty levels. Each scenario includes a full system prompt defining the AI's personality, opening position, tactics, and BATNA.

**MVP Scenarios (12 total):**

| # | Scenario | Category | Difficulty |
|---|----------|----------|------------|
| 1 | Entry-Level Salary | 💼 Salary | 🟢 Easy |
| 2 | Senior Engineer Counter-Offer | 💼 Salary | 🟡 Medium |
| 3 | Equity vs Cash Tradeoff | 💼 Salary | 🔴 Hard |
| 4 | Employer Counteroffer | 💼 Salary | 🔴 Hard |
| 5 | Co-Founder Equity Split | 🚀 Fundraising | 🟢 Easy |
| 6 | Pre-Seed Valuation | 🚀 Fundraising | 🟡 Medium |
| 7 | Series A Term Sheet | 🚀 Fundraising | 🔴 Hard |
| 8 | Freelance Rate Negotiation | 🤝 Freelance | 🟢 Easy |
| 9 | Client Scope Creep | 🤝 Freelance | 🟡 Medium |
| 10 | Car Dealership | 🛒 Consumer | 🟢 Easy |
| 11 | Rent Negotiation (Landlord) | 🛒 Consumer | 🟡 Medium |
| 12 | Vendor Pricing (B2B Supplier) | 🤝 Sales | 🔴 Hard |

**Phase 2 Scenarios (Post-MVP):**
| # | Scenario | Category | Difficulty |
|---|----------|----------|------------|
| 13 | Home Purchase Negotiation | 🛒 Consumer | 🔴 Hard |
| 14 | Contractor Quote Dispute | 🛒 Consumer | 🔴 Hard |
| 15 | Bill Negotiation (Comcast, Medical) | 🛒 Consumer | 🟢 Easy |
| 16 | Business Development Partnership | 🤝 Sales | 🔴 Hard |
| 17 | Procurement (Enterprise SaaS) | 🤝 Sales | 🔴 Hard |
| 18 | Salary (Internal Promotion) | 💼 Salary | 🟡 Medium |
| 19 | Investor Update / Bridge Round | 🚀 Fundraising | 🔴 Hard |
| 13+ | House Buying, Contractor Dispute, Bill Negotiation, etc. | 🛒 Consumer | 🟢🟡🔴 |

**Difficulty Distribution:**
- 🟢 Easy: 4 scenarios (learn fundamentals)
- 🟡 Medium: 3 scenarios (practice resistance)
- 🔴 Hard: 3 scenarios (build immunity)

### Scenario Structure

Every scenario follows a consistent structure:

```yaml
id: salary-entry
title: "Entry-Level Salary Negotiation"
category: "Salary"
difficulty: "easy"

# Roles
user_role: "Junior developer, first job out of bootcamp"
ai_role: "Friendly recruiter at mid-size tech company"

# Context
ai_personality: >
  Warm, encouraging, but has budget constraints. Wants to make you happy
  but can't go too high.

stakes: "$75K base offer. You want $82K. Market range is $75-85K."
user_batna: "You have 2 other interviews this week, no offers yet."
target_range: [75000, 85000]

# AI Behavior
tactics_ai_will_use: ["anchoring", "bracketing", "silence", "limited-authority"]
avatar_variant: "corporate"

# The prompt that makes the AI play this character
system_prompt: |
  You are a friendly recruiter at a mid-size tech company...
  Start at $75K. If they counter, look surprised: "Oh, what number were you thinking?"
  Use silence after they name their number. You can go up to $78K on your own.
  Beyond that needs "manager approval."
```

**Required Elements:**
| Element | Type | Example |
|---------|------|--------|
| `id` | string | `"salary-entry"` |
| `title` | string | `"Entry-Level Salary Negotiation"` |
| `category` | string | `"Salary"` |
| `difficulty` | enum | `"easy"` \| `"medium"` \| `"hard"` |
| `user_role` | string | `"Junior developer, first job"` |
| `ai_role` | string | `"Friendly recruiter"` |
| `ai_personality` | string | Personality description for the AI |
| `stakes` | string | What's on the line |
| `user_batna` | string | User's fallback option |
| `target_range` | [number, number] | `[75000, 85000]` |
| `tactics_ai_will_use` | string[] | `["anchoring", "silence"]` |
| `avatar_variant` | string | `"corporate"` \| `"vc"` \| `"trades"` \| `"property"` |
| `system_prompt` | string | Full AI character prompt |

**Storage:** All 12 scenarios defined in `src/lib/prompts/scenarios.ts` as typed objects.

**Difficulty Levels:**
| Level | AI Behavior | User Experience |
|-------|-------------|----------------|
| 🟢 **Easy** | Counterpart is reasonable, uses basic tactics (anchoring, asking for discount), willing to compromise if you use good arguments | Learn fundamentals without intimidation |
| 🟡 **Medium** | Counterpart uses anchoring, silence, limited authority ("I need to check with my manager"), strategic pushback on weak arguments | Practice real-world resistance and recovery |
| 🔴 **Hard** | Counterpart uses emotional manipulation ("I'm disappointed"), false deadlines ("offer expires tomorrow"), nibbling ("can you also include X?"), good cop/bad cop, gaslighting | Build immunity to high-pressure tactics and emotional regulation |

**Requirements:**
- Each scenario has a unique system prompt optimized for Llama 3.3 70B
- Scenarios stored as JSON/TypeScript objects in `src/lib/prompts/scenarios.ts`
- Avatar outfit variant mapped per scenario category
- TTS voice selection per AI personality (warm recruiter, sharp VC, friendly salesperson)

**Success Criteria:**
- Each scenario feels realistic and contextually accurate — users recognize the situation from real life
- AI stays in character throughout the negotiation >90% of the time
- Counterpart behavior matches the specified difficulty level — Easy is genuinely cooperative, Medium pushes back fairly, Hard applies real pressure
- Scenarios feel distinct — users feel a clear difference between salary and fundraising
- Users complete at least 3 different scenarios in their first week
- Users can complete 5-10 exchanges per scenario before reaching a natural conclusion
- AI responses include scenario-specific details (company names, industry terms, role-specific jargon)
- Scenarios cover diverse negotiation contexts — salary, fundraising, freelance, consumer — with distinct vocabulary and power dynamics in each

---

## Core Features

### 4. 🧠 Emotion Analysis Engine

**Description:** Backend system that analyzes user's negotiation tactics and determines appropriate avatar emotional reactions. This is the core differentiator — it's what makes the avatar feel alive and responsive.

**Analyze user's speech for negotiation tactics:**

The engine classifies every user utterance into tactical categories:

| Tactic | Pattern Detected | Example | Avatar Reaction |
|--------|-----------------|---------|----------------|
| **Anchoring (setting first number)** | User names a specific number first | "I was looking for $82K" | 🧐 Interested — evaluates the anchor |
| **Weak anchor** | "I think...", "Maybe...", "I guess..." without data | "I think $75K is fair" | 😏 Skeptical |
| **Strong anchor** | Specific numbers + data/research | "Based on market data, $82K is the midpoint" | 😊 Happy |
| **BATNA mention (alternatives)** | Mentions competing offers, other options, or walk-away alternatives | "I have another offer at $90K", "I'm also interviewing at Google", "I can go with a different contractor" | 🧐 Interested — takes you more seriously |
| **Aggressive rejection** | Dismissive language without counter | "That's ridiculous" | 😤 Frustrated |
| **Collaborative** | "What if...", "How about...", trade-off language | "What if we meet at $80K with extra vacation?" | 😊 Happy |
| **Hesitation** | Filler words, qualifiers | "Um, well, I mean..." | 😏 Skeptical |
| **Silence usage** | User holds silence after AI makes an offer or statement — lets the AI fill the uncomfortable gap | User says nothing for 3+ seconds after hearing an offer | 😐 Uncomfortable — fidgets, breaks eye contact, eventually fills the silence with a better offer |
| **Concession patterns** | User gives ground — lowers ask, accepts a term, trades value | "OK I can do $78K", "I'll accept the longer vesting if you increase the base" | 😊 Happy — you moved, they'll move too |
| **Acceptance** | Quick agreement without counter | "OK sure, that works" | 😏 Skeptical (missed opportunity) |
| **Emotional tone** | Overall sentiment of the utterance | Aggressive ("That's unacceptable"), Collaborative ("Let's find common ground"), Defensive ("I don't think that's fair"), Confident ("Based on my research"), Anxious ("Um, well, I'm not sure") | Varies — tone shifts avatar expression intensity |

**Map tactics to avatar emotions:**

| Detected Tactic | Avatar Emotion | Expression | Body Language | Logic |
|----------------|----------------|-----------|---------------|-------|
| Anchoring (strong, data-backed) | 😊 Happy | Smile, nod | Lean forward | User came prepared — respect |
| Anchoring (weak, no data) | 😏 Skeptical | Raised eyebrow | Head tilt | User is guessing — unimpressed |
| BATNA mention | 🧐 Interested | Raised brows, focused | Lean forward | User has leverage — pay attention |
| Collaborative proposal | 😊 Happy | Warm smile | Open posture | User is solution-oriented |
| Aggressive rejection | 😤 Frustrated | Frown, tight jaw | Cross arms | User is difficult — defensive |
| Concession | 😌 Satisfied | Subtle nod | Relax shoulders | Deal is progressing |
| Silence | 😐 Uncomfortable | Micro-fidgets | Shift weight | User is using power — uncomfortable |
| Hesitation / filler words | 😏 Skeptical | Half-smirk | Still | User is uncertain — exploit |
| Quick acceptance | 🤔 Suspicious | Squint, slight frown | Still | User gave up too easily — suspicious |

**Pipeline:**
```
1. User speaks → transcribed by Groq Whisper
2. Transcript sent to Emotion Engine (server-side, before AI response)
3. Engine classifies utterance into tactic category
4. Maps tactic to avatar emotion (skeptical, frustrated, happy, interested, etc.)
5. Emotion tag returned alongside AI response
6. Frontend EmotionController drives avatar expression
7. All in <300ms — user sees avatar reaction BEFORE AI speaks
```

**Requirements:**
- Rule-based NLP classifier (MVP): regex pattern matching against known tactic patterns
- Phase 2: LLM-based classification via Groq Llama for nuance
- Must return emotion BEFORE AI response text (avatar reacts first, then speaks)
- Must handle edge cases: sarcasm, mixed signals, long monologues
- Must track emotion history per session to avoid repetitive reactions
- Send emotion events to frontend in real-time — emotion tag returned in `/api/negotiate` response alongside `aiText`, so frontend can start expression transition immediately without waiting for TTS audio
- Emotion event format: `{ emotion: "skeptical", intensity: 0.7, duration: 2000 }` — tells frontend which expression, how strong, and how long to hold
- Maintain emotional continuity — don't flip emotions erratically. Smooth transitions (200ms blend). Hold expression for minimum 1.5s before changing. If user says something neutral, stay in current expression rather than snapping to neutral.

**Success Criteria:**
- Emotional reactions feel contextually appropriate >80% of the time — users agree the avatar's reaction matched what they said
- Emotion matches user intent >80% of the time (skeptical when user makes weak argument, happy when user uses data, etc.)
- Avatar reacts within 300ms of user finishing speech — feels like real-time, not delayed
- No false positives on neutral statements — avatar doesn't randomly react when user says something mundane
- Avatar emotions guide user toward better tactics — users report adjusting their approach based on the avatar's reactions
- Users report feeling "read" by the avatar — the engine correctly identifies their tactics
- System doesn't break if user says something unexpected — handles edge cases (sarcasm, jokes, off-topic questions, long monologues, silence, interruptions) gracefully by defaulting to neutral or the closest matching emotion

---

## MVP Scope (5 Features)

### 1. 🎙️ Voice Input/Output (STT → AI → TTS)
The core technical foundation. User speaks, Groq transcribes, Llama responds, ElevenLabs speaks back.
- **Speech-to-Text:** Groq Whisper large-v3 (sub-500ms)
- **AI Engine:** Groq Llama 3.3 70B Versatile (sub-500ms)
- **Text-to-Speech:** ElevenLabs or PlayHT (natural voices)
- **Pipeline:** MediaRecorder → /api/negotiate → Web Audio playback
- **Latency target:** <2 seconds end-to-end per turn
- **Interaction:** Push-to-talk (hold spacebar/button → speak → release)

### 2. 👤 3D Avatar with Lip-Sync
A Ready Player Me avatar in React Three Fiber that serves as the visual counterpart.
- **Avatar source:** Ready Player Me (GLB with ARKit blendshapes)
- **3D Engine:** React Three Fiber + Three.js
- **Lip-sync:** OVR Lip Sync (WASM) — mouth moves match every word from audio waveform
- **Idle animations:** Mixamo (breathing, blinking, micro-movements)

### 3. 😏 3 Emotional Reactions (Skeptical, Frustrated, Happy)
The avatar reacts emotionally to the user's tactics in real time.

| User Action | Avatar Reaction | Expression |
|-------------|----------------|------------|
| Weak argument ("I think $75K is fair") | Raised eyebrow, head tilt, lean back | 😏 Skeptical |
| Lowball offer ($50K on $75K range) | Frown, crossed arms, head shake | 😤 Frustrated |
| Uses data + BATNA | Smile, lean forward, nod | 😊 Happy |
| Strategic silence | Fidgets, shifts weight, breaks eye contact | 😐 Uncomfortable |
| Win-win proposal | Warm smile, open posture, extends hand | 😌 Satisfied |

**Emotion Pipeline:**
```
User speaks → /api/negotiate → transcript
  → Groq Llama 3.3 generates response + sentiment tag
  → Frontend receives { aiText, emotion }
  → EmotionController blends avatar expression over 200ms
  → TTS audio plays + OVR Lip Sync drives mouth shapes
  → Expression holds for 1.5-3s, then blends back to neutral
```

### 4. 📚 12 Negotiation Scenarios
Pre-written scenarios with full system prompts defining AI personality, tactics, stakes, and BATNA.

| Category | Scenarios | Difficulty |
|----------|-----------|------------|
| 💼 Salary | Entry-level, Senior counter, Equity vs cash, Employer counteroffer | 🟢🟡🔴🔴 |
| 🚀 Fundraising | Co-founder split, Pre-seed SAFE, Series A term sheet | 🟢🟡🔴 |
| 🤝 Sales & Freelance | Rate negotiation, Scope creep, Vendor pricing | 🟢🟡🔴 |
| 🛒 Consumer | Car buying, Rent negotiation | 🟢🟡 |

Each scenario includes:
- System prompt defining AI personality, opening position, tactics to use
- Difficulty tier (easy = cooperative AI, hard = AI uses manipulation + pressure)
- User role, AI role, stakes, target range, user's BATNA
- Avatar outfit variant (corporate, VC, trades, property)

### 5. 📊 Post-Negotiation Coaching

**Description:** After each negotiation session, the AI switches to coach mode and provides detailed, actionable feedback on performance. This is the learning loop — without it, the product is just a chatbot with a face.

**Coaching Report — What's Included:**

- **Overall Score (0-10)** with 4-category breakdown:
  - 💰 Outcome (0-3): Did you hit your target?
  - 🧠 Tactics (0-3): Which tactics you used, how effectively
  - 🎭 Delivery (0-2): Tone, confidence, filler words
  - 🔄 Adaptability (0-2): How well you responded to curveballs

- **Evaluate against negotiation frameworks:**
  - **Outcome achievement** — Did they meet their goals? Final deal vs. target range vs. BATNA
  - **Preparation** — Did user know their BATNA? Understand their leverage? Research market data?
  - **Rapport building** — Did they establish connection? Use empathy? Find common ground?
  - **Tactical execution** — Did they use effective techniques? Anchor first? Trade across dimensions?
  - **Emotional regulation** — Did they stay calm under pressure? Recover from tough moments?

- **What You Did Well** — specific tactics detected with timestamps. "Turn 3: Great use of data-backed anchoring."
- **Missed Opportunities** — what you could have done better. "Turn 5: You accepted too quickly. They would have gone higher."
- **Specific Phrases You Could Have Said** — exact scripts for next time. "Instead of 'OK', try 'I appreciate the offer. Can we discuss $X?'"
- **Actionable Improvements for Next Time** — 1-3 specific, concrete things to try on the retry. "Practice using silence after they name their number. Don't fill the gap."
- **Filler Word Analysis** — "um", "uh", "like", "you know", "sort of" count with per-turn breakdown
- **Tactics Breakdown** — which tactics you used vs which the AI used against you
- **Key Moments** — highlights of anchors, counteroffers, concessions, power shifts
- **Overall Advice** — personalized tip based on your performance pattern

**Requirements:**
- Full conversation transcript analyzed (user + AI turns)
- Coaching generated by Groq Llama 3.3 via structured coaching prompt
- Coaching prompt receives: full transcript, scenario context, user BATNA, target range
- Returns structured JSON for reliable UI rendering
- Generated in <2 seconds of clicking "End Negotiation"
- Previous reports stored for comparison (retry tracking)
- Allow user to save feedback for future reference — exportable as PDF or saved to user history for review before real negotiations

**Display feedback in clean, readable UI:**
- Score displayed as a large number + colored badge (green ≥8, yellow ≥5, red <5)
- Breakdown shown as horizontal bar chart (4 categories)
- What You Did Well — green cards with checkmark icons
- Missed Opportunities — amber cards with lightbulb icons
- Specific Phrases — blue highlight box with quote style
- Actionable Improvements — numbered list with priority indicators
- Filler Words — table with word, count, trend arrow
- Key Moments — timeline view with clickable entries that scroll transcript
- Transcript displayed below coaching — highlighted moments linkable

**Provide structured feedback:**
| Category | What It Evaluates | Max Score |
|----------|------------------|-----------|
| 💰 **Outcome** | Did user achieve their target? Final deal vs. BATNA | 3 pts |
| 🧠 **Tactics** | Did user use effective techniques? Anchoring, silence, BATNA, trade-offs | 3 pts |
| 🎭 **Delivery** | Tone, confidence, filler words, clarity | 2 pts |
| 🔄 **Adaptability** | Response to curveballs, recovery from mistakes | 2 pts |
| **Total** | | **10 pts** |

**Success Criteria:**
- Feedback is specific and actionable (not generic) — users see their actual phrases analyzed, not template text
- Users understand what they did wrong and how to improve — "accepted too quickly" comes with "next time try this specific phrase"
- Coaching feels specific, not generic — users feel it's about THEIR conversation
- Score matches user's self-assessment within 2 points (calibrated)
- Users report learning at least one new thing from every coaching report
- Retry rate increases after coaching — users want to apply the feedback
- Coaching generated consistently in <2 seconds
- Coaching quality matches professional negotiation training — users report the feedback is as good or better than human coach feedback they've received
- Users show measurable improvement over multiple sessions — average score increases by +2 points over 5 sessions on the same scenario
- Users save or export coaching reports for reference before real negotiations

### 6. 📋 Conversation Management

**Description:** System for managing conversation state, history, and context throughout the negotiation session. Ensures the AI remembers what was said, maintains consistent character behavior, and handles multi-turn conversations without losing context.

**Requirements:**
- Track full conversation history (user + AI turns with timestamps)
- Maintain context window within Llama 3.3 token limits (8K tokens)
- Send full context with each API call to Groq — each /api/negotiate request includes: full conversation history, scenario system prompt, user's BATNA, target range, current turn number, and detected emotion history
- Handle turn ordering (alternating user/AI, prevent duplicate turns)
- Detect session boundaries (start, end, timeout, interruption)
- Store sessions in Supabase for coaching analysis and retry comparison
- Generate conversation transcript for review — full text of all exchanges with speaker labels, timestamps, and highlighted key moments (anchors, counteroffers, concessions)
- Handle edge cases: user speaks twice without AI response, browser refresh, network interruption

**Track negotiation progress:**
| Metric | How It's Tracked | Used For |
|--------|-----------------|----------|
| **Turn count** | Incremented each exchange | Session length, engagement metrics |
| **Offers made** | Extracted from transcript (number patterns) | Track movement toward deal |
| **Current offer/counteroffer** | Most recent number mentioned by each side | Displayed on HUD during negotiation. Coaching: how many rounds to reach agreement? |
| **Concessions made by each party** | User lowers ask → user concession. AI lowers ask or adds benefit → AI concession. Tracked per turn. | Coaching: who gave more ground? Did user give too much? Did they get enough in return? |
| **Silences** | User pause >3s detected | Coaching: effective use of silence? |
| **Filler words** | Counted per turn | Coaching: filler word trend |
| **Tactics used** | Detected via Emotion Engine | Coaching: tactic frequency |
| **Time elapsed** | Session timer | Engagement metrics |

**Conversation State Structure:**
```typescript
interface ConversationState {
  sessionId: string;
  scenarioId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'active' | 'paused' | 'completed' | 'interrupted';
  turnCount: number;
  history: {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
    emotion?: string;
    fillerWords?: string[];
    detectedTactic?: string;
  }[];
  startTime: number;
  lastActivity: number;
  progress: {
    userOffers: number[];
    aiOffers: number[];
    userConcessions: number;
    aiConcessions: number;
    silences: number;
    fillerWordCount: number;
    tacticsUsed: string[];
    timeElapsed: number;
  };
}
```

**Context Window Management:**
- Maintain conversation history (last 10 exchanges) — always send full last 10 turns (user + AI) with each /api/negotiate request
- First 10 turns: full history included
- After 10 turns: summarize older turns to stay within token limit
- Always include: scenario context, user's BATNA, target range, last 10 full exchanges
- Phase 2: use Groq Llama to summarize conversation at checkpoints

**Handle Edge Cases:**
| Scenario | Handling |
|----------|----------|
| User goes off-topic | AI stays in character but gently redirects: "That's interesting. Let's focus on the offer on the table." |
| User ends negotiation abruptly | Capture final state, generate coaching report based on what was accomplished. Offer retry. |
| User asks for help mid-negotiation | Brief coaching popup or suggestion appears without breaking character. "Here's a tip: try using silence after they name their number." |
| User interrupts AI speaking | Stop TTS, capture user's new audio, process as next turn. AI acknowledges: "Let me respond to that." |
| User speaks twice quickly | Queue second utterance, send both when AI responds. |
| Long silence (>10s) | AI prompts: "Would you like to respond to that offer?" |
| Browser refresh | Session restored from Supabase. Offer "Continue where you left off." |
| Network failure | Retry up to 3x with exponential backoff. Show reconnecting state. |

**Success Criteria:**
- AI maintains context across entire conversation — references specific user arguments from earlier turns, doesn't contradict itself, stays consistent in personality and position
- No context loss after 20+ exchanges per session — stays in character, references earlier points
- Conversation survives browser refresh — session restored from Supabase within 500ms
- Turn counter never goes out of sync — user and AI always alternate correctly
- Session data complete enough to generate accurate coaching report — no missing turns
- Conversation feels natural and coherent — user shouldn't feel like they're talking to a machine with memory loss
- Edge cases handled gracefully — no crashes on interruption, silence, or off-topic
- Transcript is accurate and complete — every exchange recorded, timestamps match, speaker labels correct, ready for coaching analysis

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
## Technical Architecture

### Frontend Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Framework** | Next.js 14 (App Router) | Full-stack React framework with SSR (server-side rendering for initial page load — landing page, scenario list), API routes, file-based routing |
| **Language** | TypeScript (strict mode) | Type safety, AI-friendly code, end-to-end types |
| **UI Library** | shadcn/ui + Tailwind CSS | Pre-built accessible components, utility-first styling |
| **3D Rendering** | React Three Fiber + @react-three/drei | Declarative Three.js scenes, GLB model loading, camera control |
| **3D Engine** | Three.js | WebGL 2.0 rendering, morph targets, animations, lighting |
| **Avatar** | Ready Player Me (GLB) | Pre-rigged humanoid with ARKit 52-blendshape morph targets |
| **Lip-sync** | OVR Lip Sync (WASM) | Real-time audio waveform → viseme mapping → morph target driver |
| **Body Animations** | Mixamo → FBX → GLB | 10+ body animations (idle, talking, gestures, posture shifts) |
| **Rendering Strategy** | SSR (initial load) + Client-side (real-time) | Landing page, scenario list, coaching reports rendered on server. Voice loop, avatar, recording run entirely client-side for real-time interactivity. |
| **State Management** | Zustand | Lightweight, TypeScript-first store for session state, avatar, audio |
| **Auth Client** | Supabase Auth (Next.js helpers) | Google OAuth, session management, Row Level Security |
| **Audio Capture** | MediaRecorder API (browser native) | WebM audio blob capture with Opus codec |
| **Audio Playback** | Web Audio API (browser native) | TTS playback timing, volume control, queue management |

**Frontend Component Tree:**
```
src/app/page.tsx                    # Main page — orchestrates everything
├── ScenarioSelector                # Pick scenario + difficulty
├── NegotiationPlayer                # Core voice loop container
│   ├── AvatarCanvas                 # R3F scene with avatar
│   │   ├── AvatarModel              # RPM GLB model
│   │   ├── EmotionController        # Expression blend engine
│   │   └── LipSyncDriver            # OVR Lip Sync integration
│   ├── RecordButton                 # Push-to-talk
│   ├── TranscriptDisplay            # Live conversation scroll
│   └── HUD                          # Score, timer, turn counter
└── CoachingReport                   # Post-session results view
    ├── ScoreBreakdown               # Bar chart + total
    ├── TacticsList                  # What you did well / missed
    ├── PhrasesSection               # Specific phrases
    └── TranscriptView               # Full transcript with highlights
```

### Backend Stack

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Runtime** | Node.js 20+ (Next.js API routes) | Serverless functions on Vercel Edge |
| **API** | Next.js Route Handlers (App Router) | API routes for backend logic: `/api/negotiate` (voice pipeline), `/api/coach` (post-session analysis), `/api/auth` (Supabase auth helpers) |
| **AI Engine** | Groq Llama 3.3 70B Versatile | Negotiation roleplay, sentiment extraction, coaching |
| **STT** | Groq Whisper large-v3 | Speech-to-text via groq-sdk |
| **TTS** | ElevenLabs / PlayHT REST API | Text-to-speech with streaming audio return |
| **Database** | Supabase (PostgreSQL) | User data, scenarios, sessions, coaching reports |
| **Auth** | Supabase Auth | Google OAuth, JWT sessions, RLS policies |
| **Cache/Queue** | Redis (Upstash) | Session state, rate limiting, job queue |
| **File Storage** | Cloudflare R2 | Avatar GLBs, audio recordings |
| **Monitoring** | Sentry + Axiom | Error tracking, API latency, usage metrics |

### Infrastructure

| Service | Role | Why |
|---------|------|-----|
| **Vercel** | Frontend + API hosting | Auto-deploy from GitHub, edge functions, free tier |
| **Railway / Render** | Backend services | Persistent server for WebSocket support (future) |
| **Cloudflare R2** | Object storage | S3-compatible, zero egress fees |
| **Supabase** | Database + Auth + Storage | Managed PostgreSQL, RLS, built-in auth |
| **Upstash** | Redis | Serverless Redis, pay-per-use, global |
| **Sentry** | Error monitoring | Real-time error alerts, performance tracing |
| **Axiom** | Logging | Serverless log management, API analytics |

### 3D Rendering

| Component | Technology | Role |
|-----------|-----------|------|
| **3D Library** | React Three Fiber (R3F) | Declarative React wrapper for Three.js. Manages scene, camera, lighting, render loop as React components. |
| **3D Engine** | Three.js | WebGL 2.0 rendering pipeline. Handles meshes, materials, morph targets, skeletons, animations. |
| **Model Loading** | `@react-three/drei` `useGLTF` | Loads GLB models with morph targets and skeleton preservered. Caches via Three.js Cache. |
| **Animation** | `@react-three/drei` `useAnimations` | Manages animation mixer, crossfade between clips (idle → talking → gesture). |
| **Lighting** | Three.js Lights | Ambient (0.3) + Directional (upper-left) + subtle rim light (back-right). Creates natural face-to-face lighting. |
| **Post-processing** | `@react-three/postprocessing` | Subtle bloom on neon elements. Depth of field (shallow for focus on avatar). |

**Scene Setup:**
```
Camera:   PerspectiveCamera, fov: 50, position: [0, 1.6, 2.8]
Target:   [0, 1.4, 0] (upper chest level)
Lights:   ambientLight(0x333344, 0.4) + directionalLight(0xffffff, 0.8, [3, 4, 5])
          + rimLight(0x00ffff, 0.2, [-2, 1, -3])
Bg:       Canvas background: #000008 → #0a0a1a gradient
Shadows:  Soft shadows on avatar (ground projection)
```

**Performance Targets:**
- 60fps on M1 MacBook Air (target device)
- 30fps minimum on integrated Intel GPUs
- Model load <3s first visit, <1s cached
- <50MB GPU memory for avatar assets

### UI Components

| Component Type | Base Library | Custom Components |
|---------------|--------------|-------------------|
| **Base UI** | shadcn/ui + Tailwind CSS | Button, Card, Dialog, Input, Badge, Progress, Tabs, ScrollArea — standard elements with neon theme overrides |
| **Voice UI** | Custom components for voice controls, transcript display | RecordButton (push-to-talk with hold animation), AudioVisualizer (waveform), PushToTalkIndicator, TranscriptDisplay (scrollable chat with speaker labels) |
| **Avatar UI** | React Three Fiber | AvatarCanvas, AvatarModel, EmotionController, LipSyncDriver |
| **Scenario UI** | shadcn/ui + Custom | ScenarioCard, ScenarioList, ContextScreen, DifficultyBadge |
| **Coaching UI** | shadcn/ui + Custom | ScoreCard, TacticsList, PhraseBlock, FillerWordTable, TranscriptView, KeyMomentsTimeline |
| **Layout** | shadcn/ui + Tailwind | GlassPanel, NeonBorder, HUD, TopBar, Navigation |

**Design System:**
- Dark theme with neon accents (cyan primary, yellow highlights, green for success, red for errors)
- Glassmorphism panels for HUD and overlays
- JetBrains Mono font throughout
- Subtle glow effects on interactive elements
- Consistent 4px rounding on all cards

### Voice Handling

| Component | Technology | Role |
|-----------|-----------|------|
| **Audio Capture** | MediaRecorder API (browser native) | Captures user speech as WebM audio blobs (Opus codec). No external libraries needed. |
| **Speech-to-Text** | Groq Whisper large-v3 via `groq-sdk` | Transcribes audio blobs to text. Sub-500ms inference on LPU hardware. |
| **AI Response** | Groq Llama 3.3 70B via `groq-sdk` | Generates negotiation response + sentiment tag. Sub-500ms inference. |
| **Text-to-Speech** | ElevenLabs / PlayHT REST API | Converts AI response text to natural speech audio. |
| **Audio Playback** | Web Audio API (browser native) | Plays TTS audio with precise timing control. Handles queue management for rapid exchanges. |

**Voice Pipeline (Per Turn):**
```
1. User presses & holds spacebar
2. MediaRecorder starts capturing audio (WebM, Opus codec)
3. User releases spacebar
4. Recording stops → audio blob (~50-200KB)
5. Blob sent to POST /api/negotiate (multipart/form-data)
6. Server: Groq Whisper transcribes audio → text transcript
7. Server: Transcript + history + scenario sent to Groq Llama
8. Server: Llama returns { aiText, emotion }
9. Server: aiText sent to ElevenLabs TTS → audio URL returned
10. Response returned to frontend: { transcript, aiText, emotion, audioUrl }
11. Frontend: EmotionController starts expression blend (200ms)
12. Frontend: Web Audio API plays TTS audio
13. OVR Lip Sync drives mouth shapes from audio waveform
14. User hears response + sees avatar expression
15. User can press spacebar again to respond (AI can be interrupted)
```

**Latency Budget:**
| Step | Time | Cumulative |
|------|------|------------|
| Audio capture + network | ~200ms | 200ms |
| Groq Whisper STT | ~300ms | 500ms |
| Groq Llama AI | ~400ms | 900ms |
| ElevenLabs TTS | ~300ms | 1200ms |
| Network return + playback | ~200ms | 1400ms |
| **Total** | **~1.4s** | **<2s target** |

**Edge Cases:**
| Scenario | Handling |
|----------|----------|
| Microphone permission denied | Show instructions to enable mic. Fallback to text input. |
| Recording too short (<500ms) | Treat as silence, prompt user to speak. |
| Recording too long (>60s) | Auto-stop at 60s, process what was captured. |
| Audio too quiet | Show "speak louder" indicator during recording. |
| TTS streaming delay | Show "thinking" animation. Queue audio for sequential playback. |

**Audio Visualization:**
- Real-time waveform display during recording (analyserNode via Web Audio API)
- User sees their voice level — confirms mic is working
- AI playback shows audio progress bar with waveform
- Visual feedback: green when speaking normally, yellow when too quiet, red when clipping

### State Management

| Category | Technology | Scope |
|----------|-----------|-------|
| **Global UI State** | Zustand | User session, current phase (menu/scenario/negotiating/coaching), UI toggles |
| **Avatar State** | Zustand (separate slice) | Current emotion, expression intensity, animation state, lip-sync active flag |
| **Conversation State** | Zustand (memory) + Supabase (persistence) | Full history in DB, last 10 turns in memory for performance |
| **Audio State** | React refs (not Zustand) | MediaRecorder instance, audio chunks, playback queue — performance-critical, avoids re-renders |
| **Scene State** | React Three Fiber | Camera position, render loop, animation mixer — managed by R3F internals |
| **Server State** | React Query (TanStack Query) | API calls to /api/negotiate, /api/coach — caching, deduplication, retry, loading states |
| **Backend State** | Redis (Upstash) | Active session cache, rate limiting, request queuing |

### Backend Stack

| Layer | Technology | Responsibility |
|------|-----------|----------------|
| **Runtime** | Node.js 20+ (Next.js API routes) | Serverless functions deployed on Vercel |
| **API** | Next.js Route Handlers (App Router) | `POST /api/negotiate` — core voice pipeline. `POST /api/coach` — coaching analysis. |
| **STT** | Groq Whisper large-v3 via `groq-sdk` | `audio.transcriptions.create({ model: 'whisper-large-v3', file })` |
| **AI** | Groq Llama 3.3 70B via `groq-sdk` | `chat.completions.create({ model: 'llama-3.3-70b-versatile', messages })` |
| **TTS** | ElevenLabs / PlayHT REST API | `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}` |
| **Database** | Supabase (PostgreSQL) | Users, scenarios, sessions, coaching reports |
| **Auth** | Supabase Auth | Google OAuth, JWT management, RLS policies |
| **Cache** | Redis (Upstash) | Session state, rate limiting |
| **Storage** | Cloudflare R2 | Avatar GLB files, audio recordings |
| **Monitoring** | Sentry + Axiom | Error tracking, latency monitoring, usage analytics |

### AI Integration

| Service | SDK/Library | Usage |
|---------|-------------|-------|
| **Groq SDK** | `groq-sdk` (npm) | Single SDK for both Whisper STT and Llama 3.3 inference |
| **Whisper STT** | `groq.audio.transcriptions.create()` | Model: `whisper-large-v3`. Input: audio file (WebM). Output: text transcript. |
| **Llama 3.3 AI** | `groq.chat.completions.create()` | Model: `llama-3.3-70b-versatile`. Input: messages array with system prompt + history. Output: AI response text. |
| **ElevenLabs TTS** | REST API (fetch) | `POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}` with JSON body. Returns audio stream. |
| **PlayHT TTS** | REST API (fetch) | Alternative TTS provider. Lower latency than ElevenLabs. |

**Groq SDK Integration:**
```typescript
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Speech-to-Text
const transcription = await groq.audio.transcriptions.create({
  file: audioFile,
  model: 'whisper-large-v3',
  language: 'en',
  response_format: 'text',
});

// AI Response
const completion = await groq.chat.completions.create({
  model: 'llama-3.3-70b-versatile',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: transcript },
  ],
  temperature: 0.8,
  max_tokens: 300,
});

const aiText = completion.choices[0]?.message?.content || '';
```

### Database (PostgreSQL via Supabase)

| Entity | Table | Key Fields |
|--------|-------|------------|
| **Users** | `users` | id, email, name, avatar_url, created_at, subscription_tier |
| **Scenarios** | `scenarios` | id, title, category, difficulty, system_prompt, target_range, batna, tactics |
| **Sessions** | `sessions` | id, user_id, scenario_id, status, turn_count, start_time, end_time, score |
| **Turns** | `turns` | id, session_id, role (user/ai), content, emotion, filler_words, detected_tactic, timestamp |
| **Coaching Reports** | `coaching_reports` | id, session_id, overall_score, breakdown (jsonb), what_you_did_well (jsonb), missed_opps (jsonb), phrases (jsonb) |
| **Progress** | `progress` | id, user_id, scenario_id, attempt_count, best_score, average_score, last_practiced |

**PostgreSQL for:**
- User accounts and authentication (via Supabase Auth with RLS)
- Scenario library storage (12+ scenarios with system prompts)
- Session history and conversation turns (full transcript persistence)
- Coaching reports (structured JSON for flexible schema)
- User progress tracking (scores over time, attempt counts)
- Row Level Security: users can only access their own data

**Schema Design Principles:**
- JSONB columns for flexible coaching report structure (different scenarios have different scoring)
- Indexed on `user_id` + `created_at` for leaderboard and progress queries
- Sessions use UUIDs for collision-free distributed generation
- Turns stored as rows (not JSON array) for efficient partial loading (last 10 exchanges in memory)
- RLS policies ensure data isolation between users

**Data Flow:**
```
User signs up → Supabase Auth creates user row
User selects scenario → scenario loaded from scenarios table
User negotiates → each turn saved to turns table
User ends session → session updated with status + score
Coaching generated → coaching_report row created
User views history → sessions + reports queried by user_id
```

### Caching (Redis via Upstash)

| Use Case | Why Redis | TTL |
|----------|-----------|-----|
| **Session state** | Active negotiation sessions need fast read/write — Redis is 10x faster than PostgreSQL for this. Session restored on browser refresh. | Session TTL (30 min inactivity) |
| **Rate limiting** | Per-user API call limits to prevent abuse and manage Groq costs. Sliding window counter. | Window-based |
| **Conversation cache** | Last 10 exchanges cached in Redis for ultra-fast context retrieval. Falls back to PostgreSQL on cache miss. | Session TTL |
| **Frequent API responses** | Common scenario prompts, coaching templates, and static responses cached to reduce Groq API calls and latency. | Varies by content |
| **Avatar model cache** | GLB model URLs cached after first load. Prevents redundant downloads. | 24 hours |
| **Scenario cache** | Frequently accessed scenarios cached to reduce DB load. | 1 hour |

**Redis vs Alternatives:**
| Option | Why Not |
|--------|---------|
| In-memory (Node) | Lost on serverless cold start |
| PostgreSQL only | Too slow for session-level read/writes at scale |
| **Upstash Redis** | ✅ Serverless, pay-per-use, global, no infrastructure management |

**Prompt Engineering Strategy:**
| Prompt Type | Content | Max Tokens | Temperature |
|-------------|---------|------------|-------------|
| **Roleplay** | Full scenario system prompt defining AI personality, tactics, opening position | 500 | 0.8 |
| **Conversation** | User transcript + history formatted as chat messages | 300 (per response) | 0.8 |
| **Coaching** | Full transcript + scenario context for analysis | 500 (report) | 0.5 (more consistent) |
| **Sentiment** | Emotion extraction from user text (rule-based MVP, LLM Phase 2) | — | — |

**API Route Design:**
```
POST /api/negotiate
  Body: { transcript, scenario, history, turnNumber }
  Response: { aiText, emotion, tactics }
  Latency target: <1s

POST /api/coach
  Body: { sessionId, transcript, scenario }
  Response: { score, breakdown, whatYouDidWell, missedOpps, phrases }
  Latency target: <2s
```

---

## 3D Avatar Pipeline

### Model Acquisition

| Step | Description | Source |
|------|-------------|--------|
| **1. Base Model** | Download a pre-rigged humanoid GLB from Ready Player Me — exported as GLB/GLTF format with full morph target rigging | [readyplayer.me](https://readyplayer.me) — free tier, generates GLB with ARKit 52-blendshape morph targets |
| **2. Optimize for web** | Reduce polygon count (target: 8-15K triangles), compress textures (KTX2/Basis), Draco geometry compression | Blender (decimate modifier) + gltf-transform CLI. Target: <5MB GLB from original ~15MB. |
| **3. Avatar Creation** | User creates avatar via RPM web widget (embedded iframe) or picks from library | RPM SDK or default MVP avatar |
| **4. Export** | RPM exports GLB with skeleton + morph targets preserved | URL: `https://models.readyplayer.me/abc123.glb` |
| **5. Storage** | GLB uploaded to Cloudflare R2 for fast global CDN delivery | Cloudflare R2 with public URL, cached at edge |
| **6. Character Variants** | Same base mesh, different texture sets per scenario category | Material swaps at runtime — no model reload. 4 variants: corporate, vc, trades, property. |

### Animation System

| Animation | Source | Trigger | Crossfade |
|-----------|--------|---------|-----------|
| **Idle breathing** | Mixamo (idle standing) | Default — always playing, low intensity | 500ms |
| **Blinking** | Custom (morph target) | Every 3-5 seconds, randomized | 100ms |
| **Talking gestures** | Mixamo (talking gesture) | When AI speaks | 300ms |
| **Cross arms** | Mixamo (arms crossed) | Emotion: skeptical or frustrated | 400ms |
| **Lean forward** | Mixamo (lean forward) | Emotion: interested or happy | 300ms |
| **Lean back** | Mixamo (lean back) | Emotion: skeptical | 400ms |
| **Nod** | Mixamo (nodding) | Emotion: happy — agreement | 200ms |
| **Head shake** | Mixamo (head shake) | Emotion: frustrated — disagreement | 200ms |
| **Shrug** | Mixamo (shrug) | Emotion: skeptical — indifference | 300ms |
| **Hand wave** | Mixamo (dismissive wave) | Emotion: frustrated — dismissive | 300ms |

**Animation State Machine:**
```
                   ┌──────────┐
                   │  IDLE    │◄────────────────────┐
                   │ (breath) │                     │
                   └────┬─────┘                     │
                        │                           │
               ┌────────┴────────┐                  │
               ▼                 ▼                  │
        ┌────────────┐   ┌──────────────┐          │
        │  AI SPEAKS │   │ USER SPEAKS  │          │
        │ (gestures) │   │ (listening)  │          │
        └──────┬─────┘   └──────┬───────┘          │
               │                │                   │
               ▼                ▼                   │
        ┌─────────────────────────────┐             │
        │     EMOTIONAL GESTURE       │             │
        │  (cross arms / lean / nod)  │             │
        └─────────────┬───────────────┘             │
                      │                             │
                      └─────────────────────────────┘
```

**Implementation:**
- Animations loaded via `useAnimations()` from @react-three/drei
- Each animation is a separate GLB clip crossfading via `AnimationMixer`
- Emotion triggers call `actions[clipName].play()` with crossfade duration
- Only one body animation active at a time (idle is always lowest layer)
- Facial expressions (morph targets) are independent of body animations — both play simultaneously

### Animation Pipeline

```
1. Mixamo source → Download FBX (idle, talking, armsCrossed, leanForward, etc.)
2. Blender → Import FBX → Clean up skeleton → Export as GLB with animations
3. Three.js → Load via useGLTF() + useAnimations()
4. Animation State Machine:
   Idle (breathing, blinking)
     ↓ on AI starts speaking
   Talking (gesturing, head movement)
     ↓ on emotion tag received
   Emotional Gesture (cross arms, lean, nod)
     ↓ crossfade back
   Idle
```

### Expression Pipeline

```
1. Emotion Engine analyzes user text → determines emotion
2. Emotion tag sent to frontend with AI response
3. EmotionController reads tag → blends morph targets:
   - Skeptical: browRaiseLeft(0.7), mouthSmileLeft(0.3), headTilt(0.15)
   - Frustrated: browDown(0.9), mouthFrown(0.8), eyeSquint(0.4)
   - Happy: mouthSmile(0.9), cheekSquint(0.6), browRaise(0.2)
4. Blend over 200ms via lerp (linear interpolation)
5. Hold expression while AI speaks (1.5-3s)
6. While speaking: OVR Lip Sync drives mouth shapes from audio waveform
7. After speaking: blend back to neutral over 500ms
```

### Lip-Sync Implementation

**Option A: OVR Lip Sync (Recommended — Phoneme-Based)**

| Aspect | Detail |
|--------|--------|
| **How it works** | WebAssembly library that analyzes raw audio waveform buffer → generates phoneme (viseme) predictions in real time |
| **Input** | Audio buffer (Float32Array) from Web Audio API |
| **Output** | 15 viseme weights per frame (silence, AA, AE, AH, etc.) |
| **Latency** | <5ms per frame at 60fps |
| **Bundle size** | ~2MB WASM |
| **Pros** | Works with any audio source — no dependency on ElevenLabs viseme API. Audio-driven, not text-driven. |
| **Cons** | Less accurate than viseme data from TTS provider; requires WASM loading |

```typescript
import OVRLipSync from 'ovr-lipsync';

const lipSync = new OVRLipSync();
const visemes = lipSync.processAudio(audioBuffer);
// Returns: { sil: 0.1, PP: 0.0, FF: 0.8, AA: 0.3, ... }

// Map to morph targets
const mouthShapes = {
  jawOpen: visemes.AA * 0.8 + visemes.AE * 0.6,
  mouthClose: visemes.PP * 0.9 + visemes.BB * 0.9,
  mouthFunnel: visemes.UW * 0.7,
  mouthShrug: visemes.CH * 0.5,
};
```

**Simplified Fallback (No OVR Lip Sync): Map audio amplitude to mouth bone scale**
For cases where OVR Lip Sync WASM can't load, use a simple amplitude-based approach:
```typescript
// Get audio amplitude from AnalyserNode
const analyser = audioContext.createAnalyser();
const dataArray = new Uint8Array(analyser.frequencyBinCount);

function updateMouthFromAmplitude() {
  analyser.getByteTimeDomainData(dataArray);
  const amplitude = Math.max(...dataArray) / 128 - 1; // 0-1 range
  const jawOpen = Math.min(1, amplitude * 2);
  
  // Apply to morph target
  mesh.morphTargetInfluences[jawOpenIndex] = jawOpen;
  requestAnimationFrame(updateMouthFromAmplitude);
}
```
This is less accurate but gives passable lip movement without any dependency.

**Option B: ElevenLabs Viseme Data (TTS-Integrated)**

| Aspect | Detail |
|--------|--------|
| **How it works** | ElevenLabs TTS returns viseme array alongside audio — each viseme has `{ id: 0-21, offset_ms }` |
| **Input** | Viseme array from ElevenLabs response |
| **Output** | Pre-computed mouth shapes timed to audio |
| **Latency** | Zero — data arrives with audio |
| **Pros** | More accurate (trained on same voice model), no extra WASM bundle |
| **Cons** | Tied to ElevenLabs — can't use other TTS providers without losing lip-sync |

**Option B: Rive (State Machine-Based — 2D Fallback)**

| Aspect | Detail |
|--------|--------|
| **How it works** | Rive 2D state machine — character art with mouth shapes driven by input signals. State machine handles transitions between idle, talking, expressing. |
| **Input** | Rive state machine inputs: `isTalking: boolean`, `emotion: string`, `intensity: number` |
| **Bundle** | ~500KB (much lighter than 3D avatar) |
| **Best for** | Mobile fallback when WebGL 3D is too heavy, faster initial load, works on older devices |
| **Pros** | Lighter weight, faster to implement, runs on any device with Canvas 2D |
| **Cons** | 2D only — less immersive than 3D, limited facial nuance |
| **State Machine** | Idle → TalkStart → Talking (with mouth shapes) → TalkEnd → Idle. Emotion states layer on top. |

**Decision: MVP = Option A (OVR Lip Sync)** for 3D avatar lip-sync. **Option B (Rive)** as fallback for low-end devices and mobile. Use both — detect device capability at load time.

**Viseme → Blendshape Mapping (ARKit):**
```
OVR Viseme → ARKit Blendshape
─────────────────────────────────
sil        → jawOpen(0), mouthClose(1)
AA, AE    → jawOpen(0.7), mouthWide(0.3)
AH         → jawOpen(0.6)
BB, PP    → mouthClose(0.9), mouthPucker(0.3)
CH, JH, SH → mouthShrugUpper(0.7), jawOpen(0.3)
DD, TT    → mouthClose(0.5), tongueOut(0.2)
EE         → mouthStretch(0.6)
FF, VV    → mouthLeft(0.3), jawOpen(0.2)
IH         → jawOpen(0.3), mouthWide(0.2)
KK, GG    → mouthClose(0.7), jawOpen(0.1)
MM        → mouthClose(1.0)
OH        → mouthFunnel(0.6), jawOpen(0.3)
OO, UW    → mouthFunnel(1.0), jawOpen(0.2)
RR        → mouthStretch(0.4)
```

**Sync with AI speech timing:**
- Lip-sync starts EXACTLY when TTS audio begins playing — no pre-movement, no delay
- OVR Lip Sync processes audio waveform in a buffer ahead of playback (~100ms lookahead)
- If user interrupts AI (starts speaking), lip-sync stops immediately and resets to neutral
- After AI finishes speaking, lip-sync holds last viseme for 100ms then blends to neutral mouth over 200ms
- Edge case: if audio fails to load, lip-sync stays neutral (no orphaned moving mouth)

**Performance Target:** Lip-sync latency <50ms behind audio (imperceptible). Driver runs at 60fps.

### Emotion-to-Animation Mapping

| Emotion | Expression Morphs | Body Animation | Blend Time | Hold Time |
|---------|------------------|----------------|------------|-----------|
| Neutral | Default (relaxed face) | Idle breathing | — | Until next emotion |
| Skeptical | Brow down(0.7), mouth press(0.4), head tilt(0.15) | Arms cross or lean back | 300ms | 1.5-3s |
| Frustrated | Brow down(0.9), mouth frown(0.8), eye squint(0.4) | Arms cross, head shake | 250ms | 1.5-3s |
| Happy | Mouth smile(0.9), cheek squint(0.6), brow raise(0.2) | Lean forward, nod | 200ms | 2-4s |
| Interested | Brow raise(0.6), head tilt(0.1), slight smile(0.3) | Lean forward, focused | 250ms | 1.5-3s |
| Satisfied | Mouth smile(0.7), brow raise(0.3), relaxed eyes | Lean back, open posture | 350ms | 2-4s |

**Blend between animations for natural transitions:**
- All expression transitions use lerp (linear interpolation) over specified blend time
- Body animations crossfade: current animation fades out while new one fades in
- Never snap between expressions — always blend
- If new emotion is same as current, just extend hold duration (no re-blend)
- Interrupt gracefully: if user speaks while avatar is expressing, blend back to neutral over 300ms (prepares for next user turn)

### Performance Budget

| Stage | Time |
|-------|------|
| Model load (first visit) | <3s |
| Model load (cached) | <500ms |
| Expression transition | 150-300ms |
| Lip-sync latency | <50ms behind audio |
| Animation crossfade | 200-400ms |
| Frame rate | 60fps target |

---

## API Design

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/negotiate` | POST | Core voice pipeline: receive audio/text → STT → AI response → emotion → return |
| `/api/coach` | POST | Post-session coaching: receive full transcript → generate coaching report |
| `/api/auth/callback` | GET | Supabase Auth OAuth callback |
| `/api/scenarios` | GET | Fetch scenario library (cached) |
| `/api/sessions` | GET | Fetch user's session history |
| `/api/sessions/:id` | GET | Fetch single session with full transcript |

### POST /api/negotiate

**Request:**
```json
{
  "transcript": "I was thinking $82K would be more appropriate.",
  "scenario": "salary-entry",
  "history": [
    { "role": "assistant", "content": "We're offering $75K." },
    { "role": "user", "content": "I was thinking $82K." }
  ],
  "turnNumber": 3
}
```

**Response:**
```json
{
  "aiText": "Hmm, $82K is above our band for this level. I can do $78K with extra vacation.",
  "emotion": "skeptical",
  "intensity": 0.7,
  "tacticsUsed": ["limited-authority"],
  "turnNumber": 4
}
```

**Error Response:**
```json
{
  "error": "Negotiation engine failed",
  "details": "Groq API returned 429 (rate limited)",
  "retryAfter": 5000
}
```

### POST /api/coach

**Request:**
```json
{
  "sessionId": "abc-123",
  "transcript": "...full conversation...",
  "scenario": "salary-entry",
  "userBatna": "Competing offer at $80K",
  "targetRange": [75000, 85000]
}
```

**Response:**
```json
{
  "score": {
    "overall": 7,
    "outcome": 2,
    "tactics": 2,
    "delivery": 2,
    "adaptability": 1
  },
  "whatYouDidWell": [
    "Turn 3: Great anchoring with specific number.",
    "Turn 7: Good use of competing offer as leverage."
  ],
  "missedOpportunities": [
    "Turn 5: You accepted $78K too quickly. Silence would have gotten you $80K."
  ],
  "phrasesYouCouldHaveSaid": [
    "Instead of 'OK, $78K works', try: 'I appreciate the offer. With my competing offer at $80K, can we meet at $79K?'"
  ]
}
```
| Lip-sync latency | <50ms behind audio |
| Animation crossfade | 200-400ms |
| Frame rate | 60fps target |

---

## Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                           BROWSER (React)                               │
│                                                                         │
│  ┌────────────┐  ┌───────────────┐  ┌─────────────────┐  ┌─────────┐   │
│  │ RecordButton│  │ AvatarCanvas  │  │ CoachingReport  │  │ Scenario│   │
│  │ (push-talk) │  │ (R3F + RPM)  │  │ (score + tact.) │  │Selector │   │
│  └──────┬─────┘  └───────┬───────┘  └─────────────────┘  └─────────┘   │
│         │                 │                                             │
│  ┌──────▼─────────────────▼────────────────────────────────────────┐   │
│  │         EmotionController + OVR Lip Sync + Mixamo Animations    │   │
│  │         Drives avatar expressions + mouth + body language       │   │
│  └──────────────────────────────┬──────────────────────────────────┘   │
│                                 │                                      │
│  ┌──────────────────────────────▼──────────────────────────────────┐   │
│  │         MediaRecorder + Web Audio API                           │   │
│  │         Captures audio → plays TTS responses                   │   │
│  └──────────────────────────────┬──────────────────────────────────┘   │
└─────────────────────────────────┼──────────────────────────────────────┘
                                  │
┌─────────────────────────────────┼──────────────────────────────────────┐
│                    NEXT.JS API LAYER (Vercel)                          │
│                                                                         │
│  ┌──────────────────────────────▼──────────────────────────────────┐   │
│  │                    /api/negotiate                                 │   │
│  │  Receives transcript → Groq Whisper → Groq Llama → emotion tag  │   │
│  │  Returns { aiText, emotion, tactics }                            │   │
│  └──────────────────────────────┬──────────────────────────────────┘   │
│                                 │                                      │
│  ┌──────────────────────────────▼──────────────────────────────────┐   │
│  │                    SERVICE LAYER                                 │   │
│  │                                                                   │   │
│  │  ┌─────────────────┐  ┌──────────────────┐  ┌──────────────┐   │   │
│  │  │ Groq Whisper    │  │ Llama 3.3 70B    │  │ ElevenLabs   │   │   │
│  │  │ (STT)           │  │ (AI + Coaching)  │  │ (TTS)        │   │   │
│  │  └─────────────────┘  └──────────────────┘  └──────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    DATA LAYER                                    │   │
│  │                                                                   │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │   │
│  │  │ Supabase     │  │ Redis        │  │ Cloudflare R2        │  │   │
│  │  │ (PostgreSQL +│  │ (Upstash)    │  │ (Avatar GLBs, audio) │  │   │
│  │  │  Auth)       │  │ (Session)    │  │                      │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────┘
```

### Data Flow (Per Turn)

```
1. User presses & holds spacebar
2. MediaRecorder captures audio (WebM)
3. User releases → audio blob sent to /api/negotiate
4. Groq Whisper transcribes audio → text transcript
5. Transcript + scenario context + history sent to Groq Llama 3.3
6. Llama returns AI response text + sentiment tag
7. Frontend receives { aiText, emotion: "skeptical" }
8. EmotionController blends avatar expression (200ms)
9. Text sent to ElevenLabs TTS → audio returned
10. Web Audio API plays audio
11. OVR Lip Sync drives mouth shapes from audio waveform
12. User hears + sees avatar reaction → responds → REPEAT
13. User clicks "End Negotiation" → coaching report generated
```

---

## Interaction Flow

## User Flows

### Flow 1: First-Time User

**Entry → Onboarding → First Practice Session → Coaching → Next Steps**

| Step | Action | System Response | User Sees |
|------|--------|----------------|-----------|
| 1 | User lands on negoti8.app | Load landing page with hero + CTA | Tagline: "Practice any negotiation. Get coached by AI." 3D avatar demo on hero. Large CTA button: "Start Practicing" |
| 2 | Clicks "Start Practicing" | Google OAuth popup | "Sign in with Google" in 2 clicks |
| 3 | Authenticates | Supabase creates user, redirects to onboarding | "Welcome!" with 3-step carousel (10 seconds) |
| 4 | Sees quick tour | Shows: voice, avatar, scenarios, coaching | Brief tooltips on key UI elements |
| 5 | Selects avatar appearance (or uses default) | Opens Ready Player Me widget in a modal. User can pick from library or create custom. | Avatar selection screen with diverse options. "Use Default" skip button. Selected GLB URL saved to user profile. |
| 6 | Redirected to Dashboard | Load scenario library from DB | 12 scenarios grouped by category, difficulty badges |
| 7 | Chooses scenario (e.g., "Salary Negotiation") | User browses and clicks a scenario card. Filter by category (Salary, Fundraising, Freelance, Consumer) and difficulty. | Scenario cards show title, difficulty badge 🟢🟡🔴, brief description, and expected duration. |
| 8 | Clicks into scenario | Load scenario details from DB | Context screen: your role, AI's role, stakes, opponent personality, your BATNA, suggested tactics |
| 9 | Reads scenario brief (their role, goals, counterpart) | User reviews the context screen. Shows: who they are, who they're negotiating with, what's at stake, their best alternative, and tips. | "You are: Senior frontend engineer. You're negotiating with: a friendly recruiter. Your goal: land $82K+. Your BATNA: competing offer at $80K." |
| 10 | Selects difficulty (Easy/Medium/Hard) | Three buttons with descriptions. Easy: cooperative AI, Medium: tough but fair, Hard: uses pressure tactics. | Difficulty cards with AI behavior description per level. Recommended level highlighted. |
| 11 | Clicks "Start Negotiation" | Initialize session, select avatar variant, load scenario model | 3D avatar appears in appropriate outfit (suit for salary), neutral expression, idle breathing. Session timer starts. |
| 12 | AI speaks first via TTS | Groq Llama generates opening line based on scenario prompt | "Thanks for coming in! We're excited to offer you $75K." Avatar lip-syncs with speech. |
| 10 | User presses spacebar → speaks → releases | MediaRecorder captures audio → /api/negotiate | Recording indicator, waveform visualization |
| 11 | System processes | Groq Whisper transcribes → Llama responds → emotion detected | "Thinking..." animation |
| 12 | Avatar reacts to user's words | EmotionController blends expression | 😏 Avatar raises eyebrow, tilts head |
| 13 | AI responds with voice + lip-sync | ElevenLabs TTS plays audio | User hears response, sees avatar mouth moving |
| 14 | Repeat steps 10-13 for remaining turns | History grows, context maintained | Transcript scrolls with each exchange |
| 15 | User clicks "End Negotiation" | Session captured. `/api/coach` generates report. Avatar transitions to "coach mode" — outfit changes to professional attire with glasses, holds a clipboard/tablet prop. Expression becomes thoughtful and supportive. | Avatar in new coach outfit. Loading state: "Analyzing your negotiation..." with progress indicator. |
| 16 | Detailed feedback appears on screen | Coaching report rendered as structured UI sections. Score card, tactics list, phrase suggestions, filler word analysis. | Score (7/10) with colored badge. Breakdown bars. "What You Did Well" in green. "Missed Opportunities" in amber. "Try This Next Time" in blue. |
| 17 | User chooses next action | Three options available: Replay (same scenario, different difficulty or approach), Try Different Scenario (back to library), or Exit to Dashboard | "🔄 Replay" button — same scenario, fresh AI. "📚 Try Another Scenario" — back to library. "🏠 Dashboard" — view progress. "📄 View Transcript" — full text of negotiation. |
| 18 | User can replay, try different scenario, or exit | If replay: fresh session starts, same scenario context. If new scenario: back to library. If exit: dashboard with session history updated. | Seamless transition to next action based on choice. No loading if staying in same scenario. |

**Time estimate for first session:** 5-8 minutes from landing to coaching report.

### Flow 2: Returning User

**Login → Dashboard → Practice → Improve**

| Step | Action | System Response | User Sees |
|------|--------|----------------|-----------|
| 1 | User logs in | Auto-authenticate via persisted Google OAuth session. Load user profile from Supabase. | Dashboard loads in <1s. No re-auth needed. |
| 2 | Sees dashboard | Query recent sessions, progress summary, weakest scenarios, streak info, past sessions, average scores, improvement over time, recommended scenarios. | "Welcome back, Alex!" Dashboard sections: past sessions list (scenario, score, date, duration), average scores by category, improvement over time trend chart, recommended scenarios (AI suggests 2-3 scenarios based on weakest categories: "Try Series A Term Sheet — you scored 4/10 last time" • "Practice Scope Creep — your Freelance score dropped"), weakest category highlighted, streak tracker. |
| 3 | Views progress snapshot | Chart of scores over last 10 sessions. Weakest category highlighted. | Line chart showing improvement trend. "You're improving! +1.2 pts this week." "Weaker area: Fundraising — avg score 5.2." |
| 4 | Picks up where they left off | If user has an incomplete session, it's surfaced at the top. "You were in the middle of Series A Term Sheet. Want to continue?" | "Continue Session" card with scenario name, last turn count, time elapsed. One click restores full context. |
| 5 | Sees "Recommended Practice" | AI suggests scenarios based on weak areas. "Try Series A Term Sheet again — you scored 4/10 last time." | "Quick Practice" section with 2 recommended scenarios. "Continue where you left off" for incomplete sessions. |
| 6 | Selects a scenario | Same flow as new user (steps 8-17) but with pre-loaded context. | Familiar scenario selection with previous score displayed. "You scored 6/10 last time. Can you beat it?" |
| 6 | Practices | Full voice + avatar + coaching loop. Same as Flow 1 steps 12-16. | Same immersive experience. Avatar remembers nothing (fresh session) but user brings lessons learned. |
| 8 | Sees side-by-side comparison | Previous coaching report vs. current. Delta displayed. | "📈 +2 points! You anchored with data this time. Nice!" "Still missing: handling silence. Try the Silence Drill?" |
| 9 | Tries harder difficulty | Progresses to medium or hard after mastering easy. Same scenario, different AI behavior (tougher tactics, pressure, manipulation). | New difficulty badge. "You mastered Easy. Medium uses anchoring and silence. Ready?" Context screen updates to show harder AI personality. |
| 11 | Tracks progress over time | Dashboard updates after every session. User can see: total sessions, average score trend, best and worst categories, improvement rate, streak length. | "You've completed 15 sessions. Your average has gone from 5.2 to 7.0 (+34% improvement). Salary: 7.8 (best), Fundraising: 5.5 (needs work). Current streak: 7 days." |

### Flow 3: Post-Coaching Review

**View Report → Learn → Apply → Improve**

| Step | Action | System Response | User Sees |
|------|--------|----------------|-----------|
| 1 | User views coaching report | Full report rendered from structured JSON. | Score card with breakdown. "What You Did Well" section. "Missed Opportunities" section. |
| 2 | Reads "What You Did Well" | Specific tactics detected with turn numbers and timestamps. | Green cards with checkmarks. "Turn 3: Great anchoring with market data." "Turn 7: Effective silence after their offer." |
| 3 | Reads "Missed Opportunities" | Tactics user should have used, with alternative phrasing. | Amber cards with lightbulb icons. "Turn 5: You accepted too quickly. They would have gone higher." |
| 4 | Reviews specific phrases | Exact scripts user could have said, with context. | Blue quote boxes. "Instead of 'OK, $78K works', try: 'I appreciate the offer. With my competing offer at $80K, can we meet at $79K?'" |
| 5 | Plays back key moments in transcript | Click highlighted moments in coaching → scroll transcript to that turn. | Transcript with color-coded highlights. Green = good tactic. Red = missed opportunity. Amber = anchor/counteroffer. |
| 6 | Retries with improvements | Same scenario, fresh AI. User applies coaching feedback. | "Try Again" button. Fresh session. User arrives with strategies from coaching. |
| 7 | Compares improvement | After second session, side-by-side view of both coaching reports. | "You improved from 6/10 → 8/10! +33%!" with specific improvements highlighted.

---

## What This Proves

| Capability | Evidence |
|------------|----------|
| ✅ **Production-grade AI apps** | Full-stack Next.js + Groq + Supabase architecture |
| ✅ **Real-time voice processing** | MediaRecorder → Whisper → Llama → TTS in <2s |
| ✅ **3D graphics in web apps** | React Three Fiber + RPM + OVR Lip Sync |
| ✅ **Full-stack engineering** | Next.js, TypeScript strict, Supabase, Redis, R2 |
| ✅ **AI product thinking** | Emotion engine solves real problem, not just chatbot |
| ✅ **Prompt engineering** | 12 scenarios with personality archetypes + tactic injection |
| ✅ **Ship fast** | Zero to deployed in 4 weeks |

---

### Flow 3: Custom Scenario (Phase 2)

**Create → Configure → Practice → Save**

| Step | Action | System Response | User Sees |
|------|--------|----------------|-----------|
| 1 | User clicks "Create Custom Scenario" | Opens scenario builder form. | "Create Your Own Scenario" page with form fields. |
| 2 | Pastes job offer letter, contract, or describes the situation | User pastes text or uploads a document. System accepts: raw text, PDF, DOCX, or image (via OCR Phase 2). Groq Llama analyzes the content. | Large text area with placeholder: "Paste your job offer, contract, or describe the negotiation..." File upload button for documents. "Analyze with AI" button. |
| 3 | AI generates counterpart persona and goals | Groq Llama analyzes the pasted content and creates: AI counterpart persona (personality traits, professional background, communication style), their opening position and walk-away point, tactics they'll use against you (based on their leverage), their emotional triggers and pressure points, your leverage points and suggested BATNA, recommended negotiation strategy. | Generated scenario preview card: "Counterpart: Sarah Chen, Senior Recruiter at Acme Corp. Personality: Warm but sharp. Opens at: $155K. Walk-away: $170K. Tactics: Silence, limited authority, future promise. Your leverage: competing offer at $170K. Strategy: anchor high, mention BATNA early, trade on equity." |
| 4 | User reviews and adjusts if needed | User can edit any generated field to match their specific situation. Difficulty slider, target range input, AI personality description, tactics selection. Changes update the system prompt in real time. | Editable form pre-filled with AI's generated scenario. Fields: counterpart name, personality, opening position, walk-away point, tactics (checkboxes), user's BATNA, difficulty (Easy/Medium/Hard). "Preview" button to test. "Save" button to keep. "Regenerate" to try again. |
| 5 | Starts negotiation with custom scenario | Scenario converted to system prompt. Same voice + avatar + coaching pipeline as pre-built scenarios. Avatar appearance matches counterpart type (corporate for job offer, etc.). | Full negotiation with their real-world context. Avatar speaks as the generated counterpart. User practices their actual upcoming conversation. |
| 6 | Receives coaching tailored to their real situation | Coaching report references their actual offer terms, company name, specific numbers, and leverage points from their document. | "You had a competing offer at $170K but didn't mention it until turn 7. Mentioning it earlier would have shifted the negotiation in your favor." "Try: 'I appreciate the offer of $155K. Based on my competing offer at $170K, I was hoping we could discuss something closer to $165K.'" |
| 7 | Saves scenario and coaching for later | Scenario saved to personal library. Coaching report saved alongside. User can re-practice or share. | "Scenario Saved!" toast. Appears in "My Scenarios" on dashboard. "Share with a friend" option. |

---

## Development Roadmap

### Phase 1: MVP (Weeks 1-4)

| Week | Focus | Key Deliverables | Exit Criteria |
|------|-------|-----------------|---------------|
| **Week 1** | Core Engine | 12 scenarios with system prompts. Voice pipeline: MediaRecorder → Groq Whisper → Llama 3.3 → ElevenLabs → Web Audio. Basic UI: scenario selector, transcript display, Google OAuth. | End-to-end voice call works. User can speak, hear AI response, see transcript. |

**Week 1 Task Breakdown:**
| Day | Tasks | Deliverables |
|-----|-------|-------------|
| 1 | Set up Next.js project with TypeScript. Install deps (groq-sdk, supabase, zustand, three.js, r3f, drei). Configure Tailwind, shadcn/ui. Create directory structure. | Working Next.js app with all dependencies. |
| 2 | Integrate Groq SDK (Whisper + Llama 3). Create Groq API client. Set up environment variables. Test transcription and AI response generation. | Groq SDK installed and configured. API calls to whisper-large-v3 and llama-3.3-70b-versatile working. |
| 3 | Write /api/negotiate endpoint. Receive transcript → send to Groq Llama → return response + emotion. Test with text input. | API endpoint returns AI responses with emotion tag from text input. |
| 3 | Build RecordButton (push-to-talk). Wire MediaRecorder → /api/negotiate → Web Audio playback. | Voice round-trip working in browser. |
| 4 | Write Emotion Engine (rule-based classifier). Map user tactics → avatar emotions. Integrate emotion into /api/negotiate response. | API returns emotion tag alongside AI response. |
| 5 | Build 3 core scenarios (salary, startup, car). Write detailed system prompts for each: AI personality, opening position, tactics, stakes, BATNA. Create Scenario types. | 3 scenarios playable with distinct AI personalities. |
| 6 | Write remaining 9 scenario prompts. Expand SCENARIOS array to 12. Test each scenario for character consistency and difficulty alignment. | All 12 scenarios fully written and tested. |
| 6 | Build Google OAuth via Supabase. Create basic auth flow. Add env vars for API keys. User session persists. | Auth working. Users can sign in with Google. |
| 7 | Implement post-negotiation coaching. Build coaching prompt for Groq Llama (analyze transcript → score + tactics + phrases). Create /api/coach endpoint. Test with sample conversations. | Coaching API returns structured feedback for any conversation. |
| 8 | Build coaching report UI. Score card, what you did well, missed opportunities, specific phrases sections. Wire to /api/coach response. | Coaching report renders after user clicks End Negotiation. Full UI complete. |
| **Week 2** | Voice Integration | Full voice pipeline: MediaRecorder audio capture → Groq Whisper transcription → Llama 3.3 response → ElevenLabs TTS → Web Audio playback. Emotion analysis integrated. Push-to-talk UI. | Voice round-trip working with emotion detection. <2s latency per turn. |

**Week 2 Task Breakdown:**
| Day | Tasks | Deliverables |
|-----|-------|-------------|
| 8 | Implement MediaRecorder for audio capture. Build push-to-talk RecordButton component. Audio level visualization. Handle mic permissions. | RecordButton with hold animation, waveform display. Works on desktop + mobile. |
| 9 | Build audio upload to backend. MediaRecorder captures WebM blob → send to /api/negotiate via multipart/form-data. Backend receives blob → passes to Groq Whisper. Handle large blobs (>5MB). | Audio blob upload working end-to-end. Groq Whisper transcribes successfully. |
| 10 | Integrate Groq Whisper STT. Send audio blob → receive transcript. Handle errors (silence, too quiet, too long). | Audio → text pipeline working. Test with various audio qualities. |
| 10 | Wire full voice loop: Record → Transcribe → AI Respond → TTS Playback. End-to-end latency optimization. | Complete voice round-trip in <2s. User speaks, hears AI response. |
| 11 | Integrate Emotion Analysis into voice pipeline. Emotion tag from /api/negotiate drives frontend state. | Emotion detection working in real-time during voice conversation. |
| 13 | Create voice playback in browser. Web Audio API integration. Queue management for rapid exchanges. Auto-play AI response audio. | AI responses play automatically through browser. Audio queue handles rapid-fire turns. |
| 14 | Optimize for low latency. Profile each step (STT, AI, TTS, network). Aim for <1s total per turn. Cache connections. Stream TTS audio. | <1s end-to-end latency achieved. Voice conversation feels natural. |
| 15 | Test + polish voice pipeline. Edge cases: interruptions, silence, long responses. Mobile testing. | Stable voice pipeline. All edge cases handled. |
| **Week 3** | 3D Avatar | Ready Player Me avatar in React Three Fiber. OVR Lip Sync for mouth movement. 3 emotional expressions (skeptical, frustrated, happy). Mixamo animations. EmotionController driving avatar from AI sentiment. | Avatar responds with expressions + lip-sync during voice negotiation. |

**Week 3 Task Breakdown:**
| Day | Tasks | Deliverables |
|-----|-------|-------------|
| 16 | Download RPM avatar model. Load into React Three Fiber scene. Camera framing (face-to-face). Basic lighting. | 3D avatar visible in browser. Idle breathing animation. |
| 17 | Set up Mixamo animations. Download idle, talking, armsCrossed, leanForward, nod, headShake. Import as GLB. Wire animation state machine. | Avatar plays idle animation. Transitions between animations on trigger. |
| 18 | Implement OVR Lip Sync. Audio waveform → viseme mapping. Drive mouth morph targets. Sync with TTS playback. | Avatar mouth moves in sync with AI speech. |
| 19 | Add 3 emotional states (neutral, skeptical, happy). Build EmotionController with morph target presets. Map emotion tags → expression blends. Smooth transitions (200ms lerp). | Avatar shows neutral, skeptical, and happy expressions based on AI sentiment. Facial movements look natural. |
| 20 | Add frustrated emotional state (frown, crossed arms, head shake). Expand EmotionController to handle 4 states. Wire body animations to emotions (skeptical→armsCrossed, happy→leanForward). | Full 4-emotion system working. Body language matches facial expression. |
| 20-21 | Integrate avatar with voice pipeline. Full loop: user speaks → avatar reacts → AI responds with lip-sync + expression. Polish animations. | Complete voice + avatar loop working. |
| 22 | Performance optimization. Model caching. Frame rate targets (60fps desktop, 30fps mobile). Memory budget. | Avatar runs smoothly on target devices. |

| **Week 4** | Polish & Launch | Coaching report UI. Error handling. Mobile responsive. Demo video. Product Hunt. Launch. | Live product with real users. NPS ≥40. |

**Week 4 Task Breakdown:**
| Day | Tasks | Deliverables |
|-----|-------|-------------|
| 23 | Build coaching report UI. Score card with breakdown bars. "What You Did Well" / "Missed Opportunities" cards. Specific phrases section. Filler word table. | Coaching report rendered with full UI. All sections populated from API response. |
| 23 | UI polish with shadcn/ui. Replace raw HTML with shadcn components (Card, Badge, Progress, Tabs, ScrollArea). Consistent dark theme with neon accents. Glassmorphism panels for HUD. JetBrains Mono font. | Professional-looking UI with consistent design system. |
| 24 | Build coaching report UI. Score card with breakdown bars. "What You Did Well" / "Missed Opportunities" cards. Specific phrases section. Filler word table. | Coaching report rendered with full UI. All sections populated from API response. |
| 25 | Add transcript view with highlighted key moments. Click coaching items → scroll to transcript turn. Color-coded highlights (green=good, red=missed, amber=anchor). | Transcript scrollable with clickable highlights from coaching report. |
| 26 | Error handling: mic permission denied, API failures, network offline, empty states. Loading skeletons. Graceful degradation. | All error states handled. User never sees a crash or blank screen. |
| 26 | Mobile responsive testing. Touch-friendly RecordButton. Avatar scaling on small screens. Layout adjustments. | Works on iPhone 13+ and Android equivalents. |
| 27 | Deploy to Vercel (frontend + API). Deploy backend to Railway. Set up Cloudflare R2. Configure env vars. Custom domain. SSL. | Live URL: negoti8.app. All services connected. |
| 28 | Record demo video (2-min walkthrough). Write README with architecture diagram. Product Hunt listing. Twitter/X launch thread. LinkedIn post. | Launch assets ready. Product Hunt submitted. Social posts scheduled. |
| 29 | Soft launch: invite 50 beta users. Monitor Sentry + Axiom. Quick bug fixes. Collect NPS. | Beta users active. First metrics collected. |
| 30-31 | Launch day! Product Hunt go-live. Twitter thread. LinkedIn post. Monitor signups. Respond to comments. Fix critical bugs. | Public launch. Real users signing up. NPS collected. |

**Phase 1 Goal:** Functional voice negotiation practice with 3D avatar and post-session coaching. Users can practice 12 scenarios, see the avatar react, and get actionable feedback.

### Phase 2: Enhancement (Weeks 5-8)

| Week | Focus | Key Deliverables |
|------|-------|-----------------|
| **Week 5-6** | Expanded Scenarios | Add 7 more scenarios (19 total): house buying, contractor quote dispute, vendor B2B pricing, bill negotiation, business development partnership, procurement SaaS, internal promotion, bridge round, severance negotiation. More niche and advanced. Cover edge cases and less common negotiations. |
| **Week 7-8** | Advanced Features | Scenario builder: paste job offer/contract → AI generates counterpart persona + tactics. **Difficulty levels** for all scenarios. **Scenario recommendation engine**. **Progress dashboard** with charts, streaks. **Badge/achievement system**. **Voice analytics** (filler word trends, tone, pace). **Conversation export (PDF)**. **User onboarding flow** — interactive tutorial for first-time users. **Email notifications** — weekly progress report: "You completed 5 sessions this week. Your score improved by 1.5 points!". Streak reminders: "You're on a 7-day streak! Keep it going!". Scenario recommendations based on weak areas. |

### Phase 3: Scale (Weeks 9-12)

| Week | Focus | Key Deliverables |
|------|-------|-----------------|
| **Week 9-10** | Mobile App (React Native) | Build React Native version of Negoti8. Use expo-three for 3D rendering. Optimized models for mobile GPUs. Push notifications for practice reminders and streak alerts. **Sync progress with web app** — same Supabase backend, same account, seamless handoff between web and mobile. **Optimize for mobile voice input** — touch-based push-to-talk, one-handed operation, voice detection on mobile browsers. Handle iOS Safari's stricter audio autoplay policies. Test on iPhone 13+ and Pixel 6+. Offline mode — download scenarios, practice with lightweight AI, sync results when online. **Submit to App Store and Play Store** — prepare app store listings, screenshots, demo video, privacy policy. Handle review process. |
| **Week 11-12** | Advanced AI + API + Enterprise | **LLM-based emotion classification**. **Adaptive difficulty**. **Multi-user negotiation**. **Cultural negotiation styles**. **Industry-specific scenarios** (tech, finance, healthcare, legal). **Build API for third-party integrations** — REST API for embedding Negoti8 scenarios into other platforms (LMS, HR systems, sales training platforms). Webhook support for custom integrations. Partner integrations: LinkedIn (import profile → generate salary scenario), Glassdoor/Levels.fyi (real market data for salary benchmarks). **7+ avatar emotions**. **Enterprise tier** with team management, analytics dashboard, custom branding, SSO. |

---

## Deferred to Phase 2

| Feature | Reason |
|---------|--------|
| Remaining 7+ scenarios | Launch with 12, add more based on usage data |
| Progress tracking dashboard | Charts are polish, not core |
| Badge system | Gamification after retention is proven |
| Custom scenarios (paste job offer) | Complex document parsing |
| Multiplayer mode | Real-time networking is heavy |
| Mobile app (React Native) | Validate web MVP first |
| Voice analytics (tone, pace) | Cool but not essential for coaching value |
| Custom avatar creation | Default RPM avatar works for launch |
| PDF export | Transcript on screen is enough for MVP |
| Enterprise pricing/teams | B2B features after product-market fit |

---

## Success Metrics

### Session Metrics
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Sessions per user / week | ≥3 | Session count / active users / 7 days |
| Session length | 8-12 min | Average time from start to End Negotiation. Includes speaking turns + coaching review. |
| Time spent in app per session | 8-12 min | Total time from session start to exit (includes negotiation + coaching review + transcript browse). |
| Average exchanges per session | 7-10 | Total turns (user + AI) per completed session. Measures depth of conversation. |
| Session completion rate | ≥80% | Completed sessions / started sessions |
| Retry rate | ≥40% of sessions | Sessions with 

### Retention Metrics
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Day 1 retention | >40% | Users who return within 24 hours of first session |
| Day 7 retention | >25% | Users who complete at least 1 session in days 2-7 |
| Day 30 retention | ≥15% | Users who complete at least 1 session in days 8-30 |
| Streak rate (7+ days) | ≥10% of active users | Users with consecutive daily practice for 7+ days |

### Usage Metrics
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Sessions per user per week | 2-3 | Average sessions per active user per 7-day period. Measures habit formation. |
| Scenarios tried per user (first 30 days) | ≥5 | Distinct scenarios completed per user |
| Retry rate on low scores | ≥40% | % of sessions scoring <6/10 that are retried within 7 days |
| Difficulty progression | ≥30% of users move from Easy to Medium/Hard within 14 days | Users leveling up difficulty |
| Voice input rate | >90% of sessions | % of sessions using voice (not text fallback) |
| Session completion rate | >80% | Completed / started |
| Daily active users (Month 1) | >100 | Unique users per day after launch |

### Learning Metrics
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Average score increase over 5 sessions | +2 points | Compare first 2 sessions on a scenario vs sessions 5-6 on same scenario. Measures skill building. |
| % of users who improve | >70% | % of users whose score on session 5+ is higher than session 1. Measures overall effectiveness. |
| Anchoring by session 3 | >50% | % of users who use anchoring (setting a specific number first) by their 3rd session. Anchoring is the #1 negotiation skill. |
| BATNA mention by session 5 | >40% | % of users who reference a competing offer or alternative by session 5. Shows they're learning leverage. |
| Silence usage by session 5 | >30% | % of users who use strategic silence (short response that prompts AI to fill gap). Hardest skill to learn. |
| Average distinct tactics used per session (session 1 vs 10) | 2 → 5 | Growth in tactic vocabulary: from basic (accept/reject) to advanced (anchor, BATNA, silence, trade-off, empathy) |
| % of users who use BATNA mention by session 5 | >40% | BATNA is the second most powerful tactic — users should learn to leverage alternatives |
| Average distinct tactics used per session (session 1 vs 10) | 2 → 5 | Growth in tactic vocabulary: from basic (accept/reject) to advanced (anchor, BATNA, silence, trade-off, empathy) |
| Filler word reduction after 10 sessions | -30% | Average filler word count per turn, session 1 vs session 10 |
| Average coaching report rating | ≥4/5 | User rating: 

### Business Metrics

**Conversion:**
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Free → Paid conversion rate | ≥5% | % of registered users who subscribe to Pro |
| Free trial activation | ≥60% | % of signed-up users who complete at least 1 session |
| Paid user upgrade within 7 days | ≥30% of conversions | % of paying users who upgrade within first week |
| Payment method success rate | >95% | Successful transactions / attempted transactions |

**Growth:**
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Monthly active users (MAU) | 10,000+ by month 6 | Unique users who complete ≥1 session per month |
| User growth rate | >20% month-over-month | New users / previous month total |
| Organic signup rate | >60% | Users who found the product via search, referral, or social (not paid ads) |
| Referral rate | ≥0.3 per user | Invitations sent / active users |

**Revenue:**
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Monthly Recurring Revenue (MRR) | $5K by Month 3 | Pro subscribers × $19/mo |
| Average Revenue Per User (ARPU) | $15-20/month | Total revenue / total users (including free). Blend of free ($0) and Pro ($19) users. |
| Annual Run Rate (ARR) | $60K by Month 6 | MRR × 12 |
| Customer Acquisition Cost (CAC) | <$50 | Marketing spend / new paid users |

**Retention:**
| Metric | Target | How to Measure |
|--------|--------|----------------|
| Monthly churn (paid) | <8% | % of paid users who cancel each month |
| NPS (Net Promoter Score) | ≥50 | Survey: "Would you recommend Negoti8 to a friend?" (0-10) |
| LTV:CAC ratio | ≥3:1 | (ARPU / churn rate) / CAC. Target: $750 LTV / $250 CAC |
| Payback period | <3 months | Time to recover CAC from a paid user |

### Satisfaction Metrics
| Metric | Target | How to Measure |
|--------|--------|----------------|
| NPS (Net Promoter Score) | ≥50 | "How likely are you to recommend Negoti8?" 0-10 scale. Promoters (9-10) — Detractors (0-6). |
| Coaching accuracy rating | ≥4.2/5 | "Did the coaching feedback accurately reflect your performance?" Post-session survey. |
| Avatar realism rating | ≥3.8/5 | "How natural did the avatar's reactions feel?" Monthly survey. |
| Voice quality rating | ≥4/5 | "How clear and natural was the voice conversation?" Post-session survey. |
| Scenario realism rating | ≥4/5 | "How realistic did the scenario feel?" After first session per scenario. |
| Would you recommend? (top box) | >50% | % who respond 9-10 on NPS. Strongest indicator of product-market fit. |
| App store rating (if mobile) | >4.5/5 | App Store and Google Play ratings. Indicates user satisfaction with the experience. |
| Customer support tickets | <5% of active users | % of monthly active users submitting a support ticket. Lower = better UX. |
| Average response time | <2 hours | Time from ticket submission to first human response. Target: <1 hour during business hours. |
| CSAT (satisfaction with support) | >90% | Post-ticket survey: "How satisfied were you with support?" | 
| Tier | Price | What You Get |
|------|-------|-------------|
| Free | $0 | 5 sessions/mo, 5 scenarios |
| Pro | $19/mo ($190/yr) | Unlimited sessions, all 12 scenarios, detailed coaching |
| Enterprise | Custom | Team dashboards, custom scenarios, API access |

---

## Why This Matters

> *"It feels like negotiating with a real person — not a chatbot."*

Real negotiations are **emotional, not just logical**. If you can't see the other person's reaction, you're practicing blindfolded.

**You learn to:**
- Read body language and adjust tactics in real time
- Regulate emotions when faced with pressure tactics
- Build muscle memory through multisensory repetition

**Text chatbots teach you *what* to say.**
**NegotiateAI teaches you *when* to say it, *how* to say it, and what to expect in response.**

> *After 20 skeptical eyebrow raises, a real one won't phase you.*
> *Silence isn't just awkward in real life — it's awkward with an avatar that fidgets.*
> *You build emotional intelligence, not just tactical knowledge.*

---

## Technical Requirements

### Performance

| Component | Target | Measurement |
|-----------|--------|------------|
| Voice-to-text transcription | <300ms | Groq Whisper large-v3 inference time |
| AI response generation | <200ms | Groq Llama 3.3 70B inference time (first token) |
| Text-to-speech conversion | <300ms | ElevenLabs / PlayHT API response time |
| Total end-to-end latency | <800ms | MediaRecorder → STT → AI → TTS → Web Audio. Groq LPU makes sub-500ms inference feasible for both STT and AI. |
| Avatar expression transition | <200ms | Morph target blend (lerp) |
| Lip-sync latency | <50ms behind audio | OVR Lip Sync viseme-to-audio offset |
| Initial page load | <3s | Next.js SSR + avatar GLB load (cached: <500ms) |
| Frame rate (desktop) | 60fps | Three.js render loop on M1+ |
| Frame rate (mobile) | 30fps minimum | Three.js render loop on iPhone 13+ |
| API response time (p95) | <2s | All API endpoints under load |
| Uptime | 99.5% | Vercel + Railway SLA |

### Compatibility

| Platform | Support | Notes |
|----------|---------|-------|
| Desktop Chrome | ✅ Primary target | Full WebGL 2.0 + MediaRecorder + Web Audio support |
| Desktop Firefox | ✅ Supported | May need vendor prefix checks |
| Desktop Safari | ✅ Supported | Requires Safari 16.4+ for MediaRecorder |
| Desktop Edge | ✅ Supported | Chromium-based, full support |
| Mobile Chrome (Android) | ✅ Supported | Touch-based push-to-talk, mobile audio handling |
| Mobile Safari (iOS) | ⚠️ Requires testing | Stricter autoplay policies, WebAudio restrictions |
| Mobile Firefox | ⚠️ Partial | Limited MediaRecorder support |
| Next.js / SSR | ✅ Fully supported | Vercel deployment, App Router |
| React Native (Phase 2) | 📱 Planned | iOS + Android via Expo |

### Browser APIs Required

| API | Required For | Fallback |
|-----|-------------|----------|
| `MediaRecorder` | Audio capture | Text input fallback |
| `getUserMedia` | Microphone access | Permission prompt with instructions |
| `AudioContext` | Audio playback, analysis | None (core feature) |
| `AnalyserNode` | Audio visualization | Static waveform placeholder |
| `WebGL 2.0` | Three.js 3D rendering | Rive 2D avatar fallback |
| `WebSocket` (Phase 2) | Real-time events | Polling fallback |
| `Cache API` | GLB model caching | Standard HTTP cache |

### Data Requirements

| Data Type | Storage | Retention |
|-----------|---------|-----------|
| User profiles | Supabase PostgreSQL | Until account deletion |
| Session transcripts | Supabase PostgreSQL | 12 months (for coaching analysis) |
| Audio recordings | Cloudflare R2 | 30 days (for review) |
| Avatar GLB models | Cloudflare R2 + CDN | Indefinite (static assets) |
| Coaching reports | Supabase PostgreSQL | 12 months |
| Usage analytics | Axiom | 24 months (aggregated) |
| Error logs | Sentry | 90 days |

### Security

| Requirement | Implementation |
|-------------|----------------|
| **Encryption** | Encrypt all audio files at rest and in transit. HTTPS everywhere (TLS 1.3). Audio files in Cloudflare R2 encrypted at rest (AES-256). |
| **Audio data protection** | Encrypt all audio files at rest and in transit. Audio processed in memory, not written to disk server-side. Cloudflare R2 SSE-S3 encryption. User can delete recordings at any time. |
| **API key protection** | Secure API keys in environment variables (Vercel Environment Variables, encrypted at rest). Never exposed to client-side code. Server-only API routes verify before processing. |
| **Authentication** | Google OAuth via Supabase. JWT tokens with expiry. No password storage (delegated to Google). |
| **Authorization** | Row Level Security (RLS) on all Supabase tables. Users can only read/write their own data. |
| **Input validation** | All API inputs validated with TypeScript types + runtime checks (zod). Audio files validated for type and size. |
| **Rate limiting** | 60 requests/minute per user on /api/negotiate. 10 requests/minute on /api/coach. Prevents abuse and cost spikes. |
| **Dependency security** | npm audit in CI pipeline. Dependabot auto-updates. Weekly manual review of critical dependencies. |
| **Data retention** | Audio files: 30 days auto-delete. Transcripts: 12 months. Users can request immediate deletion at any time. |
| **GDPR compliance** | Data export available. Account deletion with all data removed. Privacy policy and terms of service published. |
| **Vulnerability reporting** | Security.txt file. Contact email for responsible disclosure. 72-hour response SLA for critical issues. |

---

## Executive Summary

### Privacy

| Requirement | Implementation |
|-------------|----------------|
| **Data minimization** | Don't store audio files longer than necessary — 30-day auto-delete policy. Transcripts kept 12 months for coaching analysis, then anonymized. |
| **User control** | Allow users to delete conversation history at any time. One-click delete from dashboard. All associated data (transcripts, audio, coaching reports) removed within 24 hours. |
| **GDPR & CCPA compliance** | Comply with GDPR and CCPA requirements. Data export available (JSON/CSV). Right to be forgotten. Data Processing Agreement (DPA) available. Privacy policy published with clear language on data collection, usage, and retention. |
| **Clear privacy policy** | Clear privacy policy on data usage — what we collect (audio, transcripts, email, usage data), why we collect it (coaching, improvement), who we share it with (no third parties), how long we keep it. Plain language, no legalese. |
| **Voice data** | Audio recordings are only used to generate transcripts and coaching reports. Never listened to by humans. Never used for training. Deleted after 30 days. |
| **Analytics** | Usage analytics anonymized after 30 days. No personal data in analytics. Users can opt out of analytics. |
| **Third-party data sharing** | No user data sold to third parties. Groq and ElevenLabs process audio/text transiently (no storage). Supabase hosts data with SOC 2 compliance. |

## Accessibility

| Requirement | Implementation |
|-------------|----------------|
| **WCAG 2.1 AA** | Target WCAG 2.1 AA compliance for all UI components. Color contrast ratios ≥4.5:1 for text. Keyboard navigable. Screen reader compatible (ARIA labels). |
| **Voice alternative** | Text input available as alternative to voice for users who cannot use microphones. Coaching reports and transcripts readable without audio. |
| **Visual alternatives** | Avatar expressions accompanied by text labels ("Skeptical — raised eyebrow"). Coaching report provides text analysis (no audio required to benefit). |
| **Motion sensitivity** | Reduced motion mode — disable avatar animations, screen shake, and particle effects. Respects `prefers-reduced-motion` OS setting. |
| **Color blindness** | Don't rely solely on color to convey information. Use icons + text + color together. Test with deuteranopia, protanopia, tritanopia simulations. |
| **Font & readability** | JetBrains Mono at minimum 14px body text. Configurable font size. No text embedded in images. High contrast mode supported. |
| **Screen reader support** | All interactive elements have ARIA labels. Dynamic content (avatar expressions, transcript updates) announced via aria-live regions. Alt text on all images and icons. |

---

## Executive Summary

### Requirements

#### Functional Requirements

| ID | Requirement | Priority | Category |
|----|-------------|----------|----------|
| FR-01 | User can speak into microphone and hear AI voice response | P0 | Voice |
| FR-02 | 3D avatar displays facial expressions and lip-sync | P0 | Avatar |
| FR-03 | User can select from 12 pre-built negotiation scenarios | P0 | Scenarios |
| FR-04 | Post-session coaching report with score and feedback | P0 | Coaching |
| FR-05 | Google OAuth authentication | P0 | Auth |
| FR-06 | Conversation history maintained across all turns | P0 | Conversation |
| FR-07 | Avatar reacts emotionally based on user's negotiation tactics | P0 | Emotion |
| FR-08 | User can retry a scenario after receiving coaching | P1 | Coaching |
| FR-09 | Difficulty levels (Easy/Medium/Hard) change AI behavior | P1 | Scenarios |
| FR-10 | Coaching report includes specific phrases user could have said | P1 | Coaching |
| FR-11 | Filler word analysis ("um", "uh", "like") | P1 | Coaching |
| FR-12 | User dashboard with session history and scores | P2 | Dashboard |
| FR-13 | Custom scenario creation by pasting job offer/contract | P2 | Scenarios |
| FR-14 | Mobile responsive web design | P1 | UI |
| FR-15 | Text input fallback when microphone unavailable | P1 | Voice |

#### Non-Functional Requirements

| ID | Requirement | Target | Category |
|----|-------------|--------|----------|
| NFR-01 | Voice-to-text latency | <300ms | Performance |
| NFR-02 | AI response generation | <200ms first token | Performance |
| NFR-03 | Text-to-speech conversion | <300ms | Performance |
| NFR-04 | End-to-end per turn latency | <800ms | Performance |
| NFR-05 | Avatar frame rate (desktop) | 60fps | Performance |
| NFR-06 | Avatar frame rate (mobile) | 30fps minimum | Performance |
| NFR-07 | Initial page load | <3s | Performance |
| NFR-08 | Concurrent users | 1,000+ | Scalability |
| NFR-09 | API throughput | 10,000 req/min | Scalability |
| NFR-10 | Conversation storage | 1M+ records | Scalability |
| NFR-11 | Uptime | 99.5% | Reliability |
| NFR-12 | Captions for all audio content | Transcript displayed in real-time during voice conversation | Accessibility |
| NFR-13 | Keyboard navigation for all controls | Full keyboard operability (Tab, Enter, Space, Escape) | Accessibility |
| NFR-14 | Screen reader compatibility | ARIA labels, live regions, alt text on all elements | Accessibility |
| NFR-15 | High contrast mode | Respects prefers-contrast: high. All text meets WCAG AA 4.5:1 | Accessibility |
| NFR-16 | HTTPS everywhere | TLS 1.3, HSTS headers | Security |
| NFR-17 | API key protection | Server-side only, Vercel env vars, never exposed to client | Security |
| NFR-18 | Audio file encryption | AES-256 at rest (Cloudflare R2), TLS 1.3 in transit | Security |
| NFR-19 | Rate limiting | 60 req/min on /api/negotiate, 10 req/min on /api/coach | Security |
| NFR-20 | GDPR/CCPA compliance | Data export, delete, privacy policy | Privacy |

### Risks and Mitigations

#### Risk 1: High API Costs

| Aspect | Detail |
|--------|--------|
| **Risk** | AI API costs (Groq Whisper + Llama + ElevenLabs TTS) scale linearly with usage. If a user practices 50 sessions/month, cost could reach $1-3/user. At 10,000 users, that's $10-30K/month. |
| **Mitigation** | Groq is highly competitive (~$0.10/1M tokens for Llama). TTS costs are minimal (~$0.001/session). Target cost: <$0.02/session at scale. Free tier limits sessions/month. Pro tier economics work ($19/mo vs ~$1 cost = 95% margin). |
| **Contingency** | Switch to PlayHT for cheaper TTS. Batch coaching analysis to lower-priority queue. Cache common scenario responses. |

#### Risk 2: Low User Retention

| Aspect | Detail |
|--------|--------|
| **Risk** | Users try once, get coaching, but don't return. Negotiation practice is a "when you need it" activity, not a daily habit. |
| **Mitigation** | Streak system, email reminders, push notifications. "Quick Practice" mode (2-min sessions). Scenario recommendations based on weak areas. New scenarios added monthly. |
| **Contingency** | Pivot to B2B (companies buy for employee training). Annual subscriptions. Partner with career coaches. |

#### Risk 3: Avatar Uncanny Valley

| Aspect | Detail |
|--------|--------|
| **Risk** | The 3D avatar's expressions and lip-sync feel unnatural, making users uncomfortable instead of engaged. |
| **Mitigation** | Stylized (not photorealistic) art style — less uncanny. Smooth expression transitions (200ms). Test extensively with beta users. Rive 2D fallback if 3D isn't working. |
| **Contingency** | Remove 3D avatar entirely (revert to voice-only with expression indicators). Add back when quality improves. |

#### Risk 4: Voice Quality Issues

| Aspect | Detail |
|--------|--------|
| **Risk** | STT accuracy drops with accents, background noise, or low-quality microphones. TTS voices sound robotic. Latency spikes break conversation flow. |
| **Mitigation** | Groq Whisper large-v3 handles accents well. Test with diverse voices in beta. ElevenLabs TTS is most natural on market. Text fallback always available. |
| **Contingency** | Provide text chat as primary fallback. Allow users to skip TTS and read responses. Multiple TTS voice options. |

#### Risk 5: Competition

| Aspect | Detail |
|--------|--------|
| **Risk** | Larger AI companies (OpenAI, Google, Anthropic) or existing edtech platforms (LinkedIn Learning, Coursera) build similar products with more resources. |
| **Mitigation** | Emotional 3D avatar is hard to replicate. Voice-first + coaching + avatar combination is our moat. First-mover advantage in this niche. Focus on depth (coaching quality) over breadth. |
| **Contingency** | Pivot to B2B enterprise (harder for large companies to compete). Build custom scenario marketplace. Partner with business schools. |

#### Risk 6: Regulatory / Privacy

| Aspect | Detail |
|--------|--------|
| **Risk** | Audio recording raises privacy concerns. GDPR, CCPA, and potential AI regulations. Users may not trust the platform with voice data. |
| **Mitigation** | Clear privacy policy. Audio auto-deleted after 30 days. Never used for training. Encryption everywhere. GDPR/CCPA compliant from day one. SOC 2 in Phase 2. |
| **Contingency** | Make audio recording optional (text-only mode). On-device processing for STT (Phase 3). Anonymize all training data. |

---

## Executive Summary

**Mitigation Strategies for API Costs:**

| Strategy | Implementation | Estimated Savings |
|----------|---------------|------------------|
| **Implement caching for common responses** | Cache frequently used scenario prompts, opening lines, and common AI responses in Redis. Cache keyed by (scenario_id, difficulty, turn_number). Reduces duplicate API calls by 30-50%. | 30-50% reduction in API calls |
| **Use Groq's free tier aggressively** | Groq provides generous free tier ($10/month free credits). Use for development and beta testing. Monitor usage to stay within limits. | $0 during dev/beta |
| **Lower TTS quality for fallback** | Use PlayHT's faster/cheaper voices for non-critical responses. Reserve ElevenLabs high-quality voices for premium tier. | 50-80% reduction in TTS costs |
| **Batch coaching analysis** | Run coaching analysis on a queue with lower priority. Users wait 2-5 seconds instead of instant. Reduces peak API load. | Smoother cost curve |
| **Session limits per tier** | Free tier: 5 sessions/month. Pro tier: unlimited but rate-limited (60 req/min). Enterprise: custom limits. Aligns cost with revenue. | Costs scale with paying users only |
| **Cache GLB models at edge** | Avatar models cached on CDN (Cloudflare R2). No repeated download costs. | $0 after first load |
| **Monitor and alert on cost spikes** | Set up budget alerts in Groq and ElevenLabs dashboards. Automated pause if costs exceed threshold. | Prevents surprise bills |
