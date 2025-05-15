import GeneratePost from "@/components/generate/GeneratePost";
export default async function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <GeneratePost />
    </div>
  );
}
