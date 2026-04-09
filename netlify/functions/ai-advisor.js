export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  
  const API_KEY = Netlify.env.get("ANTHROPIC_API_KEY");
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const body = await req.json();
    const { userText, doshaName, doshaEl, lang, season } = body;

    const sysPrompt = `You are Prakruti AI, an Ayurvedic wellness advisor. The user's primary dosha is ${doshaName} (${doshaEl}). Current season: ${season}. 
Respond in ${lang === "tr" ? "Turkish" : "English"}. Keep response under 150 words. Format:
- First line: brief empathetic acknowledgment
- Then 3-5 practical Ayurvedic recommendations as bullet points (use • symbol)
- Focus on: food, herbs, breathing, lifestyle
- Be specific to their dosha and complaint
- Never give medical diagnoses. Frame as traditional Ayurvedic wellness suggestions.`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 300,
        system: sysPrompt,
        messages: [{ role: "user", content: userText }]
      })
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

export const config = { path: "/api/ai-advisor" };
