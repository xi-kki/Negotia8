import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * POST /api/transcribe
 *
 * Transcribes audio using Groq Whisper.
 * Accepts audio/wav or audio/webm as multipart/form-data.
 *
 * Request: multipart form with "file" field
 * Response: { text: "transcribed text" }
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('file') as File | null;

    if (!audioFile) {
      return Response.json({ error: 'No audio file provided' }, { status: 400 });
    }

    const transcription = await groq.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-large-v3-turbo',
      language: 'en',
      response_format: 'text',
    });

    return Response.json({ text: transcription });
  } catch (error: any) {
    console.error('/api/transcribe error:', error?.message || error);
    return Response.json(
      { error: 'Transcription failed', details: error?.message },
      { status: 500 },
    );
  }
}
