"use client";

import Link from "next/link";
import { cn } from "@/src/shared/lib/cn";

type Props = {
  title: string;
  onBack?: () => void;
  backHref?: string;
  onClose?: () => void;
  closeHref?: string;
  className?: string;
};

function Chevron() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function AppHeader({ title, onBack, backHref, onClose, closeHref, className }: Props) {
  const back = backHref ? (
    <Link href={backHref} aria-label="بازگشت" className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full">
      <Chevron />
    </Link>
  ) : onBack ? (
    <button
      type="button"
      aria-label="بازگشت"
      onClick={onBack}
      className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full"
    >
      <Chevron />
    </button>
  ) : null;

  const close = closeHref ? (
    <Link href={closeHref} aria-label="بستن" className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full">
      <CloseIcon />
    </Link>
  ) : onClose ? (
    <button
      type="button"
      aria-label="بستن"
      onClick={onClose}
      className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full"
    >
      <CloseIcon />
    </button>
  ) : null;

  return (
    <header className={cn("sticky top-0 z-20 bg-ocean text-white", className)}>
      <div className="h-[env(safe-area-inset-top)]" />
      <div className="relative flex h-14 items-center justify-center px-12">
        <h1 className="truncate text-center text-[15px] font-bold">{title}</h1>
        {back}
        {close}
      </div>
    </header>
  );
}
