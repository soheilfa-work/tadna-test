import type { Metadata } from "next";
import { AthleteHome } from "@/src/modules/home/ui/athlete-home";

export const metadata: Metadata = {
  title: "خانه",
};

export default function HomeFeedPage() {
  return <AthleteHome />;
}
