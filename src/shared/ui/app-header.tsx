"use client";

import { cn } from "@/src/shared/lib/cn";

type Props = {
  title: string;
  onBack?: () => void;
  className?: string;
};

export function AppHeader({ title, onBack, className }: Props) {
  return (
    <header className={cn("sticky top-0 z-20 bg-ocean text-white", className)}>
      <div className="h-[env(safe-area-inset-top)]" />
      <div className="relative flex h-14 items-center justify-center px-12">
        <h1 className="truncate text-center text-[15px] font-bold">{title}</h1>
        {onBack ? (
          <button
            type="button"
            aria-label="بازگشت"
            onClick={onBack}
            className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </header>
  );
}
