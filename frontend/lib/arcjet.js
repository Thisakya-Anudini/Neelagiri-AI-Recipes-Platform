import arcjet, { shield, tokenBucket, detectBot } from "@arcjet/next";

// Base Arcjet instance with global protections
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield WAF - protect against common attacks like SQL injection, XSS, etc.
    shield({
      mode: "LIVE", // Use "DRY_RUN" during development to test without blocking
    }),

    // Bot protection - allow search engines only (important for SEO and legitimate traffic)
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
  ],
});

// Free tier pantry scan limits (10 scans per month) - tracked by user ID
export const freePantryScans = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"], // Track by Clerk user ID from checkUser
    refillRate: 10, // 10 tokens refilled every interval
    interval: "30d", // per month (30 days) interval
    capacity: 10, // max 10 tokens per interval
  })
);

// Free tier meal recommendations (5 per month) - tracked by user ID
export const freeMealRecommendations = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 5,
    interval: "30d",
    capacity: 5,
  })
);

// Pro tier - effectively unlimited (very high limits) - tracked by user ID
// 1000 requests per day should be more than enough for any user and allows for future growth without hitting limits
export const proTierLimit = aj.withRule(
  tokenBucket({
    mode: "LIVE",// Set to LIVE in production, use DRY_RUN for testing
    characteristics: ["userId"],
    refillRate: 1000,// Refill 1000 tokens per day
    interval: "1d",// Daily limits for Pro users to prevent abuse, but set high enough to be effectively unlimited for normal use
    capacity: 1000,// Set a high capacity to allow for bursts without blocking, while still enforcing a daily limit
  })
);
