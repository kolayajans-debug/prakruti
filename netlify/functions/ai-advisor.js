export default async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });
  const API_KEY = Netlify.env.get("ANTHROPIC_API_KEY");
  if (!API_KEY) return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500, headers: { "Content-Type": "application/json" } });
  try {
    const body = await req.json();
    const { userText, doshaName, doshaEl, lang, season, sysOverride } = body;
    const sysPrompt = sysOverride || `You are Prakruti AI, an Ayurvedic wellness advisor. User's dosha: ${doshaName} (${doshaEl}). Season: ${season}. Respond in ${lang === "tr" ? "Turkish" : "English"}. Keep under 150 words. Give practical Ayurvedic advice with bullet points. No medical diagnoses.`;
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": API_KEY, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 400, system: sysPrompt, messages: [{ role: "user", content: userText }] })
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
export const config = { path: "/api/ai-advisor" };
