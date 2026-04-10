export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  const body = await request.json();
  const { resumeText, role, level, jd, formData } = body;
  const provider = "openai";
  const prompt = `You are an expert resume writer and ATS optimization specialist.

${formData ? `User details:
- Name: ${formData.name || "Not provided"}
- Target Role: ${formData.title || role || "Not specified"}
- Experience Level: ${formData.level || level || "Not specified"}
- Location: ${formData.location || "Not specified"}
` : ""}

${resumeText ? `Original resume:
${resumeText}` : ""}
${jd ? `
Target Job Description:
${jd}` : ""}

Task: Rewrite this resume to be ATS-optimized and professional. 
- Use strong action verbs (Architected, Delivered, Optimized, Led, Built)
- Add quantifiable metrics wherever possible (%, numbers, scale)
- Match keywords from the job description
- Keep it concise and impactful
- Format: plain text with clear section headers in ALL CAPS

Return only the improved resume text, no explanations.`;
  try {
    let improvedText = "";
    if (provider === "openai") {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${"sk-your-openai-key-here"}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 2e3,
          temperature: 0.7
        })
      });
      const data = await res.json();
      improvedText = data.choices?.[0]?.message?.content || "";
    }
    return new Response(JSON.stringify({ success: true, improved: improvedText }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "AI request failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
