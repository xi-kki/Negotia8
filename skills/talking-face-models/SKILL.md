# Talking Face Generation Models — Reference Catalog

Curated catalog of open-source talking face generation models for AI avatar / digital human applications. Covers audio-driven lip sync, portrait animation, 3D face synthesis, and face datasets.

## Quick Reference

| Model | Stars | Published | Approach | Use Case |
|-------|-------|-----------|----------|----------|
| **[SadTalker](https://github.com/OpenTalker/SadTalker)** ⭐ | 14k+ | CVPR 2023 | 3D motion coefficients from audio → video | Single image talking face |
| **[Wav2Lip](https://github.com/Rudrabha/Wav2Lip)** ⭐ | 13k+ | ACM MM 2020 | Lip sync expert network | Lip-sync video to audio |
| **[LivePortrait](https://github.com/KwaiVGI/LivePortrait)** | 13k+ | 2024 | Real-time portrait animation | Real-time face animation |
| **[EchoMimic](https://github.com/BadToBest/EchoMimic)** | — | 2024 | Audio-driven face animation | Talking face from audio |
| **[Hallo2](https://github.com/fudan-generative-vision/hallo2)** | 3.7k+ | ICLR 2025 | Long-duration high-res animation | Extended talking face video |
| **[MuseTalk](https://github.com/TMElyralab/MuseTalk)** | 7k+ | 2024 | Latent space inpainting | Real-time lip sync |
| **[GeneFace](https://github.com/yerfor/GeneFace)** | 2.6k+ | ICLR 2023 | 3D talking face synthesis | 3D face from audio |
| **[GeneFace++](https://github.com/yerfor/GeneFacePlusPlus)** | — | 2024 | Generalized 3D face | Improved GeneFace |
| **[DINet](https://github.com/MRzzm/DINet)** | — | 2023 | Deformation inpainting | Talking head generation |
| **[AniPortrait](https://github.com/Zejun-Yang/AniPortrait)** | — | 2024 | Portrait animation | Animate portrait from audio |
| **[V-Express](https://github.com/tencent-ailab/V-Express)** | — | 2024 | Conditional dropout | Robust talking face |
| **[LatentSync](https://github.com/chao-peng/LatentSync)** | — | 2024 | Latent sync | Audio-visual synchronization |
| **[ASAvatar](https://github.com/zhengkw18/ASAvatar)** | — | 2024 | 3DMM-based | 3D talking avatar |
| **[MakeItTalk](https://github.com/AdobeResearch/MakeItTalk)** | — | ACM MM 2021 | Adobe Research | Expressive talking face |
| **[Diffused Heads](https://github.com/MStypulkowski/diffused-heads)** | — | 2023 | Diffusion-based | Full head video generation |
| **[vid2vid](https://github.com/NVIDIA/vid2vid)** | — | CVPR 2018 | NVIDIA, video-to-video | Video synthesis (pioneer) |

## Face Datasets

| Dataset | Description | Samples |
|---------|-------------|---------|
| **[FFHQ](https://github.com/NVlabs/ffhq-dataset)** | NVIDIA, high-quality faces | 70K images |
| **[MetFaces](https://github.com/NVlabs/metfaces-dataset)** | NVIDIA, art faces | 1.3K+ images |
| **[100k Faces](https://github.com/ozgrozer/100k-faces)** | Generated faces | 100K images |
| **[Million Faces](https://github.com/RichardErkhov/million-faces)** | Generated faces | 1M+ images |
| **[AI Generated Faces](https://github.com/RichardErkhov/ai_generated_faces)** | AI faces dataset | Various |
| **[FaceSynthetics](https://github.com/microsoft/FaceSynthetics)** | Microsoft, synthetic faces | 100K images |
| **[AGFD-20K](https://github.com/Robin-WZQ/AGFD-20K)** | AI-generated face detection | 20K images |
| **[Non-Hair FFHQ](https://github.com/oneThousand1000/non-hair-FFHQ)** | FFHQ without hair | FFHQ subset |
| **[AI Face Fairness Bench](https://github.com/purdue-m2/ai-face-fairnessbench)** | Purdue, fairness benchmark | Benchmark dataset |

## Integration Architecture

For a real-time negotiation app like Negotia8:

```
User Speech → Groq Whisper (STT) → Llama 3.3 (AI) → Groq TTS (audio)
                                                          ↓
                                               SadTalker/MuseTalk
                                                          ↓
                                               Video stream → Browser
```

### Recommended: SadTalker (simplest integration)

```bash
# Setup
git clone https://github.com/OpenTalker/SadTalker.git
cd SadTalker
pip install -r requirements.txt
python scripts/download_models.py

# Run inference
python inference.py --driven_audio audio.wav --ref_image face.jpg
```

### Alternative: Wav2Lip (faster, needs video reference)

```bash
git clone https://github.com/Rudrabha/Wav2Lip.git
cd Wav2Lip
pip install -r requirements.txt
python inference.py --checkpoint_path wav2lip_gan.pth --face video.mp4 --audio audio.wav
```

### Alternative: Hallo2 (highest quality, needs more GPU)

```bash
git clone https://github.com/fudan-generative-vision/hallo2.git
cd hallo2
pip install -r requirements.txt
python scripts/inference.py --source_image face.jpg --driven_audio audio.wav
```

## GPU Requirements

| Model | Min VRAM | Recommended | Inference Time (2s audio) |
|-------|----------|-------------|--------------------------|
| SadTalker | 4GB | 6GB+ | 3-5s |
| Wav2Lip | 2GB | 4GB+ | 1-2s |
| LivePortrait | 4GB | 8GB+ | 2-4s |
| Hallo2 | 8GB | 16GB+ | 5-10s |
| MuseTalk | 4GB | 8GB+ | 2-3s |

## Web Integration Pattern

```typescript
// Frontend: Send audio → get video → play
async function generateTalkingFace(audioBlob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob, 'input.wav');
  
  const res = await fetch('http://localhost:8765/generate', {
    method: 'POST',
    body: formData,
  });
  
  const { videoUrl } = await res.json();
  return videoUrl;
}

// Play in <video> element
<video src={videoUrl} autoPlay muted={false} />
```
