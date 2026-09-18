import { toEnglishDigits } from "./digits";

export function parseJalaliInput(value: string) {
  const normalized = toEnglishDigits(value).replace(/-/g, "/").trim();
  const match = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(normalized);
  if (!match) return null;
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}
