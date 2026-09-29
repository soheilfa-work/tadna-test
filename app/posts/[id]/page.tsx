import type { Metadata } from "next";
import { PostDetailPage } from "@/src/modules/feed/ui/post-detail-page";

export const metadata: Metadata = {
  title: "جزئیات پست",
};

export default async function PostDetailRoutePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PostDetailPage id={id} />;
}
