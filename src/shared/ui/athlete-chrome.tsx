"use client";

import Link from "next/link";
import { cn } from "@/src/shared/lib/cn";

export const ATHLETE_TABS = [
  { id: "home", href: "/home", label: "خانه" },
  { id: "search", href: "/explore", label: "جستجو" },
  { id: "create", href: "/create", label: "ایجاد" },
  { id: "messages", href: "/messages", label: "پیام‌ها" },
  { id: "profile", href: "/profile", label: "پروفایل" },
] as const;

export type AthleteTabId = (typeof ATHLETE_TABS)[number]["id"];

export const DESKTOP_NAV = [
  { href: "/home", id: "home", label: "خانه (فید)" },
  { href: "/explore", id: "explore", label: "کاوش و جستجو" },
  { href: "/create", id: "create", label: "ایجاد پست" },
  { href: "/messages", id: "messages", label: "پیام‌های من" },
  { href: "/club", id: "club", label: "باشگاه المپیک" },
  { href: "/notifications", id: "notifications", label: "اعلان‌ها" },
  { href: "/saved", id: "saved", label: "ذخیره‌ها" },
  { href: "/profile", id: "profile", label: "پروفایل ورزشی" },
  { href: "/settings", id: "settings", label: "تنظیمات سیستم" },
] as const;

export type DesktopNavId = (typeof DESKTOP_NAV)[number]["id"];

function TabIcon({ id, active }: { id: AthleteTabId; active: boolean }) {
  if (id === "home") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} aria-hidden>
        <path
          d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (id === "search") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "create") {
    return (
      <span className="grid h-8 w-8 place-items-center rounded-full border border-current">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (id === "messages") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 6h14v10H8l-3 3V6Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 19c1.4-3 4-4.5 7-4.5s5.6 1.5 7 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function AthleteTabBar({ active }: { active: AthleteTabId }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 w-full border-t border-line bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-5 px-2 pt-2">
        {ATHLETE_TABS.map((tab) => {
          const isActive = tab.id === active;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1 pb-2 text-[11px]",
                isActive ? "text-teal" : "text-muted",
              )}
            >
              <TabIcon id={tab.id} active={isActive} />
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function AthleteDesktopSidebar({
  name,
  active,
}: {
  name: string;
  active: DesktopNavId;
}) {
  const first = name.split(" ")[0] ?? name;

  return (
    <aside className="bg-ocean px-5 py-6 text-white">
      <div className="flex items-center justify-between">
        <span className="text-xl font-extrabold">تادنا</span>
        <span className="rounded-md bg-white/10 px-2 py-1 text-[10px]">وب</span>
      </div>
      <p className="mt-8 text-sm text-mint">خوش آمدی {first}</p>
      <nav className="mt-6 space-y-1 text-sm">
        {DESKTOP_NAV.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "block rounded-xl px-4 py-3",
              item.id === active ? "bg-teal" : "text-white/80 hover:bg-white/10",
            )}
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
  );
}
