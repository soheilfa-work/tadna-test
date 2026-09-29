import type { Metadata } from "next";
import { NotificationsPage } from "@/src/modules/notifications/ui/notifications-page";

export const metadata: Metadata = {
  title: "اعلان‌ها",
};

export default function NotificationsRoutePage() {
  return <NotificationsPage />;
}
