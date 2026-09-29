"use client";

import { toPersianDigits } from "@/src/shared/lib/digits";
import { useAthleteName } from "@/src/shared/lib/use-athlete-name";
import { AppHeader } from "@/src/shared/ui/app-header";
import { DesktopPanel, MobilePanel } from "@/src/shared/ui/panel-shell";

const MEMBERS = [
  ["علی کریمی", "ورزشکار"],
  ["سهراب مرادی", "ورزشکار"],
  ["استاد اصغرپور", "مربی"],
  ["امیر رضایی", "ورزشکار"],
];

export function ClubPage() {
  const name = useAthleteName();

  const body = (
    <div className="space-y-4">
      <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <div className="h-28 bg-[#e8f6f7]" />
        <div className="p-4">
          <h2 className="text-lg font-bold">باشگاه المپیک غرب</h2>
          <p className="mt-1 text-sm text-muted">بدنسازی و رزمی · تهران، پونک</p>
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-teal">{toPersianDigits(1200)} عضو</span>
            <span className="text-muted">مجوز فعال</span>
          </div>
        </div>
      </section>
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-bold">اعضای باشگاه</h3>
        <div className="space-y-3">
          {MEMBERS.map(([member, role]) => (
            <div key={member} className="flex items-center justify-between text-sm">
              <span>{member}</span>
              <span className="text-xs text-muted">{role}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="mb-2 text-sm font-bold">رویداد باشگاه</h3>
        <p className="text-sm">همایش بزرگ رزمی آراد</p>
        <p className="mt-1 text-xs text-muted">جمعه ساعت ۸ صبح، پارک لاله</p>
      </section>
    </div>
  );

  return (
    <>
      <MobilePanel tab="profile">
        <AppHeader title="باشگاه المپیک" backHref="/profile" />
        <main className="flex-1 px-4 pb-28 pt-4">{body}</main>
      </MobilePanel>
      <DesktopPanel name={name} active="club" title="باشگاه المپیک">
        <div className="max-w-2xl">{body}</div>
      </DesktopPanel>
    </>
  );
}
