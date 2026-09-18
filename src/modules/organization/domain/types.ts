export type OrganizationType =
  | "ministry"
  | "federation"
  | "committee"
  | "provincial_board"
  | "county_board"
  | "club";

export type Organization = {
  id: string;
  type: OrganizationType;
  name: string;
  parentId: string | null;
  sportScope: string;
  geographyScope: string | null;
  status: "active" | "inactive";
};
