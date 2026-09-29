"use client";

import type { ReactNode } from "react";
import { AthleteDesktopSidebar, AthleteTabBar, type AthleteTabId, type DesktopNavId } from "./athlete-chrome";

export function MobilePanel({
  children,
  tab,
}: {
  children: ReactNode;
  tab: AthleteTabId;
}) {
  return (
    <div className="flex min-h-dvh w-full max-w-[100vw] min-w-0 flex-col overflow-x-hidden bg-[#f3f5f6] text-ink lg:hidden">
      {children}
      <AthleteTabBar active={tab} />
    </div>
  );
}

export function DesktopPanel({
  name,
  active,
  title,
  actions,
  children,
}: {
  name: string;
  active: DesktopNavId;
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="hidden min-h-dvh bg-[#f3f4f6] text-ink lg:block">
      <div className="mx-auto grid min-h-dvh max-w-[1440px] lg:grid-cols-[280px_minmax(0,1fr)]">
        <AthleteDesktopSidebar name={name} active={active} />
        <main className="px-4 py-5 sm:px-8">
          <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-lg font-bold">{title}</h1>
            {actions}
          </header>
          {children}
        </main>
      </div>
    </div>
  );
}
