"use client";

import React from "react";
import { Volume2, VolumeX, Play, Pause, RotateCcw } from "lucide-react";
import { soundEffects } from "@/utils/soundEffects";

interface AudioControlsProps {
  isSpeaking: boolean;
  isPaused: boolean;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onReplay: () => void;
  soundEffectsEnabled: boolean;
  onToggleSoundEffects: () => void;
  className?: string;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isSpeaking,
  isPaused,
  onPlay,
  onPause,
  onResume,
  onReplay,
  soundEffectsEnabled,
  onToggleSoundEffects,
  className = "",
}) => {
  const handleToggleSound = () => {
    soundEffects.playTap();
    onToggleSoundEffects();
  };

  return (
    <div
      className={`flex items-center gap-2 sm:gap-2.5 bg-[#FFFDF7] border-2 border-[#E5DFCD] shadow-xs rounded-full p-1 sm:p-1.5 ${className}`}
      role="region"
      aria-label="Story audio and narration controls"
    >
      {/* Read to Me / Pause / Resume Button */}
      {!isSpeaking && !isPaused ? (
        <button
          onClick={() => {
            soundEffects.playTap();
            onPlay();
          }}
          className="btn-chunky-green flex items-center gap-1.5 text-xs sm:text-sm px-3.5 sm:px-4 py-1.5 cursor-pointer"
          aria-label="Read this page aloud to me"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Read to Me</span>
        </button>
      ) : isSpeaking ? (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundEffects.playTap();
              onPause();
            }}
            className="btn-chunky-yellow flex items-center gap-1.5 text-xs sm:text-sm px-3.5 py-1.5 cursor-pointer"
            aria-label="Pause narration"
          >
            <Pause className="w-3.5 h-3.5 fill-current" />
            <span>Pause</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playTap();
              onReplay();
            }}
            className="p-1.5 rounded-full text-[#63452E] hover:bg-[#FFF7E8] active:scale-95 transition-all cursor-pointer"
            aria-label="Replay narration from start"
            title="Replay page narration"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundEffects.playTap();
              onResume();
            }}
            className="btn-chunky-green flex items-center gap-1.5 text-xs sm:text-sm px-3.5 py-1.5 cursor-pointer"
            aria-label="Resume narration"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Resume</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playTap();
              onReplay();
            }}
            className="p-1.5 rounded-full text-[#63452E] hover:bg-[#FFF7E8] active:scale-95 transition-all cursor-pointer"
            aria-label="Replay narration from start"
            title="Replay page narration"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Divider */}
      <div className="h-4 w-[1.5px] bg-[#E5DFCD] mx-0.5" />

      {/* Sound Effects Toggle */}
      <button
        onClick={handleToggleSound}
        className={`p-1.5 rounded-full transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6FA887] ${
          soundEffectsEnabled
            ? "text-[#6FA887] hover:bg-[#A9D9B8]/25"
            : "text-[#63452E]/40 hover:bg-gray-100"
        }`}
        aria-label={
          soundEffectsEnabled ? "Turn off sound effects" : "Turn on sound effects"
        }
        aria-pressed={soundEffectsEnabled}
        title={soundEffectsEnabled ? "Sound Effects ON" : "Sound Effects MUTED"}
      >
        {soundEffectsEnabled ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};
