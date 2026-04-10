// POST /api/improve
// Receives resume data, calls AI, returns improved resume text
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { resumeText, role, level, jd, formData } = body;

  const provider = import.meta.env.AI_PROVIDER || 'openai';

  const prompt = `You are an expert resume writer and ATS optimization specialist.

${formData ? `User details:
- Name: ${formData.name || 'Not provided'}
- Target Role: ${formData.title || role || 'Not specified'}
- Experience Level: ${formData.level || level || 'Not specified'}
- Location: ${formData.location || 'Not specified'}
` : ''}

${resumeText ? `Original resume:\n${resumeText}` : ''}
${jd ? `\nTarget Job Description:\n${jd}` : ''}

Task: Rewrite this resume to be ATS-optimized and professional. 
- Use strong action verbs (Architected, Delivered, Optimized, Led, Built)
- Add quantifiable metrics wherever possible (%, numbers, scale)
- Match keywords from the job description
- Keep it concise and impactful
- Format: plain text with clear section headers in ALL CAPS

Return only the improved resume text, no explanations.`;

  try {
    let improvedText = '';

    if (provider === 'openai') {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: import.meta.env.AI_MODEL || 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });
      const data = await res.json();
      improvedText = data.choices?.[0]?.message?.content || '';

    } else if (provider === 'gemini') {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${import.meta.env.AI_MODEL || 'gemini-1.5-flash'}:generateContent?key=${import.meta.env.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const data = await res.json();
      improvedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    } else if (provider === 'anthropic') {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': import.meta.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: import.meta.env.AI_MODEL || 'claude-3-haiku-20240307',
          max_tokens: 2000,
          messages: [{ role: 'user', content: prompt }],
        }),
      });
      const data = await res.json();
      improvedText = data.content?.[0]?.text || '';
    }

    return new Response(JSON.stringify({ success: true, improved: improvedText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: 'AI request failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
