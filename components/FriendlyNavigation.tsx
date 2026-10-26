"use client";

import React from "react";
import { BookOpen, Flower2, Home, Moon, Sun, Volume2, VolumeX, Users, Globe } from "lucide-react";
import { soundEffects } from "@/utils/soundEffects";
import { StoryLanguage } from "@/types/story";

interface FriendlyNavigationProps {
  currentView: "home" | "library" | "characters" | "garden";
  onNavigate: (view: "home" | "library" | "characters" | "garden") => void;
  bedtimeMode: boolean;
  onToggleBedtime: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  language: StoryLanguage;
  onToggleLanguage: () => void;
  onOpenBook: () => void;
}

export const FriendlyNavigation: React.FC<FriendlyNavigationProps> = ({
  currentView,
  onNavigate,
  bedtimeMode,
  onToggleBedtime,
  soundEnabled,
  onToggleSound,
  language,
  onToggleLanguage,
  onOpenBook,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFF7E8]/95 backdrop-blur-md border-b border-[#E5DFCD] px-3 sm:px-6 md:px-8 py-2.5 sm:py-3 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => {
            soundEffects.playTap();
            onNavigate("home");
          }}
          className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none focus:ring-3 focus:ring-[#6FA887]/50 rounded-2xl p-1 group cursor-pointer"
          aria-label="StorySprout Home"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#6FA887] to-[#A9D9B8] flex items-center justify-center text-white shadow-md shadow-[#6FA887]/20 group-hover:scale-105 transition-transform">
            <span className="text-lg sm:text-2xl">🌱</span>
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold font-fredoka text-[#63452E] tracking-tight leading-none flex items-center gap-1.5">
              <span>StorySprout</span>
              <span className="text-[10px] hidden xs:inline bg-[#F5D778] text-[#63452E] px-1.5 py-0.2 rounded-full font-bold">
                Ages 3–7
              </span>
            </h1>
            <p className="text-[10px] sm:text-[11px] text-[#63452E]/70 font-semibold hidden sm:block">
              {language === "ta" ? "சிறிது வாசிப்போம். பெரிதாக கற்பனை செய்வோம்." : "Read a little. Imagine a lot."}
            </p>
          </div>
        </button>

        {/* Navigation Tabs (Desktop / Tablet) */}
        <nav
          className="hidden md:flex items-center gap-1 bg-[#FFFDF7] border-2 border-[#E5DFCD] p-1.5 rounded-full shadow-xs"
          aria-label="Main Navigation"
        >
          <button
            onClick={() => {
              soundEffects.playTap();
              onNavigate("home");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-fredoka font-bold transition-all cursor-pointer ${
              currentView === "home"
                ? "bg-[#6FA887] text-white shadow-xs"
                : "text-[#63452E] hover:bg-[#FFF7E8]"
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>{language === "ta" ? "முகப்பு" : "Home"}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playTap();
              onNavigate("library");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-fredoka font-bold transition-all cursor-pointer ${
              currentView === "library"
                ? "bg-[#6FA887] text-white shadow-xs"
                : "text-[#63452E] hover:bg-[#FFF7E8]"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === "ta" ? "நூலகம்" : "Library"}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playTap();
              onNavigate("characters");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-fredoka font-bold transition-all cursor-pointer ${
              currentView === "characters"
                ? "bg-[#6FA887] text-white shadow-xs"
                : "text-[#63452E] hover:bg-[#FFF7E8]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{language === "ta" ? "நண்பர்கள்" : "Characters"}</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playTap();
              onNavigate("garden");
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-fredoka font-bold transition-all cursor-pointer ${
              currentView === "garden"
                ? "bg-[#6FA887] text-white shadow-xs"
                : "text-[#63452E] hover:bg-[#FFF7E8]"
            }`}
          >
            <Flower2 className="w-3.5 h-3.5" />
            <span>{language === "ta" ? "தோட்டம்" : "My Garden"}</span>
          </button>
        </nav>

        {/* Global Controls: Language Toggle, Sound, Bedtime */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Toggle (English / தமிழ்) */}
          <button
            onClick={() => {
              soundEffects.playTap();
              onToggleLanguage();
            }}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FFFDF7] border-2 border-[#E5DFCD] text-xs font-fredoka font-bold text-[#63452E] hover:border-[#6FA887] transition-all cursor-pointer shadow-2xs"
            aria-label="Toggle language between English and Tamil"
            title="Toggle English / தமிழ்"
          >
            <Globe className="w-3.5 h-3.5 text-[#6FA887]" />
            <span>{language === "en" ? "EN 🇬🇧" : "தமிழ் 🇱🇰"}</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              soundEffects.playTap();
              onToggleSound();
            }}
            className={`p-2 rounded-full border-2 transition-all cursor-pointer ${
              soundEnabled
                ? "bg-[#FFFDF7] border-[#E5DFCD] text-[#6FA887] hover:bg-[#A9D9B8]/20"
                : "bg-gray-100 border-gray-200 text-gray-400"
            }`}
            aria-label={soundEnabled ? "Mute all sounds" : "Enable sound effects"}
            title={soundEnabled ? "Sound Effects ON" : "Sound MUTED"}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Bedtime Mode Toggle */}
          <button
            onClick={() => {
              soundEffects.playTap();
              onToggleBedtime();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-fredoka font-bold border-2 transition-all cursor-pointer ${
              bedtimeMode
                ? "bg-[#1C2C3D] border-[#3B5466] text-[#F5D778] shadow-sm"
                : "bg-[#FFFDF7] border-[#E5DFCD] text-[#63452E] hover:bg-[#FFF7E8]"
            }`}
            aria-label={bedtimeMode ? "Switch to daytime mode" : "Switch to bedtime mode"}
            aria-pressed={bedtimeMode}
          >
            {bedtimeMode ? (
              <>
                <Moon className="w-3.5 h-3.5 fill-[#F5D778]" />
                <span className="hidden xs:inline">Bedtime</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-[#E76F42]" />
                <span className="hidden xs:inline">Daytime</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Thumb Navigation (All 4 main tabs) */}
      <div className="md:hidden flex items-center justify-around pt-2 mt-2 border-t border-[#E5DFCD]/70">
        <button
          onClick={() => {
            soundEffects.playTap();
            onNavigate("home");
          }}
          className={`flex flex-col items-center py-1 text-xs font-fredoka font-bold ${
            currentView === "home" ? "text-[#6FA887]" : "text-[#63452E]/70"
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>{language === "ta" ? "முகப்பு" : "Home"}</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            onNavigate("library");
          }}
          className={`flex flex-col items-center py-1 text-xs font-fredoka font-bold ${
            currentView === "library" ? "text-[#6FA887]" : "text-[#63452E]/70"
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>{language === "ta" ? "நூலகம்" : "Stories"}</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            onNavigate("characters");
          }}
          className={`flex flex-col items-center py-1 text-xs font-fredoka font-bold ${
            currentView === "characters" ? "text-[#6FA887]" : "text-[#63452E]/70"
          }`}
        >
          <Users className="w-4 h-4 mb-0.5" />
          <span>{language === "ta" ? "நண்பர்கள்" : "Friends"}</span>
        </button>

        <button
          onClick={() => {
            soundEffects.playTap();
            onNavigate("garden");
          }}
          className={`flex flex-col items-center py-1 text-xs font-fredoka font-bold ${
            currentView === "garden" ? "text-[#6FA887]" : "text-[#63452E]/70"
          }`}
        >
          <Flower2 className="w-4 h-4 mb-0.5" />
          <span>{language === "ta" ? "தோட்டம்" : "Garden"}</span>
        </button>
      </div>
    </header>
  );
};
