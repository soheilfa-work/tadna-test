export const ROLE_OPTIONS = [
  {
    code: "ministry",
    title: "وزارت ورزش",
    caption: "سیاست و نظارت ملی",
  },
  {
    code: "federation",
    title: "فدراسیون",
    caption: "رئیس ، دبیر کل ، داور و ارکان",
  },
  {
    code: "committee",
    title: "کمیته تخصصی",
    caption: "داوری ، مربیان حقوقی و انضباطی",
  },
  {
    code: "provincial_board",
    title: "هیئت استانی",
    caption: "مدیریت شهر ، باشگاه و اعضا",
  },
  {
    code: "county_board",
    title: "هیئت شهری",
    caption: "مدیریت شهر ، باشگاه و اعضا",
  },
  {
    code: "club",
    title: "باشگاه",
    caption: "عضویت ، تمرین و مسابقه",
  },
  {
    code: "coach",
    title: "مربی تایید شده",
    caption: "مدرس و ناظر دوره‌های تمرینی رسمی و صدور برنامه‌های آماده",
  },
  {
    code: "independent_athlete",
    title: "ورزشکار آزاد",
    caption: "تمرین مستقل و شرکت در رویدادها بدون وابستگی باشگاهی",
  },
] as const;

export type SignupRoleCode = (typeof ROLE_OPTIONS)[number]["code"];

export function getRoleOption(code: string) {
  return ROLE_OPTIONS.find((item) => item.code === code);
}
