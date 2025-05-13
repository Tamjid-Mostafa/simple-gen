"use client";
import { useState, useRef, useEffect } from "react";
import { useCompletion } from "@ai-sdk/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ToneSelect } from "./ToneSelect";

// Define form data type to avoid TypeScript errors
type FormField =
  | "tone"
  | "type"
  | "topic"
  | "goal"
  | "keywords"
  | "persona"
  | "audience"
  | "characters"
  | "customEnding";

type FormData = {
  [key in FormField]: string;
};

export default function GeneratePost() {
  // Consolidated form state with proper typing
  const [formData, setFormData] = useState<FormData>({
    tone: "storytelling 📖",
    type: "story 📘",
    topic: "freelancing",
    goal: "",
    keywords: "",
    audience: "",
    persona: "",
    characters: "600",
    customEnding: "",
  });
  // Copy status state
  const [copied, setCopied] = useState(false);

  // Refs for focus management
  const resultAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/generate-post",
  });

  // Handle form field changes with proper typing
  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Scroll to results when generation starts or completes
  useEffect(() => {
    if (isLoading || completion) {
      resultAreaRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading, completion]);

  // Reset copy status after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  // Form submission handler
  const handleGeneratePost = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const requiredFields: FormField[] = ["tone", "type", "topic"];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      toast({
        title: "Missing information",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    const prompt = `
    Write a ${formData.tone} LinkedIn ${formData.type} post on the topic: "${
      formData.topic
    }".
    
    ${formData.goal ? `Goal: "${formData.goal}"` : ""}  
    ${formData.keywords ? `Keywords: "${formData.keywords}"` : ""}
    
    ${formData.persona ? `Written like ${formData.persona}.` : ""}  
    ${formData.audience ? `Helping ${formData.audience}.` : ""}
    ${formData.characters ? `Minimum ${formData.characters} characters.` : ""}
    
    ${
      formData.customEnding
        ? `Before any hashtags, include this custom ending/CTA: "${formData.customEnding}"`
        : ""
    }
    `;

    try {
      await complete(prompt);
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Unable to generate post. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Copy to clipboard handler
  const handleCopy = () => {
    if (!completion) return;

    navigator.clipboard.writeText(completion);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Post copied to clipboard",
    });
  };

  // Form options
  // Tone options aimed at viral traction
const toneOptions = [
  "storytelling 📖",
  "emotional ❤️",
  "bold 💥",
  "insightful 💡",
  "funny 😂",
  "motivational 🔥",
  "direct 🎯",
  "controversial ⚠️",
  "relatable 😅",
  "reflective 🤔"
];

// Post‑type options that map to proven viral formulas
const typeOptions = [
  "story 📘",            // hero & lesson arc
  "lesson learned 📚",   // Jasmin/Lara frameworks
  "hot take 🔥",         // contrarian view
  "vulnerability 💔",    // fail or personal low point
  "win 🏆",              // achievement with takeaway
  "mistake ❌",          // what I’d avoid next time
  "pivot 🔄",            // change in strategy
  "advice 🧠",           // step‑by‑step tactic
  "behind the scenes 🎬",
  "audience question ❓" // designed to farm comments
];

  const characterOptions = [
    { value: "600", label: "Approx. 600 characters" },
    { value: "900", label: "Approx. 900 characters" },
    { value: "1200", label: "Approx. 1200 characters" },
    { value: "1500", label: "Approx. 1500 characters" },
  ];

  return (
    <div
      ref={containerRef}
      className="max-w-3xl w-full mx-auto py-8 px-4 space-y-8"
    >
      <Card className="w-full">
        <CardHeader className="pb-4 border-b">
          <CardTitle className="text-2xl font-bold">
            LinkedIn Post Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleGeneratePost}
            className="pt-6 grid gap-6 w-full"
          >
            <div className="grid md:grid-cols-2 gap-4 w-full">
              {/* Tone Selection */}
              <div className="space-y-2 w-full">
                <Label htmlFor="tone" className="font-medium">
                  Tone<span className="text-red-500">*</span>
                </Label>
                <Select
                value={formData.tone}
                onValueChange={(value) => handleChange("tone", value)}
              >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {toneOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Selection */}
              <div className="space-y-2 w-full">
                <Label htmlFor="type" className="font-medium">
                  Type<span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleChange("type", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select post type" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Topic Input */}
            <div className="space-y-2 w-full">
              <Label htmlFor="topic" className="font-medium">
                Topic<span className="text-red-500">*</span>
              </Label>
              <Input
                id="topic"
                value={formData.topic}
                onChange={(e) => handleChange("topic", e.target.value)}
                placeholder="e.g., freelance journey, client acquisition"
                className="w-full"
              />
            </div>
            {/* Post Generation Settings */}
            <Accordion type="single" collapsible defaultValue="settings">
              <AccordionItem value="settings">
                <AccordionTrigger className="text-lg font-semibold">
                  Post Settings
                </AccordionTrigger>
                <AccordionContent className="px-4">
                  <div className="space-y-5 pt-2">
                    {/* Goal Input */}
                    <div className="space-y-2 w-full">
                      <Label htmlFor="goal" className="font-medium">
                        Goal
                      </Label>
                      <Input
                        id="goal"
                        value={formData.goal}
                        onChange={(e) => handleChange("goal", e.target.value)}
                        placeholder="e.g., get leads, share knowledge"
                        className="w-full"
                      />
                    </div>

                    {/* Keywords Input */}
                    <div className="space-y-2 w-full">
                      <Label htmlFor="keywords" className="font-medium">
                        Keywords
                      </Label>
                      <Input
                        id="keywords"
                        value={formData.keywords}
                        onChange={(e) =>
                          handleChange("keywords", e.target.value)
                        }
                        placeholder="e.g., growth, time management, scaling"
                        className="w-full"
                      />
                    </div>

                    {/* Persona Input */}
                    <div className="space-y-2 w-full">
                      <Label htmlFor="persona" className="font-medium">
                        Your Persona
                      </Label>
                      <Input
                        id="persona"
                        value={formData.persona}
                        onChange={(e) =>
                          handleChange("persona", e.target.value)
                        }
                        placeholder="e.g., John Doe - Marketing Specialist"
                        className="w-full"
                      />
                    </div>

                    {/* Audience Input */}
                    <div className="space-y-2 w-full">
                      <Label htmlFor="audience" className="font-medium">
                        Target Audience
                      </Label>
                      <Input
                        id="audience"
                        value={formData.audience}
                        onChange={(e) =>
                          handleChange("audience", e.target.value)
                        }
                        placeholder="e.g., business owners looking to scale"
                        className="w-full"
                      />
                    </div>

                    {/* Character Count Selection */}
                    <div className="space-y-2 w-full">
                      <Label htmlFor="characters" className="font-medium">
                        Approximate Character Count
                      </Label>
                      <Select
                        value={formData.characters}
                        onValueChange={(value) =>
                          handleChange("characters", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select approximate character count" />
                        </SelectTrigger>
                        <SelectContent>
                          {characterOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Custom Ending/CTA Textarea */}
                    <div className="space-y-2 w-full">
                      <Label htmlFor="customEnding" className="font-medium">
                        Custom Ending/CTA
                      </Label>
                      <Textarea
                        id="customEnding"
                        value={formData.customEnding}
                        onChange={(e) =>
                          handleChange("customEnding", e.target.value)
                        }
                        placeholder="e.g., Check out my new course at example.com/course or 'DM me for a free consultation'"
                        rows={10}
                        className="w-full resize-none"
                      />
                      <p className="text-xs text-gray-500">
                        Add any links, CTAs, or custom text you want to appear
                        at the end of your post before hashtags.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full py-6">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating your post...
                </>
              ) : (
                "Generate Post"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Result area - conditionally rendered */}
      {(isLoading || completion) && (
        <div ref={resultAreaRef} className="w-full">
          <Card
            className={`w-full ${completion ? "border-2 border-primary" : ""}`}
          >
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                Your LinkedIn Post
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <div
                className="w-full font-medium text-base p-4 border border-gray-300 rounded-md min-h-40"
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {completion || (isLoading ? "Generating..." : "")}
              </div>
              <div className="flex justify-end mt-4 w-full">
                <Button
                  variant="outline"
                  onClick={handleCopy}
                  disabled={!completion || isLoading}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy to Clipboard
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
