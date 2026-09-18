export const SPORT_OPTIONS = [
  { code: "functional-fitness", name: "فانکشنال فیتنس" },
] as const;

export type SportCode = (typeof SPORT_OPTIONS)[number]["code"];

export type MembershipKind = "club" | "independent";

export type ClubMembershipStatus =
  | "draft"
  | "incomplete"
  | "submitted"
  | "club_approved"
  | "board_review"
  | "approved"
  | "rejected"
  | "active"
  | "expired"
  | "suspended"
  | "cancelled";

export type IndependentMembershipStatus =
  | "requested"
  | "city_club_check"
  | "board_referral"
  | "review"
  | "time_limited_approved"
  | "rejected"
  | "converted_to_club";

export type MembershipStatus = ClubMembershipStatus | IndependentMembershipStatus;

export type AthleteProfile = {
  id: string;
  personId: string;
  sportScope: string;
  provinceId: string;
  countyId: string;
  createdAt: string;
};

export type Membership = {
  id: string;
  trackingCode: string;
  athleteProfileId: string;
  kind: MembershipKind;
  status: MembershipStatus;
  organizationId: string | null;
  clubId: string | null;
  sportScope: string;
  provinceId: string;
  countyId: string;
  membershipNumber: string | null;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
};

export type GuardianInfo = {
  name: string;
  nationalId: string;
  mobile: string;
};

export type UploadedDocumentInput = {
  type: "portrait_photo" | "national_id_card" | "medical_certificate" | "guardian_consent";
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  dataUrl: string;
};

export type RegisterAthleteInput = {
  firstName: string;
  lastName: string;
  fatherName?: string;
  nationalId: string;
  mobile: string;
  gender: "male" | "female" | "";
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  provinceId?: string;
  countyId?: string;
  sportScope?: string;
  roleCode: string;
  membershipKind: MembershipKind | "";
  clubId?: string;
  documents: UploadedDocumentInput[];
};
