"use client";

import Link from "next/link";
import { toPersianDigits } from "@/src/shared/lib/digits";
import type { FeedPost } from "../data/catalog";

export function PostActions({
  comments,
  likes,
  shares,
}: {
  comments: number;
  likes: number;
  shares?: number;
}) {
  return (
    <div className="mt-5 flex items-center justify-end gap-5 text-xs text-muted">
      <span className="flex items-center gap-1">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M4 12h13M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {shares != null ? toPersianDigits(shares) : "ارسال"}
      </span>
      <span className="flex items-center gap-1">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 6h14v10H8l-3 3V6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        {toPersianDigits(comments)}
      </span>
      <span className="flex items-center gap-1 text-[#e25c6a]">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 20s-7-4.4-9-8.2C1.5 8.7 3.2 6 6.2 6c1.7 0 3.1.9 3.8 2.2C10.7 6.9 12.1 6 13.8 6c3 0 4.7 2.7 3.2 5.8C19 15.6 12 20 12 20Z"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="currentColor"
          />
        </svg>
        {toPersianDigits(likes)}
      </span>
    </div>
  );
}

export function PostCard({ post, href }: { post: FeedPost; href?: string }) {
  const inner = (
    <>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-bold">{post.author}</p>
          <p className="mt-1 flex items-center gap-2 text-xs text-muted">
            <span className="rounded-md bg-[#e8f6f7] px-1.5 py-0.5 text-[10px] text-heading">{post.role}</span>
            <span>{post.time}</span>
          </p>
        </div>
        <span className="text-lg leading-none text-muted">⋮</span>
      </div>
      <p className="mt-3 text-sm leading-8">{post.body}</p>
      {post.tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#e8f6f7] px-2.5 py-1 text-[11px] text-heading">
              {tag}
            </span>
          ))}
        </div>
      ) : null}
      {post.videoDuration ? (
        <div className="relative mt-4 grid h-40 place-items-center rounded-2xl bg-[#e9edf0]">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-[#c5cdd2] text-white">▶</span>
          <span className="absolute bottom-2 left-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] text-white">
            {toPersianDigits(post.videoDuration)}
          </span>
        </div>
      ) : null}
      <PostActions comments={post.comments} likes={post.likes} shares={post.shares} />
    </>
  );

  if (href) {
    return (
      <Link href={href} className="block rounded-2xl bg-white p-4 shadow-sm">
        {inner}
      </Link>
    );
  }

  return <article className="rounded-2xl bg-white p-4 shadow-sm">{inner}</article>;
}
