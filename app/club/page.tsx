import type { Metadata } from "next";
import { ClubPage } from "@/src/modules/club/ui/club-page";

export const metadata: Metadata = {
  title: "باشگاه المپیک",
};

export default function ClubRoutePage() {
  return <ClubPage />;
}
