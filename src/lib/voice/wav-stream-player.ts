import { AudioStreamProcessorWorkletSrc } from "./audio-stream-processor";

/**
 * Plays audio streams received in raw PCM16 chunks from the browser
 */
export class WavStreamPlayer {
  sampleRate: number;
  context: AudioContext | null;
  stream: AudioWorkletNode | null;
  trackSampleOffsets: Record<
    string,
    { trackId: string | null; offset: number; currentTime: number }
  >;
  interruptedTrackIds: Record<string, boolean>;
  private onEndedCallback: (() => void) | null = null;

  constructor({ sampleRate = 48000 }: { sampleRate?: number } = {}) {
    this.sampleRate = sampleRate;
    this.context = null;
    this.stream = null;
    this.trackSampleOffsets = {};
    this.interruptedTrackIds = {};
  }

  async connect() {
    this.context = new AudioContext({ sampleRate: this.sampleRate });
    if (this.context.state === "suspended") {
      await this.context.resume();
    }
    try {
      await this.context.audioWorklet.addModule(AudioStreamProcessorWorkletSrc);
    } catch (_) {
      throw new Error("Could not add audioWorklet module");
    }
    return true;
  }

  private _start() {
    if (!this.context) {
      throw new Error("Not connected, please call .connect() first");
    }
    const streamNode = new AudioWorkletNode(this.context, "audio_stream_processor");
    streamNode.connect(this.context.destination);
    streamNode.port.onmessage = (e) => {
      const { event } = e.data;
      if (event === "stop") {
        this.onEndedCallback?.();
        streamNode.disconnect();
        this.stream = null;
      } else if (event === "offset") {
        const { requestId, trackId, offset } = e.data;
        const currentTime = offset / this.sampleRate;
        this.trackSampleOffsets[requestId] = { trackId, offset, currentTime };
      }
    };
    this.stream = streamNode;
    return true;
  }

  add16BitPCM(arrayBuffer: ArrayBuffer | Int16Array, trackId = "default") {
    if (typeof trackId !== "string") {
      throw new Error("trackId must be a string");
    }
    if (this.interruptedTrackIds[trackId]) {
      return;
    }
    if (!this.stream) {
      this._start();
    }
    let buffer: Int16Array;
    if (arrayBuffer instanceof Int16Array) {
      buffer = arrayBuffer;
    } else if (arrayBuffer instanceof ArrayBuffer) {
      buffer = new Int16Array(arrayBuffer);
    } else {
      throw new Error("argument must be Int16Array or ArrayBuffer");
    }
    if (!this.stream) {
      throw new Error("Not connected, please call .connect() first");
    }
    this.stream.port.postMessage({ event: "write", buffer, trackId });
    return buffer;
  }

  async getTrackSampleOffset(interrupt = false) {
    if (!this.stream) return null;
    const requestId = crypto.randomUUID();
    this.stream.port.postMessage({
      event: interrupt ? "interrupt" : "offset",
      requestId,
    });
    let trackSampleOffset: {
      trackId: string | null;
      offset: number;
      currentTime: number;
    } | null = null;
    while (!trackSampleOffset) {
      trackSampleOffset = this.trackSampleOffsets[requestId];
      await new Promise((r) => setTimeout(() => r(0), 1));
    }
    const { trackId } = trackSampleOffset;
    if (interrupt && trackId) {
      this.interruptedTrackIds[trackId] = true;
    }
    return trackSampleOffset;
  }

  async interrupt() {
    return await this.getTrackSampleOffset(true);
  }

  setOnEndedCallback(callback: () => void) {
    this.onEndedCallback = callback;
  }
}
