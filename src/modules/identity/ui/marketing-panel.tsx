"use client";

import { useState } from "react";
import Image from "next/image";
import { brand } from "@/src/shared/config/brand";
import { toPersianDigits } from "@/src/shared/lib/digits";

const STATS = [
  { label: "نقش ها", value: 8 },
  { label: "خانواده جهانی", value: 4 },
  { label: "سطح سازمانی", value: 6 },
];

const HEROES = [
  { src: "/onboarding/hero-man.jpg", alt: "تمرین عملکردی" },
  { src: "/onboarding/hero-woman.jpg", alt: "ورزشکار باشگاه" },
];

export function MarketingPanel() {
  const [hero, setHero] = useState(0);

  return (
    <aside className="hidden min-h-[640px] w-full max-w-[520px] flex-col justify-between lg:flex">
      <div className="relative flex items-end justify-end gap-4 pt-4">
        <div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={HEROES[(hero + 1) % HEROES.length].src}
            alt={HEROES[(hero + 1) % HEROES.length].alt}
            width={168}
            height={210}
            className="h-[210px] w-[168px] object-cover"
          />
        </div>
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <Image
            src={HEROES[hero].src}
            alt={HEROES[hero].alt}
            width={250}
            height={280}
            className="h-[280px] w-[250px] object-cover"
          />
          <button
            type="button"
            aria-label="تصویر بعدی"
            onClick={() => setHero((value) => (value + 1) % HEROES.length)}
            className="absolute bottom-8 left-3 grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ocean shadow"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-white/8 px-8 py-8 text-white backdrop-blur-sm">
        <h2 className="text-3xl font-extrabold">{brand.panelTitle}</h2>
        <p className="mt-2 text-lg font-semibold text-mint">{brand.panelSubtitle}</p>
        <p className="mt-3 text-sm leading-7 text-white/75">{brand.panelBody}</p>
        <div className="mt-8 flex items-center justify-around">
          {STATS.map((item) => (
            <div
              key={item.label}
              className="grid h-24 w-24 place-items-center rounded-full border border-white/25 text-center"
            >
              <div>
                <p className="text-xs text-white/80">{item.label}</p>
                <p className="text-lg font-bold">{toPersianDigits(item.value)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="pb-2 text-left text-xs text-white/45">{brand.footer}</p>
    </aside>
  );
}
