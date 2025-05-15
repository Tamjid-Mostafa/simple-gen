import Onboarding from "@/components/onboarding/Onboarding";
import Link from "next/link";

export default async function OnboardingUser() {

  return (
    <div className="flex flex-1 flex-col items-center justify-center mt-20 gap-4 p-4 pt-0">
      <Link href="/">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-teal-500 flex justify-center items-center w-8 h-8 border-2 border-primary">
            S
          </div>
          <span className="font-semibold">SimpleGen</span>
        </div>
      </Link>
      <Onboarding />
    </div>
  );
}
