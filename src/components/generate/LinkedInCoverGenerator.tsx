"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Loader2,
  Image as ImageIcon,
  RefreshCw,
  Link as LinkIcon,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  topic: string;
  /** Optional: full post text so the graphic matches content */
  content?: string;
  brandHex?: string; // e.g. "#84cc16"
  model?: string; // "flux" | "turbo" | ...
  auto?: boolean;
  initialUrl?: string;
  onUrlChange?: (url: string) => void;
  className?: string;
  title?: string;
};

export default function LinkedInCoverGenerator({
  topic,
  content,
  brandHex = "#84cc16",
  model = "flux",
  auto = false,
  initialUrl,
  onUrlChange,
  className,
  title = "Cover Image",
}: Props) {
  const [imgUrl, setImgUrl] = useState<string>(initialUrl || "");
  const [imgLoading, setImgLoading] = useState(false);
  const [imgCopied, setImgCopied] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");

  const plannerInstruction = useMemo(
    () => buildPlannerInstruction(topic, content ?? "", brandHex),
    [topic, content, brandHex]
  );

  useEffect(() => {
    if (!auto) return;
    if (!topic.trim()) return;
    void handleGenerateImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, content]);

  async function handleGenerateImage() {
    if (!topic.trim()) {
      toast({
        title: "Missing topic",
        description: "Enter a topic.",
        variant: "destructive",
      });
      return;
    }
    setImgLoading(true);
    try {
      // 1) Get a concise infographic prompt from TEXT API
      const txtRes = await fetch(
        `https://text.pollinations.ai/${encodeURIComponent(
          plannerInstruction
        )}`,
        { method: "GET", cache: "no-store" }
      );
      if (!txtRes.ok) {
        const t = await txtRes.text().catch(() => "");
        throw new Error(t || `Text API error (${txtRes.status})`);
      }
      const base = (await txtRes.text()).trim().replace(/^["'`]+|["'`]+$/g, "");

      // 2) Append hard negatives to kill realism & branding
      const finalPrompt = `${base}.`;

      // 3) Build clean image API URL (no watermarking)
      const width = 1200,
        height = 675;
      const seed = Math.floor(Math.random() * 1e9);
      const url =
        `https://image.pollinations.ai/prompt/${encodeURIComponent(
          finalPrompt
        )}` +
        `?model=${encodeURIComponent(model)}&width=${width}&height=${height}` +
        `&seed=${seed}&enhance=true&nologo=true&model=flux&cb=${Date.now()}`;

      setGeneratedPrompt(finalPrompt);
      setImgUrl(url);
      onUrlChange?.(url);
    } catch (e: any) {
      toast({
        title: "Image failed",
        description:
          typeof e?.message === "string" ? e.message : "Please try again.",
        variant: "destructive",
      });
    } finally {
      setImgLoading(false);
    }
  }

  async function handleCopyImageUrl() {
    if (!imgUrl) return;
    await navigator.clipboard.writeText(imgUrl);
    setImgCopied(true);
    setTimeout(() => setImgCopied(false), 2000);
    toast({ title: "Copied!", description: "Image URL copied to clipboard." });
  }

  async function handleDownload(filename = "linkedin-cover.png") {
    if (!imgUrl) return;
    try {
      const res = await fetch(imgUrl, { cache: "no-store" });
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      toast({
        title: "Download failed",
        description: "Could not download image.",
        variant: "destructive",
      });
    }
  }

  const limeBorder = "border-lime-500/60";
  const limeText = "text-lime-600";
  const limeBtnOutline = "border-lime-500 text-lime-600 hover:text-lime-700";
  const limeBtnSolid = "bg-lime-600 hover:bg-lime-700 text-white";

  return (
    <Card className={cn("border-2", limeBorder, className)}>
      <CardHeader>
        <CardTitle className={limeText}>{title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Model:</span> {model} &nbsp;•&nbsp;{" "}
            <span className="font-medium">Accent:</span> {brandHex}
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleGenerateImage}
              disabled={imgLoading}
              variant="outline"
              className={limeBtnOutline}
            >
              {imgUrl ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Regenerate
                </>
              ) : imgLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Creating
                </>
              ) : (
                <>
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Generate
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={handleCopyImageUrl}
              variant="outline"
              className={limeBtnOutline}
              disabled={!imgUrl}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              {imgCopied ? "Copied!" : "Copy URL"}
            </Button>
            <Button
              type="button"
              onClick={() => handleDownload()}
              className={limeBtnSolid}
              disabled={!imgUrl}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Optional: view the exact prompt used */}
        {generatedPrompt && (
          <div className="rounded-lg border border-lime-500/40 p-3 bg-white/60 text-xs whitespace-pre-wrap">
            {generatedPrompt}
          </div>
        )}

        <div className="rounded-xl overflow-hidden border border-lime-500/40 bg-white">
          {imgUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgUrl}
              alt="Generated LinkedIn cover"
              className="w-full h-auto"
              onError={() =>
                toast({
                  title: "Image error",
                  description: "Failed to load image. Try regenerating.",
                  variant: "destructive",
                })
              }
            />
          ) : (
            <div className="flex items-center justify-center h-48">
              {imgLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-lime-600" />
              ) : (
                <p className="text-sm text-muted-foreground">
                  No image yet. Click Generate.
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/** Planner prompt for TEXT API → returns ONE concise flat-vector infographic brief. */
function buildPlannerInstruction(
  topic: string,
  content: string,
  brandHex: string
) {
  const trimmedContent = content.slice(0, 600);
  return `
Write ONE vivid, art-directed image prompt for a LinkedIn cover (1200x675).
Rules:
- Make it stand out.
- Brand accent color: ${brandHex} (lime green).
- Clear subject + composition + background + lighting.
- Optional tasteful iconography relevant to the topic.
- Keep minimum ~320 characters.
- No markdown, no quotes, no placeholders like [TEXT HERE].
- No Human, No Person, No Face, No People.
- Start directly with the scene description.
Topic: "${topic}",
Content: "${trimmedContent}"
`.trim();
}
