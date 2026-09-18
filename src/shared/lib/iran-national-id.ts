import { onlyDigits } from "./digits";

export function normalizeNationalId(value: string) {
  return onlyDigits(value, 10);
}

export function isValidIranianNationalId(value: string) {
  const id = normalizeNationalId(value);
  if (!/^\d{10}$/.test(id)) return false;
  if (/^(\d)\1{9}$/.test(id)) return false;

  const check = Number(id[9]);
  const sum = id
    .slice(0, 9)
    .split("")
    .reduce((total, digit, index) => total + Number(digit) * (10 - index), 0);
  const remainder = sum % 11;
  return remainder < 2 ? check === remainder : check === 11 - remainder;
}

export function maskNationalId(value: string) {
  const id = normalizeNationalId(value);
  if (id.length < 4) return "********";
  return `******${id.slice(-4)}`;
}
