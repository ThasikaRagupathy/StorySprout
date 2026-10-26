"use client";

import React, { useState, useEffect } from "react";
import { Story, GardenRewardItem } from "@/types/story";
import { GardenReward } from "@/components/GardenReward";
import {
  getGardenRewards,
  getFavorites,
  getReadingProgress,
  resetGardenForDemo,
  subscribeToStorage,
} from "@/utils/storage";
import { PIP_LOST_STAR_STORY } from "@/data/pipLostStar";
import { soundEffects } from "@/utils/soundEffects";
import { Flower2, Heart, BookOpen, RotateCcw } from "lucide-react";

interface MyGardenPageProps {
  onStartReading: (story: Story) => void;
}

export const MyGardenPage: React.FC<MyGardenPageProps> = ({ onStartReading }) => {
  const [rewards, setRewards] = useState<GardenRewardItem[]>(() => getGardenRewards());
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());

  const progress = getReadingProgress(PIP_LOST_STAR_STORY.id);

  useEffect(() => {
    const unsubscribe = subscribeToStorage(() => {
      setRewards(getGardenRewards());
      setFavorites(getFavorites());
    });
    return unsubscribe;
  }, []);

  const handleReset = () => {
    if (window.confirm("Reset garden demo progress? This will reset your blooming flowers so you can experience blooming them again!")) {
      resetGardenForDemo();
      soundEffects.playTap();
      setRewards([]);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 sm:space-y-12 py-4 sm:py-8">
      {/* Header Banner */}
      <div className="text-center max-w-lg mx-auto space-y-2 px-2">
        <span className="text-[11px] sm:text-xs font-fredoka font-bold uppercase tracking-wider text-[#6FA887] bg-[#A9D9B8]/25 px-3.5 py-1 rounded-full border border-[#6FA887]/30">
          ✿ Story Keepsakes
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-fredoka text-[#63452E]">
          My Story Garden
        </h2>
        <p className="text-xs sm:text-sm text-[#63452E]/75 leading-relaxed font-medium">
          Watch your garden flourish! Every time you read a story and help Pip&apos;s
          friends, a magical flower blooms right here in your meadow.
        </p>
      </div>

      {/* Main Interactive Garden Meadow */}
      <GardenReward
        rewards={rewards}
        onReadStory={() => onStartReading(PIP_LOST_STAR_STORY)}
      />

      {/* Reading Progress & Favorites Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* Reading Activity Box */}
        <div className="bg-[#FFFDF7] rounded-3xl p-5 sm:p-6 border-2 border-[#E5DFCD] shadow-xs space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="font-fredoka font-bold text-[#63452E] flex items-center gap-2 text-sm sm:text-base">
              <BookOpen className="w-4 h-4 text-[#6FA887]" />
              <span>Reading Activity</span>
            </h4>
            <span className="text-[11px] sm:text-xs font-fredoka font-bold text-[#6FA887] bg-[#A9D9B8]/25 px-2.5 py-0.5 rounded-full">
              {progress.isCompleted ? "1 Completed" : progress.currentPage > 0 ? "In Progress" : "New Reader"}
            </span>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#FFF7E8] rounded-2xl border border-[#E5DFCD]/70">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl">🦊</span>
              <div>
                <p className="text-xs sm:text-sm font-fredoka font-bold text-[#63452E]">
                  Pip and the Lost Little Star
                </p>
                <p className="text-[10px] sm:text-[11px] text-[#63452E]/70 font-semibold">
                  {progress.isCompleted
                    ? "Completed! Your Starflower is bloomed."
                    : progress.currentPage > 0
                    ? `Page ${progress.currentPage} of 8 • Keep going!`
                    : "Ready to read with Pip"}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playTap();
                onStartReading(PIP_LOST_STAR_STORY);
              }}
              className="text-xs font-fredoka font-bold bg-[#6FA887] text-white px-4 py-2 rounded-full hover:bg-[#5D9474] active:scale-95 transition-all shrink-0 cursor-pointer"
            >
              {progress.isCompleted ? "Re-read" : progress.currentPage > 0 ? "Continue" : "Start"}
            </button>
          </div>
        </div>

        {/* Favorite Stories Box */}
        <div className="bg-[#FFFDF7] rounded-3xl p-5 sm:p-6 border-2 border-[#E5DFCD] shadow-xs space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="font-fredoka font-bold text-[#63452E] flex items-center gap-2 text-sm sm:text-base">
              <Heart className="w-4 h-4 text-[#E76F42] fill-[#E76F42]" />
              <span>Favorite Stories</span>
            </h4>
            <span className="text-xs font-fredoka font-bold text-[#63452E]/60">
              {favorites.length} Saved
            </span>
          </div>

          {favorites.includes("pip-lost-star") ? (
            <div className="flex items-center justify-between p-3.5 bg-[#FFF7E8] rounded-2xl border border-[#E5DFCD]/70">
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl">⭐</span>
                <div>
                  <p className="text-xs sm:text-sm font-fredoka font-bold text-[#63452E]">
                    Pip and the Lost Little Star
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#63452E]/70 font-semibold">
                    A story about kindness and starlight
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundEffects.playTap();
                  onStartReading(PIP_LOST_STAR_STORY);
                }}
                className="text-xs font-fredoka font-bold text-[#6FA887] hover:underline cursor-pointer"
              >
                Open Book →
              </button>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-[#63452E]/60 font-medium">
              Tap the heart icon on any story to save it to your favorites!
            </div>
          )}
        </div>
      </div>

      {/* Reset for Demo */}
      <div className="text-center pt-2">
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 text-xs text-[#63452E]/60 hover:text-[#63452E] transition-colors p-2 rounded-lg cursor-pointer font-medium"
          title="Reset local storage for demo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Garden Progress (Demo Mode)</span>
        </button>
      </div>
    </div>
  );
};
