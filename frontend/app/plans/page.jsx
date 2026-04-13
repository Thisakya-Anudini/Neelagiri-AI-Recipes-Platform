import React from "react";
import { auth } from "@clerk/nextjs/server";
import PricingSection from "@/components/PricingSection";

export default async function PlansPage() {
  const { has, userId } = await auth();
  const isSignedIn = Boolean(userId);
  const subscriptionTier = has?.({ plan: "pro" }) ? "pro" : "free";

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-3 tracking-tight leading-tight">
            Plans
          </h1>
          <p className="text-lg text-stone-600 font-light max-w-2xl">
            {isSignedIn
              ? "Manage your plan or upgrade anytime."
              : "Start free, and upgrade when you’re ready."}
          </p>
        </div>

        <PricingSection subscriptionTier={subscriptionTier} />
      </div>
    </div>
  );
}

