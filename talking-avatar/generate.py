#!/usr/bin/env python3
"""
╔═══════════════════════════════════════════════════════════════╗
║  Negotia8 — Talking Avatar Generator                        ║
║                                                             ║
║  Takes a face photo + audio → talking face MP4 video        ║
║                                                             ║
║  USAGE:                                                     ║
║    python generate.py                                       ║
║                                                             ║
║  Place avatar.png and audio.wav in this directory first.    ║
║  Output: result.mp4                                         ║
║                                                             ║
║  First run auto-downloads SadTalker + all models (~2GB).    ║
║  Requires: NVIDIA GPU, CUDA, Python 3.10+                   ║
╚═══════════════════════════════════════════════════════════════╝
"""

import os
import sys
import argparse
import subprocess
import shutil
from pathlib import Path

# ─── Paths ────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent.resolve()
SADTALKER_DIR = SCRIPT_DIR / "SadTalker"
CHECKPOINTS_DIR = SADTALKER_DIR / "checkpoints"
OUTPUT_DIR = SCRIPT_DIR / "outputs"

def banner():
    print()
    print("╔═══════════════════════════════════════════════════════════╗")
    print("║       🎬  Negotia8 — Talking Avatar Generator          ║")
    print("╚═══════════════════════════════════════════════════════════╝")
    print()

# ═══════════════════════════════════════════════════════════════════════
#  STEP 1: SETUP — Auto-downloads everything on first run
# ═══════════════════════════════════════════════════════════════════════

def ensure_setup():
    """Clones SadTalker + downloads all pretrained models automatically."""

    # Already set up?
    if SADTALKER_DIR.exists() and CHECKPOINTS_DIR.exists():
        ckpts = list(CHECKPOINTS_DIR.glob("*.pth")) + list(CHECKPOINTS_DIR.glob("*.dat"))
        if len(ckpts) >= 4:
            print("  ✅  SadTalker + all models already present")
            return True

    print("  📦  First run — auto-downloading SadTalker + pretrained models...")
    print("  ⏳  This downloads ~2GB. Grab a coffee ☕")
    print()

    # ── Clone SadTalker ──────────────────────────────────────────────
    if not SADTALKER_DIR.exists():
        print("  → Cloning SadTalker repository...")
        subprocess.run([
            "git", "clone", "--depth", "1",
            "https://github.com/OpenTalker/SadTalker.git",
            str(SADTALKER_DIR)
        ], check=True)
        print("  ✅  SadTalker cloned")
    else:
        print("  ✅  SadTalker already cloned")

    # ── Install Python deps ──────────────────────────────────────────
    print("  → Installing Python dependencies...")
    req_file = SADTALKER_DIR / "requirements.txt"
    if req_file.exists():
        subprocess.run([
            sys.executable, "-m", "pip", "install", "-r", str(req_file)
        ], check=True)

    subprocess.run([
        sys.executable, "-m", "pip", "install",
        "gdown", "huggingface-hub", "opencv-python",
        "face-alignment==1.3.5",
        "basicsr", "gfpgan",
    ], check=True)
    print("  ✅  Dependencies installed")

    # ── Download pretrained models ────────────────────────────────────
    CHECKPOINTS_DIR.mkdir(parents=True, exist_ok=True)

    # Strategy 1: Use SadTalker's official download script
    download_script = SADTALKER_DIR / "scripts" / "download_models.py"
    if download_script.exists():
        print("  → Downloading models via official SadTalker script...")
        proc = subprocess.run(
            [sys.executable, str(download_script)],
            cwd=str(SADTALKER_DIR)
        )
        if proc.returncode == 0:
            print("  ✅  Models downloaded successfully!")
            return True
        print("  ⚠️  Official download had issues, trying backup...")

    # Strategy 2: Hugging Face Hub mirror
    print("  → Downloading from Hugging Face Hub mirror...")
    hf_downloaded = False
    for repo in ["Bingsu/SadTalker", "fffiloni/SadTalker"]:
        try:
            result = subprocess.run([
                sys.executable, "-c", f"""
from huggingface_hub import snapshot_download
import os
os.chdir(r'{CHECKPOINTS_DIR}')
print('     Downloading from {repo}...')
snapshot_download(repo_id='{repo}', local_dir='.', local_dir_use_symlinks=False)
print('     ✅ Done!')
"""
            ], check=True)
            hf_downloaded = True
            break
        except:
            continue

    if hf_downloaded:
        print("  ✅  Models downloaded from Hugging Face!")
        return True

    # Strategy 3: Direct Google Drive links (last resort)
    print("  → Trying direct Google Drive download...")
    gdrive_files = [
        ("1tX4M3U3G1vEzBS0DBywMCr1yV0mTJFmC", "audio2coeff.pth"),
        ("1JHWJ32oG7lMGgFxCpyHNnK7T5Xf0gVzN", "coeff2video.pth"),
    ]
    for file_id, filename in gdrive_files:
        out_path = CHECKPOINTS_DIR / filename
        if not out_path.exists():
            subprocess.run([
                sys.executable, "-m", "gdown",
                f"https://drive.google.com/uc?id={file_id}",
                "-O", str(out_path),
            ])

    # Check if we got enough models
    ckpts = list(CHECKPOINTS_DIR.glob("*.pth"))
    if len(ckpts) >= 2:
        print(f"  ✅  {len(ckpts)} model files downloaded")
        return True

    print("  ❌  Could not download models automatically.")
    print("  → Try: cd SadTalker && python scripts/download_models.py")
    return False


