export type Person = {
  id: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  nationalId: string;
  birthDate: string;
  gender: "male" | "female";
  mobile: string;
  createdAt: string;
  archivedAt: string | null;
};

export type UserAccount = {
  id: string;
  personId: string;
  mobile: string;
  roleCode: string;
  status: "active" | "suspended";
  createdAt: string;
};
