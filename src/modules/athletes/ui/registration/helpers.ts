"use client";

import { ageFromJalali } from "@/src/shared/lib/jalali";
import type { RegistrationDraft } from "./types";

export function isMinor(draft: RegistrationDraft) {
  if (!draft.birthYear || !draft.birthMonth || !draft.birthDay) return false;
  return (
    ageFromJalali(Number(draft.birthYear), Number(draft.birthMonth), Number(draft.birthDay)) < 18
  );
}

export function fullName(draft: RegistrationDraft) {
  return `${draft.firstName} ${draft.lastName}`.trim();
}
