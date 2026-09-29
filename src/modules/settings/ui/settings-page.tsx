"use client";

import { useState } from "react";
import { cn } from "@/src/shared/lib/cn";
import { useAthleteName } from "@/src/shared/lib/use-athlete-name";
import { AppHeader } from "@/src/shared/ui/app-header";
import { DesktopPanel, MobilePanel } from "@/src/shared/ui/panel-shell";

const ROWS = [
  { id: "push", label: "اعلان‌های فوری", hint: "رویدادها، پیام‌ها و واکنش به پست‌ها" },
  { id: "email", label: "خلاصه ایمیل هفتگی", hint: "گزارش تمرین و رتبه‌بندی هفته" },
  { id: "privacy", label: "نمایش پروفایل عمومی", hint: "ورزشکاران دیگر بتوانند شما را پیدا کنند" },
];

export function SettingsPage() {
  const name = useAthleteName();
  const [on, setOn] = useState<Record<string, boolean>>({ push: true, email: false, privacy: true });

  const list = (
    <div className="space-y-3">
      {ROWS.map((row) => (
        <button
          key={row.id}
          type="button"
          onClick={() => setOn((current) => ({ ...current, [row.id]: !current[row.id] }))}
          className="flex w-full items-center justify-between gap-4 rounded-2xl bg-white px-4 py-4 text-right shadow-sm"
        >
          <span>
            <span className="block text-sm font-bold">{row.label}</span>
            <span className="mt-1 block text-xs text-muted">{row.hint}</span>
          </span>
          <span
            dir="ltr"
            className={cn(
              "flex h-6 w-11 shrink-0 rounded-full p-0.5",
              on[row.id] ? "justify-end bg-teal" : "justify-start bg-[#d7e1e4]",
            )}
          >
            <span className="block h-5 w-5 rounded-full bg-white" />
          </span>
        </button>
      ))}
    </div>
  );

  return (
    <>
      <MobilePanel tab="profile">
        <AppHeader title="تنظیمات سیستم" backHref="/profile" />
        <main className="flex-1 px-4 pb-28 pt-4">{list}</main>
      </MobilePanel>
      <DesktopPanel name={name} active="settings" title="تنظیمات سیستم">
        <div className="max-w-xl">{list}</div>
      </DesktopPanel>
    </>
  );
}
