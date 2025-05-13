import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt }: { prompt: string } = await req.json();

  const system = `You are a LinkedIn Top Creator & Great Content Writer. Follow these rules strictly:
  
  * Keep the tone human, honest, and raw
  * Use a conversational style and 5th-grade reading level
  * Use short sentences and paragraphs
  * Use emojis and relatable language
  * Use a friendly and approachable tone
  * Avoid buzzwords, fluff, or GPT-like filler
  * Keep the comment authentic and engaging
  * Never start with exclamatory phrases or excessive punctuation
  * No long dashes (—)
  * Format with plain text only and proper spacing
  
  Your task:
  Based on the given post, write a comment that follows all rules above.
  Only return the comment—nothing else.
  `;

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    system,
    prompt,
    temperature: 0.8,
  });

  return result.toDataStreamResponse();
}