# ═══════════════════════════════════════════════════════════════════════
#  STEP 2: GENERATE — Run SadTalker inference
# ═══════════════════════════════════════════════════════════════════════

def generate(avatar_path="avatar.png", audio_path="audio.wav"):
    """Run SadTalker inference on avatar.png + audio.wav → result.mp4"""

    avatar = Path(avatar_path)
    audio = Path(audio_path)
    result_file = SCRIPT_DIR / "result.mp4"

    # ── Validate inputs ──────────────────────────────────────────────
    errors = []
    if not avatar.exists():
        errors.append(f"  ❌  Avatar image not found: {avatar.name}")
    if not audio.exists():
        errors.append(f"  ❌  Audio file not found: {audio.name}")

    if errors:
        print()
        for e in errors:
            print(e)
        print()
        print("  Place these files in the directory and re-run:")
        print(f"    {SCRIPT_DIR}/")
        print(f"    ├── avatar.png   (your face photo)")
        print(f"    ├── audio.wav    (your audio)")
        print(f"    └── generate.py  (this script)")
        print()
        return False

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    print(f"  🖼️  Reference:  {avatar.name}")
    print(f"  🔊  Audio:      {audio.name}")
    print(f"  ▶️  Generating talking face video...")
    print()

    # ── Run inference ────────────────────────────────────────────────
    inference_script = SADTALKER_DIR / "inference.py"
    if not inference_script.exists():
        print(f"  ❌  inference.py not found. Run without --skip-setup first.")
        return False

    # Try with GFPGAN enhancer first (better quality)
    print("  → Running SadTalker (with face enhancement)...")
    proc = subprocess.run([
        sys.executable, str(inference_script),
        "--driven_audio", str(audio),
        "--source_image", str(avatar),
        "--result_dir", str(OUTPUT_DIR),
        "--enhancer", "gfpgan",
    ], cwd=str(SADTALKER_DIR))

    # Fallback: retry without enhancer
    if proc.returncode != 0:
        print("  ⚠️  Enhancer failed, retrying without it...")
        proc = subprocess.run([
            sys.executable, str(inference_script),
            "--driven_audio", str(audio),
            "--source_image", str(avatar),
            "--result_dir", str(OUTPUT_DIR),
        ], cwd=str(SADTALKER_DIR))

    if proc.returncode != 0:
        print()
        print("  ❌  SadTalker failed. Possible issues:")
        print("      - No GPU detected (run nvidia-smi to check)")
        print("      - Missing model files in checkpoints/")
        print("      - Out of GPU memory")
        return False

    # ── Find output and copy to result.mp4 ───────────────────────────
    output_files = sorted(OUTPUT_DIR.glob("*.mp4")) + sorted(OUTPUT_DIR.glob("*.avi"))
    if not output_files:
        print("  ⚠️  No output video found in SadTalker outputs.")
        return False

    latest = max(output_files, key=os.path.getmtime)
    shutil.copy2(str(latest), str(result_file))

    size_mb = result_file.stat().st_size / 1024 / 1024

    print()
    print("  ═══════════════════════════════════════════════════════════")
    print("  ✅  TALKING FACE VIDEO GENERATED!")
    print("  ═══════════════════════════════════════════════════════════")
    print(f"  📁  Output:  {result_file}")
    print(f"  📏  Size:    {size_mb:.1f} MB")
    print(f"  🎬  Open:    {result_file}")
    print()

    return True


# ═══════════════════════════════════════════════════════════════════════
#  MAIN
# ═══════════════════════════════════════════════════════════════════════

def main():
    parser = argparse.ArgumentParser(
        description="Generate talking face video from photo + audio using SadTalker"
    )
    parser.add_argument("--avatar", default="avatar.png",
                        help="Face photo (default: avatar.png)")
    parser.add_argument("--audio", default="audio.wav",
                        help="Driving audio (default: audio.wav)")
    parser.add_argument("--skip-setup", action="store_true",
                        help="Skip auto-download if already set up")
    parser.add_argument("--output", default="result.mp4",
                        help="Output filename (default: result.mp4)")

    args = parser.parse_args()

    banner()

    # ── Setup (auto-download on first run) ───────────────────────────
    if not args.skip_setup:
        print("  ── Phase 1: Setup ──")
        if not ensure_setup():
            sys.exit(1)
        print()

    # ── Generate talking face ────────────────────────────────────────
    print("  ── Phase 2: Generate ──")
    success = generate(args.avatar, args.audio)

    if success:
        print("  Done! Open result.mp4 to see your talking avatar.")
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
