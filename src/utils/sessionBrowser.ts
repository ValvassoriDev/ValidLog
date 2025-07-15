export function getSessionCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  const item = sessionStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export function setSessionCache<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function resetSessionCache(key: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(key);
}
