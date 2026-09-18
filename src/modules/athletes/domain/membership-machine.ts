import type { MembershipKind, MembershipStatus } from "./types";

export function initialMembershipStatus(kind: MembershipKind): MembershipStatus {
  return kind === "club" ? "submitted" : "board_referral";
}

export function membershipStatusLabel(status: MembershipStatus) {
  const labels: Record<MembershipStatus, string> = {
    draft: "پیش‌نویس",
    incomplete: "ناقص",
    submitted: "ارسال‌شده، در انتظار تأیید باشگاه",
    club_approved: "تأیید باشگاه",
    board_review: "بررسی هیأت",
    approved: "تأییدشده",
    rejected: "ردشده",
    active: "فعال",
    expired: "منقضی",
    suspended: "تعلیق",
    cancelled: "لغو",
    requested: "درخواست ثبت شد",
    city_club_check: "بررسی باشگاه‌های شهرستان",
    board_referral: "ارجاع به هیأت برای عضویت آزاد",
    review: "در حال بررسی هیأت",
    time_limited_approved: "تأیید مدت‌دار",
    converted_to_club: "تبدیل به عضویت باشگاهی",
  };
  return labels[status];
}
