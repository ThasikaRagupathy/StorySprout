import { GardenRewardItem, ReadingProgress, UserPreferences } from "@/types/story";

const MEMORY_STORE = new Map<string, string>();

const KEYS = {
  PROGRESS_PREFIX: "storysprout_progress_",
  FAVORITES: "storysprout_favorites",
  GARDEN_REWARDS: "storysprout_garden_rewards",
  PREFERENCES: "storysprout_preferences",
};

function safeGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key) ?? MEMORY_STORE.get(key) ?? null;
  } catch {
    return MEMORY_STORE.get(key) ?? null;
  }
}

function safeSet(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    MEMORY_STORE.set(key, value);
  }
  window.dispatchEvent(new CustomEvent("storysprout_state_change", { detail: { key, value } }));
}

export function subscribeToStorage(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener("storage", handler);
  window.addEventListener("storysprout_state_change", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("storysprout_state_change", handler);
  };
}

export function getReadingProgress(storyId: string): ReadingProgress {
  const raw = safeGet(KEYS.PROGRESS_PREFIX + storyId);
  if (!raw) {
    return {
      currentPage: 0,
      isCompleted: false,
      lastReadDate: "",
      interactionsDiscovered: [],
    };
  }
  try {
    return JSON.parse(raw) as ReadingProgress;
  } catch {
    return {
      currentPage: 0,
      isCompleted: false,
      lastReadDate: "",
      interactionsDiscovered: [],
    };
  }
}

export function saveReadingProgress(
  storyId: string,
  pageNumber: number,
  isCompleted: boolean = false
): void {
  const current = getReadingProgress(storyId);
  const updated: ReadingProgress = {
    ...current,
    currentPage: pageNumber,
    isCompleted: isCompleted || current.isCompleted,
    lastReadDate: new Date().toISOString(),
  };
  safeSet(KEYS.PROGRESS_PREFIX + storyId, JSON.stringify(updated));

  if (isCompleted) {
    // Also unlock flower reward if not already added
    const rewards = getGardenRewards();
    if (!rewards.some((r) => r.storyId === storyId)) {
      addGardenReward({
        id: `reward-${storyId}`,
        storyId,
        flowerName: "Kindness Starflower",
        description: "Bloomed when Pip helped the little star find its way home into the night sky.",
        bloomedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        color: "#F5D778",
        iconType: "starflower",
      });
    }
  }
}

export function markInteractionDiscovered(storyId: string, pageNumber: number): void {
  const current = getReadingProgress(storyId);
  if (!current.interactionsDiscovered.includes(pageNumber)) {
    const updated: ReadingProgress = {
      ...current,
      interactionsDiscovered: [...current.interactionsDiscovered, pageNumber],
    };
    safeSet(KEYS.PROGRESS_PREFIX + storyId, JSON.stringify(updated));
  }
}

export function getFavorites(): string[] {
  const raw = safeGet(KEYS.FAVORITES);
  if (!raw) return ["pip-lost-star"]; // Default Pip as a favorite
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return ["pip-lost-star"];
  }
}

export function isFavorite(storyId: string): boolean {
  return getFavorites().includes(storyId);
}

export function toggleFavorite(storyId: string): boolean {
  const current = getFavorites();
  let updated: string[];
  const isNowFav = !current.includes(storyId);
  if (isNowFav) {
    updated = [...current, storyId];
  } else {
    updated = current.filter((id) => id !== storyId);
  }
  safeSet(KEYS.FAVORITES, JSON.stringify(updated));
  return isNowFav;
}

export function getGardenRewards(): GardenRewardItem[] {
  const raw = safeGet(KEYS.GARDEN_REWARDS);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as GardenRewardItem[];
  } catch {
    return [];
  }
}

export function addGardenReward(reward: GardenRewardItem): void {
  const current = getGardenRewards();
  if (current.some((r) => r.id === reward.id)) return;
  const updated = [...current, reward];
  safeSet(KEYS.GARDEN_REWARDS, JSON.stringify(updated));
}

export function getUserPreferences(): UserPreferences {
  const raw = safeGet(KEYS.PREFERENCES);
  const defaults: UserPreferences = {
    language: "en",
    soundEffects: true,
    narrationVoiceSpeed: 0.85,
    reducedMotion: false,
    bedtimeMode: false,
  };
  if (!raw) return defaults;
  try {
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

export function saveUserPreferences(prefs: Partial<UserPreferences>): void {
  const current = getUserPreferences();
  const updated = { ...current, ...prefs };
  safeSet(KEYS.PREFERENCES, JSON.stringify(updated));
}

export function resetGardenForDemo(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEYS.PROGRESS_PREFIX + "pip-lost-star");
    window.localStorage.removeItem(KEYS.GARDEN_REWARDS);
    MEMORY_STORE.clear();
  } catch {}
  window.dispatchEvent(new CustomEvent("storysprout_state_change"));
}
