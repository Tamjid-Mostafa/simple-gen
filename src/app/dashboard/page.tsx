import GeneratePost from "@/components/generate/GeneratePost";
import GeneratePostV2 from "@/components/generate/GeneratePost-V2";
export default async function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <GeneratePostV2 />
    </div>
  );
}
