#!/bin/bash
# ═══════════════════════════════════════════════════
# Negotia8 — Talking Avatar Setup
# Auto-downloads everything. Run once, then use.
# ═══════════════════════════════════════════════════

set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "╔══════════════════════════════════════════════╗"
echo "║   Negotia8 Talking Avatar Setup             ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ─── 1. Check Python ────────────────────────────────────────────────
PYTHON=""
for cmd in python3 python; do
    if command -v $cmd &>/dev/null; then
        PYTHON=$cmd
        break
    fi
done

if [ -z "$PYTHON" ]; then
    echo "❌ Python not found. Install Python 3.10+ first."
    exit 1
fi

echo "✅ Python: $($PYTHON --version)"

# ─── 2. Create virtual environment ──────────────────────────────────
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    $PYTHON -m venv venv
fi
source venv/bin/activate
if [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
fi
echo "✅ Virtual environment ready"

# ─── 3. Install Python deps ─────────────────────────────────────────
echo "📦 Installing Python dependencies..."
pip install --upgrade pip -q
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118 -q
pip install fastapi uvicorn python-multipart pydantic gdown huggingface-hub -q
pip install opencv-python face-alignment basicsr gfpgan -q
echo "✅ Dependencies installed"

# ─── 4. Clone SadTalker ─────────────────────────────────────────────
if [ ! -d "SadTalker" ]; then
    echo "📦 Cloning SadTalker..."
    git clone --depth 1 https://github.com/OpenTalker/SadTalker.git
    cd SadTalker
    pip install -r requirements.txt -q
    cd ..
else
    echo "✅ SadTalker already cloned"
fi

# ─── 5. Auto-download models ────────────────────────────────────────
echo "📦 Auto-downloading pretrained models..."
cd SadTalker

# Run the official download script if checkpoints missing
if [ ! -d "checkpoints" ] || [ -z "$(ls -A checkpoints 2>/dev/null)" ]; then
    echo "   Downloading from Google Drive (official source)..."
    python scripts/download_models.py 2>&1 | tail -5 || true
    
    # If official download fails, try Hugging Face mirror
    if [ ! -d "checkpoints" ] || [ -z "$(ls -A checkpoints 2>/dev/null)" ]; then
        echo "   Official download failed. Trying Hugging Face mirror..."
        mkdir -p checkpoints
        
        # Auto-download from Hugging Face Hub
        python -c "
from huggingface_hub import snapshot_download
import os
os.chdir('checkpoints')
print('   Downloading SadTalker models from Hugging Face...')
snapshot_download(
    repo_id='Bingsu/SadTalker_V1',
    local_dir='.',
    local_dir_use_symlinks=False,
)
print('   ✅ Models downloaded from Hugging Face!')
" 2>&1
    fi
else
    echo "✅ Models already present"
fi

# Also download shape predictor for face alignment
if [ ! -f "checkpoints/shape_predictor_68_face_landmarks.dat" ]; then
    echo "   Downloading face landmark predictor..."
    python -c "
import gdown, os
url = 'http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2'
os.system('wget -q $url -O /tmp/shape_predictor.dat.bz2 2>/dev/null || curl -sL $url -o /tmp/shape_predictor.dat.bz2')
os.system('bzip2 -d /tmp/shape_predictor.dat.bz2 2>/dev/null')
if os.path.exists('/tmp/shape_predictor_68_face_landmarks.dat'):
    os.rename('/tmp/shape_predictor_68_face_landmarks.dat', 'checkpoints/shape_predictor_68_face_landmarks.dat')
    print('   ✅ Face landmark predictor downloaded')
" 2>&1
fi

cd "$SCRIPT_DIR"

# ─── 6. Check reference photo ──────────────────────────────────────
REF_PHOTO="avatar.png"
if [ ! -f "$REF_PHOTO" ]; then
    echo ""
    echo "⚠️  No reference photo found!"
    echo "   Place a front-facing portrait as: $REF_PHOTO"
    echo "   Requirements: 512x512+, well-lit, neutral expression"
    echo "   (The server will still start without it)"
fi

# ─── 7. Done ────────────────────────────────────────────────────────
echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  ✅ Setup Complete!                         ║"
echo "║                                             ║"
echo "║  Start the server:                          ║"
echo "║    source venv/bin/activate                 ║"
echo "║    python server.py                        ║"
echo "║                                             ║"
echo "║  Then in another terminal:                  ║"
echo "║    cd .. && npm run dev                    ║"
echo "╚══════════════════════════════════════════════╝"
echo ""
echo "Quick test:"
echo "  curl http://localhost:8765/health"
