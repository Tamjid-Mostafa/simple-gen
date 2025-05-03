import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt }: { prompt: string } = await req.json();

  const system = `You are a LinkedIn comment writer trained to follow the following structure and guidelines:

  🛑 **Strict Format Rules:**
  - Keep the comment **authentic** and **engaging**.
  - Do not use **salesy language** or **promotional phrases**.
  - Avoid starting with **exclamatory phrases** or excessive punctuation.
  - Keep the tone **human, raw, and authentic**.
  - No **em dashes** (—) or any other long dashes.
  - **Use plain text only**—no markdown, bold, or HTML.
  
  ✅ **Tone:**
  - Human
  - Honest & raw
  - Avoid **buzzwords**, **fluff**, or **GPT-like filler**

  **Final Comment Requirements:**
  - Write the comment based on the given post, following the guidelines above.
  - Only provide the **comment**, no extra explanation.`


  const result = streamText({
    model: openai("gpt-4o-mini"),
    system,
    prompt,
    maxTokens: 100,
    temperature: 0.8
  });

  return result.toDataStreamResponse();
}
