#!/bin/bash
# Negotia8 — Talking Avatar Setup
# Run on a machine with NVIDIA GPU

set -e

echo "╔══════════════════════════════════════╗"
echo "║  Negotia8 — Talking Avatar Setup    ║"
echo "╚══════════════════════════════════════╝"

# ─── Check GPU ─────────────────────────────────────────
if ! command -v nvidia-smi &> /dev/null; then
    echo "❌ NVIDIA GPU not detected. This setup requires a GPU."
    echo "   Run on a machine with CUDA-capable GPU."
    exit 1
fi

echo "✅ GPU detected"
nvidia-smi --query-gpu=name,memory.total --format=csv,noheader

# ─── Clone SadTalker ───────────────────────────────────
if [ ! -d "SadTalker" ]; then
    echo "📦 Cloning SadTalker..."
    git clone https://github.com/OpenTalker/SadTalker.git
else
    echo "✅ SadTalker already cloned"
fi

cd SadTalker

# ─── Python env ─────────────────────────────────────────
if [ ! -d "venv" ]; then
    echo "🐍 Creating Python environment..."
    python3 -m venv venv
fi

source venv/bin/activate

echo "📦 Installing dependencies..."
pip install --upgrade pip
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
pip install -r requirements.txt
pip install fastapi uvicorn python-multipart

echo "📦 Downloading pretrained models..."
python scripts/download_models.py

cd ..

# ─── Reference photo ──────────────────────────────────
if [ ! -f "ref_photo.jpg" ]; then
    echo "📸 Place a reference photo as ref_photo.jpg"
    echo "   Requirements: front-facing, 512x512, well-lit, neutral expression"
fi

echo ""
echo "╔══════════════════════════════════════╗"
echo "║  Setup complete!                     ║"
echo "║                                      ║"
echo "║  Start the server:                   ║"
echo "║    python server.py                  ║"
echo "║                                      ║"
echo "║  Then start Negotia8:                ║"
echo "║    npm run dev                       ║"
echo "╚══════════════════════════════════════╝"
