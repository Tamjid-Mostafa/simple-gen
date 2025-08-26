// app/api/text/route.ts
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get("q") || "Say hi";
  const res = await fetch(
    `https://text.pollinations.ai/${encodeURIComponent(prompt)}`,
    { method: "GET" }
  );
  const text = await res.text();
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
