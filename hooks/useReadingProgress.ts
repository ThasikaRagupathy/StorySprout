import { useEffect, useState } from "react";
import {
  getFavorites,
  getReadingProgress,
  isFavorite,
  markInteractionDiscovered,
  saveReadingProgress,
  subscribeToStorage,
  toggleFavorite,
} from "@/utils/storage";
import { ReadingProgress } from "@/types/story";

export function useReadingProgress(storyId: string) {
  const [progress, setProgress] = useState<ReadingProgress>(() => getReadingProgress(storyId));
  const [favorite, setFavorite] = useState<boolean>(() => isFavorite(storyId));
  const [allFavorites, setAllFavorites] = useState<string[]>(() => getFavorites());

  useEffect(() => {
    const unsubscribe = subscribeToStorage(() => {
      setProgress(getReadingProgress(storyId));
      setFavorite(isFavorite(storyId));
      setAllFavorites(getFavorites());
    });
    return unsubscribe;
  }, [storyId]);

  const updatePage = (pageNumber: number, isCompleted: boolean = false) => {
    saveReadingProgress(storyId, pageNumber, isCompleted);
    setProgress(getReadingProgress(storyId));
  };

  const recordInteraction = (pageNumber: number) => {
    markInteractionDiscovered(storyId, pageNumber);
    setProgress(getReadingProgress(storyId));
  };

  const handleToggleFavorite = () => {
    const nextState = toggleFavorite(storyId);
    setFavorite(nextState);
    setAllFavorites(getFavorites());
    return nextState;
  };

  return {
    progress,
    favorite,
    allFavorites,
    updatePage,
    recordInteraction,
    toggleFavorite: handleToggleFavorite,
  };
}
