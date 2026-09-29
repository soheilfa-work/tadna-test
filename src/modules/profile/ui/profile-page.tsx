"use client";

import Link from "next/link";
import { toPersianDigits } from "@/src/shared/lib/digits";
import { useAthleteName } from "@/src/shared/lib/use-athlete-name";
import { AppHeader } from "@/src/shared/ui/app-header";
import { DesktopPanel, MobilePanel } from "@/src/shared/ui/panel-shell";
import { listFeedPosts } from "@/src/modules/feed/data/catalog";
import { PostCard } from "@/src/modules/feed/ui/post-card";

const STATS = [
  { label: "پست", value: 24 },
  { label: "دنبال‌کننده", value: 1860 },
  { label: "دنبال‌شونده", value: 312 },
];

export function ProfilePage() {
  const name = useAthleteName();
  const posts = listFeedPosts().slice(0, 2);

  const identity = (
    <section className="rounded-2xl bg-white p-5 text-center shadow-sm">
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#e8f6f7] text-2xl font-bold text-heading">
        {name.split(" ")[0]?.[0]}
      </span>
      <h2 className="mt-3 text-lg font-bold">{name}</h2>
      <p className="mt-1 text-sm text-muted">ورزشکار · باشگاه المپیک غرب</p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-sand py-3">
            <p className="text-base font-bold">{toPersianDigits(stat.value)}</p>
            <p className="mt-1 text-[11px] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Link href="/saved" className="h-10 flex-1 rounded-full bg-teal text-center text-sm leading-10 text-white">
          ذخیره‌ها
        </Link>
        <Link
          href="/settings"
          className="h-10 flex-1 rounded-full border border-line text-center text-sm leading-10"
        >
          تنظیمات
        </Link>
      </div>
    </section>
  );

  const feed = (
    <div className="space-y-3">
      <h3 className="text-sm font-bold">پست‌های اخیر</h3>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} href={`/posts/${post.id}`} />
      ))}
    </div>
  );

  return (
    <>
      <MobilePanel tab="profile">
        <AppHeader title="پروفایل ورزشی" />
        <main className="flex-1 space-y-4 px-4 pb-28 pt-4">
          {identity}
          {feed}
        </main>
      </MobilePanel>
      <DesktopPanel name={name} active="profile" title="پروفایل ورزشی">
        <div className="grid max-w-5xl gap-5 xl:grid-cols-[320px_minmax(0,1fr)]">
          {identity}
          {feed}
        </div>
      </DesktopPanel>
    </>
  );
}
