# Talking Avatar Research — GitHub Best Options

## Top Contenders (ranked for Negotia8 use case)

### 1. MuseTalk — BEST FIT
- **Repo:** `TMElyralab/MuseTalk`
- **Stars:** 7k+
- **What:** Real-time lip sync at 30fps+ from single image + audio
- **Why it wins:** Fast enough for voice agents, good quality, actively maintained
- **Latency:** ~100ms per frame
- **Requirements:** NVIDIA GPU (4GB+ VRAM)
- **License:** CC-BY-NC-SA 4.0 (non-commercial)

### 2. LivePortrait
- **Repo:** `KwaiVGI/LivePortrait`
- **Stars:** 13k+
- **What:** Fast portrait animation with expression control
- **Pros:** Very fast, supports emotion expressions, good quality
- **Cons:** Needs driving video or keypoints, not pure audio-driven
- **Latency:** ~50ms per frame (fastest)
- **Requirements:** NVIDIA GPU

### 3. SadTalker
- **Repo:** `OpenTalker/SadTalker`
- **Stars:** 14k+
- **What:** Single image → talking head with head motion
- **Pros:** Most popular, well-documented, good emotion from audio
- **Cons:** Slower (~500ms/frame), older architecture
- **Requirements:** NVIDIA GPU (4GB+)

### 4. Hallo2
- **Repo:** `fudan-generative-vision/hallo2`
- **Stars:** 3.7k+
- **What:** Long-duration, high-resolution talking head
- **Pros:** Best quality, supports long conversations
- **Cons:** Slower, heavier model
- **Requirements:** NVIDIA GPU (8GB+)

### 5. Wav2Lip
- **Repo:** `Rudrabha/Wav2Lip`
- **Stars:** 10k+
- **What:** Lip sync any face to any audio
- **Pros:** Simple, reliable lip sync
- **Cons:** Only lips move, no emotion/head movement
- **Requirements:** NVIDIA GPU (2GB+)

### 6. Browser-Only Option: Ready Player Me + OVR Lip Sync
- **No GPU needed** — runs entirely in browser
- **Pros:** Zero server cost, instant load, works on Vercel
- **Cons:** Less realistic, limited emotion expressions
- **How:** RPM avatar (GLB) + OVR Lip Sync WASM + blendshape animations
- **Stars:** RPM SDK is industry standard

---

## Recommendation for Negotia8

### Option A: MuseTalk Server (Best Quality)
```
Browser mic → /api/voice-stream → Groq STT+LLM+TTS
                                → MuseTalk server (Python)
                                → Stream video frames via WebSocket
                                → Browser renders video element
```
**Pros:** Realistic, real-time, emotion from audio
**Cons:** Needs GPU server ($50-100/mo on RunPod/Lambda)

### Option B: Ready Player Me + Expressive Animations (Best for Vercel)
```
Browser mic → /api/voice-stream → Groq STT+LLM+TTS
                                → Return emotion tags
                                → Browser drives RPM avatar blendshapes
```
**Pros:** Free, runs on Vercel, no GPU needed
**Cons:** Less realistic, but clear emotion display

### Option C: Hybrid — DiceBear + Emotion Animations (Current, Enhanced)
```
Keep current 2D avatar but add:
- CSS emotion animations (shake, nod, lean)
- Dynamic facial expression overlays
- Particle effects per emotion
```
**Pros:** Zero cost, instant, already deployed
**Cons:** 2D, not "realistic"

---

## My Pick: Option B (Ready Player Me)

For a voice AI agent that "feels like Siri," the browser-native approach is better because:
1. No GPU server cost
2. Instant loading (no model download)
3. Works on Vercel (current hosting)
4. Clear emotion display through blendshapes
5. Industry standard (RPM is used by Meta, Microsoft)

The key insight: users don't need photorealism for emotion. They need CLEAR emotion signals.
RPM avatars with expressive blendshapes (eyebrow raise, smile, frown) communicate emotion
better than a blurry real-time video feed.
