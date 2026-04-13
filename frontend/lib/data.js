import { Camera, BookOpen, ChefHat, Search } from "lucide-react";

export const SITE_STATS = [
  { label: "Free Scans", val: "10/mo" },
  { label: "Recipes Generated", val: "1M+" },
  { label: "Cost to Start", val: "$0" },
  { label: "App Store Rating", val: "4.9" },
];

export const FEATURES = [
  {
    title: "Scan Your Pantry",
    description:
      "Snap a photo and instantly see what ingredients you have. No typing required.",
    icon: Camera,
    limit: "Free: 10 scans/mo",
  },
  {
    title: "AI Chef Suggestions",
    description:
      "Get recipe ideas from what you already own. Reduce waste and cook with confidence.",
    icon: ChefHat,
    limit: "Free: 5 meals/mo",
  },
  {
    title: "Search Any Dish",
    description:
      "Explore global dishes fast. Browse by cuisine and category in a couple of clicks.",
    icon: Search,
    limit: "Unlimited searches",
  },
  {
    title: "Digital Cookbook",
    description:
      "Save favorites to your cookbook and come back anytime. Simple and organized.",
    icon: BookOpen,
    limit: "Free: 3 saves/mo",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Scan",
    desc: "Scan your pantry or add ingredients in seconds.",
  },
  {
    step: "02",
    title: "Select",
    desc: "Pick a recipe suggestion that fits your time and mood.",
  },
  {
    step: "03",
    title: "Savor",
    desc: "Follow clear steps, cook smarter, and enjoy the result.",
  },
];

// Helper function for category emojis
export function getCategoryEmoji(category) {
  const emojiMap = {
    Beef: "🥩",
    Chicken: "🍗",
    Dessert: "🍰",
    Lamb: "🍖",
    Miscellaneous: "🍴",
    Pasta: "🍝",
    Pork: "🥓",
    Seafood: "🦐",
    Side: "🥗",
    Starter: "🥟",
    Vegan: "🥬",
    Vegetarian: "🥕",
    Breakfast: "🍳",
    Goat: "🐐",
  };
  return emojiMap[category] || "🍽️";
}

// Helper function for country flags
export function getCountryFlag(country) {
  const emojiMap = {
    American: "🗽",
    British: "👑",
    Canadian: "🍁",
    Chinese: "🐉",
    Croatian: "⚽",
    Dutch: "🌷",
    Egyptian: "🐫",
    Filipino: "🌴",
    French: "🥐",
    Greek: "🏛️",
    Indian: "🪷",
    Irish: "☘️",
    Italian: "🍕",
    Jamaican: "🌴",
    Japanese: "🗾",
    Kenyan: "🦒",
    Malaysian: "🌺",
    Mexican: "🌮",
    Moroccan: "🕌",
    Polish: "🦅",
    Portuguese: "🚢",
    Russian: "❄️",
    Spanish: "💃",
    Thai: "🛕",
    Tunisian: "🏜️",
    Turkish: "🧿",
    Ukrainian: "🌻",
    Vietnamese: "🍜",
    Algerian: "🏜️",
    Argentinian: "⚽",
    Australian: "🦘",
    Norwegian: "❄️",
    "Saudi Arabian": "🕋",
    Slovakian: "🏔️",
    Syrian: "🏛️",
    Uruguayan: "⚽",
    Venezuelan: "🌞",
  };

  return emojiMap[country] ?? "🌍";
}
