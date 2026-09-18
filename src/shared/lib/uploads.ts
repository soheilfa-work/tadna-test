export const MAX_DOCUMENT_BYTES = 2 * 1024 * 1024;

export const ALLOWED_DOCUMENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

export type AllowedDocumentType = (typeof ALLOWED_DOCUMENT_TYPES)[number];

export function isAllowedDocumentType(value: string): value is AllowedDocumentType {
  return (ALLOWED_DOCUMENT_TYPES as readonly string[]).includes(value);
}
