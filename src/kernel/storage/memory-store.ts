type CollectionName =
  | "persons"
  | "users"
  | "athleteProfiles"
  | "memberships"
  | "documents"
  | "auditLogs"
  | "otps";

type MemoryStore = Record<CollectionName, Map<string, unknown>>;

const globalForStore = globalThis as typeof globalThis & {
  __tadnaMemoryStore?: MemoryStore;
};

function createStore(): MemoryStore {
  return {
    persons: new Map(),
    users: new Map(),
    athleteProfiles: new Map(),
    memberships: new Map(),
    documents: new Map(),
    auditLogs: new Map(),
    otps: new Map(),
  };
}

export function getMemoryStore() {
  if (!globalForStore.__tadnaMemoryStore) {
    globalForStore.__tadnaMemoryStore = createStore();
  }
  const store = globalForStore.__tadnaMemoryStore;
  if (!store.otps) store.otps = new Map();
  return store;
}

export function createId(prefix: string) {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  const stamp = Date.now().toString(36).toUpperCase();
  return `${prefix}-${stamp}-${random}`;
}
