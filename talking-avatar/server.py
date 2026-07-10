"""
SadTalker integration server for Negotia8
Runs as a FastAPI service alongside the Next.js app.

Start: python server.py
Requires: NVIDIA GPU + SadTalker installed
"""

import os
import sys
import base64
import uuid
import json
import tempfile
from pathlib import Path
from typing import Optional

# Add SadTalker to path
SADTALKER_DIR = Path(__file__).parent / "SadTalker"
if SADTALKER_DIR.exists():
    sys.path.append(str(SADTALKER_DIR))

# ─── FastAPI ──────────────────────────────────────────────────────────
try:
    from fastapi import FastAPI, HTTPException
    from fastapi.responses import FileResponse
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    import uvicorn
except ImportError:
    print("Installing FastAPI deps...")
    os.system(f"{sys.executable} -m pip install fastapi uvicorn python-multipart pydantic")
    from fastapi import FastAPI, HTTPException
    from fastapi.responses import FileResponse
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    import uvicorn

app = FastAPI(title="Negotia8 Talking Avatar")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OUTPUT_DIR = Path(__file__).parent / "outputs"
OUTPUT_DIR.mkdir(exist_ok=True)

# ─── Models ──────────────────────────────────────────────────────────────

class GenerateRequest(BaseModel):
    audio: str  # base64 wav
    ref_image: Optional[str] = None  # base64 jpg, defaults to ref_photo.jpg

class GenerateResponse(BaseModel):
    video_url: str
    status: str
    duration_ms: int = 0

class HealthResponse(BaseModel):
    status: str
    gpu_available: bool
    sadtalker_loaded: bool

# ─── SadTalker Wrapper ─────────────────────────────────────────────────

sadtalker_model = None

def load_sadtalker():
    """Lazy-load SadTalker model"""
    global sadtalker_model
    
    if sadtalker_model is not None:
        return True
    
    if not SADTALKER_DIR.exists():
        print("SadTalker not installed. Clone it first:")
        print(f"  cd {SADTALKER_DIR.parent} && git clone https://github.com/OpenTalker/SadTalker.git")
        return False
    
    try:
        from src.test_audio2coeff import Audio2Coeff
        from src.test_coeff2video import Coeff2Video
        
        # Initialize models
        print("Loading SadTalker...")
        checkpoint_dir = SADTALKER_DIR / "checkpoints"
        
        audio2coeff = Audio2Coeff(checkpoint_dir / "audio2coeff.pth")
        coeff2video = Coeff2Video(checkpoint_dir / "coeff2video.pth")
        
        sadtalker_model = {
            "audio2coeff": audio2coeff,
            "coeff2video": coeff2video,
        }
        print("SadTalker loaded successfully!")
        return True
    except Exception as e:
        print(f"Failed to load SadTalker: {e}")
        return False

async def generate_talking_video(audio_path: str, ref_path: str) -> str:
    """
    Run SadTalker inference.
    
    1. Audio → Coeff (extract expression coefficients from audio)
    2. Coeff + Ref Image → Video (generate talking face video)
    """
    if sadtalker_model is None:
        if not load_sadtalker():
            raise RuntimeError("SadTalker not available")
    
    output_id = str(uuid.uuid4())[:8]
    output_path = str(OUTPUT_DIR / f"video_{output_id}.mp4")
    
    # SadTalker inference
    audio2coeff = sadtalker_model["audio2coeff"]
    coeff2video = sadtalker_model["coeff2video"]
    
    coeff_path = audio2coeff.generate(audio_path)
    coeff2video.generate(ref_path, coeff_path, output_path)
    
    return output_path

# ─── Routes ────────────────────────────────────────────────────────────

@app.get("/health", response_model=HealthResponse)
async def health():
    """Check if the server is ready"""
    import torch
    gpu = torch.cuda.is_available() if 'torch' in sys.modules else False
    loaded = sadtalker_model is not None
    return HealthResponse(
        status="ok" if loaded else "sadtalker_not_loaded",
        gpu_available=gpu,
        sadtalker_loaded=loaded,
    )

@app.post("/generate", response_model=GenerateResponse)
async def generate(req: GenerateRequest):
    """
    Generate a talking face video from audio + reference image.
    
    Steps:
    1. Decode base64 audio to temp WAV file
    2. Use reference image (provided or default)
    3. Run SadTalker inference
    4. Return video URL
    """
    # Decode audio
    try:
        audio_data = base64.b64decode(req.audio)
    except:
        raise HTTPException(400, "Invalid base64 audio data")
    
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
        f.write(audio_data)
        audio_path = f.name
    
    # Reference image
    if req.ref_image:
        ref_data = base64.b64decode(req.ref_image)
        ref_path = str(OUTPUT_DIR / f"ref_{uuid.uuid4().hex[:8]}.jpg")
        with open(ref_path, "wb") as f:
            f.write(ref_data)
    else:
        default_ref = Path(__file__).parent / "ref_photo.jpg"
        if not default_ref.exists():
            raise HTTPException(400, "No reference image provided and no ref_photo.jpg found")
        ref_path = str(default_ref)
    
    try:
        video_path = await generate_talking_video(audio_path, ref_path)
        
        video_url = f"/outputs/{Path(video_path).name}"
        
        return GenerateResponse(
            video_url=video_url,
            status="success",
        )
    except Exception as e:
        raise HTTPException(500, f"Generation failed: {e}")
    finally:
        # Cleanup temp audio
        if os.path.exists(audio_path):
            os.unlink(audio_path)

@app.get("/outputs/{filename}")
async def get_output(filename: str):
    """Serve generated video files"""
    file_path = OUTPUT_DIR / filename
    if not file_path.exists():
        raise HTTPException(404, "File not found")
    return FileResponse(str(file_path), media_type="video/mp4")

# ─── Main ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("╔══════════════════════════════════════╗")
    print("║  Negotia8 — Talking Avatar Server   ║")
    print("║  Listening on http://localhost:8765  ║")
    print("╚══════════════════════════════════════╝")
    
    # Try to preload
    load_sadtalker()
    
    uvicorn.run(app, host="0.0.0.0", port=8765)
