"use client";

import React, { useState, useEffect } from "react";
import { FriendlyNavigation } from "@/components/FriendlyNavigation";
import { BookReader } from "@/components/BookReader";
import { HomePage } from "@/views/HomePage";
import { StoriesPage } from "@/views/StoriesPage";
import { CharactersPage } from "@/views/CharactersPage";
import { MyGardenPage } from "@/views/MyGardenPage";
import { PIP_LOST_STAR_STORY } from "@/data/pipLostStar";
import { Story, StoryLanguage } from "@/types/story";
import { soundEffects } from "@/utils/soundEffects";
import { Heart } from "lucide-react";

export default function Home() {
  const [currentView, setCurrentView] = useState<"home" | "library" | "characters" | "garden">("home");
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [language, setLanguage] = useState<StoryLanguage>("en");
  const [bedtimeMode, setBedtimeMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Check system preferences on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setReducedMotion(e.matches);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundEffects.setMuted(!next);
  };

  const handleToggleBedtime = () => {
    setBedtimeMode((prev) => !prev);
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ta" : "en"));
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-500 ${
        bedtimeMode
          ? "bg-[#18232C] text-[#FFF7E8]"
          : "bg-[#FFF7E8] text-[#63452E]"
      }`}
    >
      {/* Friendly Top Navigation */}
      <FriendlyNavigation
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        bedtimeMode={bedtimeMode}
        onToggleBedtime={handleToggleBedtime}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenBook={() => setActiveStory(PIP_LOST_STAR_STORY)}
      />

      {/* Main Page Content Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-4">
        {currentView === "home" && (
          <HomePage
            language={language}
            featuredStory={PIP_LOST_STAR_STORY}
            onStartReading={(story) => setActiveStory(story)}
            onOpenGarden={() => setCurrentView("garden")}
            onOpenLibrary={() => setCurrentView("library")}
            onOpenCharacters={() => setCurrentView("characters")}
          />
        )}

        {currentView === "library" && (
          <StoriesPage
            language={language}
            onOpenStory={(story) => setActiveStory(story)}
          />
        )}

        {currentView === "characters" && (
          <CharactersPage
            language={language}
            onReadStoryWithCharacter={() => setActiveStory(PIP_LOST_STAR_STORY)}
          />
        )}

        {currentView === "garden" && (
          <MyGardenPage
            onStartReading={(story) => setActiveStory(story)}
          />
        )}
      </main>

      {/* Interactive Story Reader Overlay (Signature Feature: The Living Book) */}
      {activeStory && (
        <BookReader
          story={activeStory}
          initialLanguage={language}
          onClose={() => setActiveStory(null)}
          onOpenGarden={() => {
            setActiveStory(null);
            setCurrentView("garden");
          }}
          reducedMotion={reducedMotion}
        />
      )}

      {/* Storybook Nursery Footer */}
      <footer className="w-full border-t border-[#E5DFCD] py-8 px-4 text-center mt-12 bg-[#FFFDF7]/65">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🌱</span>
            <span className="font-fredoka font-bold text-lg text-[#63452E]">
              StorySprout
            </span>
            <span className="text-xs bg-[#A9D9B8]/30 text-[#345B45] font-bold px-2.5 py-0.5 rounded-full">
              {language === "ta" ? "வயது 3–7" : "Ages 3–7"}
            </span>
          </div>

          <p className="text-xs text-[#63452E]/70 max-w-md mx-auto font-medium">
            {language === "ta"
              ? "சிறிது வாசிப்போம். பெரிதாக கற்பனை செய்வோம். அன்பு, தைரியம் மற்றும் நட்பை வளர்க்கும் கதை அனுபவம்."
              : "Read a little. Imagine a lot. Gentle interactive stories designed to nurture kindness, curiosity, and peaceful bedtime habits."}
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 text-xs font-fredoka font-bold text-[#6FA887] pt-2 flex-wrap">
            <button
              onClick={() => {
                soundEffects.playTap();
                setCurrentView("home");
              }}
              className="hover:underline cursor-pointer"
            >
              {language === "ta" ? "முகப்பு தோட்டம்" : "Home Garden"}
            </button>
            <span>•</span>
            <button
              onClick={() => {
                soundEffects.playTap();
                setCurrentView("library");
              }}
              className="hover:underline cursor-pointer"
            >
              {language === "ta" ? "கதை நூலகம்" : "Story Library"}
            </button>
            <span>•</span>
            <button
              onClick={() => {
                soundEffects.playTap();
                setCurrentView("characters");
              }}
              className="hover:underline cursor-pointer"
            >
              {language === "ta" ? "நண்பர்கள்" : "Meet Friends"}
            </button>
            <span>•</span>
            <button
              onClick={() => {
                soundEffects.playTap();
                setCurrentView("garden");
              }}
              className="hover:underline cursor-pointer"
            >
              {language === "ta" ? "என் தோட்டம்" : "My Garden"}
            </button>
          </div>

          <div className="text-[11px] text-[#63452E]/50 pt-2 flex items-center justify-center gap-1 font-semibold">
            <span>{language === "ta" ? "அன்புடன் உருவாக்கப்பட்டது" : "Made with"}</span>
            <Heart className="w-3 h-3 text-[#F4B9B1] fill-[#F4B9B1]" />
            <span>{language === "ta" ? "சிறிய சிந்தனையாளர்களுக்காக" : "for little dreamers"}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
