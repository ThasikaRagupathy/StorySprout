"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GardenRewardItem } from "@/types/story";
import { Sparkles, Calendar, X } from "lucide-react";
import { soundEffects } from "@/utils/soundEffects";

interface GardenRewardProps {
  rewards: GardenRewardItem[];
  onReadStory: () => void;
}

export const GardenReward: React.FC<GardenRewardProps> = ({
  rewards,
  onReadStory,
}) => {
  const [selectedReward, setSelectedReward] = useState<GardenRewardItem | null>(
    null
  );

  return (
    <div className="relative w-full">
      {/* Meadow Garden Ground Canvas */}
      <div className="relative w-full min-h-[340px] xs:min-h-[380px] sm:min-h-[440px] bg-gradient-to-b from-[#EBF5EE] via-[#F8F6EA] to-[#E2EEDB] rounded-[36px] sm:rounded-[44px] p-5 sm:p-8 md:p-10 border-3 sm:border-4 border-[#A9D9B8] shadow-lg overflow-hidden flex flex-col justify-between">
        {/* Soft Sun Ray Glow */}
        <div className="absolute top-4 right-6 w-24 sm:w-36 h-24 sm:h-36 rounded-full bg-[#F5D778]/35 blur-2xl pointer-events-none" />

        {/* Ambient Flying Garden Butterflies & Bees */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <motion.div
            animate={{
              x: [20, 90, 45, 20],
              y: [40, 15, 60, 40],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute text-xl sm:text-2xl"
          >
            🦋
          </motion.div>
          <motion.div
            animate={{
              x: [240, 280, 210, 240],
              y: [25, 75, 35, 25],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute text-lg sm:text-xl opacity-80"
          >
            🐝
          </motion.div>
        </div>

        {/* Header inside Garden */}
        <div className="relative z-10 max-w-md">
          <span className="text-[11px] sm:text-xs font-fredoka font-bold uppercase tracking-wider text-[#6FA887] bg-white/80 px-3 py-1 rounded-full border border-[#6FA887]/30 shadow-2xs">
            ✿ Story Keepsakes
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-fredoka font-bold text-[#63452E] mt-2">
            {rewards.length > 0
              ? "Your Magical Story Meadow"
              : "Your Meadow is Ready to Bloom"}
          </h3>
          <p className="text-xs sm:text-sm text-[#63452E]/75 mt-1 font-medium">
            {rewards.length > 0
              ? "Every kind story you finish plants a special flower here."
              : "Read your first adventure with Pip to plant a beautiful flower."}
          </p>
        </div>

        {/* Flower Meadow Floor */}
        <div className="relative z-10 my-6 sm:my-8">
          {rewards.length > 0 ? (
            <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-12 py-2">
              {rewards.map((reward) => (
                <motion.button
                  key={reward.id}
                  onClick={() => {
                    soundEffects.playStarGlow();
                    setSelectedReward(reward);
                  }}
                  whileHover={{ scale: 1.15, y: -6 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#F5D778] rounded-3xl p-2.5 sm:p-3"
                  aria-label={`Inspect ${reward.flowerName}`}
                >
                  {/* Glowing halo */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.35, 0.8, 0.35],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                      className="absolute inset-0 bg-[#F5D778] rounded-full blur-md"
                    />

                    {/* Flower Icon Disc */}
                    <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-[#FFFDF7] border-2 border-[#F5D778] shadow-lg flex items-center justify-center text-4xl sm:text-5xl group-hover:rotate-12 transition-transform">
                      {reward.iconType === "starflower" ? "🌸" : "🌻"}
                    </div>

                    <div className="absolute -top-1 -right-1 text-xs bg-[#F5D778] text-[#63452E] font-bold p-1 rounded-full shadow">
                      ✦
                    </div>
                  </div>

                  {/* Stem & Leaves */}
                  <svg width="40" height="45" viewBox="0 0 40 45" fill="none">
                    <path
                      d="M20 0 L20 45"
                      stroke="#6FA887"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <path
                      d="M20 20 C10 18, 5 24, 7 30 C15 28, 18 25, 20 20 Z"
                      fill="#6FA887"
                    />
                    <path
                      d="M20 28 C30 26, 35 32, 33 38 C25 36, 22 33, 20 28 Z"
                      fill="#6FA887"
                    />
                  </svg>

                  {/* Moss Ground Cushion */}
                  <div className="w-24 h-4 bg-[#6FA887]/30 rounded-full blur-xs -mt-1" />

                  <span className="text-xs font-fredoka font-bold text-[#63452E] group-hover:text-[#E76F42] transition-colors mt-1 bg-white/85 px-3 py-0.5 rounded-full shadow-2xs">
                    {reward.flowerName}
                  </span>
                </motion.button>
              ))}
            </div>
          ) : (
            /* Friendly Illustrated Empty State */
            <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 bg-white/75 rounded-3xl border-2 border-dashed border-[#A9D9B8] max-w-md mx-auto space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#EBF5EE] border-2 border-[#A9D9B8] flex items-center justify-center text-3xl shadow-xs">
                🌱
              </div>
              <h4 className="font-fredoka font-bold text-[#63452E] text-base sm:text-lg">
                A Little Seed is Resting Here
              </h4>
              <p className="text-xs text-[#63452E]/75 leading-relaxed font-medium">
                Help Pip guide the lost star home, and this cozy seed will burst into a shining golden flower!
              </p>
              <button
                onClick={() => {
                  soundEffects.playTap();
                  onReadStory();
                }}
                className="mt-2 bg-[#6FA887] text-white font-fredoka font-bold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow hover:bg-[#5D9474] active:scale-95 transition-all cursor-pointer"
              >
                Start Pip&apos;s Adventure →
              </button>
            </div>
          )}
        </div>

        {/* Meadow Grass Edge decoration */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#63452E]/70 pt-3 border-t border-[#A9D9B8]/40 font-semibold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#6FA887]" />
            <span>Flowers bloomed: {rewards.length}</span>
          </span>
          <span className="text-[11px] font-fredoka">Watered with kindness ✿</span>
        </div>
      </div>

      {/* Flower Keepsake Inspection Modal */}
      <AnimatePresence>
        {selectedReward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setSelectedReward(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FFF7E8] rounded-3xl p-6 sm:p-8 max-w-sm w-full border-4 border-[#F5D778] shadow-2xl relative space-y-4 text-center"
            >
              <button
                onClick={() => setSelectedReward(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#63452E]/60 hover:text-[#63452E] hover:bg-[#E5DFCD]/50 cursor-pointer"
                aria-label="Close flower details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-22 h-22 mx-auto rounded-full bg-[#FFFDF7] border-2 border-[#F5D778] flex items-center justify-center text-5xl shadow-md">
                🌸
              </div>

              <div>
                <span className="text-[11px] font-fredoka font-bold text-[#6FA887] uppercase tracking-wide">
                  Story Keepsake
                </span>
                <h4 className="text-xl font-fredoka font-bold text-[#63452E] mt-1">
                  {selectedReward.flowerName}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-[#63452E]/85 leading-relaxed bg-[#FFFDF7] p-3.5 rounded-2xl border border-[#E5DFCD] font-medium">
                {selectedReward.description}
              </p>

              <div className="flex items-center justify-center gap-2 text-xs text-[#63452E]/65 font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Bloomed on {selectedReward.bloomedDate}</span>
              </div>

              <button
                onClick={() => setSelectedReward(null)}
                className="w-full bg-[#6FA887] text-white font-fredoka font-bold py-2.5 rounded-full shadow hover:bg-[#5D9474] active:scale-95 transition-all text-xs cursor-pointer"
              >
                Back to Garden
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
