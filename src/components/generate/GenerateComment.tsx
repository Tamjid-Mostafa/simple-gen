"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ToneSelect } from "./ToneSelect";
import { CheckCircle, Copy } from "lucide-react";
import { fetchLinkedInPostData } from "./GetPostText";
import { useCompletion } from "@ai-sdk/react";
import { toast } from "@/hooks/use-toast";

// Define form data type
type FormField =
  | "tone"
  | "wordCount"
  | "keywordsInclude"
  | "keywordsExclude"
  | "hasHashtags"
  | "linkedinPost"
  | "mentionAuthor";

type FormData = {
  [key in FormField]: string | boolean;
};

export default function GenerateComment() {
  // Consolidated form state
  const [formData, setFormData] = useState<FormData>({
    tone: "Informative",
    wordCount: "<25 Words",
    keywordsInclude: "",
    keywordsExclude: "",
    hasHashtags: false,
    linkedinPost: "",
    mentionAuthor: true,
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [remainingConnects, setRemainingConnects] = useState(49);
  const [copied, setCopied] = useState(false);

  const resultAreaRef = useRef<HTMLDivElement>(null); // Ref for scrolling to result

  const handleGenerateComment = async () => {
    setIsGenerating(true);

    try {
      // Fetch LinkedIn post data
      const response = await fetchLinkedInPostData(
        formData.linkedinPost as string
      );
      const { articleBody, author } = response;

      // Prepare the prompt dynamically based on form data
      let prompt = `
        Write a LinkedIn comment in response to the post below, following this structure:
        
        ➤ **Supporting Intro** — Start by agreeing with the post or showing enthusiasm about the author’s perspective.
        ➤ **Restating Content** — Briefly restate or summarize the key points from the post.
        ➤ **Adding Additional Value or New Perspective** — Add your own insights, experiences, or perspective related to the post's topic.
        ➤ **More Support** — End with a supportive statement, encouragement, or a reinforcement of the message.
      

        Post content:
        "${articleBody}"

        ${
          formData.keywordsInclude
            ? `Include these keywords: ${formData.keywordsInclude}`
            : ""
        }
        ${
          formData.keywordsExclude
            ? `Avoid these keywords: ${formData.keywordsExclude}`
            : ""
        }
        ${
          formData.wordCount
            ? `Limit the comment to: ${formData.wordCount}`
            : ""
        }
        ${
          formData.hasHashtags
            ? "Include relevant hashtags."
            : "Do not include hashtags."
        }
        
        Tone: ${formData.tone}
      `;

      // If mentionAuthor is true, add the author's name to the comment
      if (formData.mentionAuthor) {
        prompt += `\n\nMake sure to mention the author: ${author.name}`;
      }

      // Send the prompt to generate the comment using the AI or other completion logic
      await complete(prompt);

      setIsGenerating(false);
      setRemainingConnects(remainingConnects - 1);
    } catch (error) {
      console.error("Error generating comment:", error);
      setIsGenerating(false);
    }
  };

  // Copy to clipboard handler
  const handleCopy = () => {
    if (!completion) return;

    navigator.clipboard.writeText(completion);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Comment copied to clipboard",
    });
  };

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/generate-comment",
  });

  // Scroll to results when generation starts or completes
  useEffect(() => {
    if (isLoading || completion) {
      resultAreaRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading, completion]);

  // Reset copy status after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Handle form field changes
  const handleChange = (field: FormField, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      ref={resultAreaRef}
      className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-sm"
    >
      <div className="grid md:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card className="bg-white border p-4 rounded-lg">
          <CardContent className="p-4">
            <div className="relative group/area">
              <div
                className="w-full font-medium text-base p-4 border border-gray-300 rounded-md min-h-40"
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {completion ||
                  (isLoading ? "Generating..." : "Let the Gen cooking...")}
              </div>
              {completion && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  disabled={!completion || isLoading}
                  className="flex items-center gap-2 absolute top-2 right-2 group-hover/area:opacity-100 opacity-0 transition duration-300"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            <div className="relative mt-6">
              <Input
                value={formData.linkedinPost as string}
                onChange={(e) => handleChange("linkedinPost", e.target.value)}
                placeholder="Paste LinkedIn Post Link here"
                className="border p-3 rounded-lg mb-3"
              />

              <div className="flex gap-2 mt-4">
                <Button
                  onClick={handleGenerateComment}
                  className="flex-1"
                  disabled={isGenerating}
                >
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-indigo-900">Settings</h2>

          {/* Tone */}
          <ToneSelect
            value={formData.tone as string}
            onChange={(value) => handleChange("tone", value)}
          />

          {/* Word Count */}
          <div className="space-y-2">
            <span className="font-medium">Word Count</span>
            <div className="flex gap-2 flex-wrap">
              {[
                "<6 Words",
                "<10 Words",
                "<15 Words",
                "<25 Words",
                "<50 Words",
                "<75 Words",
              ].map((count) => (
                <Button
                  key={count}
                  onClick={() => handleChange("wordCount", count)}
                  className={`${
                    formData.wordCount === count
                      ? "bg-blue-500 text-white"
                      : "bg-white border text-black hover:bg-gray-100"
                  } px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out`}
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <span className="font-medium">Keywords to include</span>
            <Input
              value={formData.keywordsInclude as string}
              onChange={(e) => handleChange("keywordsInclude", e.target.value)}
              placeholder="Separate words with a comma ','"
              className="border p-3 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <span className="font-medium">Keywords to exclude</span>
            <Input
              value={formData.keywordsExclude as string}
              onChange={(e) => handleChange("keywordsExclude", e.target.value)}
              placeholder="Separate words with a comma ','"
              className="border p-3 rounded-lg"
            />
          </div>

          {/* Allow Hashtags */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="hashtags"
              checked={formData.hasHashtags as boolean}
              onCheckedChange={() =>
                handleChange("hasHashtags", !formData.hasHashtags)
              }
            />
            <label htmlFor="hashtags" className="font-medium cursor-pointer">
              Allow Hashtags
            </label>
          </div>

          {/* Mention Author Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="mention-author"
              checked={formData.mentionAuthor as boolean}
              onCheckedChange={() =>
                handleChange("mentionAuthor", !formData.mentionAuthor)
              }
            />
            <label
              htmlFor="mention-author"
              className="font-medium cursor-pointer"
            >
              Mention Author in Comment
            </label>
          </div>

          {/* Sample Prompt */}
          <div className="space-y-2">
            <span className="font-medium">Sample Prompt</span>
            <div className="border rounded-lg p-3 bg-gray-50 text-sm h-32 overflow-y-auto">
              <pre className="whitespace-pre-wrap">{samplePrompt}</pre>
            </div>
          </div>
        </div>
      </div>

      {/* Remaining Connects */}
      <div className="mt-6 border rounded-lg p-3 bg-blue-50 text-blue-700 text-center">
        Remaining connects: {remainingConnects}
      </div>
    </div>
  );
}

const samplePrompt = `
Write a LinkedIn comment in response to the post below. Follow these guidelines:

- Supporting intro: Start by agreeing with the post or showing enthusiasm.
- Restating content: Summarize the key points from the post.
- Adding additional value or new perspective: Add your own insights or experiences related to the topic.
- More support: End with a positive reinforcement or additional point to reinforce the message.

`;
