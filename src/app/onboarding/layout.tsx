import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  if ((await auth()).sessionClaims?.metadata.hasOnboard) {
    // If the user has already completed onboarding, redirect them to the dashboard
    redirect("/dashboard");
  }
  return <>{children}</>;
}
