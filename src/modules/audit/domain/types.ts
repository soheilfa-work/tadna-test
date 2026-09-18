export type AuditLog = {
  id: string;
  actorId: string | null;
  action: string;
  entityType: string;
  entityId: string;
  result: "success" | "denied" | "error";
  createdAt: string;
  metadata: Record<string, string>;
};
