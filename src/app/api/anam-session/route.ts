import { NextResponse } from 'next/server';

const ANAM_API_KEY = process.env.ANAM_API_KEY;
const ANAM_API_URL = 'https://api.anam.ai/v1';

/**
 * POST /api/anam-session
 *
 * Exchanges the Anam API key for a short-lived session token (server-side).
 * The token is safe to send to the client — it expires in ~1 hour.
 *
 * Body: { systemPrompt?: string }
 * Returns: { sessionToken: string }
 */
export async function POST(request: Request) {
  if (!ANAM_API_KEY) {
    return NextResponse.json({ error: 'ANAM_API_KEY not configured' }, { status: 500 });
  }

  try {
    const { systemPrompt } = await request.json();

    const personaConfig = {
      name: 'Negotiator',
      avatarId: '30fa96d0-26c4-4e55-94a0-517025942e18', // Cara default
      voiceId: '6bfbe25a-979d-40f3-a92b-5394170af54b', // Cara voice
      llmId: '0934d97d-0c3a-4f33-91b0-5e136a0ef466', // Default LLM
      systemPrompt:
        systemPrompt ||
        "[STYLE] Reply in natural speech without formatting. Keep responses under 2 sentences — this is a voice negotiation, not an essay. Add pauses using '...' occasionally. [PERSONALITY] You are a tough but fair negotiation counterpart. You respond to strong arguments with respect and push back on weak ones.",
    };

    const response = await fetch(`${ANAM_API_URL}/auth/session-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ANAM_API_KEY}`,
      },
      body: JSON.stringify({ personaConfig }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anam session token error:', response.status, errorText);
      return NextResponse.json(
        { error: `Failed to create session: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({ sessionToken: data.sessionToken });
  } catch (err) {
    console.error('Anam session error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
