const ROOT_STORAGE_KEY = "ev_dashboard";

let isStorageSupported = false;
let storage: Record<string, unknown> = {};

// Test support
try {
  isStorageSupported = "localStorage" in window && window.localStorage !== null;
} catch {
  // no throw
}

if (isStorageSupported) {
  try {
    const storedData = localStorage.getItem(ROOT_STORAGE_KEY);
    storage = storedData ? JSON.parse(storedData) : {};
  } catch {
    storage = {};
  }
}

function storageSave(): void {
  if (isStorageSupported) {
    try {
      localStorage.setItem(ROOT_STORAGE_KEY, JSON.stringify(storage));
    } catch {
      // no throw
    }
  }
}

export function storageRemoveItem<T = unknown>(key: string): T | undefined {
  const value = storage[key];
  delete storage[key];
  storageSave();
  return value as T;
}

export function storageGetLatest<T = unknown>(key: string, def: T): T {
  try {
    const storedData = localStorage.getItem(ROOT_STORAGE_KEY);
    const parsedStorage = storedData ? JSON.parse(storedData) : {};
    return key in parsedStorage ? parsedStorage[key] : def;
  } catch {
    return def;
  }
}

export function storageGet<T = unknown>(key: string, def: T): T {
  return (key in storage ? storage[key] : def) as T;
}

export function storageSet<T = unknown>(key: string, value: T): T | undefined {
  const oldValue = storage[key];
  storage[key] = value;
  storageSave();
  return oldValue as T;
}

export function storageGetKey(prefix: string, resourceId?: string): string {
  const userKey: string = "unauthorized";
  return `${userKey}--${prefix}${resourceId ? `--${resourceId}` : ""}`;
}

const storageService = {
  storageGet,
  storageSet,
  storageGetKey,
  storageGetLatest,
  storageRemoveItem,
};

export default storageService;
