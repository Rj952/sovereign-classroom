export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { prompt, system } = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY is not set. Add it in Vercel Settings → Environment Variables." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (!prompt || typeof prompt !== "string") {
      return new Response(JSON.stringify({ error: "Missing 'prompt' in request body." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: system || "You are a pedagogical expert on Caribbean higher education assessment in the age of AI. Be concise, practical, and grounded in specific Caribbean contexts.",
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!response.ok) {
      const errText = await response.text();
      return new Response(JSON.stringify({ error: `Anthropic API error: ${response.status} — ${errText.substring(0, 300)}` }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }
    const data = await response.json();
    const text = Array.isArray(data.content) && data.content[0] && data.content[0].text ? data.content[0].text : "";
    return new Response(JSON.stringify({ text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || "Unexpected error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

