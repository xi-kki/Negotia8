#!/bin/bash
# ═══════════════════════════════════════════════════
# Negotia8 — LiveKit Agent Setup
# ═══════════════════════════════════════════════════

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "╔══════════════════════════════════════════════════╗"
echo "║  Negotia8 — LiveKit Real-Time AI Agent Setup    ║"
echo "╚══════════════════════════════════════════════════╝"

# ─── 1. Python env ────────────────────────────────────
echo ""
echo "📦 Setting up Python environment..."

if [ ! -d "venv" ]; then
    python3 -m venv venv 2>/dev/null || python -m venv venv
fi

source venv/bin/activate 2>/dev/null || source venv/Scripts/activate

pip install -q --upgrade pip

# ─── 2. Install dependencies ─────────────────────────
echo "📦 Installing LiveKit Agents + plugins..."
pip install -q \
    livekit-agents \
    livekit-plugins-openai \
    livekit-plugins-deepgram \
    livekit-plugins-elevenlabs \
    livekit-plugins-silero \
    python-dotenv

echo "✅ Dependencies installed"

# ─── 3. Environment config ───────────────────────────
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo ""
    echo "⚠️  Created .env from .env.example"
    echo "   Edit .env with your API keys:"
    echo ""
    echo "   Option A — LiveKit Cloud (free):"
    echo "     1. Go to https://cloud.livekit.io"
    echo "     2. Create an account → New project"
    echo "     3. Copy LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET"
    echo ""
    echo "   Option B — Local server (advanced):"
    echo "     Download from https://github.com/livekit/livekit/releases"
    echo "     Then: livekit-server --dev --bind 0.0.0.0 --port 7880"
    echo ""
    echo "   Your GROQ_API_KEY is pre-filled from Negotia8's .env"
    echo ""
    read -p "Press Enter after editing .env..."
fi

# ─── 4. Copy Groq key from Negotia8 ──────────────────
if [ -f "../.env.local" ]; then
    source <(grep GROQ_API_KEY "../.env.local")
    if [ -n "$GROQ_API_KEY" ]; then
        # Update .env with Groq key if not already set
        if grep -q "GROQ_API_KEY=$" .env 2>/dev/null; then
            sed -i "s/GROQ_API_KEY=$/GROQ_API_KEY=$GROQ_API_KEY/" .env
        fi
    fi
fi

# ─── 5. Install frontend SDK ─────────────────────────
echo "📦 Installing LiveKit frontend SDK..."
cd ..
npm install @livekit/components-react livekit-client 2>&1 | tail -3
cd "$SCRIPT_DIR"

echo ""
echo "╔══════════════════════════════════════════════════╗"
echo "║  ✅  Setup Complete!                           ║"
echo "║                                                ║"
echo "║  Start the agent:                              ║"
echo "║    cd livekit-agent                            ║"
echo "║    source venv/bin/activate                    ║"
echo "║    python agent.py                             ║"
echo "║                                                ║"
echo "║  Start Negotia8:                               ║"
echo "║    npm run dev                                 ║"
echo "╚══════════════════════════════════════════════════╝"
