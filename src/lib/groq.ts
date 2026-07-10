import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function transcribeAudio(audioBuffer: ArrayBuffer): Promise<string> {
  const blob = new Blob([audioBuffer], { type: 'audio/webm' });
  const file = new File([blob], 'audio.webm', { type: 'audio/webm' });

  const transcription = await groq.audio.transcriptions.create({
    file,
    model: 'whisper-large-v3',
    language: 'en',
    response_format: 'text',
  });

  return transcription.text;
}

export async function generateResponse(
  transcript: string,
  scenario: 'salary' | 'startup' | 'car' = 'salary',
) {
  const systemPrompt = scenario === 'salary'
    ? `You are a friendly but budget-conscious recruiter at a mid-size tech company.
You're hiring for a senior frontend engineer role with a budget of $75K-85K.
Start at $75K. If they counter, ask about their current comp.
You can go up to $82K + extra vacation. Beyond $85K needs "manager approval."
Use silence after they name their number. Be warm but firm.`

    : scenario === 'startup'
    ? `You are a seasoned VC partner at a top-tier firm.
The founder is raising a $5M Series A.
You like the product but think the valuation is too high.
Use anchoring (start low), limited authority ("partners need to agree"),
and good cop/bad cop references. Push for a board seat and pro-rata rights.`

    : `You are a car salesperson at a dealership selling a new EV ($48K MSRP).
You're friendly but use classic sales tactics:
anchoring on MSRP, adding dealer fees, pushing for add-ons.
You're willing to come down to $44K but never show your full hand.
Use the "let me check with my manager" move.`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: transcript },
    ],
    temperature: 0.8,
    max_tokens: 300,
  });

  const text = completion.choices[0]?.message?.content || '';

  // Extract sentiment for avatar expression
  const sentiment = text.includes('?') && text.length < 80 ? 'skeptical'
    : text.toLowerCase().includes('sorry') || text.toLowerCase().includes('unfortunately') ? 'frustrated'
    : text.toLowerCase().includes('great') || text.toLowerCase().includes('happy') ? 'happy'
    : 'neutral';

  return { text, sentiment };
}
