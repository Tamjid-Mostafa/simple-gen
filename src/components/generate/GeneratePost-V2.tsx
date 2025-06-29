// GeneratePostV2.tsx
"use client";

import { useState, useRef, useEffect, useId } from "react";
import { useCompletion } from "@ai-sdk/react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
import { useUserSettings } from "@/hooks/useUserSettings";
import { ScrollArea } from "../ui/scroll-area";
import { motion } from "motion/react";
import { usePostStore } from "@/store/post-store";

export default function GeneratePostV2() {
  // Need use /store/user-settings-store.ts later when free
  const { settings } = useUserSettings();

  const { formData, updateFormField, addPost, post } = usePostStore();
  console.log(post);

  const [copied, setCopied] = useState(false);
  const resultAreaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/generate-post",
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    updateFormField(field, value);
  };

  useEffect(() => {
    if (settings) {
      updateFormField("customEnding", settings.cta || formData.customEnding);
    }
  }, [settings, formData.customEnding, updateFormField]);

  useEffect(() => {
    if (isLoading || completion) {
      const topOffset = resultAreaRef.current?.offsetTop ?? 0;
      window.scrollTo({
        top: topOffset - 20,
        behavior: "smooth",
      });
    }
  }, [isLoading, completion]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleGeneratePost = async (e: React.FormEvent) => {
    e.preventDefault();
    addPost(null);
    if (!formData.topic.trim()) {
      toast({
        title: "Missing topic",
        description: "Please enter a topic.",
        variant: "destructive",
      });
      return;
    }

    if (!settings) {
      toast({
        title: "Preferences missing",
        description: "Please complete onboarding or visit settings.",
        variant: "destructive",
      });
      return;
    }

    const prompt = `
    Topic: "${formData.topic}"
    Industry: ${settings.industry?.join(", ") || "N/A"}
    Job: ${settings.jobDescription?.join(", ") || "N/A"}
    Style: ${settings.writingStyle?.join(", ") || "N/A"}
    Purpose: ${settings.postPurpose?.join(", ") || "N/A"}
    Personal Context: ${settings.fineTuning || ""}
    ${formData.characters ? `Minimum ${formData.characters} characters.` : ""}
    ${
      formData.customEnding
        ? `Before any hashtags, include this custom ending/CTA: \"${formData.customEnding}\"`
        : ""
    }
    `;

    try {
      const res = await complete(prompt);
      if (res) {
        addPost(res);
      }
    } catch {
      toast({
        title: "Generation failed",
        description: "Unable to generate post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = () => {
    if (!completion) return;
    navigator.clipboard.writeText(completion);
    setCopied(true);
    toast({ title: "Copied!", description: "Post copied to clipboard" });
  };

  const characterOptions = [
    { value: "600", label: "Approx. 600 characters" },
    { value: "900", label: "Approx. 900 characters" },
    { value: "1200", label: "Approx. 1200 characters" },
    { value: "1500", label: "Approx. 1500 characters" },
  ];

  const topicList = settings?.topics || [];
  return (
    <div
      ref={containerRef}
      className="max-w-3xl w-full mx-auto py-8 px-4 space-y-8"
    >
      <Tabs defaultValue="manual" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="manual">Write Topic</TabsTrigger>
          <TabsTrigger value="pick">Pick from List</TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <Card>
            <CardHeader>
              <CardTitle>Create Post from Scratch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleGeneratePost} className="space-y-6">
                <Textarea
                  value={formData.topic}
                  onChange={(e) => handleChange("topic", e.target.value)}
                  placeholder="Write your topic or idea..."
                  rows={5}
                />
                <Select
                  value={formData.characters}
                  onValueChange={(val) => handleChange("characters", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select character count" />
                  </SelectTrigger>
                  <SelectContent>
                    {characterOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  value={formData.customEnding}
                  onChange={(e) => handleChange("customEnding", e.target.value)}
                  placeholder="Optional: Add your CTA or custom closing"
                  rows={4}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    "Generate Post"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pick">
          <Card>
            <CardHeader>
              <CardTitle>Pick a Saved Topic</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleGeneratePost} className="space-y-6">
                <div className="flex gap-4 items-center">
                  <Select
                    value={formData.topic}
                    onValueChange={(val) => handleChange("topic", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a topic from preferences" />
                    </SelectTrigger>
                    <SelectContent>
                      {topicList.map((topic: string) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="secondary" disabled>
                    Generate Topic Ideas
                  </Button>
                </div>
                <Select
                  value={formData.characters}
                  onValueChange={(val) => handleChange("characters", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select character count" />
                  </SelectTrigger>
                  <SelectContent>
                    {characterOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  value={formData.customEnding}
                  onChange={(e) => handleChange("customEnding", e.target.value)}
                  placeholder="Optional: Add your CTA or custom closing"
                  rows={4}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Generating...
                    </>
                  ) : (
                    "Generate Post"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {(isLoading || completion || post) && (
        <Card ref={resultAreaRef} className="border-2 border-muted">
          <CardHeader>
            <CardTitle>Your LinkedIn Post</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="font-medium whitespace-pre-wrap border rounded p-4 h-[calc(100vh-200px)] transition-all duration-200 ease-in-out">
              {completion || post || (isLoading ? "Generating..." : "")}
            </ScrollArea>
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                onClick={handleCopy}
                disabled={!completion || isLoading || !post}
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
