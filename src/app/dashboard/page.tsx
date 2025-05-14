import Chat from "@/components/generate/GeneratePost";
import OnboardingForm from "@/components/onboarding/onboarding-form";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();
  console.log(userId);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <OnboardingForm />
    </div>
  );
}
