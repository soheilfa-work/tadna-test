"use client";

import type { ReactNode } from "react";
import { MarketingPanel } from "./marketing-panel";
import { AppHeader } from "@/src/shared/ui/app-header";

type Props = {
  children: ReactNode;
  title?: string;
  onBack?: () => void;
};

export function AuthShell({ children, title, onBack }: Props) {
  return (
    <div className="relative flex min-h-dvh flex-col bg-[#f3f5f6] lg:block lg:overflow-hidden lg:bg-ocean">
      <div className="pointer-events-none absolute -right-24 top-[-120px] hidden h-[420px] w-[420px] rounded-full bg-[#12707c]/35 blur-3xl lg:block" />
      <div className="pointer-events-none absolute -left-32 bottom-[-160px] hidden h-[520px] w-[520px] rounded-full bg-[#0b5f6c]/30 blur-3xl lg:block" />
      {title ? <AppHeader className="lg:hidden" title={title} onBack={onBack} /> : null}
      <div className="relative mx-auto flex w-full flex-1 flex-col lg:min-h-dvh lg:max-w-[1180px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8 lg:py-10">
        <MarketingPanel />
        <section className="mx-auto flex w-full flex-1 flex-col lg:max-w-[520px] lg:flex-none lg:rounded-[32px] lg:bg-white lg:px-8 lg:py-10 lg:shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
          <div className="flex flex-1 flex-col px-5 py-6 lg:px-0 lg:py-0">{children}</div>
        </section>
      </div>
    </div>
  );
}
