"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { soundEffects } from "@/utils/soundEffects";
import { PipCharacter } from "./PipCharacter";
import { BunnyCharacter } from "./BunnyCharacter";
import { Sparkles, Star, Heart, CheckCircle2 } from "lucide-react";

interface InteractiveSceneProps {
  pageNumber: number;
  sceneType: string;
  onInteractionTriggered: () => void;
  hasInteracted: boolean;
  reducedMotion?: boolean;
}

export const InteractiveScene: React.FC<InteractiveSceneProps> = ({
  pageNumber,
  onInteractionTriggered,
  hasInteracted,
  reducedMotion = false,
}) => {
  // Local interaction trigger states
  const [leafWiggling, setLeafWiggling] = useState(false);
  const [starGlowing, setStarGlowing] = useState(false);
  const [pipTailWagging, setPipTailWagging] = useState(false);
  const [illuminatedFlowers, setIlluminatedFlowers] = useState<number[]>([]);
  const [twinklingStars, setTwinklingStars] = useState<number[]>([]);
  const [breezeSparkles, setBreezeSparkles] = useState(false);
  const [constellationActive, setConstellationActive] = useState(false);
  const [flowerBloomed, setFlowerBloomed] = useState(false);

  // Page 1: Leaf wiggle
  const handleLeafTap = () => {
    setLeafWiggling(true);
    soundEffects.playLeafRustle();
    onInteractionTriggered();
    setTimeout(() => setLeafWiggling(false), 900);
  };

  // Page 2: Star glow
  const handleStarGlowTap = () => {
    setStarGlowing(true);
    soundEffects.playStarGlow();
    onInteractionTriggered();
  };

  // Page 3: Pip tail wag
  const handlePipTap = () => {
    setPipTailWagging(true);
    soundEffects.playPipTail();
    onInteractionTriggered();
    setTimeout(() => setPipTailWagging(false), 1200);
  };

  // Page 4: Flower illuminate
  const handleFlowerTap = (flowerIndex: number) => {
    soundEffects.playFlowerGlow();
    setIlluminatedFlowers((prev) =>
      prev.includes(flowerIndex) ? prev : [...prev, flowerIndex]
    );
    onInteractionTriggered();
  };

  // Page 5: Star twinkle
  const handleStarTwinkleTap = (starIndex: number) => {
    soundEffects.playStarTwinkle();
    setTwinklingStars((prev) =>
      prev.includes(starIndex)
        ? prev.filter((i) => i !== starIndex)
        : [...prev, starIndex]
    );
    onInteractionTriggered();
  };

  // Page 6: Breeze sparkle
  const handleBreezeTap = () => {
    setBreezeSparkles(true);
    soundEffects.playBreezeSparkle();
    onInteractionTriggered();
    setTimeout(() => setBreezeSparkles(false), 2000);
  };

  // Page 7: Constellation
  const handleConstellationTap = () => {
    setConstellationActive(true);
    soundEffects.playConstellation();
    onInteractionTriggered();
  };

  // Page 8: Story complete flower bloom
  const handleCompletionTap = () => {
    setFlowerBloomed(true);
    soundEffects.playCelebration();
    onInteractionTriggered();

    if (!reducedMotion) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.65 },
          colors: ["#F5D778", "#F4B9B1", "#A9D9B8", "#B9B4E8", "#E76F42"],
        });
      } catch {}
    }
  };

  return (
    <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[370px] md:h-[420px] bg-gradient-to-b from-[#EAF5EE] via-[#FAF6EC] to-[#FFF7E8] rounded-3xl overflow-hidden border-2 border-[#E5DFCD] shadow-inner select-none flex items-center justify-center p-3 sm:p-5">
      {/* Ambient Forest Floating Fireflies */}
      {!reducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full bg-[#F5D778] shadow-[0_0_10px_#F5D778]"
              animate={{
                x: [15 + i * 45, 35 + i * 45, 15 + i * 45],
                y: [30 + (i % 3) * 60, 10 + (i % 3) * 60, 30 + (i % 3) * 60],
                opacity: [0.25, 0.9, 0.25],
                scale: [0.75, 1.25, 0.75],
              }}
              transition={{
                duration: 4 + i * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* ========================================================
          PAGE 1: A Spark in the Forest
          Interaction: Tap the leaf to make it wiggle
      ======================================================== */}
      {pageNumber === 1 && (
        <div className="relative w-full h-full flex items-end justify-between px-2 sm:px-6 pb-2 sm:pb-4">
          {/* Background hills & trees */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute bottom-0 left-0 right-0 h-28 bg-[#6FA887]/20 rounded-t-[60px]" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#6FA887]/30 rounded-t-[80px]" />
            <div className="absolute top-4 left-4 sm:left-8 opacity-30 select-none">
              <span className="text-4xl sm:text-5xl text-[#6FA887]">🌲</span>
            </div>
            <div className="absolute top-6 right-6 opacity-25 select-none hidden sm:block">
              <span className="text-3xl text-[#6FA887]">🌿</span>
            </div>
          </div>

          {/* Pip on left looking curiously */}
          <div className="z-10 pb-1 sm:pb-2">
            <PipCharacter size="sm" interactive={true} speechText="Look! What's under that leaf?" />
          </div>

          {/* Right side: Magical Leaf with hidden sparkle underneath */}
          <div className="relative z-20 flex flex-col items-center pb-2 sm:pb-4">
            {/* Hidden Little Star peeking under leaf */}
            <motion.div
              animate={
                leafWiggling || hasInteracted
                  ? { y: -24, opacity: 1, scale: 1.15 }
                  : { y: 0, opacity: 0.5, scale: 0.85 }
              }
              transition={{ type: "spring", stiffness: 220 }}
              className="absolute -top-7 text-[#F5D778] filter drop-shadow-[0_0_14px_#F5D778] pointer-events-none"
            >
              <Star className="w-10 h-10 sm:w-14 sm:h-14 fill-[#F5D778]" />
              <motion.div
                animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.9, 1.2, 0.9] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="absolute inset-0 bg-[#F5D778]/40 rounded-full blur-md"
              />
            </motion.div>

            {/* Tap-able Big Forest Fern / Leaf */}
            <motion.button
              onClick={handleLeafTap}
              animate={
                leafWiggling
                  ? { rotate: [-16, 16, -14, 14, 0], scale: [1, 1.12, 1] }
                  : { rotate: [-2, 2, -2] }
              }
              transition={{
                duration: leafWiggling ? 0.6 : 3,
                repeat: leafWiggling ? 0 : Infinity,
              }}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              className="relative focus:outline-none focus:ring-4 focus:ring-[#6FA887] rounded-full p-2 cursor-pointer touch-manipulation min-w-[70px] min-h-[70px] flex items-center justify-center"
              aria-label="Tap to wiggle the leaf and find the hidden sparkle"
            >
              <svg width="110" height="85" viewBox="0 0 120 90" fill="none" className="w-24 sm:w-28 h-auto">
                <path d="M60 85 C60 65, 55 40, 50 15" stroke="#345B45" strokeWidth="4" strokeLinecap="round" />
                <path d="M50 15 C30 25, 20 45, 55 50 C90 45, 80 25, 50 15 Z" fill="#6FA887" />
                <path d="M53 35 C35 48, 25 65, 57 70 C85 65, 75 48, 53 35 Z" fill="#A9D9B8" />
                <path d="M56 55 C40 68, 32 80, 58 85 C80 80, 72 68, 56 55 Z" fill="#6FA887" />
              </svg>

              {/* Tap Hand Prompt */}
              {!hasInteracted && !leafWiggling && (
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#FFF7E8] text-[#63452E] text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow border border-[#6FA887] flex items-center gap-1 whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 text-[#F5D778]" />
                  <span>Tap me!</span>
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 2: A Little Star
          Interaction: Tap the star to make it glow
      ======================================================== */}
      {pageNumber === 2 && (
        <div className="relative w-full h-full flex items-center justify-around px-3 sm:px-8">
          <div className="pt-2 sm:pt-4">
            <PipCharacter size="sm" state="idle" interactive={true} />
          </div>

          <div className="relative flex flex-col items-center">
            {/* Concentric Golden Glowing Aura */}
            <motion.div
              animate={
                starGlowing || hasInteracted
                  ? { scale: [1, 1.45, 1.25], opacity: [0.5, 0.95, 0.7] }
                  : { scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }
              }
              transition={{ duration: 2.2, repeat: Infinity }}
              className="absolute w-32 sm:w-44 h-32 sm:h-44 bg-[#F5D778] rounded-full blur-2xl pointer-events-none"
            />

            <motion.button
              onClick={handleStarGlowTap}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.94 }}
              animate={
                starGlowing || hasInteracted
                  ? { rotate: [0, 8, -8, 0], scale: 1.15 }
                  : { y: [0, -4, 0] }
              }
              transition={{ duration: 2.4, repeat: Infinity }}
              className="relative z-10 focus:outline-none focus:ring-4 focus:ring-[#F5D778] rounded-full p-2 sm:p-3 cursor-pointer min-w-[70px] min-h-[70px] flex items-center justify-center"
              aria-label="Tap the star to make it glow warmly"
            >
              <svg width="110" height="110" viewBox="0 0 110 110" fill="none" className="w-20 sm:w-28 h-auto">
                <path
                  d="M55 10 L68 40 L100 44 L76 67 L83 100 L55 83 L27 100 L34 67 L10 44 L42 40 Z"
                  fill="#F5D778"
                  stroke="#E5B942"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <circle cx="45" cy="58" r="4.5" fill="#F4B9B1" />
                <circle cx="65" cy="58" r="4.5" fill="#F4B9B1" />
                <circle cx="47" cy="52" r="3.5" fill="#63452E" />
                <circle cx="63" cy="52" r="3.5" fill="#63452E" />
                <path d="M51 60 Q55 64 59 60" stroke="#63452E" strokeWidth="2" strokeLinecap="round" />
              </svg>

              <div className="absolute -top-1 -right-1 text-[#F5D778]">
                <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: "6s" }} />
              </div>
            </motion.button>

            {/* Moss cushion */}
            <div className="w-28 sm:w-36 h-5 bg-[#6FA887]/30 rounded-full blur-xs mt-1" />

            {!hasInteracted && !starGlowing && (
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="mt-2 bg-[#FFF7E8] text-[#63452E] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow border border-[#F5D778] flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-[#F5D778]" />
                <span>Tap the star!</span>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 3: A Kind Promise
          Interaction: Tap Pip to animate his tail
      ======================================================== */}
      {pageNumber === 3 && (
        <div className="relative w-full h-full flex items-center justify-center gap-4 sm:gap-10 px-3 sm:px-6">
          <div className="relative flex flex-col items-center">
            <PipCharacter
              size="md"
              state={pipTailWagging || hasInteracted ? "happy" : "idle"}
              interactive={true}
              onTap={handlePipTap}
              speechText={pipTailWagging ? "I'll guide you home!" : "We can do it together!"}
            />

            {!hasInteracted && !pipTailWagging && (
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.3, repeat: Infinity }}
                className="mt-1 bg-[#FFF7E8] text-[#63452E] text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full shadow border border-[#E76F42] flex items-center gap-1"
              >
                <Heart className="w-3 h-3 text-[#F4B9B1] fill-[#F4B9B1]" />
                <span>Tap Pip&apos;s tail!</span>
              </motion.div>
            )}
          </div>

          <div className="flex flex-col items-center pb-4">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#F5D778] filter drop-shadow-[0_0_12px_#F5D778]"
            >
              <Star className="w-12 h-12 sm:w-16 sm:h-16 fill-[#F5D778]" />
            </motion.div>
            <span className="text-[11px] font-bold text-[#63452E]/70 mt-1 bg-white/70 px-2 py-0.5 rounded-full">
              Safe with Pip
            </span>
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 4: Follow the Flowers
          Interaction: Tap a flower to illuminate it
      ======================================================== */}
      {pageNumber === 4 && (
        <div className="relative w-full h-full flex items-end justify-between px-2 sm:px-6 pb-2 sm:pb-4">
          <div className="flex items-end gap-1.5 sm:gap-3 pb-1 z-10">
            <PipCharacter size="sm" interactive={false} />
            <BunnyCharacter size="sm" />
          </div>

          <div className="flex items-end gap-2 sm:gap-4 z-20 pb-1">
            {[
              { id: 0, name: "Buttercup", color: "#F5D778" },
              { id: 1, name: "Peach Blossom", color: "#F4B9B1" },
              { id: 2, name: "Mint Bell", color: "#A9D9B8" },
            ].map(({ id, name, color }) => {
              const isLit = illuminatedFlowers.includes(id);
              return (
                <motion.button
                  key={id}
                  onClick={() => handleFlowerTap(id)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  animate={isLit ? { y: [0, -6, 0], scale: 1.1 } : { y: 0 }}
                  transition={{ duration: 1.2, repeat: isLit ? Infinity : 0 }}
                  className="flex flex-col items-center focus:outline-none focus:ring-4 focus:ring-[#A9D9B8] rounded-full p-1.5 sm:p-2 cursor-pointer min-w-[55px] min-h-[55px]"
                  aria-label={`Tap ${name} to illuminate`}
                >
                  <div
                    className={`transition-all duration-500 rounded-full p-1 ${
                      isLit
                        ? "shadow-[0_0_24px_#A9D9B8] bg-white/80"
                        : "bg-transparent"
                    }`}
                  >
                    <svg width="44" height="54" viewBox="0 0 48 58" fill="none" className="w-8 sm:w-11 h-auto">
                      <path d="M24 56 C24 45, 22 35, 24 25" stroke="#6FA887" strokeWidth="3" />
                      <path d="M24 42 C16 40, 12 45, 14 50 C20 48, 22 46, 24 42 Z" fill="#6FA887" />
                      <circle cx="24" cy="18" r="8" fill={isLit ? color : "#E5DFCD"} />
                      <circle cx="16" cy="14" r="6" fill={isLit ? "#F4B9B1" : "#D5CFBD"} />
                      <circle cx="32" cy="14" r="6" fill={isLit ? "#F4B9B1" : "#D5CFBD"} />
                      <circle cx="18" cy="24" r="6" fill={isLit ? "#A9D9B8" : "#D5CFBD"} />
                      <circle cx="30" cy="24" r="6" fill={isLit ? "#A9D9B8" : "#D5CFBD"} />
                      <circle cx="24" cy="18" r="4.5" fill={isLit ? "#FFF7E8" : "#B8B09E"} />
                    </svg>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#63452E]/75 mt-0.5">
                    {isLit ? "✨ Glowing" : "Tap"}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 5: A Tall Hill
          Interaction: Tap stars to make them twinkle
      ======================================================== */}
      {pageNumber === 5 && (
        <div className="relative w-full h-full flex flex-col justify-between p-3 sm:p-5 overflow-hidden bg-gradient-to-b from-[#1C2C3D] to-[#3B5466] rounded-2xl text-[#FFF7E8]">
          {/* Crescent Moon */}
          <div className="absolute top-3 right-5 sm:right-8 text-[#F5D778] opacity-90">
            <svg width="40" height="40" viewBox="0 0 50 50">
              <path
                d="M40 25 C40 36 31 45 20 45 C14 45 9 42 5 38 C14 36 21 28 21 18 C21 11 17 5 12 1 C28 1 40 12 40 25 Z"
                fill="#F5D778"
              />
            </svg>
          </div>

          {/* Interactive Twinkling Stars in Sky */}
          <div className="relative w-full h-32 sm:h-44 z-10 flex items-center justify-around px-2 sm:px-6">
            {[0, 1, 2, 3, 4].map((starIdx) => {
              const isTwinkling = twinklingStars.includes(starIdx);
              return (
                <motion.button
                  key={starIdx}
                  onClick={() => handleStarTwinkleTap(starIdx)}
                  animate={
                    isTwinkling
                      ? { scale: [1, 1.5, 1.2], rotate: [0, 90, 180] }
                      : { scale: [0.9, 1.1, 0.9] }
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                  whileTap={{ scale: 1.4 }}
                  className="p-2 sm:p-3 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F5D778] rounded-full min-w-[48px] min-h-[48px] flex items-center justify-center"
                  aria-label={`Twinkle star ${starIdx + 1}`}
                >
                  <Star
                    className={`w-7 h-7 sm:w-9 sm:h-9 transition-colors ${
                      isTwinkling
                        ? "text-[#F5D778] fill-[#F5D778] filter drop-shadow-[0_0_14px_#F5D778]"
                        : "text-[#FFF7E8]/70 fill-[#FFF7E8]/40"
                    }`}
                  />
                </motion.button>
              );
            })}
          </div>

          <div className="relative z-20 flex items-end justify-between pt-1">
            <div className="flex items-end gap-2">
              <PipCharacter size="sm" interactive={false} />
              <BunnyCharacter size="sm" />
            </div>
            <div className="bg-[#FFF7E8]/20 backdrop-blur-xs px-3 py-1 rounded-full text-[11px] sm:text-xs text-[#FFF7E8] font-bold border border-[#FFF7E8]/30">
              Tap stars to chime!
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 6: A Helping Breeze
          Interaction: Tap the star to send sparkles upward
      ======================================================== */}
      {pageNumber === 6 && (
        <div className="relative w-full h-full flex flex-col justify-between p-3 sm:p-5 bg-gradient-to-b from-[#2B3E50] via-[#48637B] to-[#718DA2] rounded-2xl text-[#FFF7E8]">
          <div className="relative flex-1 flex flex-col items-center justify-center">
            <motion.button
              onClick={handleBreezeTap}
              animate={
                breezeSparkles || hasInteracted
                  ? { y: [-8, -45, -8], rotate: [0, 360], scale: 1.25 }
                  : { y: [0, -10, 0] }
              }
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              whileTap={{ scale: 1.2 }}
              className="relative p-3 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#F5D778] rounded-full min-w-[70px] min-h-[70px] flex items-center justify-center"
              aria-label="Tap the star to send sparkles upward into the breeze"
            >
              <Star className="w-14 h-14 sm:w-18 sm:h-18 text-[#F5D778] fill-[#F5D778] filter drop-shadow-[0_0_20px_#F5D778]" />

              <AnimatePresence>
                {breezeSparkles && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: -65 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                  >
                    <span className="text-2xl text-[#F5D778]">✦</span>
                    <span className="text-xl text-[#F4B9B1]">✧</span>
                    <span className="text-lg text-[#A9D9B8]">✦</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <span className="text-[10px] sm:text-xs font-bold text-[#F5D778] mt-2 bg-black/30 px-3 py-1 rounded-full">
              Tap the rising star!
            </span>
          </div>

          <div className="flex items-end justify-center gap-4 z-10">
            <PipCharacter size="sm" state="waving" interactive={false} />
            <BunnyCharacter size="sm" isWaving={true} />
          </div>
        </div>
      )}

      {/* ========================================================
          PAGE 7: Back Home
          Interaction: Tap the constellation to illuminate it
      ======================================================== */}
      {pageNumber === 7 && (
        <div className="relative w-full h-full flex flex-col items-center justify-center p-3 sm:p-5 bg-gradient-to-b from-[#0F1E2E] to-[#1C3247] rounded-2xl text-[#FFF7E8]">
          <motion.button
            onClick={handleConstellationTap}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 flex flex-col items-center cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#F5D778] rounded-2xl p-2 sm:p-4"
            aria-label="Tap to trace the fox constellation"
          >
            <svg width="260" height="170" viewBox="0 0 260 180" fill="none" className="w-56 sm:w-72 h-auto">
              <motion.path
                d="M40 90 L85 45 L130 90 L175 45 L220 90 L130 150 Z"
                stroke={constellationActive || hasInteracted ? "#F5D778" : "#FFF7E8"}
                strokeWidth={constellationActive || hasInteracted ? "3.5" : "1.5"}
                strokeDasharray={constellationActive || hasInteracted ? "none" : "4 4"}
                strokeOpacity={constellationActive || hasInteracted ? "0.95" : "0.4"}
              />
              <circle cx="40" cy="90" r="5" fill="#FFF7E8" />
              <circle cx="85" cy="45" r="5" fill="#FFF7E8" />
              <circle cx="175" cy="45" r="5" fill="#FFF7E8" />
              <circle cx="220" cy="90" r="5" fill="#FFF7E8" />
              <circle cx="130" cy="150" r="5" fill="#FFF7E8" />

              <g transform="translate(112, 72)">
                <path
                  d="M18 2 L22 12 L32 14 L24 22 L26 32 L18 27 L10 32 L12 22 L4 14 L14 12 Z"
                  fill="#F5D778"
                  className="filter drop-shadow-[0_0_12px_#F5D778]"
                />
              </g>
            </svg>

            <span className="mt-2 text-xs sm:text-sm font-bold text-[#F5D778] flex items-center gap-1.5 bg-black/35 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              {constellationActive || hasInteracted
                ? "Constellation Illuminated!"
                : "Tap constellation to trace!"}
            </span>
          </motion.button>
        </div>
      )}

      {/* ========================================================
          PAGE 8: A Kind Little Heart
          Interaction: Gentle completion animation & add flower to garden
      ======================================================== */}
      {pageNumber === 8 && (
        <div className="relative w-full h-full flex flex-col items-center justify-between p-3 sm:p-5 bg-gradient-to-b from-[#FFF7E8] via-[#FAF3DE] to-[#E9F3EC] rounded-2xl">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-[#6FA887] bg-[#A9D9B8]/20 px-3 py-1 rounded-full border border-[#6FA887]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D778]" />
            <span>Story Completed with Love</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-8 my-auto">
            <PipCharacter size="sm" state="happy" interactive={true} speechText="Thank you for helping!" />
            <BunnyCharacter size="sm" isWaving={true} />
          </div>

          <motion.button
            onClick={handleCompletionTap}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2.5 bg-[#FFF7E8] border-2 border-[#F5D778] px-4 py-2 rounded-2xl shadow-md cursor-pointer hover:bg-[#FFFDF7] transition-all focus:outline-none focus:ring-4 focus:ring-[#F5D778]"
            aria-label="Tap to bloom your garden flower reward"
          >
            <motion.div
              animate={flowerBloomed ? { scale: [1, 1.35, 1], rotate: [0, 15, -15, 0] } : {}}
              className="text-2xl"
            >
              🌸
            </motion.div>
            <div className="text-left">
              <p className="text-xs font-extrabold text-[#63452E]">
                {flowerBloomed ? "Flower Bloomed!" : "Tap to Bloom Flower"}
              </p>
              <p className="text-[10px] text-[#63452E]/70 font-semibold">
                Saved to My Story Garden
              </p>
            </div>
            {flowerBloomed && (
              <CheckCircle2 className="w-5 h-5 text-[#6FA887] ml-1" />
            )}
          </motion.button>
        </div>
      )}
    </div>
  );
};
