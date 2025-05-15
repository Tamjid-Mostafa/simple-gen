import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { NextRequest, NextResponse } from "next/server";
import { UserSettings } from "@/types/user";
import { auth, getAuth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  // Use `auth()` to get the user's ID
  const { userId } = await auth()

  // Protect the route by checking if the user is signed in
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const {
    shareContent,
    postPurpose,
    writingStyle,
    industry,
    jobDescription,
    fineTuning,
    cta,
  } = await req.json();
  const prompt = `
    You are an AI content strategist for LinkedIn. Based on the following preferences, generate 10 concise, trending LinkedIn content ideas.
    
    Preferences:
    - Share content: ${shareContent.join(", ")}
    - Post purpose: ${postPurpose.join(", ")}
    - Writing style: ${writingStyle.join(", ")}
    - Industry: ${industry.join(", ")}
    - Job description: ${jobDescription.join(", ")}
    - Personal context: ${fineTuning || "N/A"}
    
    Each topic should be:
    - Short and attention-grabbing (4–10 words)
    - Focused on trends, insights, or tools
    - Relevant to the user's industry and goals
    Only return a raw JSON array of strings like:
    ["Topic 1", "Topic 2", ...]
    `;

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt,
  });
  console.log({ result: result.text });

  try {
    const cleaned = result.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const topics = JSON.parse(cleaned);

    const userSettings: UserSettings = {
        shareContent,
        postPurpose,
        writingStyle,
        industry,
        jobDescription,
        fineTuning,
        cta,
        topics,
      };
    
      return NextResponse.json({
        message: "ok",
        data: userSettings,
      });
    
  } catch (e) {
    console.error("OpenAI Error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}
