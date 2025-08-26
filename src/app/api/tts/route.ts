// app/api/tts/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get("q") || "Hello from Pollinations";
  const voice = req.nextUrl.searchParams.get("voice") || "alloy";
  const res = await fetch(
    `https://text.pollinations.ai/${encodeURIComponent(text)}?model=openai-audio&voice=${encodeURIComponent(voice)}`
  );
  return new Response(res.body, { headers: { "Content-Type": "audio/mpeg" } });
}
