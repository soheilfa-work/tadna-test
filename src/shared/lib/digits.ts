const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";

export function toEnglishDigits(value: string) {
  return value.replace(/[۰-۹٠-٩]/g, (digit) => {
    const persian = PERSIAN_DIGITS.indexOf(digit);
    if (persian >= 0) return String(persian);
    const arabic = ARABIC_DIGITS.indexOf(digit);
    return arabic >= 0 ? String(arabic) : digit;
  });
}

export function toPersianDigits(value: string | number) {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
}

export function onlyDigits(value: string, maxLength?: number) {
  const digits = toEnglishDigits(value).replace(/\D/g, "");
  return maxLength ? digits.slice(0, maxLength) : digits;
}
