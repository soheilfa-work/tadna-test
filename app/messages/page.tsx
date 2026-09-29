import type { Metadata } from "next";
import { MessagesPage } from "@/src/modules/messages/ui/messages-page";

export const metadata: Metadata = {
  title: "پیام‌ها",
};

export default function MessagesRoutePage() {
  return <MessagesPage />;
}
