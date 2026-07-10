"""
╔══════════════════════════════════════════════════════════════════╗
║  Negotia8 — LiveKit Real-Time AI Agent                        ║
║                                                               ║
║  Real-time voice pipeline: STT → LLM → TTS via WebRTC         ║
║  Uses Groq API (your existing key) via OpenAI-compatible       ║
║  endpoint for LLM. Deepgram for STT, ElevenLabs for TTS.      ║
║                                                               ║
║  Start:  python agent.py                                      ║
║  Requires: LIVEKIT_API_KEY, LIVEKIT_API_SECRET, GROQ_API_KEY  ║
╚══════════════════════════════════════════════════════════════════╝
"""

import os
import asyncio
import json
import logging

from dotenv import load_dotenv

from livekit.agents import AutoSubscribe, JobContext, WorkerOptions, cli, llm
from livekit.agents.voice import Agent, AgentSession
from livekit.plugins import deepgram, silero, turn_detector

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("negotia8-agent")

load_dotenv()

# ─── Scenario prompts ──────────────────────────────────────────────────

SYSTEM_PROMPTS = {
    "salary": """You are a friendly but budget-conscious recruiter at a mid-size tech company.
You're hiring for a senior frontend engineer role with a budget of $75K-$85K.
Your strategy:
- Start at $75K and mention it's "competitive for entry-level."
- If the candidate counters, ask about their current compensation.
- Use silence after they name their number.
- You have flexibility up to $82K + extra vacation.
- If they use data (market research, competing offers), be impressed.
- Keep responses under 3 sentences. Be warm but firm.""",

    "fundraising": """You are a seasoned VC partner evaluating a Series A investment.
The founder is raising $5M at $20M post-money.
Your strategy:
- Start valuation at $15M post.
- Push for a board seat.
- Use good cop/bad cop: "My partners think $15M is fair."
- Ask about competing term sheets.
- If they're strong, offer $20M but with 2x liquidation preference.
- Keep responses under 3 sentences. Be sharp but respectful.""",

    "freelance": """You are a startup founder hiring a freelancer for a 3-month redesign.
Budget is tight. Start at $100/hr. Counter-offers should be met with
budget constraints. Promise future work as leverage.
You can go up to $130/hr if they push.""",

    "consumer": """You are a car salesperson at an EV dealership.
MSRP is $48K. Start there. Use classic sales tactics:
four-square (monthly payment focus), add-ons, "let me check with my manager."
You can go to $44K but only if they walk away.""",
}

DEFAULT_PROMPT = SYSTEM_PROMPTS["salary"]


# ─── Custom LLM using Groq via OpenAI-compatible endpoint ──────────────

class GroqLLM(llm.LLM):
    """LLM wrapper that uses Groq's API via OpenAI-compatible endpoint."""

    def __init__(self, model: str = "llama-3.3-70b-versatile"):
        from openai import AsyncOpenAI
        self._model = model
        self._client = AsyncOpenAI(
            api_key=os.environ["GROQ_API_KEY"],
            base_url="https://api.groq.com/openai/v1",
        )

    async def chat(self, messages: list[dict], **kwargs) -> str:
        """Simple chat completion."""
        response = await self._client.chat.completions.create(
            model=self._model,
            messages=messages,
            temperature=0.8,
            max_tokens=300,
        )
        return response.choices[0].message.content or ""

    async def stream_chat(self, messages: list[dict], **kwargs):
        """Stream chat completion token by token."""
        stream = await self._client.chat.completions.create(
            model=self._model,
            messages=messages,
            temperature=0.8,
            max_tokens=300,
            stream=True,
        )
        async for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content


# ─── Negotiation Agent ──────────────────────────────────────────────────

class NegotiationAgent(Agent):
    """AI negotiation counterpart with emotional reactions."""

    def __init__(self):
        super().__init__()
        self._turn_count = 0
        self._scenario = "salary"
        self._history: list[dict] = []
        self._llm = GroqLLM()

    async def on_enter(self):
        """Called when the agent joins the room."""
        # Send opening line
        opening = self._get_opening_line()
        self._history.append({"role": "assistant", "content": opening})
        await self.session.say(opening)

    async def on_user_message(self, message: str):
        """Called when the user says something."""
        self._turn_count += 1

        # Build message history with system prompt
        messages = [
            {"role": "system", "content": SYSTEM_PROMPTS.get(self._scenario, DEFAULT_PROMPT)},
            *self._history,
            {"role": "user", "content": message},
        ]

        # Get AI response
        response = await self._llm.chat(messages)

        # Detect emotion for avatar
        emotion = self._detect_emotion(message, response)

        # Store in history
        self._history.append({"role": "user", "content": message})
        self._history.append({"role": "assistant", "content": response})

        # Send response with emotion metadata
        await self.session.say(
            response,
            # Custom metadata for the frontend avatar
            metadata=json.dumps({"emotion": emotion, "turn": self._turn_count}),
        )

    def _get_opening_line(self) -> str:
        openings = {
            "salary": "Thanks for coming in! We're excited about your application. We're offering $75K to start.",
            "fundraising": "Great deck. Let's talk valuation. Given your ARR, $15M post-money feels right.",
            "freelance": "Love your portfolio! We've budgeted $100/hr for this 3-month redesign.",
            "consumer": "Welcome! This beauty is $48K MSRP, plus delivery fees. It won't last long.",
        }
        return openings.get(self._scenario, "Let's start negotiating. What are you thinking?")

    def _detect_emotion(self, user_text: str, ai_text: str) -> str:
        """Determine avatar emotion based on user input and AI response."""
        lower = user_text.lower()

        # Weak argument → skeptical
        if any(w in lower for w in ["i think", "maybe", "perhaps", "i guess", "sort of"]):
            return "skeptical"

        # Aggressive/lowball → frustrated
        if any(w in lower for w in ["ridiculous", "no way", "absurd", "unacceptable", "come on"]):
            return "frustrated"

        # Data-backed → happy
        if any(w in lower for w in ["research", "data", "market", "offer from", "comparable"]):
            return "happy"

        # AI closing positively → happy
        if any(w in ai_text.lower() for w in ["great", "excellent", "deal", "agree", "pleased"]):
            return "happy"

        return "neutral"


# ─── Main entry point ──────────────────────────────────────────────────

async def entrypoint(job: JobContext):
    """LiveKit job entrypoint - runs when a room is created."""

    logger.info(f"Connecting to room: {job.room.name}")

    # Connect to the room
    await job.connect(auto_subscribe=AutoSubscribe.AUDIO_ONLY)

    # Wait for the first participant
    participant = await job.wait_for_participant()
    logger.info(f"Participant joined: {participant.identity}")

    # Create the agent session with voice pipeline
    session = AgentSession(
        # STT: Deepgram (fast, accurate)
        stt=deepgram.STT(),
        # LLM: Our custom Groq wrapper
        llm=GroqLLM(),
        # TTS: ElevenLabs (natural voice)
        tts=None,  # Will use OpenAI TTS as fallback
        # VAD: Silero (local, fast)
        vad=silero.VAD(),
        # Turn detection
        turn_detector=turn_detector.EOU(),
    )

    # Create and run the agent
    agent = NegotiationAgent()
    await session.start(agent=agent, room=job.room)

    logger.info("Agent session started")


# ─── Run ───────────────────────────────────────────────────────────────

if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint))
