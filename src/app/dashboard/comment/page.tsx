import GenerateComment from "@/components/generate/GenerateComment";

export default function CommentGeneratorPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-xl font-bold">Comment Generator</h1>
      <p className="text-sm text-muted-foreground">
        Generate comments for your posts.
      </p>
      {/* Add your comment generation component here */}
      <GenerateComment/>
    </div>
  );
}