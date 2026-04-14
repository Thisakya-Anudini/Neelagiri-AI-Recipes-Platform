import React from "react";
import { auth } from "@clerk/nextjs/server";
import PricingSection from "@/components/PricingSection";

export default async function PlansPage() {
  const { has, userId } = await auth();
  const isSignedIn = Boolean(userId);
  const subscriptionTier = has?.({ plan: "pro" }) ? "pro" : "free";

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-50 via-stone-50 to-orange-50/40 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 md:mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-[1.05]">
            Subscription Plans
          </h1>
          <p className="mt-3 text-lg md:text-xl text-stone-600 font-light max-w-2xl">
            {isSignedIn
              ? "View your current plan or upgrade anytime."
              : "Choose a plan that fits your cooking style."}
          </p>
        </header>

        <PricingSection subscriptionTier={subscriptionTier} />
      </div>
    </div>
  );
}
