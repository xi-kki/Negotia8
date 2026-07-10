/**
 * POST /api/tts
 *
 * Converts text to speech using Groq PlayAI TTS.
 * Returns streaming WAV audio.
 *
 * Request (JSON):
 * {
 *   text: "Text to speak",
 *   voice?: "Arista-PlayAI" | ... (default: "Arista-PlayAI")
 * }
 *
 * Response: Streaming WAV audio (audio/wav)
 */
export async function POST(request: Request) {
  try {
    const { text, voice = 'Arista-PlayAI' } = await request.json();

    if (!text || typeof text !== 'string') {
      return Response.json({ error: 'Missing or invalid text' }, { status: 400 });
    }

    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    if (!GROQ_API_KEY) {
      return Response.json({ error: 'GROQ_API_KEY not configured' }, { status: 500 });
    }

    // Call Groq TTS API directly (groq-sdk may not have TTS typed)
    const response = await fetch('https://api.groq.com/openai/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'playai-tts',
        voice,
        input: text,
        response_format: 'wav',
        speed: 1.0,
      }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ error: response.statusText }));
      return Response.json(
        { error: 'TTS failed', details: err.error || response.statusText },
        { status: response.status },
      );
    }

    // Stream the audio back to the client
    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.byteLength.toString(),
      },
    });
  } catch (error: any) {
    console.error('/api/tts error:', error?.message || error);
    return Response.json(
      { error: 'TTS failed', details: error?.message },
      { status: 500 },
    );
  }
}
