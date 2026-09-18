"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toPersianDigits } from "@/src/shared/lib/digits";
import { cn } from "@/src/shared/lib/cn";

const NAV = [
  { href: "/home", label: "خانه (فید)", active: true },
  { href: "/home", label: "کاوش و جستجو" },
  { href: "/home", label: "پیام‌های من" },
  { href: "/home", label: "باشگاه المپیک" },
  { href: "/home", label: "اعلان‌ها" },
  { href: "/home", label: "پروفایل ورزشی" },
  { href: "/home", label: "تنظیمات سیستم" },
];

const STORIES = [
  "امیر رضایی",
  "تیم ملی تکواندو",
  "مهسا جاور",
  "باشگاه آراد",
  "علی کریمی",
];

const TABS = [
  { id: "home", label: "خانه" },
  { id: "search", label: "جستجو" },
  { id: "create", label: "ایجاد" },
  { id: "messages", label: "پیام‌ها" },
  { id: "profile", label: "پروفایل" },
] as const;

function TabIcon({ id, active }: { id: (typeof TABS)[number]["id"]; active: boolean }) {
  const stroke = active ? "currentColor" : "currentColor";
  if (id === "home") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} aria-hidden>
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (id === "search") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="6.5" stroke={stroke} strokeWidth="1.6" />
        <path d="M16 16l4 4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "create") {
    return (
      <span className="grid h-8 w-8 place-items-center rounded-full border border-current">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 5v14M5 12h14" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (id === "messages") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 6h14v10H8l-3 3V6Z"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke={stroke} strokeWidth="1.6" />
      <path d="M5 19c1.4-3 4-4.5 7-4.5s5.6 1.5 7 4.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function PostActions({ comments, likes }: { comments: number; likes: number }) {
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
        ارسال
      </span>
      <span className="flex items-center gap-1">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M5 6h14v10H8l-3 3V6Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
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

function MobileHome({ name }: { name: string }) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#f3f5f6] text-ink lg:hidden">
      <header className="sticky top-0 z-20 bg-ocean text-white">
        <div className="h-[env(safe-area-inset-top)]" />
        <div className="flex h-14 items-center justify-between px-3">
          <button type="button" aria-label="اعلان‌ها" className="grid h-10 w-10 place-items-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path d="M10 18a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          <p className="truncate px-2 text-[15px] font-bold text-[#9fe3dc]">{name} خوش اومدی</p>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-white/35">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 3l1.2 6.3L19 9l-5 3.4 1.8 6.1L12 15.5 8.2 18.5 10 12.4 5 9l5.8-.7L12 3Z"
                fill="#9fe3dc"
              />
            </svg>
          </span>
        </div>
      </header>

      <div className="flex gap-4 overflow-x-auto px-4 py-4 scrollbar-none">
        {STORIES.map((item) => (
          <div key={item} className="flex w-18 shrink-0 flex-col items-center gap-2">
            <span className="h-16 w-16 rounded-full border-[2.5px] border-teal bg-white" />
            <p className="w-full truncate text-center text-[10px] text-ink">{item}</p>
          </div>
        ))}
      </div>

      <main className="flex-1 space-y-3 px-4 pb-28">
        <article className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold">سهراب مرادی</p>
              <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                <span className="rounded-md bg-[#e8f6f7] px-1.5 py-0.5 text-[10px] text-heading">ورزشکار</span>
                <span>۲ ساعت پیش</span>
              </p>
            </div>
            <span className="text-lg leading-none text-muted">⋮</span>
          </div>
          <p className="mt-3 text-sm leading-8">
            تمرینات سخت امروز برای آمادگی مسابقات کشوری. تمرکز روی افزایش استقامت و تکنیک‌های سرعتی. به
            امید موفقیت! 💪🏆
          </p>
          <PostActions comments={36} likes={128} />
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-bold">استاد اصغرپور</p>
              <p className="mt-1 flex items-center gap-2 text-xs text-muted">
                <span className="rounded-md bg-[#e8f6f7] px-1.5 py-0.5 text-[10px] text-heading">مربی</span>
                <span>دیروز</span>
              </p>
            </div>
            <span className="text-lg leading-none text-muted">⋮</span>
          </div>
          <p className="mt-3 text-sm leading-8">
            آنالیز حرکت ضربه چرخشی در تکواندو. نکات کلیدی برای حفظ تعادل و ضربه موثر. 🔥
          </p>
          <div className="relative mt-4 grid h-40 place-items-center rounded-2xl bg-[#e9edf0]">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-[#c5cdd2] text-white">
              ▶
            </span>
            <span className="absolute bottom-2 left-2 rounded-md bg-black/55 px-1.5 py-0.5 text-[10px] text-white">
              {toPersianDigits("3:45")}
            </span>
          </div>
          <PostActions comments={89} likes={412} />
        </article>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-white pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-5 px-2 pt-2">
          {TABS.map((tab) => {
            const active = tab.id === "home";
            return (
              <Link
                key={tab.id}
                href="/home"
                className={cn(
                  "flex flex-col items-center gap-1 pb-2 text-[11px]",
                  active ? "text-teal" : "text-muted",
                )}
              >
                <TabIcon id={tab.id} active={active} />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export function AthleteHome() {
  const [name, setName] = useState("ورزشکار تادنا");

  useEffect(() => {
    const raw = window.localStorage.getItem("tadna_session");
    if (!raw) return;
    try {
      const session = JSON.parse(raw) as { firstName?: string; lastName?: string };
      if (session.firstName) setName(`${session.firstName} ${session.lastName ?? ""}`.trim());
    } catch {
      return;
    }
  }, []);

  const first = name.split(" ")[0];

  return (
    <>
      <MobileHome name={name} />
      <div className="hidden min-h-dvh bg-[#f3f4f6] text-ink lg:block">
        <div className="mx-auto grid min-h-dvh max-w-[1440px] lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="bg-ocean px-5 py-6 text-white">
            <div className="flex items-center justify-between">
              <span className="text-xl font-extrabold">تادنا</span>
              <span className="rounded-md bg-white/10 px-2 py-1 text-[10px]">وب</span>
            </div>
            <p className="mt-8 text-sm text-mint">خوش آمدی {first}</p>
            <nav className="mt-6 space-y-1 text-sm">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block rounded-xl px-4 py-3 ${item.active ? "bg-teal" : "text-white/80 hover:bg-white/10"}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-16 flex items-center gap-3 text-sm">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-white/30">
                {first[0]}
              </span>
              <div>
                <p>{name}</p>
                <p className="text-xs text-white/60">قهرمان المپیک</p>
              </div>
            </div>
          </aside>

          <main className="px-4 py-5 sm:px-8">
            <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-lg font-bold">فید اصلی و رویدادها</h1>
              <div className="flex items-center gap-2">
                <input
                  className="h-10 w-64 rounded-full border border-line bg-white px-4 text-sm"
                  placeholder="جستجو در تادنا..."
                />
                <span className="rounded-full bg-[#dbeafe] px-3 py-2 text-xs text-heading">نسخه حرفه‌ای</span>
              </div>
            </header>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
              <div className="space-y-4">
                <section className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-muted">{first} عزیز، چه خبر تازه‌ای از تمرینات داری؟</p>
                  <div className="mt-4 flex items-center justify-between">
                    <button className="rounded-full bg-teal px-5 py-2 text-sm text-white">انتشار پست</button>
                    <div className="flex gap-2 text-xs text-muted">
                      <span className="rounded-xl border border-line px-3 py-2">تصویر</span>
                      <span className="rounded-xl border border-line px-3 py-2">ویدیو</span>
                    </div>
                  </div>
                </section>
                <article className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold">علی کریمی</p>
                      <p className="text-xs text-muted">ورزشکار · ۳ ساعت پیش</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-7">
                    تمرینات فشرده امروز جهت آماده‌سازی مسابقات قهرمانی کشور. تمام تمرکز روی استقامت و
                    سرعت بالا در تکرارها بود. به امید خبرهای خوب برای تکواندو کشورمان!
                  </p>
                  <div className="mt-8 flex gap-6 text-xs text-muted">
                    <span>{toPersianDigits(252)} علاقه</span>
                    <span>{toPersianDigits(45)} ارسال</span>
                  </div>
                </article>
              </div>
              <aside className="space-y-4">
                <section className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-teal">مشاهده همه</span>
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
