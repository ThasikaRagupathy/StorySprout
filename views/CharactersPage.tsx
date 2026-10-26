"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { STORY_CHARACTERS } from "@/data/characters";
import { StoryCharacter, StoryLanguage } from "@/types/story";
import { soundEffects } from "@/utils/soundEffects";
import { useNarration } from "@/hooks/useNarration";
import { Sparkles, Volume2, Heart, Star, BookOpen } from "lucide-react";

interface CharactersPageProps {
  language: StoryLanguage;
  onReadStoryWithCharacter: () => void;
}

export const CharactersPage: React.FC<CharactersPageProps> = ({
  language,
  onReadStoryWithCharacter,
}) => {
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>("pip");
  const narration = useNarration();

  const handleCharacterClick = (character: StoryCharacter) => {
    setActiveCharacterId(character.id);

    // Play specific character sound
    if (character.soundType === "pip") {
      soundEffects.playPipTail();
    } else if (character.soundType === "star") {
      soundEffects.playStarGlow();
    } else if (character.soundType === "bunny") {
      soundEffects.playBunnyHop();
    } else if (character.soundType === "owl") {
      soundEffects.playOwlHoot();
    }

    // Speak character greeting aloud
    const textToSpeak = language === "ta" ? character.greetingTa : character.greeting;
    narration.speak(textToSpeak, language, 0.9);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 sm:space-y-12 py-4 sm:py-8">
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-2.5 px-2">
        <span className="text-[11px] sm:text-xs font-fredoka font-bold uppercase tracking-wider text-[#6FA887] bg-[#A9D9B8]/25 px-3.5 py-1 rounded-full border border-[#6FA887]/30 shadow-2xs">
          {language === "ta" ? "✦ காட்டு நண்பர்கள்" : "✦ Forest Friends"}
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-fredoka text-[#63452E]">
          {language === "ta" ? "கதை நண்பர்களைச் சந்தியுங்கள்" : "Meet the Characters"}
        </h2>
        <p className="text-xs sm:text-sm text-[#63452E]/75 leading-relaxed font-medium">
          {language === "ta"
            ? "ஒவ்வொரு நண்பரையும் தொட்டு அவர்களுடைய குரலையும் கதையையும் கேளுங்கள்!"
            : "Tap any friend to hear their friendly greeting, playful sound, and special story role!"}
        </p>
      </div>

      {/* Interactive Characters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {STORY_CHARACTERS.map((char) => {
          const isActive = activeCharacterId === char.id;

          return (
            <motion.div
              key={char.id}
              onClick={() => handleCharacterClick(char)}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className={`relative flex flex-col justify-between rounded-3xl p-5 sm:p-6 border-3 cursor-pointer transition-all duration-300 shadow-md ${
                isActive
                  ? "bg-[#FFFDF7] border-[#F5D778] shadow-xl ring-4 ring-[#F5D778]/40 -translate-y-1"
                  : "bg-[#FFFDF7]/85 border-[#E5DFCD] hover:border-[#A9D9B8]"
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Meet ${language === "ta" ? char.nameTa : char.name}`}
            >
              {/* Top Row: Sound Speaker Icon & Role Tag */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-fredoka font-bold text-[#6FA887] bg-[#A9D9B8]/25 px-2.5 py-0.5 rounded-full border border-[#6FA887]/20">
                  {language === "ta" ? char.roleTa : char.role}
                </span>

                <button
                  className={`p-1.5 rounded-full ${
                    isActive
                      ? "bg-[#F5D778] text-[#63452E]"
                      : "text-[#63452E]/50 hover:bg-[#FFF7E8]"
                  }`}
                  aria-label="Play voice greeting"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Character Avatar Icon Disc */}
              <div className="my-5 flex flex-col items-center justify-center">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-4xl sm:text-5xl shadow-md border-2 transition-transform duration-300"
                  style={{
                    backgroundColor: `${char.color}18`,
                    borderColor: char.color,
                  }}
                >
                  <motion.span
                    animate={isActive ? { scale: [1, 1.25, 1], rotate: [0, 10, -10, 0] } : {}}
                    transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
                  >
                    {char.avatar}
                  </motion.span>
                </div>

                <h3 className="text-base sm:text-lg font-fredoka font-bold text-[#63452E] mt-3">
                  {language === "ta" ? char.nameTa : char.name}
                </h3>
              </div>

              {/* Personality / Greeting Preview */}
              <div className="space-y-2 text-center bg-[#FFF7E8] p-3 rounded-2xl border border-[#E5DFCD]">
                <p className="text-xs text-[#63452E]/80 font-medium line-clamp-3">
                  {language === "ta" ? char.personalityTa : char.personality}
                </p>

                <p className="text-[11px] font-bold text-[#E76F42] pt-0.5 italic">
                  &ldquo;{language === "ta" ? char.greetingTa : char.greeting}&rdquo;
                </p>
              </div>

              {/* Tap to Hear Prompt */}
              <div className="mt-3 text-center">
                <span className="text-[10px] font-fredoka font-bold text-[#6FA887] uppercase tracking-wider">
                  {isActive
                    ? language === "ta" ? "🔊 பேசுகிறார்..." : "🔊 Speaking..."
                    : language === "ta" ? "குரல் கேட்க தொடவும்" : "Tap to hear greeting"}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Character Spotlight Banner */}
      {activeCharacterId && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#FCECE9] via-[#FAF6EC] to-[#EAF5EE] border-3 border-[#F5D778] rounded-[32px] p-6 sm:p-8 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {(() => {
            const char = STORY_CHARACTERS.find((c) => c.id === activeCharacterId) || STORY_CHARACTERS[0];
            return (
              <>
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-20 h-20 rounded-3xl bg-[#FFFDF7] border-2 border-[#F5D778] flex items-center justify-center text-4xl shadow-md shrink-0">
                    {char.avatar}
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-fredoka font-bold text-[#E76F42] uppercase">
                      {language === "ta" ? "தேர்ந்தெடுக்கப்பட்ட நண்பர்" : "Spotlight Friend"}
                    </span>
                    <h4 className="text-xl sm:text-2xl font-fredoka font-bold text-[#63452E]">
                      {language === "ta" ? char.nameTa : char.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#63452E]/80 font-medium max-w-lg">
                      <span className="font-bold">
                        {language === "ta" ? "பிடித்த விஷயம்: " : "Favorite Thing: "}
                      </span>
                      {language === "ta" ? char.favoriteThingTa : char.favoriteThing}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => handleCharacterClick(char)}
                    className="bg-[#FFFDF7] hover:bg-[#FFF7E8] text-[#63452E] border-2 border-[#E5DFCD] font-fredoka font-bold text-xs sm:text-sm px-5 py-3 rounded-full shadow-xs active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-[#6FA887]" />
                    <span>{language === "ta" ? "குரல் கேளுங்கள்" : "Hear Voice"}</span>
                  </button>

                  <button
                    onClick={onReadStoryWithCharacter}
                    className="bg-[#6FA887] hover:bg-[#5D9474] text-white font-fredoka font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{language === "ta" ? "கதை வாசிக்கவும்" : "Read Pip's Story"}</span>
                  </button>
                </div>
              </>
            );
          })()}
        </motion.div>
      )}
    </div>
  );
};
