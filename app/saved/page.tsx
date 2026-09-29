import type { Metadata } from "next";
import { SavedPage } from "@/src/modules/saved/ui/saved-page";

export const metadata: Metadata = {
  title: "ذخیره‌ها",
};

export default function SavedRoutePage() {
  return <SavedPage />;
}
