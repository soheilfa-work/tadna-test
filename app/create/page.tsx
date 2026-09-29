import type { Metadata } from "next";
import { CreatePostPage } from "@/src/modules/create/ui/create-post-page";

export const metadata: Metadata = {
  title: "ایجاد پست",
};

export default function CreateRoutePage() {
  return <CreatePostPage />;
}
