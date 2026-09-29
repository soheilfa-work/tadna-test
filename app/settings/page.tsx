import type { Metadata } from "next";
import { SettingsPage } from "@/src/modules/settings/ui/settings-page";

export const metadata: Metadata = {
  title: "تنظیمات",
};

export default function SettingsRoutePage() {
  return <SettingsPage />;
}
