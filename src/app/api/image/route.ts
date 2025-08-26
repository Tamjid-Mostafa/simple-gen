// Example server proxy for images (optional)
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get("q") || "a cute corgi, 3D render";
  const img = await fetch(
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?model=turbo`
  );
  return new Response(img.body, {
    headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=3600" },
  });
}
