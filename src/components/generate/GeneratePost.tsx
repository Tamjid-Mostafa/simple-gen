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
import { Loader2 } from "lucide-react";

export default function GeneratePost() {
  // Form state
  const [tone, setTone] = useState("casual");
  const [type, setType] = useState("story");
  const [topic, setTopic] = useState("freelance journey");
  const [goal, setGoal] = useState("get leads");
  const [keywords, setKeywords] = useState("growth, time management");
  const [persona, setPersona] = useState(
    "Tamjid Mostafa — Web + Automation + AI Systems Builder"
  );
  const [audience, setAudience] = useState(
    "founders and service providers who want to scale"
  );

  // Refs for scrolling and focusing
  const resultAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { completion, complete, isLoading } = useCompletion({
    api: "/api/generate-post",
  });

  // Ensure textarea focus and scrolling when completion updates
  useEffect(() => {
    if (isLoading || completion) {
      // Show and scroll to result area immediately when generation starts
      if (resultAreaRef.current) {
        resultAreaRef.current.style.display = "block";
        resultAreaRef.current.scrollIntoView({ behavior: "smooth" });
      }
      
      // Focus textarea and ensure cursor is at the end
      if (textareaRef.current) {
        textareaRef.current.focus();
        
        // Set cursor to the end of text
        const textLength = textareaRef.current.value.length;
        textareaRef.current.setSelectionRange(textLength, textLength);
      }
    }
  }, [completion, isLoading]);

  // Auto-scroll to follow new content as it's generated
  useEffect(() => {
    if (textareaRef.current && completion) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [completion]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    const prompt = `
    Write a ${tone} LinkedIn ${type} post on the topic: "${topic}".
    
    Goal: "${goal}"  
    Keywords: "${keywords}"
    
    Written like ${persona}.  
    Helping ${audience}.
    `;
    await complete(prompt);
  };

  return (
    <div ref={containerRef} className="max-w-3xl w-full mx-auto py-8 px-4 space-y-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            LinkedIn Post Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="grid gap-6 w-full">
            <div className="grid md:grid-cols-2 gap-4 w-full">
              <div className="space-y-2 w-full">
                <Label htmlFor="tone" className="font-medium">
                  Tone
                </Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="storytelling">Storytelling</SelectItem>
                    <SelectItem value="insightful">Insightful</SelectItem>
                    <SelectItem value="bold">Bold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 w-full">
                <Label htmlFor="type" className="font-medium">
                  Type
                </Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select post type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="story">Story</SelectItem>
                    <SelectItem value="advice">Advice</SelectItem>
                    <SelectItem value="achievement">Achievement</SelectItem>
                    <SelectItem value="mistake">Mistake</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="topic" className="font-medium">
                Topic
              </Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., freelance journey, client acquisition"
                className="w-full"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="goal" className="font-medium">
                Goal
              </Label>
              <Input
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., get leads, share knowledge"
                className="w-full"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="keywords" className="font-medium">
                Keywords
              </Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g., growth, time management, scaling"
                className="w-full"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="persona" className="font-medium">
                Your Persona
              </Label>
              <Input
                id="persona"
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                placeholder="e.g., John Doe — Marketing Specialist"
                className="w-full"
              />
            </div>

            <div className="space-y-2 w-full">
              <Label htmlFor="audience" className="font-medium">
                Target Audience
              </Label>
              <Input
                id="audience"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g., business owners looking to scale"
                className="w-full"
              />
            </div>

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

      {/* Result area - show during generation and when complete */}
      <div
        ref={resultAreaRef}
        className={`w-full transition-all duration-300 ${
          isLoading || completion ? "opacity-100" : "opacity-0 hidden"
        }`}
      >
        <Card className={`w-full ${completion ? "border-2 border-primary" : ""}`}>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Your LinkedIn Post
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <Textarea
              ref={textareaRef}
              value={completion || (isLoading ? "Generating..." : "")}
              rows={12}
              className="w-full font-medium text-base resize-none focus:ring-2 focus:ring-primary"
            />
            <div className="flex justify-end mt-4 w-full">
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(completion);
                  // Optional: Add copy feedback here
                }}
                disabled={!completion || isLoading}
                className="flex items-center"
              >
                Copy to Clipboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}