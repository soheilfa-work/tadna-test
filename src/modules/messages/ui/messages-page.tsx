"use client";

import { useAthleteName } from "@/src/shared/lib/use-athlete-name";
import { AppHeader } from "@/src/shared/ui/app-header";
import { DesktopPanel, MobilePanel } from "@/src/shared/ui/panel-shell";

const THREADS = [
  { id: "t1", name: "علی کریمی", preview: "فردا ساعت ۶ سالن غرب حاضر باشم؟", time: "۱۰ دقیقه پیش", unread: 2 },
  { id: "t2", name: "باشگاه المپیک غرب", preview: "برنامه تمرینی هفته روی تابلو قرار گرفت.", time: "۱ ساعت پیش", unread: 0 },
  { id: "t3", name: "استاد اصغرپور", preview: "ویدیو آنالیز را دیدم، فرم پا بهتر شده.", time: "دیروز", unread: 1 },
  { id: "t4", name: "مهسا جاور", preview: "برای اردوی تیم ملی ثبت‌نام کردی؟", time: "۲ روز پیش", unread: 0 },
];

export function MessagesPage() {
  const name = useAthleteName();

  const list = (
    <div className="space-y-3">
      {THREADS.map((thread) => (
        <article key={thread.id} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#e8f6f7] font-bold text-heading">
            {thread.name[0]}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold">{thread.name}</h3>
              <span className="shrink-0 text-[11px] text-muted">{thread.time}</span>
            </div>
            <p className="mt-1 truncate text-xs text-muted">{thread.preview}</p>
          </div>
          {thread.unread > 0 ? (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-teal px-1.5 text-[10px] text-white">
              {thread.unread}
            </span>
          ) : null}
        </article>
      ))}
    </div>
  );

  return (
    <>
      <MobilePanel tab="messages">
        <AppHeader title="پیام‌ها" />
        <main className="flex-1 px-4 pb-28 pt-4">{list}</main>
      </MobilePanel>
      <DesktopPanel name={name} active="messages" title="پیام‌های من">
        <div className="grid max-w-5xl gap-5 xl:grid-cols-[360px_minmax(0,1fr)]">
          {list}
          <section className="hidden min-h-[420px] rounded-2xl bg-white p-8 text-center text-sm text-muted xl:grid xl:place-items-center">
            یک گفتگو را انتخاب کنید تا پیام‌ها اینجا نمایش داده شود.
          </section>
        </div>
      </DesktopPanel>
    </>
  );
}
