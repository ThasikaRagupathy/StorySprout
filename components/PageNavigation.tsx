"use client";

import React from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { soundEffects } from "@/utils/soundEffects";

interface PageNavigationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelectPage?: (page: number) => void;
  className?: string;
}

export const PageNavigation: React.FC<PageNavigationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onSelectPage,
  className = "",
}) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full ${className}`}
      role="navigation"
      aria-label="Story reader page navigation"
    >
      {/* Previous Button (Chunky 3D Button) */}
      <button
        onClick={() => {
          soundEffects.playTap();
          onPrevious();
        }}
        disabled={isFirst}
        className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-fredoka font-bold text-xs sm:text-sm cursor-pointer transition-all ${
          isFirst
            ? "opacity-35 cursor-not-allowed bg-[#E5DFCD]/40 text-[#63452E]/40 border border-[#E5DFCD]"
            : "btn-chunky-white"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      {/* Stepping-stone Page Indicators & Counter */}
      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-2" role="tablist" aria-label="Pages">
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;
            const isVisited = pageNum < currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => {
                  if (onSelectPage) {
                    soundEffects.playTap();
                    onSelectPage(pageNum);
                  }
                }}
                className={`transition-all rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#6FA887] cursor-pointer ${
                  isActive
                    ? "w-7 h-7 bg-[#6FA887] text-white text-xs font-fredoka font-bold shadow-md scale-110 border-2 border-white"
                    : isVisited
                    ? "w-4 h-4 bg-[#A9D9B8] hover:scale-125 shadow-2xs"
                    : "w-3.5 h-3.5 bg-[#E5DFCD] hover:scale-125"
                }`}
                aria-label={`Go to page ${pageNum}`}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && pageNum}
              </button>
            );
          })}
        </div>
        <span className="text-xs font-fredoka font-bold text-[#63452E]/70" aria-live="polite">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Next / Finish Button (Chunky 3D Button) */}
      <button
        onClick={() => {
          soundEffects.playTap();
          onNext();
        }}
        className={`flex items-center gap-1.5 px-6 sm:px-7 py-2.5 rounded-full font-fredoka font-bold text-xs sm:text-sm cursor-pointer ${
          isLast
            ? "btn-chunky-green animate-pulse"
            : "btn-chunky-orange"
        }`}
        aria-label={isLast ? "Complete and close story" : "Next page"}
      >
        <span>{isLast ? "Finish Story ✓" : "Next Page"}</span>
        {isLast ? <Check className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>
    </div>
  );
};
