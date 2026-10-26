import { useCallback, useEffect, useRef, useState } from "react";
import { StoryLanguage } from "@/types/story";

export function useNarration(onEndCallback?: () => void) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState<number | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textWordsRef = useRef<string[]>([]);
  const currentTextRef = useRef<string>("");
  const currentLangRef = useRef<StoryLanguage>("en");

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setIsSupported(true);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
    setHighlightedWordIndex(null);
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsSpeaking(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    }
  }, []);

  const speak = useCallback(
    (textToSpeak: string, lang: StoryLanguage = "en", speed: number = 0.85) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        return;
      }

      window.speechSynthesis.cancel();
      setIsPaused(false);
      setHighlightedWordIndex(null);
      currentTextRef.current = textToSpeak;
      currentLangRef.current = lang;

      const words = textToSpeak.split(/\s+/).filter(Boolean);
      textWordsRef.current = words;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utteranceRef.current = utterance;

      utterance.rate = lang === "ta" ? 0.8 : speed;
      utterance.pitch = lang === "ta" ? 1.05 : 1.15;
      utterance.lang = lang === "ta" ? "ta-IN" : "en-US";

      const voices = window.speechSynthesis.getVoices();
      if (lang === "ta") {
        const tamilVoice = voices.find(
          (v) =>
            v.lang.startsWith("ta") ||
            v.name.toLowerCase().includes("tamil") ||
            v.name.toLowerCase().includes("valluvar")
        );
        if (tamilVoice) {
          utterance.voice = tamilVoice;
        }
      } else {
        const englishVoice = voices.find(
          (v) =>
            v.lang.startsWith("en") &&
            (v.name.includes("Samantha") ||
              v.name.includes("Victoria") ||
              v.name.includes("Natural") ||
              v.name.includes("Google") ||
              v.name.includes("Zira"))
        ) || voices.find((v) => v.lang.startsWith("en"));
        if (englishVoice) {
          utterance.voice = englishVoice;
        }
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsPaused(false);
        setHighlightedWordIndex(0);
      };

      utterance.onboundary = (event) => {
        if (event.name === "word") {
          const textUpToChar = textToSpeak.slice(0, event.charIndex);
          const wordIndex = textUpToChar.split(/\s+/).filter(Boolean).length;
          setHighlightedWordIndex(wordIndex);
        }
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setHighlightedWordIndex(null);
        if (onEndCallback) onEndCallback();
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setHighlightedWordIndex(null);
      };

      window.speechSynthesis.speak(utterance);
    },
    [onEndCallback]
  );

  const replay = useCallback(
    (speed?: number) => {
      if (currentTextRef.current) {
        speak(currentTextRef.current, currentLangRef.current, speed);
      }
    },
    [speak]
  );

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSpeaking,
    isPaused,
    highlightedWordIndex,
    isSupported,
    speak,
    pause,
    resume,
    stop,
    replay,
  };
}
