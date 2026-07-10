/**
 * TTS Player for Negotia8
 * 
 * Strategy:
 * 1. Try Groq PlayAI TTS API (natural voice)
 * 2. Fallback: browser Web Speech API (always works, no key needed)
 */

let audioContext: AudioContext | null = null;
let currentSource: AudioBufferSourceNode | null = null;
let isPlaying = false;
let onEndedCallback: (() => void) | null = null;
let speechSynthesisUtterance: SpeechSynthesisUtterance | null = null;

async function getAudioContext(): Promise<AudioContext> {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  return audioContext;
}

/**
 * Speak text using the best available TTS method.
 * Falls back from Groq API → Web Speech API.
 */
export async function speakText(text: string, voice = 'Arista-PlayAI'): Promise<void> {
  // Stop any current playback
  await stopSpeaking();
  if (!text.trim()) return;

  // Try Groq TTS API first
  const played = await tryGroqTTS(text, voice);
  if (played) return;

  // Fallback: browser Speech Synthesis
  await tryBrowserTTS(text);
}

/**
 * Attempt TTS via Groq API
 */
async function tryGroqTTS(text: string, voice: string): Promise<boolean> {
  try {
    const ctx = await getAudioContext();

    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice }),
    });

    if (!response.ok) {
      console.warn('Groq TTS unavailable, using browser speech fallback');
      return false;
    }

    const arrayBuffer = await response.arrayBuffer();
    if (!arrayBuffer || arrayBuffer.byteLength === 0) {
      return false;
    }

    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    source.start(0);

    currentSource = source;
    isPlaying = true;

    return new Promise((resolve) => {
      source.onended = () => {
        isPlaying = false;
        currentSource = null;
        onEndedCallback?.();
        resolve(true);
      };
    });
  } catch (err) {
    console.warn('Groq TTS failed:', err);
    return false;
  }
}

/**
 * Fallback: browser-native Speech Synthesis API
 * Works without any API key, uses OS voices
 */
async function tryBrowserTTS(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      console.warn('Speech Synthesis not supported');
      isPlaying = false;
      resolve();
      return;
    }

    // Cancel any previous speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a good English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.lang.startsWith('en') && v.name.includes('Female')
    ) || voices.find(v => v.lang.startsWith('en')) || null;
    
    if (preferredVoice) utterance.voice = preferredVoice;
    
    utterance.rate = 1.1;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    speechSynthesisUtterance = utterance;
    isPlaying = true;

    utterance.onend = () => {
      isPlaying = false;
      speechSynthesisUtterance = null;
      onEndedCallback?.();
      resolve();
    };

    utterance.onerror = () => {
      isPlaying = false;
      speechSynthesisUtterance = null;
      resolve();
    };

    window.speechSynthesis.speak(utterance);
  });
}

export async function stopSpeaking(): Promise<void> {
  // Stop AudioContext playback
  if (currentSource) {
    try {
      currentSource.stop();
    } catch (_) {}
    currentSource = null;
  }
  
  // Stop browser speech
  if (speechSynthesisUtterance && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    speechSynthesisUtterance = null;
  }
  
  isPlaying = false;
}

export function getIsPlaying(): boolean {
  return isPlaying;
}

export function setOnEnded(callback: (() => void) | null) {
  onEndedCallback = callback;
}
