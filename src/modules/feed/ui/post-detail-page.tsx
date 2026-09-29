"use client";

import { useState } from "react";
import { useAthleteName } from "@/src/shared/lib/use-athlete-name";
import { toPersianDigits } from "@/src/shared/lib/digits";
import { AppHeader } from "@/src/shared/ui/app-header";
import { DesktopPanel, MobilePanel } from "@/src/shared/ui/panel-shell";
import { getFeedComments, getFeedPost } from "../data/catalog";
import { PostCard } from "./post-card";

export function PostDetailPage({ id }: { id: string }) {
  const name = useAthleteName();
  const post = getFeedPost(id);
  const comments = getFeedComments(id);
  const [draft, setDraft] = useState("");
  const [localComments, setLocalComments] = useState(comments);

  if (!post) {
    return (
      <>
        <MobilePanel tab="home">
          <AppHeader title="جزئیات پست" backHref="/home" />
          <p className="px-4 py-10 text-center text-sm text-muted">این پست پیدا نشد.</p>
        </MobilePanel>
        <DesktopPanel name={name} active="home" title="جزئیات پست">
          <p className="text-sm text-muted">این پست پیدا نشد.</p>
        </DesktopPanel>
      </>
    );
  }

  function addComment() {
    const text = draft.trim();
    if (!text) return;
    setLocalComments((current) => [
      {
        id: `local-${current.length}`,
        author: name,
        time: "همین حالا",
        body: text,
        likes: 0,
      },
      ...current,
    ]);
    setDraft("");
  }

  const thread = (
    <div className="space-y-4">
      <PostCard post={post} />
      <section>
        <h2 className="mb-3 text-[15px] font-bold">نظرات کاربران</h2>
        <div className="space-y-3">
          {localComments.map((comment) => (
            <article key={comment.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold">{comment.author}</p>
                  <p className="mt-1 text-[11px] text-muted">{comment.time}</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-[#e25c6a]">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 20s-7-4.4-9-8.2C1.5 8.7 3.2 6 6.2 6c1.7 0 3.1.9 3.8 2.2C10.7 6.9 12.1 6 13.8 6c3 0 4.7 2.7 3.2 5.8C19 15.6 12 20 12 20Z" />
                  </svg>
                  {toPersianDigits(comment.likes)}
                </span>
              </div>
              <p className="mt-2 text-sm leading-7">{comment.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );

  const composer = (
    <div className="flex items-center gap-2 rounded-full border border-line bg-white px-3 py-2">
      <input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") addComment();
        }}
        placeholder="نظر خود را بنویسید..."
        className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
        aria-label="نوشتن نظر"
      />
      <button
        type="button"
        onClick={addComment}
        aria-label="ارسال نظر"
        className="grid h-9 w-9 place-items-center rounded-full bg-teal text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M20 12H7M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );

  return (
    <>
      <MobilePanel tab="home">
        <AppHeader title="جزئیات پست" backHref="/home" />
        <main className="flex-1 space-y-4 px-4 pb-36 pt-4">{thread}</main>
        <div className="fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-20 border-t border-line bg-white px-4 py-2">
          {composer}
        </div>
      </MobilePanel>
      <DesktopPanel name={name} active="home" title="جزئیات پست">
        <div className="grid max-w-4xl gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">{thread}</div>
          <aside className="space-y-3">
            <p className="text-sm font-bold">افزودن نظر</p>
            {composer}
          </aside>
        </div>
      </DesktopPanel>
    </>
  );
}
