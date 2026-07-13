import Groq from 'groq-sdk';
import { SCENARIOS } from '@/lib/prompts/scenarios';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * POST /api/voice-stream
 *
 * Real-time voice pipeline — returns NDJSON stream:
 *   { "type": "text", "data": "Hmm, that's interesting..." }
 *   { "type": "audio", "data": "<base64-wav-chunk>" }
 *   { "type": "emotion", "data": "skeptical" }
 *   { "type": "done" }
 */
export async function POST(request: Request) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (obj: Record<string, string>) => {
        controller.enqueue(encoder.encode(JSON.stringify(obj) + '\n'));
      };

      try {
        const formData = await request.formData();
        const audioFile = formData.get('file') as File | null;
        const scenarioId = (formData.get('scenarioId') as string) || 'salary-entry';
        const historyStr = (formData.get('history') as string) || '[]';
        const turnNumber = parseInt(formData.get('turnNumber') as string) || 0;

        if (!audioFile) {
          send({ type: 'error', data: 'No audio provided' });
          controller.close();
          return;
        }

        // ── Step 1: STT ──────────────────────────────────────────
        const transcription = await groq.audio.transcriptions.create({
          file: audioFile,
          model: 'whisper-large-v3-turbo',
          language: 'en',
          response_format: 'text',
        });

        const userText = transcription as unknown as string;

        if (!userText || userText.trim().length === 0) {
          send({ type: 'text', data: "I didn't quite catch that. Could you say that again?" });
          send({ type: 'done' });
          controller.close();
          return;
        }

        // ── Step 2: AI Response (streaming) ──────────────────────
        const scenario = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
        let systemPrompt = scenario.systemPrompt;

        if (scenario.difficulty === 'easy') {
          systemPrompt += '\nBe FAIR and REASONABLE. Make concessions early.';
        } else if (scenario.difficulty === 'medium') {
          systemPrompt += '\nBe MODERATELY CHALLENGING. Hold ground but show willingness.';
        } else {
          systemPrompt += '\nBe TOUGH. Push back hard. Only concede to strong points.';
        }

        systemPrompt += `\nThis is turn ${turnNumber + 1}. Keep responses under 2 sentences — this is a voice conversation, not an essay.`;

        const history = JSON.parse(historyStr);
        const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
          { role: 'system', content: systemPrompt },
          ...history.map((h: { role: string; content: string }) => ({
            role: h.role as 'user' | 'assistant',
            content: h.content,
          })),
          { role: 'user', content: userText },
        ];

        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.8,
          max_tokens: 150, // Keep it short for voice
          top_p: 0.9,
          stream: true,
        });

        let fullResponse = '';

        for await (const chunk of completion) {
          const token = chunk.choices[0]?.delta?.content || '';
          if (token) {
            fullResponse += token;
            send({ type: 'text', data: token });
          }
        }

        // ── Step 3: TTS ──────────────────────────────────────────
        if (fullResponse.trim()) {
          try {
            const ttsResponse = await fetch('https://api.groq.com/openai/v1/audio/speech', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: 'playai-tts',
                voice: 'Arista-PlayAI',
                input: fullResponse,
                response_format: 'wav',
                speed: 1.0,
              }),
            });

            if (ttsResponse.ok) {
              const audioBuffer = await ttsResponse.arrayBuffer();
              const base64 = Buffer.from(audioBuffer).toString('base64');
              send({ type: 'audio', data: base64 });
            }
          } catch (ttsErr) {
            console.warn('TTS streaming failed, browser will use fallback');
          }
        }

        // ── Step 4: Emotion ──────────────────────────────────────
        const emotion = detectEmotion(userText, fullResponse, scenario.targetRange);
        send({ type: 'emotion', data: emotion });
        send({ type: 'done' });
      } catch (err) {
        console.error('voice-stream error:', err);
        send({ type: 'error', data: 'Voice pipeline error' });
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'application/x-ndjson',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

// ─── Emotion Detection (same as negotiate route) ──────────────────
function detectEmotion(userText: string, aiText: string, targetRange: [number, number]): string {
  const lower = userText.toLowerCase();
  const numbers = userText.match(/\$?(\d{1,6}(?:,\d{3})*(?:\.\d+)?)\s*(k|K|M|m)?/g);
  let userOffer: number | null = null;
  if (numbers && numbers.length > 0) {
    const parsed = parseInt(numbers[0].replace(/[$,]/g, ''));
    if (!isNaN(parsed)) {
      userOffer = parsed;
      if (lower.includes('k')) userOffer *= 1000;
      if (lower.includes('m')) userOffer *= 1000000;
    }
  }

  if (/\b(i think|i feel|maybe|perhaps|i guess|sort of|kind of|not sure)\b/.test(lower) &&
      !/\b(research|data|offer from|market|comparable|industry)\b/.test(lower)) {
    return 'skeptical';
  }
  if (userOffer && userOffer < targetRange[0] * 0.7) return 'skeptical';
  if (/\b(ridiculous|crazy|absurd|no way|unacceptable|waste of time|come on|seriously)\b/.test(lower)) {
    return 'frustrated';
  }
  if (/\b(based on|research|data|market|competing offer|another offer|industry|comparable)\b/.test(lower)) {
    return 'happy';
  }
  if (userOffer && userOffer >= targetRange[0] && userOffer <= targetRange[1]) return 'happy';
  return 'neutral';
}
