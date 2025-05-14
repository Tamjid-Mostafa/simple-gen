import Chat from "@/components/generate/GeneratePost";
import AccountPreferences from "@/components/onboarding/AccountPrefrences";
import Onboarding from "@/components/onboarding/Onboarding";
import OnboardingForm from "@/components/onboarding/onboarding-form";
import { getCurrentUser } from "@/lib/auth/get-current-user";

export default async function Page() {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Onboarding />
    </div>
  );
}
