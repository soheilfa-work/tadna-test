export type ClubLicenseStatus = "active" | "expired" | "suspended" | "revoked";

export type Club = {
  id: string;
  organizationId: string;
  name: string;
  provinceId: string;
  countyId: string;
  locationLabel: string;
  sportsLabel: string;
  sportScope: string;
  managerName: string;
  licenseStatus: ClubLicenseStatus;
  licenseExpiresAt: string;
};
