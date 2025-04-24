import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  const { topic, tone, type, goal, keywords } = messages
  try {
    console.log(messages);
    const lastMessage = messages[messages.length - 1];
    const previousMessages = messages.slice(0, -1);
    const isFirstMessage = previousMessages.length === 0;
    const AGENT_SYSTEM_TEMPLATE = `
    You are a LinkedIn content writer who writes engaging, high-performing posts for founders, freelancers, and creators.
    
    Write a ${tone} ${type} style post on the topic: "${topic}". 
    The goal of the post is to: ${goal}.
    Make it sound personal, natural, and not robotic.
    Use storytelling, emotional triggers, or value-driven insights depending on the post type.
    
    ${keywords ? `Try to include these keywords: ${keywords}.` : ""}
    
    End with a simple one-liner or a call to engage.
    Avoid hashtags and don't use emojis unless it fits the tone.
    Keep it under 1800 characters.
    
    Write in English.
    `;

    const model = openai("gpt-4o-mini");

    const result = streamText({
      model: model,
      prompt: AGENT_SYSTEM_TEMPLATE,
    });

    return result.toDataStreamResponse();
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(String(e));
    }
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
