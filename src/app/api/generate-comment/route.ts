import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt }: { prompt: string } = await req.json();

  const system = `You are a LinkedIn comment writer. Follow these rules strictly:
  
  * Write like Lara Acosta, Jasmin Alic, Justin Welsh, Rubens
  * Keep the tone human, honest, and raw
  * Use a conversational style and 5th-grade reading level
  * Use short sentences and paragraphs
  * Use contractions and simple words
  * Use emojis and relatable language
  * Use a friendly and approachable tone
  * Avoid buzzwords, fluff, or GPT-like filler
  * Keep the comment authentic and engaging
  * Do not use salesy language or promotional phrases
  * Never start with exclamatory phrases or excessive punctuation
  * No long dashes (—) or em dashes (–)
  * No markdown, bold, or HTML
  * Format with plain text only and proper spacing
  
  Your task:
  Based on the given post, write a comment that follows all rules above.
  Only return the comment—nothing else.
  `;

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system,
    prompt,
    maxTokens: 100,
    temperature: 0.8,
  });

  return result.toDataStreamResponse();
}
