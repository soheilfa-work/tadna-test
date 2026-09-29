import type { Metadata } from "next";
import { ProfilePage } from "@/src/modules/profile/ui/profile-page";

export const metadata: Metadata = {
  title: "پروفایل",
};

export default function ProfileRoutePage() {
  return <ProfilePage />;
}
