import type { NextApiRequest, NextApiResponse } from 'next';
import { InferenceClient } from '@huggingface/inference';   // NEW SDK

/* 0  Init client ---------------------------------------------------- */
const hf = new InferenceClient(process.env.HF_TOKEN || '');
const MODEL = 'google/gemma-2b-it';       // free, 2-B instruct model
const PROVIDER = 'auto';                  // or "together"

/* 1  Route ---------------------------------------------------------- */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');
  const { name, mode } = req.body as { name: string; mode: 'roast' | 'toast' };

  /* simple mock if token missing */
  if (!process.env.HF_TOKEN) {
    return res.json({
      line: `${mode === 'roast' ? '🔥 Spicy roast' : '🥂 Sweet toast'} for “${name}” (mock)`,
    });
  }

  const userPrompt =
    mode === 'roast'
      ? `Roast "${name}" in ONE witty, PG-13 sentence.`
      : `Compliment "${name}" in ONE witty sentence.`;

  try {
    /* 2  Chat-completion call (Gemma) */
    const resp = await hf.chatCompletion({
      provider: PROVIDER,  // "auto" picks a free backend
      model: MODEL,
      messages: [
        { role: 'system', content: 'You are a stand-up comic.' },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 48,
    });

    const line = resp.choices[0]?.message?.content?.trim() || '(empty)';
    return res.json({ line });
  } catch (err: any) {
    console.error('HF chatCompletion error:', err);
    return res.status(503).json({ error: err.message || 'HF service error' });
  }
}