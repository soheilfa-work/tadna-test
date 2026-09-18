import type { Metadata } from "next";
import { OnboardingFlow } from "@/src/modules/identity/ui/onboarding/onboarding-flow";

export const metadata: Metadata = {
  title: "ورود و ثبت‌نام",
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
