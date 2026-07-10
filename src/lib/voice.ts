/**
 * 🎙️ Negoti8 — Voice Recording & Playback System
 *
 * Handles: push-to-talk recording, audio playback, volume detection.
 */

export class VoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;
  private onData: ((blob: Blob) => void) | null = null;

  async start(): Promise<void> {
    this.audioChunks = [];
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.mediaRecorder = new MediaRecorder(this.stream, {
      mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : 'audio/webm',
    });

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.onstop = () => {
      const blob = new Blob(this.audioChunks, { type: 'audio/webm' });
      this.onData?.(blob);
      this.stream?.getTracks().forEach((track) => track.stop());
      this.stream = null;
    };

    this.mediaRecorder.start();
  }

  stop(): Promise<Blob> {
    return new Promise((resolve) => {
      this.onData = resolve;
      this.mediaRecorder?.stop();
    });
  }

  abort(): void {
    if (this.mediaRecorder?.state === 'recording') {
      this.mediaRecorder.stop();
    }
    this.stream?.getTracks().forEach((track) => track.stop());
    this.stream = null;
    this.audioChunks = [];
  }
}

export class VoicePlayer {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new AudioContext();
    }
    return this.audioContext;
  }

  async playAudioBlob(blob: Blob): Promise<void> {
    const arrayBuffer = await blob.arrayBuffer();
    const audioBuffer = await this.getContext().decodeAudioData(arrayBuffer);
    const source = this.getContext().createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.getContext().destination);
    source.start();
    return new Promise((resolve) => {
      source.onended = () => resolve();
    });
  }

  async playFromUrl(url: string): Promise<void> {
    const response = await fetch(url);
    const blob = await response.blob();
    return this.playAudioBlob(blob);
  }

  /** Get audio level (0-1) for visualization */
  getAudioLevel(): number {
    // Simplified: returns mock level
    return Math.random() * 0.5 + 0.1;
  }
}

/**
 * Check if the browser supports the required audio APIs
 */
export function checkAudioSupport(): { supported: boolean; issues: string[] } {
  const issues: string[] = [];

  if (!navigator.mediaDevices?.getUserMedia) {
    issues.push('getUserMedia not supported');
  }

  if (!window.MediaRecorder) {
    issues.push('MediaRecorder not supported');
  }

  if (!window.AudioContext && !(window as any).webkitAudioContext) {
    issues.push('AudioContext not supported');
  }

  return {
    supported: issues.length === 0,
    issues,
  };
}
