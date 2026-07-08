# Talking Avatar Pipeline — SadTalker Integration

Replaces the 3D Three.js avatar with a **realistic talking face video** generated from a single reference photo + AI audio.

## Architecture

```
Groq TTS (audio) → SadTalker → MP4 video → Browser video element
```

## Requirements

- **GPU**: NVIDIA with 4GB+ VRAM (tested on RTX 3060+)
- **Python**: 3.10+
- **OS**: Linux/WSL recommended (Windows supported with CUDA toolkit)

## Setup

### 1. Install SadTalker

```bash
cd talking-avatar
git clone https://github.com/OpenTalker/SadTalker.git
cd SadTalker

# Create conda env
conda create -n sadtalker python=3.8
conda activate sadtalker

# Install deps
pip install -r requirements.txt
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

# Download pretrained models
python scripts/download_models.py
```

### 2. Add a reference photo

Place a front-facing portrait in `talking-avatar/ref_photo.jpg` (512x512 recommended, well-lit, neutral expression).

### 3. Start the API server

```bash
python talking-avatar/server.py
```

Starts on `http://localhost:8765`

### 4. Run Negotia8

```bash
npm run dev
```

The talkign avatar will be used automatically. Falls back to 3D avatar if server is unreachable.

## API Endpoint

`POST /generate`

**Request:**
```json
{
  "audio": "<base64-wav-audio>",
  "ref_image": "<base64-jpg-image>",
  "driven_audio": "<base64-wav>"
}
```

**Response:**
```json
{
  "video_url": "/outputs/video_12345.mp4",
  "status": "success"
}
```

## Models Compatibility

| Model | Stars | Works With | Notes |
|-------|-------|-----------|-------|
| SadTalker | 14k | ✅ | Best documented, single image |
| Wav2Lip | 13k | ✅ | Needs video reference, faster |
| MuseTalk | 7k | ✅ | Real-time capable |
| Hallo2 | 3.7k | ✅ | Long-duration, high-res |
| LivePortrait | 13k | ✅ | Real-time portrait anim |
