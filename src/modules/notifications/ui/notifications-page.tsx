"use client";

import { useAthleteName } from "@/src/shared/lib/use-athlete-name";
import { AppHeader } from "@/src/shared/ui/app-header";
import { DesktopPanel, MobilePanel } from "@/src/shared/ui/panel-shell";

const ITEMS = [
  {
    id: "n1",
    title: "تأیید عضویت باشگاه",
    body: "درخواست عضویت شما در باشگاه المپیک غرب تأیید شد.",
    time: "۱۰ دقیقه پیش",
  },
  {
    id: "n2",
    title: "پسندیدن پست",
    body: "مهسا جاور پست تمرین امروز شما را پسندید.",
    time: "۱ ساعت پیش",
  },
  {
    id: "n3",
    title: "یادآوری رویداد",
    body: "همایش بزرگ رزمی آراد فردا ساعت ۸ صبح در پارک لاله برگزار می‌شود.",
    time: "دیروز",
  },
  {
    id: "n4",
    title: "پیام جدید",
    body: "استاد اصغرپور یک پیام جدید برایتان فرستاد.",
    time: "۲ روز پیش",
  },
];

export function NotificationsPage() {
  const name = useAthleteName();

  const list = (
    <div className="space-y-3">
      {ITEMS.map((item) => (
        <article key={item.id} className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-sm font-bold">{item.title}</h3>
            <span className="shrink-0 text-[11px] text-muted">{item.time}</span>
          </div>
          <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
        </article>
      ))}
    </div>
  );

  return (
    <>
      <MobilePanel tab="home">
        <AppHeader title="اعلان‌ها" backHref="/home" />
        <main className="flex-1 px-4 pb-28 pt-4">{list}</main>
      </MobilePanel>
      <DesktopPanel name={name} active="notifications" title="اعلان‌ها">
        <div className="max-w-2xl">{list}</div>
      </DesktopPanel>
    </>
  );
}
