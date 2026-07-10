import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ─── Rate Limiting (in-memory, per-IP) ──────────────────────────────
// Production: use Redis or Vercel KV for distributed rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 20;           // 20 requests per minute per IP

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
 *   scenario: "salary" | "startup" | "car",
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
    const { transcript, scenario = 'salary', history = [], turnNumber = 0 } = body;

    // ─── Input validation ───────────────────────────────────────────
    if (!transcript || typeof transcript !== 'string' || transcript.length > 2000) {
      return Response.json({ error: 'Missing or invalid transcript' }, { status: 400 });
    }

    const validScenarios = ['salary', 'startup', 'car'];
    if (!validScenarios.includes(scenario)) {
      return Response.json({ error: 'Invalid scenario' }, { status: 400 });
    }

    // ─── Pick system prompt based on scenario ─────────────────────
    const systemPrompt = getScenarioPrompt(scenario);

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
    const emotion = detectEmotion(transcript, aiText);

    // ─── Detect tactics used by the AI ────────────────────────────
    const tacticsUsed = detectAiTactics(aiText);

    return Response.json({
      aiText,
      emotion,
      tacticsUsed,
      turnNumber: turnNumber + 1,
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

// ─── Scenario Prompts ─────────────────────────────────────────────────

function getScenarioPrompt(scenario: string): string {
  const prompts: Record<string, string> = {
    salary: `You are a friendly but budget-conscious recruiter at a mid-size tech company.
You're hiring for a senior frontend engineer role with a budget of $75K–$85K.
Your strategy:
- Start at $75K and mention it's "competitive for entry-level."
- If the candidate counters, ask about their current compensation.
- Use silence after they name their number — let them fill the gap.
- You have flexibility up to $82K + one extra week of vacation.
- Beyond $85K, you need "manager approval" (limited authority tactic).
- If they use data (market research, competing offers), be impressed and concede slightly.
- If they get aggressive or make extreme lowballs, get defensive but stay professional.
- Keep responses under 3 sentences. Be warm but firm.`,

    startup: `You are a seasoned VC partner at a top-tier firm evaluating a Series A investment.
The founder is raising $5M at a $20M post-money valuation.
Your strategy:
- Start valuation at $15M post: "Given your $500K ARR, $15M feels right."
- Push for a board seat: "We always take a board seat at Series A."
- Use good cop/bad cop: "My partners think $15M is fair, but I can try for $17M."
- Ask about competing term sheets: "What are other firms offering?"
- If they're strong negotiators, offer $20M but with 2x liquidation preference.
- Respect data-driven arguments. Use silence to test their conviction.
- Keep responses under 3 sentences. Be sharp but respectful.`,

    car: `You are a car salesperson at an EV dealership selling a new EV with an MSRP of $48K.
Your strategy:
- Start at MSRP + dealer fees: "$48K plus delivery and documentation."
- If asked for a lower price: "Let me see what I can do."
- Focus on monthly payment, not total price (four-square tactic).
- Add value: "It comes with paint protection and an extended warranty."
- Go "talk to your manager" and come back at $46K.
- You can go to $44K but only if they walk away or mention a competitor.
- Keep responses under 3 sentences. Be friendly but shrewd.`,
  };

  return prompts[scenario] || prompts.salary;
}

// ─── Emotion Detection ────────────────────────────────────────────────

function detectEmotion(userText: string, aiText: string): string {
  const lower = userText.toLowerCase();

  // User made a weak argument → avatar is skeptical
  if (
    /\b(i think|i feel|maybe|perhaps|i guess|sort of|kind of)\b/.test(lower) &&
    !/\b(research|data|offer from|market|comparable)\b/.test(lower)
  ) {
    return 'skeptical';
  }

  // User lowballed or got aggressive → avatar is frustrated
  if (
    /\b(ridiculous|crazy|absurd|no way|unacceptable|that's (too|not))\b/.test(lower) ||
    /is that the best|come on|seriously/i.test(lower)
  ) {
    return 'frustrated';
  }

  // User used data, BATNA, or good tactics → avatar is happy
  if (
    /\b(based on|research|data|market|competing offer|another offer|industry)\b/.test(lower)
  ) {
    return 'happy';
  }

  // AI is closing the deal positively → avatar is happy
  if (
    /\b(great|excellent|perfect|deal|agree|happy to|pleased)\b/.test(aiText.toLowerCase())
  ) {
    return 'happy';
  }

  return 'neutral';
}

// ─── AI Tactic Detection ──────────────────────────────────────────────

function detectAiTactics(aiText: string): string[] {
  const tactics: string[] = [];
  const lower = aiText.toLowerCase();

  if (/\b(let me check|need to ask|talk to my|manager approval)\b/.test(lower)) {
    tactics.push('limited-authority');
  }
  if (/\b(other candidates|other prospects|other interest)\b/.test(lower)) {
    tactics.push('scarcity');
  }
  if (/\b(i understand|i appreciate|i see where)\b/.test(lower)) {
    tactics.push('empathy');
  }
  if (/\b(honestly|to be frank|between us)\b/.test(lower)) {
    tactics.push('false-frankness');
  }
  if (/\b(what about|how about|what if)\b/.test(lower)) {
    tactics.push('bracketing');
  }

  return tactics;
}
