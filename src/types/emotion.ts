export type Emotion = 'neutral' | 'skeptical' | 'frustrated' | 'happy';

export interface EmotionEvent {
  emotion: Emotion;
  intensity: number; // 0-1
  duration: number; // ms to hold this expression
}

export interface NegotiationTurn {
  userText: string;
  aiText: string;
  emotion: EmotionEvent;
  timestamp: number;
}
