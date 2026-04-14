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
      "Take a quick photo and we’ll detect what you have in seconds. No typing, no lists, no hassle.",
    icon: Camera,
    limit: "Free: 10 scans/mo",
  },
  {
    title: "AI Chef Suggestions",
    description:
      "Get personalized recipe ideas based on your ingredients—so you cook confidently and waste less.",
    icon: ChefHat,
    limit: "Free: 5 meals/mo",
  },
  {
    title: "Search Any Dish",
    description:
      "Find the exact dish you’re craving fast. Filter by cuisine, style, and time—then start cooking.",
    icon: Search,
    limit: "Unlimited searches",
  },
  {
    title: "Digital Cookbook",
    description:
      "Save your best finds in one place and come back anytime. Clean, simple, and always organized.",
    icon: BookOpen,
    limit: "Free: 3 saves/mo",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Scan",
    desc: "Scan your pantry or add ingredients in moments.",
  },
  {
    step: "02",
    title: "Select",
    desc: "Choose a recipe that matches your time, taste, and mood.",
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
