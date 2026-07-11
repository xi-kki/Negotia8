import Groq from 'groq-sdk';
import { SCENARIOS } from '@/lib/prompts/scenarios';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─── Rate Limiting (in-memory, per-IP) ──────────────────────────────
// Production: use Redis or Vercel KV for distributed rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20; // 20 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) return false;

  record.count++;
  return true;
}

/**
 * POST /api/negotiate
 *
 * The core AI negotiation endpoint.
 * Takes user speech transcript + scenario context → returns AI response + emotion.
 *
 * Request body (JSON):
 * {
 *   transcript: "I was thinking $82K would be more appropriate.",
 *   scenarioId: "salary-entry" | "salary-senior" | ... (all 12 scenarios),
 *   history: [{ role: "user" | "assistant", content: "..." }],
 *   turnNumber: 3
 * }
 *
 * Response:
 * {
 *   aiText: "Hmm, $82K is above our band...",
 *   emotion: "skeptical" | "frustrated" | "happy" | "neutral",
 *   tacticsUsed: ["anchoring"],
 * }
 */
export async function POST(request: Request) {
  try {
    // ─── Rate limit check ──────────────────────────────────────────
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return Response.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { transcript, scenarioId = 'salary-entry', history = [], turnNumber = 0 } = body;

    // ─── Input validation ───────────────────────────────────────────
    if (!transcript || typeof transcript !== 'string' || transcript.length > 2000) {
      return Response.json({ error: 'Missing or invalid transcript' }, { status: 400 });
    }

    // Find scenario by ID
    const scenario = SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) {
      return Response.json(
        { error: 'Invalid scenario. Must be one of: ' + SCENARIOS.map((s) => s.id).join(', ') },
        { status: 400 },
      );
    }

    // ─── Build system prompt with difficulty adjustments ─────────────
    let systemPrompt = scenario.systemPrompt;

    // Add difficulty-based behavior modifications
    if (scenario.difficulty === 'easy') {
      systemPrompt += `\n\nYou are being FAIR and REASONABLE. Make some concessions early. Show warmth and flexibility. Don't be too hard on the user.`;
    } else if (scenario.difficulty === 'medium') {
      systemPrompt += `\n\nYou are MODERATELY CHALLENGING. Hold your ground on key points but show willingness to negotiate. Use 2-3 tactics but don't overwhelm.`;
    } else if (scenario.difficulty === 'hard') {
      systemPrompt += `\n\nYou are TOUGH and EXPERIENCED. Use all your tactics aggressively. Don't concede easily. Push back hard on weak arguments. Only concede to strong, data-driven points.`;
    }

    // Add turn-based context
    systemPrompt += `\n\nThis is turn ${turnNumber + 1} of the negotiation. ${turnNumber > 4 ? 'Start showing signs of wanting to close the deal or walk away.' : ''}`;

    // ─── Build message history ────────────────────────────────────
    const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: systemPrompt },
      ...history.map((h: { role: string; content: string }) => ({
        role: h.role as 'user' | 'assistant',
        content: h.content,
      })),
      { role: 'user', content: transcript },
    ];

    // ─── Call Groq Llama 3.3 70B ──────────────────────────────────
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      temperature: 0.8,
      max_tokens: 300,
      top_p: 0.9,
    });

    const aiText = completion.choices[0]?.message?.content || '';

    // ─── Extract emotion from AI response ─────────────────────────
    const emotion = detectEmotion(transcript, aiText, scenario.targetRange);

    // ─── Detect tactics used by the AI ────────────────────────────
    const tacticsUsed = detectAiTactics(aiText);

    return Response.json({
      aiText,
      emotion,
      tacticsUsed,
      turnNumber: turnNumber + 1,
      scenarioId,
    });
  } catch (error: unknown) {
    // Log full error server-side only — never leak internals to client
    console.error('/api/negotiate error:', error instanceof Error ? error.message : error);
    return Response.json(
      { error: 'Negotiation engine temporarily unavailable. Please try again.' },
      { status: 500 },
    );
  }
}

// ─── Emotion Detection ────────────────────────────────────────────────

function detectEmotion(userText: string, aiText: string, targetRange: [number, number]): string {
  const lower = userText.toLowerCase();

  // Extract any numbers from the user's text
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

  // User made a weak argument → avatar is skeptical
  if (
    /\b(i think|i feel|maybe|perhaps|i guess|sort of|kind of|not sure)\b/.test(lower) &&
    !/\b(research|data|offer from|market|comparable|industry)\b/.test(lower)
  ) {
    return 'skeptical';
  }

  // User lowballed significantly → avatar is frustrated/skeptical
  if (userOffer && userOffer < targetRange[0] * 0.7) {
    return 'skeptical';
  }

  // User is being aggressive or dismissive → avatar is frustrated
  if (
    /\b(ridiculous|crazy|absurd|no way|unacceptable|waste of time|come on|seriously)\b/.test(lower)
  ) {
    return 'frustrated';
  }

  // User rejected without counter → avatar is frustrated
  if (
    /\b(no|not interested|too expensive|forget it|walk away)\b/.test(lower) &&
    !/\b(but|however|what about|counter|offer)\b/.test(lower)
  ) {
    return 'frustrated';
  }

  // User used data, BATNA, or good tactics → avatar is happy
  if (
    /\b(based on|research|data|market|competing offer|another offer|industry|comparable)\b/.test(
      lower,
    )
  ) {
    return 'happy';
  }

  // User made a reasonable counteroffer within range → avatar is happy
  if (userOffer && userOffer >= targetRange[0] && userOffer <= targetRange[1]) {
    return 'happy';
  }

  // User used a good negotiation tactic → avatar is happy
  if (/\b(what if we|how about|can we meet|common ground|find a way|i can do x if)\b/.test(lower)) {
    return 'happy';
  }

  // AI is closing the deal positively → avatar is happy
  if (
    /\b(great|excellent|perfect|deal|agree|happy to|pleased|shake on it)\b/.test(
      aiText.toLowerCase(),
    )
  ) {
    return 'happy';
  }

  return 'neutral';
}

// ─── AI Tactic Detection ──────────────────────────────────────────────

function detectAiTactics(aiText: string): string[] {
  const tactics: string[] = [];
  const lower = aiText.toLowerCase();

  if (/\b(let me check|need to ask|talk to my|manager approval|run this by)\b/.test(lower)) {
    tactics.push('limited-authority');
  }
  if (/\b(other candidates|other prospects|other interest|other offers|won't last)\b/.test(lower)) {
    tactics.push('scarcity');
  }
  if (/\b(i understand|i appreciate|i see where|i hear you)\b/.test(lower)) {
    tactics.push('empathy');
  }
  if (/\b(honestly|to be frank|between us|off the record)\b/.test(lower)) {
    tactics.push('false-frankness');
  }
  if (/\b(what about|how about|what if|split the difference)\b/.test(lower)) {
    tactics.push('bracketing');
  }
  if (/\b(anchor|starting at|opening at|our budget is)\b/.test(lower)) {
    tactics.push('anchoring');
  }
  if (/\b(we're a family|team|culture|mission|vision)\b/.test(lower)) {
    tactics.push('emotional-appeal');
  }
  if (/\b(when we|after|future|next quarter|once we)\b/.test(lower)) {
    tactics.push('future-promise');
  }

  return tactics;
}
