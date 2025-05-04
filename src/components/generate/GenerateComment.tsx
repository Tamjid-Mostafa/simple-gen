"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ToneSelect } from "./ToneSelect";
import {
  CheckCircle,
  Copy,
  Loader2,
  RefreshCw,
  Link as LinkIcon,
} from "lucide-react";
import { fetchLinkedInPostData } from "./GetPostText";
import { useCompletion } from "@ai-sdk/react";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define form data types with proper typing
type WordCountOption = "<10 Words" | "<25 Words" | "<50 Words" | "<75 Words";
type ToneOption =
  | "Informative"
  | "Friendly"
  | "Professional"
  | "Enthusiastic"
  | "Thoughtful";

interface FormData {
  tone: ToneOption;
  wordCount: WordCountOption;
  keywordsInclude: string;
  keywordsExclude: string;
  hasHashtags: boolean;
  linkedinPost: string;
  mentionAuthor: boolean;
}

export default function GenerateComment() {
  // Initialize form data with default values
  const [formData, setFormData] = useState<FormData>({
    tone: "Informative",
    wordCount: "<25 Words",
    keywordsInclude: "",
    keywordsExclude: "",
    hasHashtags: false,
    linkedinPost: "",
    mentionAuthor: true,
  });

  // State management
  const [postInfo, setPostInfo] = useState<{
    articleBody?: string;
    author?: { name: string };
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [remainingConnects, setRemainingConnects] = useState(49);
  const [urlValidated, setUrlValidated] = useState<boolean | null>(null);

  const resultAreaRef = useRef<HTMLDivElement>(null);

  // AI completion setup
  const { completion, complete, isLoading, error } = useCompletion({
    api: "/api/generate-comment",
  });

  // Handle form field changes with type safety
  const handleChange = <K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // URL validation function
  const validateLinkedInUrl = (url: string): boolean => {
    return /^https?:\/\/(www\.)?linkedin\.com\/.*\/.*/.test(url);
  };

  // Effect to validate URL when it changes
  useEffect(() => {
    if (formData.linkedinPost) {
      const isValid = validateLinkedInUrl(formData.linkedinPost);
      setUrlValidated(isValid);
    } else {
      setUrlValidated(null);
    }
  }, [formData.linkedinPost]);

  // Handle form submission
  const handleGenerateComment = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.linkedinPost) {
      toast({
        title: "Missing LinkedIn Post URL",
        description: "Please enter a LinkedIn post URL.",
        variant: "destructive",
      });
      return;
    }

    if (!urlValidated) {
      toast({
        title: "Invalid LinkedIn URL",
        description: "Please enter a valid LinkedIn post URL.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Fetch LinkedIn post data
      const response = await fetchLinkedInPostData(formData.linkedinPost);
      if (!response || !response.articleBody) {
        throw new Error("Could not fetch post content");
      }

      setPostInfo(response);
      const { articleBody, author } = response;

      // Construct the prompt for AI
      const prompt = constructPrompt(articleBody, author?.name);

      // Generate comment
      await complete(prompt);
      setRemainingConnects((prev) => Math.max(0, prev - 1));

      // Scroll to result
      resultAreaRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error generating comment:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to generate comment",
        variant: "destructive",
      });
    }
  };

  // Construct prompt based on form data
  const constructPrompt = (
    articleBody: string,
    authorName?: string
  ): string => {
    return `
      Write a LinkedIn comment in response to the post below, following this structure:
      
      ➤ **Supporting Intro** — Start by agreeing with the post or showing enthusiasm about the author's perspective.
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
      ${formData.wordCount ? `Limit the comment to: ${formData.wordCount}` : ""}
      ${
        formData.hasHashtags
          ? "Include 1-3 relevant hashtags at the end."
          : "Do not include hashtags."
      }
      
      Tone: ${formData.tone}
      ${
        formData.mentionAuthor && authorName
          ? `Make sure to mention the author: ${authorName}`
          : ""
      }
      
      The comment should feel natural, engaging, and not overly promotional or spammy. It should sound like a genuine person engaging with content they appreciate.
    `;
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

    // Reset copy status after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  };

  // Reset button handler
  const handleReset = () => {
    setFormData({
      tone: "Informative",
      wordCount: "<25 Words",
      keywordsInclude: "",
      keywordsExclude: "",
      hasHashtags: false,
      linkedinPost: "",
      mentionAuthor: true,
    });
    setPostInfo(null);
  };

  // Word count options
  const wordCountOptions: WordCountOption[] = [
    "<10 Words",
    "<25 Words",
    "<50 Words",
    "<75 Words",
  ];

  return (
    <div className="max-w-3xl w-full mx-auto py-8 space-y-8">
      <Card className="w-full shadow-md">
        <CardHeader className="pb-4 border-b">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold">
              LinkedIn Comment Generator
            </CardTitle>
            {/* <Badge variant="outline" className="text-blue-500 whitespace-nowrap">
              {remainingConnects} connects remaining
            </Badge> */}
          </div>
        </CardHeader>

        <form onSubmit={handleGenerateComment}>
          <CardContent className="pt-6 space-y-6">
            {/* LinkedIn Post URL Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="linkedin-url" className="font-medium text-base">
                  LinkedIn Post URL<span className="text-red-500">*</span>
                </Label>
                {urlValidated !== null && (
                  <Badge variant={urlValidated ? "default" : "destructive"}>
                    {urlValidated ? "Valid URL" : "Invalid URL"}
                  </Badge>
                )}
              </div>
              <div className="relative">
                <Input
                  id="linkedin-url"
                  value={formData.linkedinPost}
                  onChange={(e) => handleChange("linkedinPost", e.target.value)}
                  placeholder="https://www.linkedin.com/posts/username_title-activity-id"
                  className="pl-10 border p-3 rounded-lg"
                />
              </div>
            </div>

            {/* Comment Generation Settings */}
            <Accordion type="single" collapsible defaultValue="settings">
              <AccordionItem value="settings">
                <AccordionTrigger className="text-lg font-semibold">
                  Comment Settings
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="space-y-5 pt-2">
                    {/* Tone Selection */}
                    <div className="space-y-2">
                      <ToneSelect
                        value={formData.tone}
                        onChange={(value) =>
                          handleChange("tone", value as ToneOption)
                        }
                      />
                    </div>

                    {/* Word Count */}
                    <div className="space-y-2">
                      <Label className="font-medium">Word Count</Label>
                      <div className="flex gap-2 flex-wrap">
                        {wordCountOptions.map((count) => (
                          <Button
                            key={count}
                            type="button"
                            onClick={() => handleChange("wordCount", count)}
                            variant={
                              formData.wordCount === count
                                ? "default"
                                : "outline"
                            }
                            className="transition-colors duration-200"
                          >
                            {count}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Optional Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="hashtags"
                          checked={formData.hasHashtags}
                          onCheckedChange={() =>
                            handleChange("hasHashtags", !formData.hasHashtags)
                          }
                        />
                        <Label htmlFor="hashtags" className="cursor-pointer">
                          Include Hashtags
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="mention-author"
                          checked={formData.mentionAuthor}
                          onCheckedChange={() =>
                            handleChange(
                              "mentionAuthor",
                              !formData.mentionAuthor
                            )
                          }
                        />
                        <Label
                          htmlFor="mention-author"
                          className="cursor-pointer"
                        >
                          Mention Author
                        </Label>
                      </div>
                    </div>

                    {/* Advanced Options - could be enabled in a future version */}
                    {/* <div className="space-y-2 pt-2">
                      <Label className="font-medium">Keywords to Include</Label>
                      <Input
                        value={formData.keywordsInclude}
                        onChange={(e) => handleChange("keywordsInclude", e.target.value)}
                        placeholder="Separate with commas (e.g., value, growth, strategy)"
                        className="border p-3 rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-medium">Keywords to Exclude</Label>
                      <Input
                        value={formData.keywordsExclude}
                        onChange={(e) => handleChange("keywordsExclude", e.target.value)}
                        placeholder="Separate with commas (e.g., competitor, negative)"
                        className="border p-3 rounded-lg"
                      />
                    </div> */}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Post Information (shows after fetching) */}
            {postInfo && (
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-2">Post Preview</h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {postInfo.articleBody?.substring(0, 150)}
                  {postInfo.articleBody && postInfo.articleBody.length > 150
                    ? "..."
                    : ""}
                </p>
                {postInfo.author?.name && (
                  <div className="mt-2 text-sm text-gray-500">
                    Author: {postInfo.author.name}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isLoading || !urlValidated}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating comment...
                  </>
                ) : (
                  "Generate Comment"
                )}
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleReset}
                      className="aspect-square"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset form</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardContent>
        </form>

        {/* Result Section */}
        {(isLoading || completion) && (
          <CardFooter className="flex-col pt-6 border-t">
            <div className="text-base font-medium mb-2">Generated Comment</div>
            <div ref={resultAreaRef} className="w-full relative group">
              <div
                className="w-full font-medium text-base p-4 border border-gray-300 rounded-md min-h-40"
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {completion ||
                  (isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                  ) : (
                    ""
                  ))}
              </div>
              {completion && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  disabled={!completion || isLoading}
                  className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            {error && (
              <div className="mt-2 text-sm text-red-500">
                Error: {error.message || "Something went wrong"}
              </div>
            )}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
