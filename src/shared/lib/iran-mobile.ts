import { onlyDigits } from "./digits";

export function normalizeMobile(value: string) {
  let digits = onlyDigits(value, 12);
  if (digits.startsWith("98")) digits = `0${digits.slice(2)}`;
  if (digits.startsWith("9") && digits.length === 10) digits = `0${digits}`;
  return digits.slice(0, 11);
}

export function isValidIranianMobile(value: string) {
  return /^09\d{9}$/.test(normalizeMobile(value));
}

export function maskMobile(value: string) {
  const mobile = normalizeMobile(value);
  if (mobile.length < 4) return "***********";
  return `${mobile.slice(0, 4)}***${mobile.slice(-4)}`;
}
