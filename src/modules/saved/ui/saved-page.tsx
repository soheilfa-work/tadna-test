"use client";

import { useState } from "react";
import { cn } from "@/src/shared/lib/cn";
import { useAthleteName } from "@/src/shared/lib/use-athlete-name";
import { AppHeader } from "@/src/shared/ui/app-header";
import { DesktopPanel, MobilePanel } from "@/src/shared/ui/panel-shell";

const TABS = [
  { id: "events", label: "رویدادها" },
  { id: "clubs", label: "باشگاه‌ها" },
] as const;

const SAVED_EVENTS = [
  { id: "event-arad", title: "همایش بزرگ رزمی آراد", subtitle: "جمعه ساعت ۸ صبح، پارک لاله" },
  { id: "comp-alborz", title: "لیگ فوتبال محلات البرز", subtitle: "۳۲ تیم ثبت‌نام کردند" },
  { id: "event-park", title: "تمرین گروهی پارک لاله", subtitle: "سه‌شنبه ۱۸ عصر، زمین چمن" },
];

const SAVED_CLUBS = [
  { id: "club-olympic-west", title: "باشگاه المپیک غرب", subtitle: "بدنسازی و رزمی" },
  { id: "club-kia", title: "آکادمی فوتبال کیا", subtitle: "فوتبال پایه" },
];

function BookmarkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 4h10a1 1 0 0 1 1 1v15l-6-3.2L6 20V5a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="currentColor"
        className="text-heading"
      />
    </svg>
  );
}

function SavedCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <article className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
      <div className="min-w-0 flex-1">
        <h3 className="text-[15px] font-bold">{title}</h3>
        <p className="mt-1 text-xs text-muted">{subtitle}</p>
      </div>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e8f6f7] text-heading">
        <BookmarkIcon />
      </span>
    </article>
  );
}

export function SavedPage() {
  const name = useAthleteName();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("events");
  const items = tab === "events" ? SAVED_EVENTS : SAVED_CLUBS;

  const body = (
    <>
      <div className="mb-4 flex gap-2">
        {TABS.map((item) => {
          const active = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "h-9 rounded-full px-4 text-sm",
                active ? "bg-teal text-white" : "border border-line bg-white text-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <SavedCard key={item.id} title={item.title} subtitle={item.subtitle} />
        ))}
      </div>
    </>
  );

  return (
    <>
      <MobilePanel tab="profile">
        <AppHeader title="نشان‌شده‌ها و ذخیره‌ها" />
        <main className="flex-1 px-4 pb-28 pt-4">{body}</main>
      </MobilePanel>
      <DesktopPanel name={name} active="saved" title="نشان‌شده‌ها و ذخیره‌ها">
        <div className="max-w-2xl">{body}</div>
      </DesktopPanel>
    </>
  );
}
