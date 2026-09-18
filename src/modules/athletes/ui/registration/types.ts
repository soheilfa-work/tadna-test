import type { MembershipKind } from "@/src/modules/athletes/domain/types";

export type DocumentDraft = {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  dataUrl: string;
};

export type RegistrationDraft = {
  firstName: string;
  lastName: string;
  fatherName: string;
  nationalId: string;
  mobile: string;
  gender: "male" | "female" | "";
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  provinceId: string;
  countyId: string;
  sportScope: string;
  membershipKind: MembershipKind | "";
  clubId: string;
  photo?: DocumentDraft;
  nationalIdCard?: DocumentDraft;
  guardianName: string;
  guardianNationalId: string;
  guardianMobile: string;
  guardianConsent?: DocumentDraft;
  acceptedPrivacy: boolean;
};

export const EMPTY_REGISTRATION_DRAFT: RegistrationDraft = {
  firstName: "",
  lastName: "",
  fatherName: "",
  nationalId: "",
  mobile: "",
  gender: "",
  birthYear: "",
  birthMonth: "",
  birthDay: "",
  provinceId: "",
  countyId: "",
  sportScope: "functional-fitness",
  membershipKind: "",
  clubId: "",
  guardianName: "",
  guardianNationalId: "",
  guardianMobile: "",
  acceptedPrivacy: false,
};

export const REGISTRATION_STEPS = [
  { id: "identity", title: "هویت", caption: "نام، کد ملی و عکس" },
  { id: "location", title: "محل و رشته", caption: "استان، شهرستان و رشته" },
  { id: "club", title: "عضویت", caption: "باشگاهی یا آزاد" },
  { id: "documents", title: "مدارک", caption: "کارت ملی و رضایت ولی" },
  { id: "review", title: "ارسال", caption: "بازبینی و ثبت درخواست" },
] as const;

export type RegistrationStepId = (typeof REGISTRATION_STEPS)[number]["id"];
