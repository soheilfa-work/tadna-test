"use client";

import Link from "next/link";
import { useAthleteName } from "@/src/shared/lib/use-athlete-name";
import { AthleteDesktopSidebar, AthleteTabBar } from "@/src/shared/ui/athlete-chrome";
import { listFeedPosts } from "@/src/modules/feed/data/catalog";
import { PostCard } from "@/src/modules/feed/ui/post-card";

const STORIES = [
  "امیر رضایی",
  "تیم ملی تکواندو",
  "مهسا جاور",
  "باشگاه آراد",
  "علی کریمی",
];

function MobileHome({ name }: { name: string }) {
  const posts = listFeedPosts();

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col overflow-x-hidden bg-[#f3f5f6] text-ink lg:hidden">
      <header className="sticky top-0 z-20 bg-ocean text-white">
        <div className="h-[env(safe-area-inset-top)]" />
        <div className="flex h-14 items-center justify-between px-3">
          <Link href="/notifications" aria-label="اعلان‌ها" className="grid h-10 w-10 place-items-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </Link>
          <p className="truncate px-2 text-[15px] font-bold text-[#9fe3dc]">{name} خوش اومدی</p>
          <Link href="/saved" aria-label="ذخیره‌ها" className="grid h-9 w-9 place-items-center rounded-full border border-white/35">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3l1.2 6.3L19 9l-5 3.4 1.8 6.1L12 15.5 8.2 18.5 10 12.4 5 9l5.8-.7L12 3Z"
                fill="#9fe3dc"
              />
            </svg>
          </Link>
        </div>
      </header>

      <div className="flex min-w-0 gap-4 overflow-x-auto px-4 py-4 scrollbar-none">
        {STORIES.map((item) => (
          <div key={item} className="flex w-18 shrink-0 flex-col items-center gap-2">
            <span className="h-16 w-16 rounded-full border-[2.5px] border-teal bg-white" />
            <p className="w-full truncate text-center text-[10px] text-ink">{item}</p>
          </div>
        ))}
      </div>

      <main className="flex-1 space-y-3 px-4 pb-28">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} href={`/posts/${post.id}`} />
        ))}
      </main>

      <AthleteTabBar active="home" />
    </div>
  );
}

export function AthleteHome() {
  const name = useAthleteName();
  const first = name.split(" ")[0];
  const posts = listFeedPosts();

  return (
    <>
      <MobileHome name={name} />
      <div className="hidden min-h-dvh bg-[#f3f4f6] text-ink lg:block">
        <div className="mx-auto grid min-h-dvh max-w-[1440px] lg:grid-cols-[280px_minmax(0,1fr)]">
          <AthleteDesktopSidebar name={name} active="home" />

          <main className="px-4 py-5 sm:px-8">
            <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-lg font-bold">فید اصلی و رویدادها</h1>
              <div className="flex items-center gap-2">
                <Link
                  href="/explore"
                  className="grid h-10 w-64 place-items-center rounded-full border border-line bg-white px-4 text-sm text-muted"
                >
                  جستجو در تادنا...
                </Link>
                <span className="rounded-full bg-[#dbeafe] px-3 py-2 text-xs text-heading">نسخه حرفه‌ای</span>
              </div>
            </header>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-4">
                <section className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-muted">{first} عزیز، چه خبر تازه‌ای از تمرینات داری؟</p>
                  <div className="mt-4 flex items-center justify-between">
                    <Link href="/create" className="rounded-full bg-teal px-5 py-2 text-sm text-white">
                      انتشار پست
                    </Link>
                    <div className="flex gap-2 text-xs text-muted">
                      <span className="rounded-xl border border-line px-3 py-2">تصویر</span>
                      <span className="rounded-xl border border-line px-3 py-2">ویدیو</span>
                    </div>
                  </div>
                </section>
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} href={`/posts/${post.id}`} />
                ))}
              </div>
              <aside className="space-y-4">
                <section className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="mb-3 flex justify-between text-sm">
                    <Link href="/explore" className="text-teal">
                      مشاهده همه
                    </Link>
                    <span className="font-bold">برترین ورزشکاران هفته</span>
                  </div>
                  {(
                    [
                      ["#۱", "موسا جاور", "رویینگ", "۲,۹۰۰ امتیاز"],
                      ["#۲", "علی کریمی", "فوتبال", "۲,۷۵۰ امتیاز"],
                      ["#۳", "امیر رضایی", "تکواندو", "۲,۶۰۰ امتیاز"],
                    ] as const
                  ).map((row) => (
                    <div key={row[0]} className="flex items-center justify-between py-2 text-sm">
                      <span className="text-muted">{row[3]}</span>
                      <span>
                        {row[0]} {row[1]}
                        <span className="mr-2 text-xs text-muted">{row[2]}</span>
                      </span>
                    </div>
                  ))}
                </section>
                <section className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="mb-3 text-sm font-bold">رویدادهای پیش رو</p>
                  <div className="rounded-xl bg-sand p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>همایش بزرگ تکواندو آراد</span>
                      <span className="rounded-lg bg-heading px-2 py-1 text-xs text-white">۲۴ اسفند</span>
                    </div>
                    <p className="mt-2 text-xs text-muted">جمعه ۸ صبح · پارک لاله</p>
                  </div>
                </section>
              </aside>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
