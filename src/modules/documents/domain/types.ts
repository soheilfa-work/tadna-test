export type DocumentType =
  | "portrait_photo"
  | "national_id_card"
  | "medical_certificate"
  | "guardian_consent";

export type DocumentRecord = {
  id: string;
  ownerPersonId: string;
  type: DocumentType;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storageKey: string;
  status: "uploaded" | "approved" | "rejected";
  createdAt: string;
};
