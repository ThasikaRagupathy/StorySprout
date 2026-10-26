"use client";

import React from "react";
import { motion } from "framer-motion";

interface BunnyCharacterProps {
  size?: "sm" | "md" | "lg";
  isWaving?: boolean;
  className?: string;
  onTap?: () => void;
}

export const BunnyCharacter: React.FC<BunnyCharacterProps> = ({
  size = "md",
  isWaving = false,
  className = "",
  onTap,
}) => {
  const dimensions = {
    sm: { width: 85, height: 105 },
    md: { width: 130, height: 160 },
    lg: { width: 175, height: 215 },
  }[size];

  return (
    <div
      className={`relative inline-block select-none cursor-pointer ${className}`}
      onClick={onTap}
      role="button"
      tabIndex={0}
      aria-label="Bunny the kind forest friend"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (onTap) onTap();
        }
      }}
    >
      <motion.svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 160 190"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="overflow-visible filter drop-shadow-md"
      >
        {/* Shadow */}
        <ellipse cx="80" cy="180" rx="42" ry="8" fill="#63452E" fillOpacity="0.12" />

        {/* Bunny Fluffy Body */}
        <path
          d="M50 115 C45 155, 52 175, 80 175 C108 175, 115 155, 110 115 C110 95, 50 95, 50 115 Z"
          fill="#FFFDF7"
        />

        {/* Soft Pink Tummy */}
        <ellipse cx="80" cy="140" rx="22" ry="24" fill="#FCECE9" />

        {/* Bunny Feet */}
        <ellipse cx="65" cy="174" rx="14" ry="8" fill="#FFFDF7" stroke="#E5DFCD" strokeWidth="1.5" />
        <ellipse cx="95" cy="174" rx="14" ry="8" fill="#FFFDF7" stroke="#E5DFCD" strokeWidth="1.5" />

        {/* Bunny Ears */}
        {/* Left Ear */}
        <motion.g
          animate={{ rotate: [-2, 3, -2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "65px", originY: "70px" }}
        >
          <path d="M55 70 C40 30, 48 5, 65 5 C82 5, 78 30, 75 70 Z" fill="#FFFDF7" />
          <path d="M60 62 C50 32, 54 14, 65 14 C76 14, 73 32, 70 62 Z" fill="#F4B9B1" />
        </motion.g>

        {/* Right Ear */}
        <motion.g
          animate={{ rotate: [2, -3, 2] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "95px", originY: "70px" }}
        >
          <path d="M85 70 C82 30, 88 5, 95 5 C112 5, 120 30, 105 70 Z" fill="#FFFDF7" />
          <path d="M90 62 C87 32, 92 14, 95 14 C106 14, 110 32, 100 62 Z" fill="#F4B9B1" />
        </motion.g>

        {/* Bunny Head */}
        <circle cx="80" cy="85" r="34" fill="#FFFDF7" />

        {/* Rosy Cheeks */}
        <circle cx="58" cy="94" r="7" fill="#F4B9B1" fillOpacity="0.75" />
        <circle cx="102" cy="94" r="7" fill="#F4B9B1" fillOpacity="0.75" />

        {/* Eyes (Blinking) */}
        <motion.g
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.9, 0.94, 0.97, 1],
          }}
          style={{ originX: "68px", originY: "82px" }}
        >
          <circle cx="68" cy="82" r="5" fill="#63452E" />
          <circle cx="66" cy="80" r="1.8" fill="#FFF7E8" />
        </motion.g>

        <motion.g
          animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            times: [0, 0.9, 0.94, 0.97, 1],
          }}
          style={{ originX: "92px", originY: "82px" }}
        >
          <circle cx="92" cy="82" r="5" fill="#63452E" />
          <circle cx="90" cy="80" r="1.8" fill="#FFF7E8" />
        </motion.g>

        {/* Cute Bunny Nose */}
        <ellipse cx="80" cy="90" rx="4" ry="3" fill="#F4B9B1" />

        {/* Smile */}
        <path
          d="M75 96 Q80 100 85 96"
          stroke="#63452E"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Whiskers */}
        <line x1="45" y1="88" x2="30" y2="85" stroke="#63452E" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="45" y1="92" x2="28" y2="94" stroke="#63452E" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="115" y1="88" x2="130" y2="85" stroke="#63452E" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="115" y1="92" x2="132" y2="94" stroke="#63452E" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />

        {/* Front Paw Waving or Resting */}
        {isWaving ? (
          <motion.g
            animate={{ rotate: [-10, 20, -10] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "110px", originY: "125px" }}
          >
            <ellipse cx="120" cy="115" rx="8" ry="12" fill="#FFFDF7" stroke="#E5DFCD" strokeWidth="1.5" />
          </motion.g>
        ) : (
          <>
            <ellipse cx="68" cy="122" rx="7" ry="9" fill="#FFFDF7" stroke="#E5DFCD" strokeWidth="1.5" />
            <ellipse cx="92" cy="122" rx="7" ry="9" fill="#FFFDF7" stroke="#E5DFCD" strokeWidth="1.5" />
          </>
        )}
      </motion.svg>
    </div>
  );
};
