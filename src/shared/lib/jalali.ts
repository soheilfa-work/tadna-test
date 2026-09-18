const JALALI_MONTHS = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const;

export { JALALI_MONTHS };

function div(a: number, b: number) {
  return Math.trunc(a / b);
}

function mod(a: number, b: number) {
  return a - ~~(a / b) * b;
}

function jalCal(jy: number) {
  const breaks = [
    -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2292,
    2491, 2723, 2800, 2950, 3175, 3402, 3613, 3804, 4012, 4125, 4248, 4347,
    4441, 5342,
  ];
  const gy = jy + 621;
  let leapJ = -14;
  let jp = breaks[0];
  let jump = 0;
  let n = 0;
  let i = 1;

  for (; i < breaks.length; i += 1) {
    const jm = breaks[i];
    jump = jm - jp;
    if (jy < jm) break;
    leapJ += div(jump, 33) * 8 + div(mod(jump, 33), 4);
    jp = jm;
  }

  n = jy - jp;
  leapJ += div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1;

  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;
  const march = 20 + leapJ - leapG;
  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33;
  let leap = mod(mod(n + 1, 33) - 1, 4);
  if (leap === -1) leap = 4;

  return { leap, gy, march };
}

function g2d(gy: number, gm: number, gd: number) {
  let day =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  day = day - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
  return day;
}

function d2g(jdn: number) {
  let j = 4 * jdn + 139361631;
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  const i = div(mod(j, 1461), 4) * 5 + 308;
  const gd = div(mod(i, 153), 5) + 1;
  const gm = mod(div(i, 153), 12) + 1;
  const gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { year: gy, month: gm, day: gd };
}

export function jalaliToGregorian(jy: number, jm: number, jd: number) {
  const r = jalCal(jy);
  return d2g(g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1);
}

export function isJalaliLeap(year: number) {
  return jalCal(year).leap === 0;
}

export function jalaliMonthLength(year: number, month: number) {
  if (month <= 6) return 31;
  if (month <= 11) return 30;
  return isJalaliLeap(year) ? 30 : 29;
}

export function ageFromJalali(year: number, month: number, day: number, now = new Date()) {
  const gregorian = jalaliToGregorian(year, month, day);
  const birth = new Date(Date.UTC(gregorian.year, gregorian.month - 1, gregorian.day));
  let age = now.getUTCFullYear() - birth.getUTCFullYear();
  const monthDiff = now.getUTCMonth() - birth.getUTCMonth();
  if (monthDiff < 0 || (monthDiff === 0 && now.getUTCDate() < birth.getUTCDate())) {
    age -= 1;
  }
  return age;
}

export function gregorianIsoFromJalali(year: number, month: number, day: number) {
  const gregorian = jalaliToGregorian(year, month, day);
  return `${gregorian.year}-${String(gregorian.month).padStart(2, "0")}-${String(gregorian.day).padStart(2, "0")}`;
}

export function formatJalali(year: number, month: number, day: number) {
  const persian = "۰۱۲۳۴۵۶۷۸۹";
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(2, "0")}`.replace(
    /\d/g,
    (digit) => persian[Number(digit)] ?? digit,
  );
}

export const CURRENT_JALALI_YEAR = 1405;

export function jalaliYearOptions(from = 1330, to = CURRENT_JALALI_YEAR) {
  const years: number[] = [];
  for (let year = to; year >= from; year -= 1) years.push(year);
  return years;
}
