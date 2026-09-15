import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

// ponytail: try the cheapest editing model first, fall back if the account lacks access
const MODELS = ["gemini-3.1-flash-lite-image", "gemini-3.1-flash-image", "gemini-2.5-flash-image"];
const PROMPT =
  "Photorealistic renovation of this exact house, as an after photo for a real-estate listing. Keep the same camera angle, framing, building shape, window positions and surroundings. " +
  "Repaint the exterior walls, replace the roof and windows with clean modern ones, repair anything damaged or overgrown, tidy the garden and path, add soft warm evening light. " +
  "No text, no people, no watermarks, no added buildings.";

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return NextResponse.json({ error: "missing_key" }, { status: 500 });
  const { image } = (await req.json()) as { image?: string };
  const m = image?.match(/^data:(image\/[a-z]+);base64,(.+)$/);
  if (!m) return NextResponse.json({ error: "bad_image" }, { status: 400 });
  const [, mime, data] = m;

  let last = "";
  for (const model of MODELS) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: PROMPT }, { inline_data: { mime_type: mime, data } }] }],
        generationConfig: { responseModalities: ["IMAGE"] },
      }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { last = `${model}: ${r.status} ${j?.error?.message ?? ""}`.trim(); if (r.status === 404 || r.status === 403) continue; break; }
    const parts: { inlineData?: { mimeType: string; data: string } }[] = j?.candidates?.[0]?.content?.parts ?? [];
    const img = parts.find((p) => p.inlineData)?.inlineData;
    if (img) return NextResponse.json({ image: `data:${img.mimeType};base64,${img.data}`, model });
    last = `${model}: no image in response`;
  }
  return NextResponse.json({ error: last || "failed" }, { status: 502 });
}
