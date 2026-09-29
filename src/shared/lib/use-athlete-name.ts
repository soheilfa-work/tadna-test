"use client";

import { useSyncExternalStore } from "react";

const FALLBACK = "ورزشکار تادنا";

function readAthleteName() {
  const raw = window.localStorage.getItem("tadna_session");
  if (!raw) return FALLBACK;
  try {
    const session = JSON.parse(raw) as { firstName?: string; lastName?: string };
    if (session.firstName) return `${session.firstName} ${session.lastName ?? ""}`.trim();
  } catch {
    return FALLBACK;
  }
  return FALLBACK;
}

function subscribe() {
  return () => {};
}

export function useAthleteName(fallback = FALLBACK) {
  return useSyncExternalStore(subscribe, readAthleteName, () => fallback);
}
