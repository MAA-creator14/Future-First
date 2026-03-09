/**
 * AsyncStorage-backed storage shim for Expo Go / web compatibility.
 * Provides a synchronous API backed by an in-memory cache.
 * Writes are persisted to AsyncStorage asynchronously (fire-and-forget).
 * Call initStorage() at app start to rehydrate the cache from AsyncStorage.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const cache: Record<string, string> = {};

export const storage = {
  getString(key: string): string | undefined {
    return cache[key];
  },
  set(key: string, value: string): void {
    cache[key] = value;
    // Persist asynchronously — don't await, sync callers don't need to wait
    AsyncStorage.setItem(key, value).catch(() => {});
  },
};

/**
 * Rehydrate the in-memory cache from AsyncStorage.
 * Must be awaited before the first getProfile() call.
 */
export async function initStorage(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length === 0) return;
    const pairs = await AsyncStorage.multiGet(keys);
    for (const [key, value] of pairs) {
      if (key && value !== null) cache[key] = value;
    }
  } catch {
    // If storage is unavailable, start with empty cache (defaults apply)
  }
}
