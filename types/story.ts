export type StoryLanguage = "en" | "ta";

export type StoryCategory =
  | "All"
  | "Adventures"
  | "Bedtime"
  | "Friendship"
  | "Animals"
  | "Learning";

export interface StoryChoice {
  id: string;
  label: string;
  labelTa: string;
  response: string;
  responseTa: string;
}

export interface StoryPageData {
  pageNumber: number;
  title: string;
  titleTa?: string;
  text: string;
  textTa?: string;
  interactionPrompt: string;
  interactionPromptTa?: string;
  interactionHint?: string;
  interactionHintTa?: string;
  choices?: StoryChoice[];
  interactionType:
    | "leaf-wiggle"
    | "star-glow"
    | "pip-tail"
    | "flower-illuminate"
    | "stars-twinkle"
    | "breeze-sparkle"
    | "constellation"
    | "story-complete";
  sceneType:
    | "spark-forest"
    | "little-star"
    | "kind-promise"
    | "follow-flowers"
    | "tall-hill"
    | "helping-breeze"
    | "back-home"
    | "kind-heart";
}

export interface Story {
  id: string;
  title: string;
  titleTa: string;
  subtitle: string;
  subtitleTa: string;
  tagline: string;
  taglineTa: string;
  theme: string;
  category: StoryCategory;
  ageRecommendation: string;
  readingTimeMinutes: number;
  totalPages: number;
  coverColor: "peach" | "mint" | "lilac" | "butter";
  badge: string;
  isAvailable: boolean;
  pages: StoryPageData[];
}

export interface StoryCharacter {
  id: string;
  name: string;
  nameTa: string;
  avatar: string;
  role: string;
  roleTa: string;
  personality: string;
  personalityTa: string;
  greeting: string;
  greetingTa: string;
  favoriteThing: string;
  favoriteThingTa: string;
  color: string;
  soundType: "pip" | "star" | "bunny" | "owl";
}

export interface GardenRewardItem {
  id: string;
  storyId: string;
  flowerName: string;
  flowerNameTa?: string;
  description: string;
  descriptionTa?: string;
  bloomedDate: string;
  color: string;
  iconType: "starflower" | "sunblossom" | "rainsprout";
}

export interface ReadingProgress {
  currentPage: number;
  isCompleted: boolean;
  lastReadDate: string;
  interactionsDiscovered: number[];
  chosenPath?: string;
}

export interface UserPreferences {
  language: StoryLanguage;
  soundEffects: boolean;
  narrationVoiceSpeed: number;
  reducedMotion: boolean;
  bedtimeMode: boolean;
}
