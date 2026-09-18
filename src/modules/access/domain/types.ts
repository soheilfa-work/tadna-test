export type AccessAssignment = {
  userId: string;
  roleId: string;
  organizationId: string;
  sportScope: string;
  geographyScope: string;
  startsAt: string;
  endsAt: string;
  status: "draft" | "active" | "expired" | "revoked";
};

export const ROLE_CODES = [
  "tadna_admin",
  "committee_chair",
  "provincial_manager",
  "county_manager",
  "club_manager",
  "operator",
  "athlete",
] as const;

export type RoleCode = (typeof ROLE_CODES)[number];

export { ROLE_OPTIONS, getRoleOption } from "./roles";
export type { SignupRoleCode } from "./roles";
