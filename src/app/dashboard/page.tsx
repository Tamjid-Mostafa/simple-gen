import Chat from "@/components/generate/GeneratePost";
import Test from "@/components/generate/Test";


export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Chat />
      {/* <Test /> */}
    </div>
  );
}
