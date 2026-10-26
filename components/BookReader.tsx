"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Story, StoryPageData, StoryLanguage } from "@/types/story";
import { InteractiveScene } from "./InteractiveScene";
import { AudioControls } from "./AudioControls";
import { PageNavigation } from "./PageNavigation";
import { useNarration } from "@/hooks/useNarration";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import { soundEffects } from "@/utils/soundEffects";
import {
  X,
  Sparkles,
  BookOpen,
  ArrowRight,
  Maximize2,
  Minimize2,
  Globe,
  Moon,
  Sun,
  Compass,
} from "lucide-react";

interface BookReaderProps {
  story: Story;
  initialLanguage?: StoryLanguage;
  onClose: () => void;
  onOpenGarden: () => void;
  reducedMotion?: boolean;
}

export const BookReader: React.FC<BookReaderProps> = ({
  story,
  initialLanguage = "en",
  onClose,
  onOpenGarden,
  reducedMotion = false,
}) => {
  const { progress, updatePage, recordInteraction } = useReadingProgress(story.id);

  const [currentPage, setCurrentPage] = useState<number>(() => {
    if (progress.currentPage > 0 && progress.currentPage <= story.totalPages) {
      return progress.currentPage;
    }
    return 1;
  });

  const [language, setLanguage] = useState<StoryLanguage>(initialLanguage);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [bedtimeMode, setBedtimeMode] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState(false);
  const [choiceFeedback, setChoiceFeedback] = useState<string | null>(null);

  const narration = useNarration();
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const pageData: StoryPageData =
    story.pages[currentPage - 1] || story.pages[0];

  // Stop narration on page change to prevent overlapping audio
  useEffect(() => {
    narration.stop();
    setChoiceFeedback(null);
    updatePage(currentPage, currentPage === story.totalPages);
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNextPage = useCallback(() => {
    if (currentPage < story.totalPages) {
      setDirection(1);
      soundEffects.playPageFlip();
      setCurrentPage((prev) => prev + 1);
    } else {
      updatePage(currentPage, true);
      soundEffects.playCelebration();
      setShowCompletionOverlay(true);
    }
  }, [currentPage, story.totalPages, updatePage]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setDirection(-1);
      soundEffects.playPageFlip();
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNextPage();
      } else if (e.key === "ArrowLeft") {
        handlePreviousPage();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextPage, handlePreviousPage, onClose]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handleNextPage();
      } else {
        handlePreviousPage();
      }
    }
    touchStartX.current = null;
  };

  const currentTitle = language === "ta" && pageData.titleTa ? pageData.titleTa : pageData.title;
  const currentText = language === "ta" && pageData.textTa ? pageData.textTa : pageData.text;
  const currentPrompt =
    language === "ta" && pageData.interactionPromptTa
      ? pageData.interactionPromptTa
      : pageData.interactionPrompt;
  const currentHint =
    language === "ta" && pageData.interactionHintTa
      ? pageData.interactionHintTa
      : pageData.interactionHint;

  const handleStartNarration = () => {
    const fullText = `${currentTitle}. ${currentText} ${currentPrompt}`;
    narration.speak(fullText, language);
  };

  const toggleSoundEffects = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundEffects.setMuted(!nextState);
  };

  const toggleLanguage = () => {
    soundEffects.playTap();
    narration.stop();
    setLanguage((prev) => (prev === "en" ? "ta" : "en"));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleChoosePath = (choice: { label: string; labelTa: string; response: string; responseTa: string }) => {
    soundEffects.playStarGlow();
    const responseText = language === "ta" ? choice.responseTa : choice.response;
    setChoiceFeedback(responseText);
    narration.speak(responseText, language);
  };

  const storyWords = currentText.split(/\s+/);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 select-none overflow-y-auto transition-colors duration-500 ${
        bedtimeMode ? "bg-[#10171E]/85 backdrop-blur-md" : "bg-[#322318]/75 backdrop-blur-md"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${story.title} Story Reader`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Outer Storybook Cover Framing with Gold Foil Corners */}
      <div
        className={`relative w-full max-w-5xl p-2 sm:p-3.5 md:p-4 rounded-[32px] sm:rounded-[40px] shadow-2xl border-4 transition-colors duration-500 flex flex-col max-h-[96vh] overflow-hidden ${
          bedtimeMode
            ? "bg-[#203244] border-[#F5D778]"
            : "bg-[#5A8E72] border-[#F5D778]"
        }`}
      >
        {/* Decorative Silk Ribbon Bookmark */}
        <div className="ribbon-bookmark hidden sm:block" title="Reading Bookmark" />

        {/* Top Header Controls Bar */}
        <div
          className={`flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 rounded-2xl border-b mb-2 sm:mb-3 shadow-xs transition-colors duration-300 ${
            bedtimeMode
              ? "bg-[#18232C] border-[#3B5466] text-[#FFF7E8]"
              : "bg-[#FFFDF7] border-[#E5DFCD] text-[#63452E]"
          }`}
        >
          {/* Story Badge & Title */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <span className="p-1.5 rounded-full bg-[#F5D778]/30 text-[#63452E]">
              <BookOpen className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-xs sm:text-base font-fredoka font-bold leading-tight">
                {language === "ta" ? story.titleTa : story.title}
              </h2>
              <p className="text-[10px] sm:text-[11px] opacity-75 font-semibold hidden xs:block">
                {story.theme}
              </p>
            </div>
          </div>

          {/* Central Controls: Narration + Bilingual Language Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <AudioControls
              isSpeaking={narration.isSpeaking}
              isPaused={narration.isPaused}
              onPlay={handleStartNarration}
              onPause={narration.pause}
              onResume={narration.resume}
              onReplay={handleStartNarration}
              soundEffectsEnabled={soundEnabled}
              onToggleSoundEffects={toggleSoundEffects}
            />

            {/* Language Toggle Button (English / தமிழ்) */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF7E8] text-[#63452E] font-fredoka font-bold text-xs border border-[#E5DFCD] shadow-2xs hover:bg-[#F5D778]/30 transition-all cursor-pointer"
              aria-label="Switch story language between English and Tamil"
              title="Switch language: English / தமிழ்"
            >
              <Globe className="w-3.5 h-3.5 text-[#6FA887]" />
              <span>{language === "en" ? "EN 🇬🇧" : "தமிழ் 🇱🇰"}</span>
            </button>
          </div>

          {/* Action Buttons: Bedtime, Fullscreen, Close */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                soundEffects.playTap();
                setBedtimeMode((prev) => !prev);
              }}
              className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
                bedtimeMode
                  ? "bg-[#F5D778] text-[#18232C]"
                  : "text-[#63452E]/70 hover:bg-[#FFF7E8]"
              }`}
              aria-label={bedtimeMode ? "Turn off bedtime mode" : "Turn on bedtime mode"}
              title="Bedtime Mode"
            >
              {bedtimeMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 sm:p-2 rounded-full opacity-70 hover:opacity-100 transition-all hidden md:flex cursor-pointer"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => {
                soundEffects.playTap();
                narration.stop();
                onClose();
              }}
              className="p-1.5 sm:p-2 rounded-full hover:bg-[#F4B9B1]/40 active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#6FA887] cursor-pointer"
              aria-label="Close story reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================
            Realistic 3D Storybook Open Spread Container
        ======================================================== */}
        <div
          className={`relative flex-1 p-2 sm:p-4 md:p-6 overflow-y-auto flex items-center justify-center rounded-2xl sm:rounded-3xl border shadow-inner transition-colors duration-300 ${
            bedtimeMode
              ? "bg-[#14202B] border-[#2A3E50] text-[#FFF7E8]"
              : "bg-[#FFFDF7] border-[#E5DFCD] text-[#63452E]"
          }`}
        >
          {/* Realistic Center Book Spine Shadow (Visible on tablets & desktop) */}
          <div className="absolute top-0 bottom-0 left-1/2 w-10 -translate-x-1/2 pointer-events-none hidden md:block book-spine-gradient z-30" />

          {/* Animated Page Spread */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${currentPage}-${language}`}
              initial={
                reducedMotion
                  ? { opacity: 0 }
                  : {
                      rotateY: direction === 1 ? -30 : 30,
                      opacity: 0.35,
                      transformPerspective: 1200,
                    }
              }
              animate={
                reducedMotion
                  ? { opacity: 1 }
                  : { rotateY: 0, opacity: 1, transformPerspective: 1200 }
              }
              exit={
                reducedMotion
                  ? { opacity: 0 }
                  : {
                      rotateY: direction === 1 ? 30 : -30,
                      opacity: 0.35,
                      transformPerspective: 1200,
                    }
              }
              transition={{ duration: reducedMotion ? 0.2 : 0.42, ease: "easeOut" }}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 items-center"
            >
              {/* Left Page (Interactive Scene) */}
              <div className="w-full flex flex-col items-center">
                <InteractiveScene
                  pageNumber={currentPage}
                  sceneType={pageData.sceneType}
                  onInteractionTriggered={() => recordInteraction(currentPage)}
                  hasInteracted={progress.interactionsDiscovered.includes(currentPage)}
                  reducedMotion={reducedMotion}
                />
              </div>

              {/* Right Page (Storybook Typography & Read-Along) */}
              <div className="flex flex-col justify-between h-full space-y-3 sm:space-y-4 px-1 sm:px-3">
                <div>
                  {/* Page Title & Chapter Tag */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] sm:text-xs font-fredoka font-bold uppercase tracking-wider text-[#6FA887] bg-[#A9D9B8]/25 px-2.5 py-0.5 rounded-full border border-[#6FA887]/30">
                      {language === "ta" ? `பக்கம் ${pageData.pageNumber}` : `Page ${pageData.pageNumber}`}
                    </span>
                    <h3 className="text-base sm:text-lg md:text-xl font-fredoka font-bold">
                      {currentTitle}
                    </h3>
                  </div>

                  {/* Story Text with Drop-Cap and Live Word Highlighting */}
                  <div
                    className={`text-base sm:text-lg md:text-xl leading-relaxed font-medium my-2 sm:my-3 p-4 rounded-2xl border shadow-xs storybook-dropcap ${
                      bedtimeMode
                        ? "bg-[#1A2938] border-[#2A3E50]"
                        : "bg-[#FFF7E8] border-[#E5DFCD]"
                    }`}
                  >
                    <p>
                      {storyWords.map((word, wIdx) => {
                        const isCurrentWord =
                          narration.isSpeaking &&
                          narration.highlightedWordIndex === wIdx;

                        return (
                          <span
                            key={wIdx}
                            className={`inline-block mr-1.5 transition-all rounded px-1 ${
                              isCurrentWord
                                ? "bg-[#F5D778] text-[#63452E] font-extrabold scale-110 shadow-xs"
                                : ""
                            }`}
                          >
                            {word}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>

                {/* Optional Story Choice Moment (Page 3) */}
                {pageData.choices && (
                  <div className="p-3 rounded-2xl bg-[#F5D778]/15 border-2 border-[#F5D778] space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-fredoka font-bold text-[#E76F42]">
                      <Compass className="w-4 h-4" />
                      <span>{language === "ta" ? "உங்கள் பாதையைத் தேர்ந்தெடுங்கள்:" : "Choose Pip's Path:"}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      {pageData.choices.map((choice) => (
                        <button
                          key={choice.id}
                          onClick={() => handleChoosePath(choice)}
                          className="flex-1 bg-[#FFFDF7] hover:bg-[#FFF7E8] text-[#63452E] font-fredoka font-bold text-xs p-2.5 rounded-xl border border-[#E5DFCD] shadow-2xs hover:border-[#6FA887] active:scale-95 transition-all cursor-pointer text-left"
                        >
                          ✦ {language === "ta" ? choice.labelTa : choice.label}
                        </button>
                      ))}
                    </div>

                    {choiceFeedback && (
                      <p className="text-xs text-[#6FA887] font-bold italic pt-1 animate-fadeIn">
                        &ldquo;{choiceFeedback}&rdquo;
                      </p>
                    )}
                  </div>
                )}

                {/* Tactile Tap-To-Discover Prompt */}
                <div
                  className={`border-2 border-dashed rounded-2xl p-3 sm:p-3.5 flex items-start gap-2.5 sm:gap-3 ${
                    bedtimeMode
                      ? "bg-[#1E2E3E] border-[#6FA887]/50"
                      : "bg-[#A9D9B8]/20 border-[#6FA887]"
                  }`}
                >
                  <div className="p-2 rounded-xl bg-[#6FA887] text-white shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: "8s" }} />
                  </div>
                  <div>
                    <h4 className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wide text-[#6FA887]">
                      {language === "ta" ? "கண்டுபிடித்து தொடவும்" : "Discover & Tap"}
                    </h4>
                    <p className="text-xs sm:text-sm font-bold">
                      {currentPrompt}
                    </p>
                    {currentHint && (
                      <p className="text-[10px] sm:text-[11px] opacity-75 mt-0.5 font-medium">
                        {currentHint}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Bar */}
        <div
          className={`px-3 sm:px-6 py-2.5 sm:py-3 mt-2 sm:mt-3 rounded-2xl border-t shadow-xs transition-colors duration-300 ${
            bedtimeMode
              ? "bg-[#18232C] border-[#3B5466]"
              : "bg-[#FFFDF7] border-[#E5DFCD]"
          }`}
        >
          <PageNavigation
            currentPage={currentPage}
            totalPages={story.totalPages}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
            onSelectPage={(pageNum) => {
              setDirection(pageNum > currentPage ? 1 : -1);
              setCurrentPage(pageNum);
            }}
          />
        </div>
      </div>

      {/* Story Completion Celebration Modal */}
      <AnimatePresence>
        {showCompletionOverlay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-[#FFF7E8] rounded-3xl p-6 sm:p-8 max-w-md w-full border-4 border-[#F5D778] shadow-2xl text-center space-y-4">
              <motion.div
                animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.25, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-6xl mx-auto"
              >
                🌸
              </motion.div>
              <h3 className="text-2xl sm:text-3xl font-fredoka font-bold text-[#63452E]">
                {language === "ta" ? "அற்புதம்! கதை முடிந்தது!" : "Wonderful Reading!"}
              </h3>
              <p className="text-xs sm:text-sm text-[#63452E]/80 font-medium">
                {language === "ta" ? (
                  <>
                    நீங்கள் <span className="font-bold">{story.titleTa}</span> கதையை வாசித்து முடித்துவிட்டீர்கள்!
                    உங்கள் தோட்டத்தில் ஒரு புதிய <span className="font-bold text-[#6FA887]">அன்பு நட்சத்திர மலர்</span> மலர்ந்துள்ளது.
                  </>
                ) : (
                  <>
                    You finished <span className="font-bold">{story.title}</span>!
                    A new blooming <span className="font-bold text-[#6FA887]">Kindness Starflower</span> has sprouted in your garden.
                  </>
                )}
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={() => {
                    soundEffects.playTap();
                    setShowCompletionOverlay(false);
                    onOpenGarden();
                  }}
                  className="flex-1 bg-[#6FA887] text-white font-extrabold py-3 px-4 rounded-full shadow hover:bg-[#5D9474] flex items-center justify-center gap-2 active:scale-95 transition-all text-sm cursor-pointer"
                >
                  <span>{language === "ta" ? "தோட்டத்திற்குச் செல்லவும்" : "Visit My Garden"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    soundEffects.playTap();
                    setShowCompletionOverlay(false);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-3 bg-[#FFFDF7] border border-[#E5DFCD] rounded-full text-[#63452E] font-bold text-xs sm:text-sm hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
                >
                  {language === "ta" ? "மீண்டும் வாசிக்கவும்" : "Read Again"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
