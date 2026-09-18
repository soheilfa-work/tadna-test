import type { AuditLog } from "./domain/types";
import { createId, getMemoryStore } from "@/src/kernel/storage/memory-store";

export function writeAuditLog(
  input: Omit<AuditLog, "id" | "createdAt"> & { createdAt?: string },
) {
  const store = getMemoryStore();
  const log: AuditLog = {
    id: createId("AUD"),
    createdAt: input.createdAt ?? new Date().toISOString(),
    actorId: input.actorId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    result: input.result,
    metadata: input.metadata,
  };
  store.auditLogs.set(log.id, log);
  return log;
}

export type { AuditLog } from "./domain/types";
