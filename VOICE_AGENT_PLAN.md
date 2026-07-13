# Real-Time Voice Agent — 1 Hour Sprint

## The Trick
No LiveKit. No heavy infra. Pure browser APIs + Groq streaming.
Get 90% of the Siri feel with 10% of the complexity.

## 4 Tasks, 15 min each

### 1. Voice Activity Detection Hook (15 min)
File: `src/lib/voice/useVoiceActivity.ts`
- AudioWorklet monitors mic volume
- Auto-start recording when voice detected
- Auto-stop after 1.5s silence
- No button holding needed

### 2. Streaming Voice API (15 min)  
File: `src/app/api/voice-stream/route.ts`
- Accept audio blob
- Groq Whisper STT (~200ms)
- Groq Llama streaming response
- Groq PlayAI TTS streaming back
- Returns NDJSON chunks: `{type: "text"|"audio", data: "..."}`

### 3. Voice Agent Hook (15 min)
File: `src/lib/voice/useVoiceAgent.ts`
- Orchestrates: VAD → record → send → stream play
- Handles interruption (user speaks = cancel current)
- Manages states: idle → listening → thinking → speaking

### 4. Wire Into Page (15 min)
File: `src/app/page.tsx`
- Replace RecordButton with auto-listening UI
- Show "Listening..." / "Thinking..." / "Speaking..." states
- Emotion updates from streaming text
- Keep old push-to-talk as fallback

## Architecture
```
Browser mic → AudioWorklet (VAD) → MediaRecorder
  → POST /api/voice-stream (NDJSON)
    → Groq Whisper (STT)
    → Groq Llama (streaming text)
    → Groq PlayAI (streaming audio)
  ← chunks: {type:"text"} → update UI
  ← chunks: {type:"audio"} → Web Audio play
  ← if user speaks → abort controller kills stream
```

## Latency Target
- VAD detection: ~100ms
- STT: ~200ms  
- First LLM token: ~300ms
- First TTS audio: ~500ms
- Total "Siri feel": <1s response time
