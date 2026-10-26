"use client";

import React from "react";
import { Story } from "@/types/story";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { soundEffects } from "@/utils/soundEffects";
import { Heart, Clock, Sparkles, BookOpen } from "lucide-react";

interface StoryCardProps {
  story: Story;
  onOpenStory: (story: Story) => void;
  onPreviewUpcoming?: (story: Story) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  onOpenStory,
  onPreviewUpcoming,
}) => {
  const { progress, favorite, toggleFavorite } = useReadingProgress(story.id);

  const hasProgress = progress.currentPage > 1 && !progress.isCompleted;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playTap();
    toggleFavorite();
  };

  const handleCardClick = () => {
    if (story.isAvailable) {
      soundEffects.playTap();
      onOpenStory(story);
    } else if (onPreviewUpcoming) {
      soundEffects.playTap();
      onPreviewUpcoming(story);
    }
  };

  const styleConfig = {
    peach: {
      bg: "from-[#FDF0ED] via-[#FFF9F5] to-[#FFF7E8]",
      border: "border-[#F4B9B1]",
      spine: "border-l-[#E76F42]",
      badge: "gold-badge",
      ribbon: "#E76F42",
    },
    mint: {
      bg: "from-[#EDF7F1] via-[#FAFDFB] to-[#FFF7E8]",
      border: "border-[#A9D9B8]",
      spine: "border-l-[#6FA887]",
      badge: "bg-[#A9D9B8]/40 text-[#345B45] border border-[#6FA887]/30",
      ribbon: "#6FA887",
    },
    lilac: {
      bg: "from-[#F4F2FC] via-[#FAF9FE] to-[#FFF7E8]",
      border: "border-[#B9B4E8]",
      spine: "border-l-[#8A83D6]",
      badge: "bg-[#B9B4E8]/40 text-[#474176] border border-[#8A83D6]/30",
      ribbon: "#8A83D6",
    },
    butter: {
      bg: "from-[#FFF9E8] via-[#FFFCF3] to-[#FFF7E8]",
      border: "border-[#F5D778]",
      spine: "border-l-[#E5B942]",
      badge: "gold-badge",
      ribbon: "#E5B942",
    },
  }[story.coverColor];

  return (
    <article
      onClick={handleCardClick}
      className={`group relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 border-3 ${styleConfig.border} border-l-[12px] ${styleConfig.spine} bg-gradient-to-b ${styleConfig.bg} shadow-md storybook-card-hover cursor-pointer overflow-hidden touch-manipulation`}
    >
      {/* Hanging Silk Ribbon Bookmark on Top Corner */}
      <div
        className="absolute -top-1 right-7 w-6 h-9 shadow-md pointer-events-none"
        style={{
          backgroundColor: styleConfig.ribbon,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 50% 75%, 0% 100%)",
        }}
      />

      {/* Top Header Row on Book: Badge & Favorite Button */}
      <div className="flex items-center justify-between z-10 pr-6">
        <span
          className={`text-[11px] sm:text-xs font-fredoka font-bold px-3 py-1 rounded-full ${styleConfig.badge} flex items-center gap-1.5 shadow-2xs`}
        >
          {story.isAvailable ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#E76F42]" />
              <span>{progress.isCompleted ? "Completed" : "Playable MVP"}</span>
            </>
          ) : (
            <span>Coming Soon</span>
          )}
        </span>

        <button
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full transition-transform active:scale-90 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#E76F42] ${
            favorite
              ? "text-[#E76F42] fill-[#E76F42]"
              : "text-[#63452E]/40 hover:text-[#E76F42]"
          }`}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={favorite}
        >
          <Heart className={`w-5 h-5 ${favorite ? "fill-current" : ""}`} />
        </button>
      </div>

      {/* Hand-Drawn Picture Book Cover Illustration */}
      <div className="relative my-4 h-38 sm:h-44 flex items-center justify-center">
        {story.id === "pip-lost-star" && (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-28 sm:w-34 h-28 sm:h-34 rounded-full bg-[#F5D778]/30 filter blur-lg absolute animate-glow" />
            <div className="flex items-end gap-3">
              <span className="text-5xl sm:text-6xl group-hover:scale-115 transition-transform duration-300">
                🦊
              </span>
              <span className="text-3xl sm:text-4xl text-[#F5D778] animate-bounce">
                ⭐
              </span>
            </div>
          </div>
        )}

        {story.id === "bunnys-rainy-day" && (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-28 sm:w-34 h-28 sm:h-34 rounded-full bg-[#A9D9B8]/30 filter blur-lg absolute animate-glow" />
            <div className="flex items-end gap-2.5">
              <span className="text-5xl sm:text-6xl group-hover:scale-115 transition-transform duration-300">
                🐰
              </span>
              <span className="text-3xl sm:text-4xl">
                ☂️
              </span>
              <span className="text-2xl text-blue-400 animate-pulse">
                💧
              </span>
            </div>
          </div>
        )}

        {story.id === "little-seed-dream" && (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-28 sm:w-34 h-28 sm:h-34 rounded-full bg-[#B9B4E8]/30 filter blur-lg absolute animate-glow" />
            <div className="flex items-end gap-2">
              <span className="text-4xl sm:text-5xl group-hover:scale-115 transition-transform duration-300">
                🌱
              </span>
              <span className="text-5xl sm:text-6xl animate-pulse">
                🌻
              </span>
            </div>
          </div>
        )}

        {story.id === "ollies-night-song" && (
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-28 sm:w-34 h-28 sm:h-34 rounded-full bg-[#F5D778]/30 filter blur-lg absolute animate-glow" />
            <div className="flex items-end gap-2.5">
              <span className="text-5xl sm:text-6xl group-hover:scale-115 transition-transform duration-300">
                🦉
              </span>
              <span className="text-3xl sm:text-4xl">
                🌙
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Book Metadata & Title */}
      <div className="space-y-2 z-10">
        <h3 className="text-base sm:text-lg font-fredoka font-bold text-[#63452E] group-hover:text-[#E76F42] transition-colors leading-snug">
          {story.title}
        </h3>
        <p className="text-xs text-[#63452E]/75 line-clamp-2 leading-relaxed font-medium">
          {story.subtitle}
        </p>

        <div className="flex items-center gap-2.5 text-[11px] sm:text-xs text-[#63452E]/70 pt-1 font-semibold">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>~{story.readingTimeMinutes} min</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{story.totalPages} pages</span>
          </span>
        </div>
      </div>

      {/* Chunky Card Action Button */}
      <div className="mt-4 pt-3 border-t border-[#E5DFCD]/70 z-10">
        {story.isAvailable ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundEffects.playTap();
              onOpenStory(story);
            }}
            className="w-full btn-chunky-green py-3 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
          >
            <span>
              {hasProgress
                ? `Continue (Page ${progress.currentPage})`
                : progress.isCompleted
                ? "Read Again"
                : "Let's Read!"}
            </span>
            <span>→</span>
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onPreviewUpcoming) {
                soundEffects.playTap();
                onPreviewUpcoming(story);
              }
            }}
            className="w-full btn-chunky-white py-2.5 px-4 flex items-center justify-center gap-1.5 text-xs cursor-pointer"
          >
            <span>Preview Story</span>
          </button>
        )}
      </div>
    </article>
  );
};
