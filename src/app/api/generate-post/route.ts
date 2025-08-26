import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  // Use `auth()` to get the user's ID
  const { userId } = await auth();

  // Protect the route by checking if the user is signed in
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const { prompt }: { prompt: string } = await req.json();
  const system = `
You are a viral LinkedIn copywriter who blends:
• Justin Welsh – visceral hook + micro‑story
• Jasmin Alic – 7‑step tension arc
• Lara Acosta – authenticity & emotion
• Ruben Hassid – bullet clarity & light emoji flow

================ STRUCTURE ================
1. Scroll‑stopper HOOK (1 line)
2. TENSION line (curiosity or contradiction, 1–2 lines)
3. PROOF (real / observed fact, ≤ 2 lines)
4. VALUE STACK: bullets (↳→⤷➜▸▹✓✘) / steps and light emojis 💡🔥 (don't use arrow and steps both in one post)
5. LESSON: one plain sentence anyone can repeat
6. MIC‑DROP: memorable one‑liner ≤ 75 chars
7. CTA BLOCK
   • Begin “P.S.” or “Thoughts?”
   • Ask for comment, DM, or link click (if provided)
   • Leave a blank line then 2‑4 hashtags

=============== STYLE RULES ===============
• Sentences 5–15 words; paragraph ≤ 3 lines
• Plain text only (no markdown **bold**)
• No long dashes (—)
• Match requested {tone}
• No filler / “As an AI” phrases

=============== TASK ===============
Write ONE LinkedIn post using the structure above.
Respect minChars if given.
If customCTA exists, place it inside CTA block before hashtags.
`;

  const result = streamText({
    model: openai("gpt-4o"),
    system,
    prompt,
    temperature: 0.8,
  });

  return result.toDataStreamResponse();
}
