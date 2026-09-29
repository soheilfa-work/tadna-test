import type { Metadata } from "next";
import { ExplorePage } from "@/src/modules/explore";

export const metadata: Metadata = {
  title: "کاوش",
};

export default function ExploreRoutePage() {
  return <ExplorePage />;
}
