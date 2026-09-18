export type DocumentDraft = {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  dataUrl: string;
  progress: number;
};

export type OnboardingDraft = {
  mobileLocal: string;
  otp: string;
  roleCode: string;
  firstName: string;
  lastName: string;
  nationalId: string;
  birthDate: string;
  gender: "male" | "female" | "";
  clubQuery: string;
  clubId: string;
  independent: boolean;
  photo?: DocumentDraft;
  nationalIdCard?: DocumentDraft;
  medicalCertificate?: DocumentDraft;
};

export const EMPTY_ONBOARDING: OnboardingDraft = {
  mobileLocal: "",
  otp: "",
  roleCode: "independent_athlete",
  firstName: "",
  lastName: "",
  nationalId: "",
  birthDate: "",
  gender: "",
  clubQuery: "",
  clubId: "",
  independent: false,
};

export type OnboardingStep =
  | "phone"
  | "otp"
  | "role"
  | "personal"
  | "club"
  | "documents"
  | "review"
  | "success";
