/**
 * POST /api/talking-avatar
 *
 * Bridges Negotia8 to the SadTalker Python server.
 * Sends TTS audio → receives video URL → streams back.
 *
 * The Python server must be running on localhost:8765.
 * Falls back gracefully if unavailable.
 */

const SADTALKER_URL = process.env.SADTALKER_URL || 'http://localhost:8765';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { audio } = body; // base64-encoded WAV audio

    if (!audio) {
      return Response.json({ error: 'No audio provided' }, { status: 400 });
    }

    // Check if SadTalker is running
    let healthOk = false;
    try {
      const healthRes = await fetch(`${SADTALKER_URL}/health`, {
        signal: AbortSignal.timeout(2000),
      });
      healthOk = healthRes.ok;
    } catch {
      return Response.json({ error: 'Talking avatar server unavailable' }, { status: 503 });
    }

    if (!healthOk) {
      return Response.json({ error: 'Talking avatar not ready' }, { status: 503 });
    }

    // Generate talking face video
    const genRes = await fetch(`${SADTALKER_URL}/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audio }),
      signal: AbortSignal.timeout(30000), // 30s max for generation
    });

    if (!genRes.ok) {
      const err = await genRes.json().catch(() => ({ error: 'Generation failed' }));
      return Response.json(err, { status: genRes.status });
    }

    const data = await genRes.json();

    // Return the video URL (proxied through the backend)
    return Response.json({
      videoUrl: `${SADTALKER_URL}${data.video_url}`,
      status: 'success',
    });
  } catch (error: any) {
    console.error('/api/talking-avatar error:', error?.message || error);
    return Response.json(
      { error: 'Talking avatar failed', details: error?.message },
      { status: 500 },
    );
  }
}

/**
 * GET /api/talking-avatar/status
 */
export async function GET() {
  try {
    const res = await fetch(`${SADTALKER_URL}/health`, {
      signal: AbortSignal.timeout(2000),
    });
    if (res.ok) {
      const data = await res.json();
      return Response.json({ available: true, ...data });
    }
    return Response.json({ available: false });
  } catch {
    return Response.json({ available: false });
  }
}
