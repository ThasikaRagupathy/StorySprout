"use client";

import React, { useState } from "react";
import { Story, StoryCategory, StoryLanguage } from "@/types/story";
import { StoryCard } from "@/components/StoryCard";
import { ALL_STORIES } from "@/data/stories";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { soundEffects } from "@/utils/soundEffects";
import { BookOpen, Sparkles, X, Heart, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StoriesPageProps {
  language: StoryLanguage;
  onOpenStory: (story: Story) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({
  language,
  onOpenStory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StoryCategory | "Favorites">("All");
  const [previewStory, setPreviewStory] = useState<Story | null>(null);

  const { allFavorites } = useReadingProgress("pip-lost-star");

  const categories: (StoryCategory | "Favorites")[] = [
    "All",
    "Adventures",
    "Bedtime",
    "Friendship",
    "Animals",
    "Learning",
    "Favorites",
  ];

  const filteredStories = ALL_STORIES.filter((story) => {
    if (selectedCategory === "Favorites") {
      return allFavorites.includes(story.id);
    }
    if (selectedCategory === "All") {
      return true;
    }
    return story.category === selectedCategory || (selectedCategory === "Animals" && (story.id.includes("bunny") || story.id.includes("pip")));
  });

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 sm:space-y-10 py-4 sm:py-8">
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-2.5 px-2">
        <span className="text-[11px] sm:text-xs font-fredoka font-bold uppercase tracking-wider text-[#6FA887] bg-[#A9D9B8]/25 px-3.5 py-1 rounded-full border border-[#6FA887]/30 shadow-2xs">
          {language === "ta" ? "✦ கதை நூலகம்" : "✦ Nursery Story Shelf"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-fredoka text-[#63452E]">
          {language === "ta" ? "உங்கள் சாகசத்தைத் தேர்ந்தெடுங்கள்" : "Choose Your Adventure"}
        </h2>
        <p className="text-xs sm:text-sm text-[#63452E]/75 leading-relaxed font-medium">
          {language === "ta"
            ? "ஒவ்வொரு சிறிய புத்தகமும் ஒரு புதிய உலகத்தை திறக்கிறது. நட்பும் அன்பும் நிறைந்த கதைகளை வாசித்து மகிழுங்கள்."
            : "Every little book opens a cozy, kind world filled with gentle lessons, sweet animal friends, and interactive surprises."}
        </p>
      </div>

      {/* Category Filter Pills (Adventures, Bedtime, Friendship, Animals, Learning, Favorites) */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap px-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => {
                soundEffects.playTap();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-fredoka font-bold transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#6FA887] text-white shadow-xs"
                  : "bg-[#FFFDF7] text-[#63452E] border border-[#E5DFCD] hover:bg-[#FFF7E8]"
              }`}
            >
              {cat === "Favorites" ? `♥ Favorites (${allFavorites.length})` : cat}
            </button>
          );
        })}
      </div>

      {/* Story Cards Grid on Wooden Nursery Shelf */}
      <div className="relative pt-2 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 z-10 relative">
          {filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              onOpenStory={onOpenStory}
              onPreviewUpcoming={(s) => setPreviewStory(s)}
            />
          ))}
        </div>

        {/* Wooden Nursery Shelf Base */}
        <div className="wooden-shelf h-5 w-full mt-3 hidden sm:block" />
      </div>

      {/* Preview Modal for upcoming stories */}
      <AnimatePresence>
        {previewStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setPreviewStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFF7E8] rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-[#A9D9B8] shadow-2xl relative space-y-4"
            >
              <button
                onClick={() => setPreviewStory(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#63452E]/60 hover:text-[#63452E] hover:bg-[#E5DFCD]/50 cursor-pointer"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-[#FFFDF7] border-2 border-[#A9D9B8] flex items-center justify-center text-3xl shadow-sm mx-auto">
                {previewStory.id === "bunnys-rainy-day"
                  ? "🐰☂️"
                  : previewStory.id === "little-seed-dream"
                  ? "🌱🌻"
                  : "🦉⭐"}
              </div>

              <div className="text-center space-y-1">
                <span className="text-[11px] font-fredoka font-bold uppercase text-[#6FA887] tracking-wider">
                  Sneak Peek • {previewStory.category}
                </span>
                <h3 className="text-xl font-fredoka font-bold text-[#63452E]">
                  {language === "ta" ? previewStory.titleTa : previewStory.title}
                </h3>
                <p className="text-xs text-[#63452E]/70 font-semibold">
                  Theme: {previewStory.theme} • {previewStory.ageRecommendation}
                </p>
              </div>

              <div className="bg-[#FFFDF7] p-4 rounded-2xl border border-[#E5DFCD] text-xs sm:text-sm text-[#63452E]/80 leading-relaxed space-y-2">
                <p>{language === "ta" ? previewStory.subtitleTa : previewStory.subtitle}</p>
                <p className="italic text-[#6FA887] font-semibold">
                  &ldquo;{language === "ta" ? previewStory.taglineTa : previewStory.tagline}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-around text-xs text-[#63452E]/70 font-semibold pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  ~{previewStory.readingTimeMinutes} mins
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {previewStory.totalPages} pages
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setPreviewStory(null)}
                  className="w-full bg-[#6FA887] text-white font-fredoka font-bold py-2.5 rounded-full shadow hover:bg-[#5D9474] active:scale-95 transition-all text-xs cursor-pointer"
                >
                  {language === "ta" ? "சரி! பிப் கதையை வாசிக்கவும்" : "Got It! Read Pip First"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
