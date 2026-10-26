"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { soundEffects } from "@/utils/soundEffects";

interface PipCharacterProps {
  size?: "sm" | "md" | "lg" | "xl" | "responsive";
  state?: "idle" | "happy" | "waving" | "sleeping";
  interactive?: boolean;
  onTap?: () => void;
  className?: string;
  speechText?: string;
}

const PIP_GREETINGS = [
  "Hello little reader! ✦",
  "Ready for an adventure?",
  "I love exploring with you!",
  "Let's turn the page!",
  "You're doing great! ⭐",
];

export const PipCharacter: React.FC<PipCharacterProps> = ({
  size = "md",
  state = "idle",
  interactive = true,
  onTap,
  className = "",
  speechText,
}) => {
  const [isWagging, setIsWagging] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [currentSpeech, setCurrentSpeech] = useState<string | null>(speechText || null);
  const [speechTimer, setSpeechTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (speechText) {
      setCurrentSpeech(speechText);
    }
  }, [speechText]);

  const sizeClasses = {
    sm: "w-20 sm:w-24 h-24 sm:h-28",
    md: "w-32 sm:w-40 h-36 sm:h-44",
    lg: "w-44 sm:w-52 h-48 sm:h-56",
    xl: "w-52 sm:w-64 md:w-72 h-56 sm:h-72 md:h-80",
    responsive: "w-full max-w-[240px] sm:max-w-[280px] h-auto aspect-[200/220]",
  }[size];

  const handleInteraction = () => {
    if (!interactive) return;
    setIsWagging(true);
    setShowHearts(true);
    soundEffects.playPipTail();

    // Show a whimsical speech bubble
    const randomGreeting = PIP_GREETINGS[Math.floor(Math.random() * PIP_GREETINGS.length)];
    setCurrentSpeech(randomGreeting);

    if (speechTimer) clearTimeout(speechTimer);
    const timer = setTimeout(() => {
      if (!speechText) setCurrentSpeech(null);
    }, 3200);
    setSpeechTimer(timer);

    if (onTap) onTap();

    setTimeout(() => {
      setIsWagging(false);
    }, 1200);

    setTimeout(() => {
      setShowHearts(false);
    }, 1800);
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none ${
        interactive ? "cursor-pointer group" : ""
      } ${className}`}
      onClick={handleInteraction}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label="Pip the curious friendly fox. Tap to interact!"
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleInteraction();
        }
      }}
    >
      {/* Whimsical Pip Speech Bubble */}
      <AnimatePresence>
        {currentSpeech && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.85 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="absolute -top-12 sm:-top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap"
          >
            <div className="bg-[#FFFDF7] text-[#63452E] font-fredoka font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-2xl shadow-md border-2 border-[#F5D778] flex items-center gap-1.5 relative">
              <span>{currentSpeech}</span>
              {/* Speech bubble beak */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-[#F5D778]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts & Stars on Tap */}
      {showHearts && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none flex gap-2 z-20">
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -30, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl text-[#F4B9B1]"
          >
            ♥
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -45, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="text-2xl text-[#F5D778]"
          >
            ✦
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -25, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-lg text-[#F4B9B1]"
          >
            ♥
          </motion.span>
        </div>
      )}

      {/* Pip Fox Handcrafted SVG */}
      <motion.svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={
          isWagging || state === "happy"
            ? { y: [0, -8, 0, -4, 0] }
            : { y: [0, -3.5, 0] }
        }
        transition={{
          repeat: isWagging ? 0 : Infinity,
          duration: isWagging ? 0.6 : 3.5,
          ease: "easeInOut",
        }}
        className={`${sizeClasses} overflow-visible filter drop-shadow-md`}
      >
        {/* Soft Organic Shadow */}
        <ellipse cx="100" cy="205" rx="55" ry="10" fill="#63452E" fillOpacity="0.12" />

        {/* Bushy Fox Tail with White Tip & Dynamic Wag */}
        <motion.g
          animate={
            isWagging || state === "happy"
              ? { rotate: [-24, 26, -24, 20, 0] }
              : { rotate: [-3, 5, -3] }
          }
          transition={{
            repeat: isWagging ? 0 : Infinity,
            duration: isWagging ? 0.42 : 2.8,
            ease: "easeInOut",
          }}
          style={{ originX: "65px", originY: "180px" }}
        >
          {/* Main orange tail body */}
          <path
            d="M55 170 C20 175, -5 140, 10 100 C20 70, 50 65, 75 90 C85 105, 80 145, 55 170 Z"
            fill="#E76F42"
          />
          {/* White fluffy tail tip */}
          <path
            d="M10 100 C15 80, 35 70, 50 78 C35 95, 25 110, 10 100 Z"
            fill="#FFF7E8"
          />
        </motion.g>

        {/* Pip Body */}
        <path
          d="M60 140 C55 185, 65 200, 100 200 C135 200, 145 185, 140 140 C138 120, 62 120, 60 140 Z"
          fill="#E76F42"
        />

        {/* Pip White Chest / Bib */}
        <path
          d="M75 140 C75 175, 90 190, 100 190 C110 190, 125 175, 125 140 C115 148, 85 148, 75 140 Z"
          fill="#FFF7E8"
        />

        {/* Pip Front Paws with cute pads */}
        <ellipse cx="82" cy="195" rx="10" ry="7" fill="#63452E" fillOpacity="0.85" />
        <ellipse cx="118" cy="195" rx="10" ry="7" fill="#63452E" fillOpacity="0.85" />

        {/* Pip Head Group */}
        <motion.g
          animate={{ rotate: isWagging ? [-3, 3, -2, 2, 0] : [0, 2, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "100px", originY: "120px" }}
        >
          {/* Left Fox Ear */}
          <motion.g
            animate={{ rotate: isWagging ? [-6, 6, 0] : [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "65px", originY: "70px" }}
          >
            <path d="M50 75 L68 15 L95 62 Z" fill="#E76F42" />
            <path d="M58 68 L70 28 L88 60 Z" fill="#F4B9B1" />
          </motion.g>

          {/* Right Fox Ear */}
          <motion.g
            animate={{ rotate: isWagging ? [6, -6, 0] : [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originX: "135px", originY: "70px" }}
          >
            <path d="M150 75 L132 15 L105 62 Z" fill="#E76F42" />
            <path d="M142 68 L130 28 L112 60 Z" fill="#F4B9B1" />
          </motion.g>

          {/* Main Face Contour */}
          <path
            d="M48 95 C45 135, 78 145, 100 145 C122 145, 155 135, 152 95 C150 62, 50 62, 48 95 Z"
            fill="#E76F42"
          />

          {/* White Cheeks Mask */}
          <path
            d="M52 108 C65 142, 85 145, 100 135 C115 145, 135 142, 148 108 C135 95, 115 110, 100 110 C85 110, 65 95, 52 108 Z"
            fill="#FFF7E8"
          />

          {/* Rosy Cheeks */}
          <circle cx="68" cy="115" r="9" fill="#F4B9B1" fillOpacity="0.8" />
          <circle cx="132" cy="115" r="9" fill="#F4B9B1" fillOpacity="0.8" />

          {/* Eyes with Gentle Blinking */}
          {state === "sleeping" ? (
            <>
              <path
                d="M74 100 Q81 106 88 100"
                stroke="#63452E"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M112 100 Q119 106 126 100"
                stroke="#63452E"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <motion.g
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  times: [0, 0.9, 0.94, 0.97, 1],
                }}
                style={{ originX: "81px", originY: "98px" }}
              >
                <circle cx="81" cy="98" r="7.5" fill="#63452E" />
                <circle cx="78.5" cy="95" r="2.8" fill="#FFF7E8" />
                <circle cx="83.5" cy="100.5" r="1.2" fill="#FFF7E8" />
              </motion.g>

              {/* Right Eye */}
              <motion.g
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  times: [0, 0.9, 0.94, 0.97, 1],
                }}
                style={{ originX: "119px", originY: "98px" }}
              >
                <circle cx="119" cy="98" r="7.5" fill="#63452E" />
                <circle cx="116.5" cy="95" r="2.8" fill="#FFF7E8" />
                <circle cx="121.5" cy="100.5" r="1.2" fill="#FFF7E8" />
              </motion.g>
            </>
          )}

          {/* Cute Button Fox Nose */}
          <ellipse cx="100" cy="115" rx="5.5" ry="4" fill="#63452E" />

          {/* Friendly Smiling Mouth */}
          <path
            d="M94 122 Q100 127 106 122"
            stroke="#63452E"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </motion.g>
      </motion.svg>
    </div>
  );
};
