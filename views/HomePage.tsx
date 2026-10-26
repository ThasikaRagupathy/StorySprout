"use client";

import React from "react";
import { motion } from "framer-motion";
import { PipCharacter } from "@/components/PipCharacter";
import { Story, StoryLanguage } from "@/types/story";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { soundEffects } from "@/utils/soundEffects";
import { Sparkles, BookOpen, ArrowRight, Users, Heart } from "lucide-react";

interface HomePageProps {
  language: StoryLanguage;
  onStartReading: (story: Story) => void;
  onOpenGarden: () => void;
  onOpenLibrary: () => void;
  onOpenCharacters: () => void;
  featuredStory: Story;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  onStartReading,
  onOpenGarden,
  onOpenLibrary,
  onOpenCharacters,
  featuredStory,
}) => {
  const { progress } = useReadingProgress(featuredStory.id);
  const hasProgress = progress.currentPage > 1 && !progress.isCompleted;

  return (
    <div className="flex flex-col items-center justify-center space-y-10 sm:space-y-14 py-4 sm:py-8">
      {/* ========================================================
          Enchanted Forest Welcome Hero Banner (Experience 01)
      ======================================================== */}
      <section
        className="relative w-full max-w-5xl rounded-[38px] sm:rounded-[48px] bg-gradient-to-b from-[#EBF7F0] via-[#FDF9ED] to-[#FFF7E8] border-3 sm:border-4 border-[#A9D9B8] shadow-2xl p-6 sm:p-10 md:p-14 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-10"
        aria-label="Welcome to StorySprout Garden"
      >
        {/* Animated Golden Sun / Starlight Aura */}
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-[#F5D778]/35 filter blur-3xl pointer-events-none animate-glow" />

        {/* Floating Fireflies & Ambient Seeds */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full bg-[#F5D778] shadow-[0_0_12px_#F5D778]"
              animate={{
                x: [15 + i * 45, 35 + i * 45, 15 + i * 45],
                y: [20 + (i % 4) * 55, 5 + (i % 4) * 55, 20 + (i % 4) * 55],
                opacity: [0.2, 0.95, 0.2],
                scale: [0.8, 1.4, 0.8],
              }}
              transition={{
                duration: 3.5 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Swaying Branch foliage at corners */}
          <div className="absolute -top-3 -left-3 text-5xl sm:text-7xl text-[#6FA887]/20 select-none animate-sway">
            🌿
          </div>
          <div className="absolute -top-4 -right-4 text-6xl sm:text-8xl text-[#6FA887]/15 select-none animate-sway" style={{ animationDelay: "1.5s" }}>
            🍃
          </div>
        </div>

        {/* Left Hero Content */}
        <div className="relative z-10 max-w-lg space-y-4 text-center md:text-left">
          {/* Eyecatching Gold Foil Pill */}
          <div className="inline-flex items-center gap-2 bg-[#FFFDF7] border-2 border-[#F5D778] px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-[#E76F42] animate-spin" style={{ animationDuration: "7s" }} />
            <span className="text-xs sm:text-sm font-fredoka font-bold text-[#63452E] uppercase tracking-wider">
              {language === "ta"
                ? "சிறிது வாசிப்போம். பெரிதாக கற்பனை செய்வோம்."
                : "Read a little. Imagine a lot."}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-fredoka text-[#63452E] leading-[1.14] tracking-tight">
            {language === "ta" ? (
              <>
                ஒரு மாயாஜால <span className="text-[#6FA887] drop-shadow-xs">கதைத் தோட்டம்.</span>
              </>
            ) : (
              <>
                Step into a magical <span className="text-[#6FA887] drop-shadow-xs">story garden.</span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-[#63452E]/85 leading-relaxed font-medium">
            {language === "ta"
              ? "பிப் நரியுடன் காட்டு சாகசங்களை வாசித்து மகிழுங்கள்! பக்கங்களை புரட்டி, ஒளிரும் நட்சத்திரங்களை தொட்டு, கதை தோட்டத்தில் மலர்களை மலரச் செய்யுங்கள்."
              : "Join Pip the friendly fox on gentle illustrated adventures! Turn real pages, tap sparkling creatures, listen along to narration in English or Tamil, and bloom keepsake flowers in your garden."}
          </p>

          {/* Chunky 3D Action Buttons (Eye-Catching!) */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => {
                soundEffects.playTap();
                onStartReading(featuredStory);
              }}
              className="btn-chunky-green text-sm sm:text-base px-8 sm:px-10 py-4 flex items-center gap-2.5 cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              <span>
                {hasProgress
                  ? language === "ta"
                    ? "தொடர்ந்து வாசிக்கவும்"
                    : "Continue Reading"
                  : language === "ta"
                  ? "வாசிக்கலாம் வாருங்கள்!"
                  : "Let's Read!"}
              </span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                soundEffects.playTap();
                onOpenCharacters();
              }}
              className="btn-chunky-white text-xs sm:text-sm px-6 py-4 flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#6FA887]" />
              <span>{language === "ta" ? "நண்பர்களைச் சந்திக்கவும்" : "Meet Friends"}</span>
            </button>
          </div>

          {/* Resume Progress Card */}
          {hasProgress && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 p-3.5 sm:p-4 bg-[#FFFDF7] rounded-3xl border-2 border-[#F5D778] shadow-sm flex items-center justify-between gap-3 text-left"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl sm:text-4xl">📖</span>
                <div>
                  <p className="text-xs sm:text-sm font-fredoka font-bold text-[#63452E]">
                    {language === "ta" ? "கதையை தொடருங்கள்" : "Resume your story"}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#63452E]/70 font-semibold">
                    {language === "ta" ? featuredStory.titleTa : featuredStory.title} •{" "}
                    {language === "ta"
                      ? `பக்கம் ${progress.currentPage} / ${featuredStory.totalPages}`
                      : `Page ${progress.currentPage} of ${featuredStory.totalPages}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  soundEffects.playTap();
                  onStartReading(featuredStory);
                }}
                className="btn-chunky-yellow text-xs px-4 py-2 cursor-pointer shrink-0"
              >
                {language === "ta" ? "தொடர்க →" : "Resume →"}
              </button>
            </motion.div>
          )}
        </div>

        {/* Right Hero Visual: Magical Tree & Pip */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            {/* Glowing yellow sun disk */}
            <div className="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-[#F5D778]/30 filter blur-xl animate-float" />

            {/* Tree Foliage */}
            <svg
              width="260"
              height="220"
              viewBox="0 0 240 200"
              fill="none"
              className="absolute -top-12 sm:-top-16 pointer-events-none opacity-45 w-52 sm:w-72 h-auto"
            >
              <circle cx="120" cy="80" r="70" fill="#6FA887" />
              <circle cx="70" cy="90" r="50" fill="#A9D9B8" />
              <circle cx="170" cy="90" r="50" fill="#6FA887" />
              <rect x="110" y="140" width="20" height="60" rx="6" fill="#63452E" />
            </svg>

            {/* Pip the Fox */}
            <div className="relative pt-6 sm:pt-8">
              <PipCharacter
                size="responsive"
                interactive={true}
                speechText={language === "ta" ? "வணக்கம்! என்னுடன் வாசிக்க வாருங்கள்!" : undefined}
              />
            </div>
          </div>

          <div className="mt-3 bg-[#FFFDF7]/95 px-4 py-1.5 rounded-full text-xs font-fredoka font-bold text-[#63452E] border-2 border-[#E5DFCD] shadow-sm flex items-center gap-1.5">
            <span className="text-[#E76F42]">✦</span>
            <span>{language === "ta" ? "பிப்பைத் தொட்டு பேசக் கேளுங்கள்!" : "Tap Pip to say hello!"}</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          Featured Story Spotlight Shelf
      ======================================================== */}
      <section className="w-full max-w-5xl space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <span className="text-xs font-fredoka font-bold uppercase tracking-wider text-[#6FA887]">
              {language === "ta" ? "சிறப்பு கதை" : "Storybook Meadow"}
            </span>
            <h3 className="text-xl sm:text-2xl font-fredoka font-bold text-[#63452E]">
              {language === "ta" ? "இரவு & விளையாட்டு கதைகள்" : "Bedtime & Playtime Stories"}
            </h3>
          </div>
          <button
            onClick={() => {
              soundEffects.playTap();
              onOpenLibrary();
            }}
            className="text-xs sm:text-sm font-fredoka font-bold text-[#6FA887] hover:text-[#5D9474] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>{language === "ta" ? "அனைத்து கதைகள்" : "See all stories"}</span>
            <span>→</span>
          </button>
        </div>

        <div
          onClick={() => {
            soundEffects.playTap();
            onStartReading(featuredStory);
          }}
          className="bg-gradient-to-r from-[#FCECE9] via-[#FAF6EC] to-[#EAF5EE] border-3 border-[#F4B9B1] rounded-[32px] p-6 sm:p-8 shadow-md storybook-card-hover cursor-pointer flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-18 sm:w-22 h-18 sm:h-22 rounded-3xl bg-[#FFFDF7] border-2 border-[#F5D778] flex items-center justify-center text-4xl sm:text-5xl shadow-md shrink-0">
              🦊⭐
            </div>
            <div>
              <span className="text-[11px] sm:text-xs font-fredoka font-bold text-[#E76F42] uppercase tracking-wide">
                {language === "ta" ? "8-பக்கங்கள் கொண்ட கதை" : "Featured 8-Page Story"}
              </span>
              <h4 className="text-lg sm:text-2xl font-fredoka font-bold text-[#63452E]">
                {language === "ta" ? featuredStory.titleTa : featuredStory.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#63452E]/80 line-clamp-1 mt-1 font-medium">
                {language === "ta" ? featuredStory.subtitleTa : featuredStory.subtitle}
              </p>
            </div>
          </div>

          <button className="btn-chunky-green text-xs sm:text-sm px-7 py-3 shrink-0 cursor-pointer">
            {progress.isCompleted
              ? language === "ta"
                ? "மீண்டும் வாசிக்கவும்"
                : "Read Again"
              : language === "ta"
              ? "சாகசத்தை தொடங்கவும் →"
              : "Start Adventure →"}
          </button>
        </div>
      </section>
    </div>
  );
};
