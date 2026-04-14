"use client";

import React from "react";
import { Check } from "lucide-react";
import { Show, SignInButton, useAuth } from "@clerk/nextjs";
import {
  CheckoutButton,
  usePlans,
  useSubscription,
} from "@clerk/nextjs/experimental";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function PricingSection({ subscriptionTier }) {
  const { isSignedIn } = useAuth();
  const { data: subscription } = useSubscription({ enabled: Boolean(isSignedIn) });
  const isProFromSubscription = subscription?.status === "active";
  const effectiveTier =
    subscriptionTier ?? (isProFromSubscription ? "pro" : "free");

  const { data: plans } = usePlans({ enabled: Boolean(isSignedIn) });
  const proPlan =
    plans?.find((p) => (p.name ?? "").toLowerCase() === "pro") ??
    plans?.find((p) => (p.name ?? "").toLowerCase().includes("pro"));
  const proCheckoutEnabled = Boolean(proPlan?.id);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid gap-5 md:grid-cols-2 max-w-4xl mx-auto items-stretch">
        <Card className="h-full min-h-[430px] border border-stone-200 bg-white shadow-xs rounded-2xl overflow-hidden flex flex-col py-0 gap-0">
          <div className="h-1.5 bg-emerald-600" />
          <CardHeader className="pb-3 pt-4">
            <CardTitle className="text-base md:text-lg font-bold text-stone-900">
              Free
            </CardTitle>
            <div className="mt-2 flex items-end gap-2">
              <div className="text-3xl md:text-4xl font-bold text-stone-900">
                $0
              </div>
              <div className="text-s font-medium text-stone-500 pb-1">
                /month
              </div>
            </div>
            <div className="mt-1 text-xs md:text-sm text-stone-600 font-light">
              For casual cooking and getting started.
            </div>
          </CardHeader>

          <div className="px-5 pb-4 flex-1">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
              <div className="text-[11px] font-semibold text-stone-900 mb-2">
                What&apos;s included
              </div>
              <ul className="space-y-1.5">
                {[
                  "10 pantry scans per month",
                  "5 AI meal recommendations",
                  "Standard recipe access",
                  "Standard support",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-stone-700">
                    <span className="mt-0.5 inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-emerald-600">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </span>
                    <span className="text-xs md:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <CardFooter className="px-5 pb-4 pt-0">
            {effectiveTier === "free" ? (
              <Button
                disabled
                size="lg"
                className="w-full bg-emerald-100 text-emerald-900 cursor-not-allowed"
              >
                Current plan
              </Button>
            ) : (
              <Link href="/explore" className="w-full">
                <Button
                  size="lg"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Continue with Free
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>

        <Card className="h-full min-h-[430px] border border-stone-200 bg-white shadow-xs rounded-2xl overflow-hidden flex flex-col py-0 gap-0">
          <div className="h-1.5 bg-orange-600" />

          <CardHeader className="pb-3 pt-4">
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-base md:text-lg font-bold text-stone-900">
                Pro
              </CardTitle>
              <Badge className="bg-orange-600 text-white font-bold border-none">
                Best value
              </Badge>
            </div>
            <div className="mt-2 flex items-end gap-2">
              <div className="text-3xl md:text-4xl font-bold text-stone-900">
                $7.99
              </div>
              <div className="text-s font-medium text-stone-500 pb-1">
                /month
              </div>
            </div>
            <div className="mt-1 text-xs md:text-sm text-stone-600 font-light">
              For serious home cooks who want unlimited AI help.
            </div>
          </CardHeader>

          <div className="px-5 pb-4 flex-1">
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
              <div className="text-[11px] font-semibold text-stone-900 mb-2">
                Everything in Free, plus
              </div>
              <ul className="space-y-1.5">
                {[
                  "Unlimited pantry scans",
                  "Unlimited AI recipes",
                  "Priority support",
                  "Nutritional analysis",
                  "Chef's tips & tricks",
                  "Ingredient substitutions",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-stone-800">
                    <span className="mt-0.5 inline-flex h-4.5 w-4.5 items-center justify-center rounded-full bg-orange-600">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </span>
                    <span className="text-xs md:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <CardFooter className="px-5 pb-4 pt-0">
            <Show when="signed-in">
              {effectiveTier === "pro" ? (
                <Button
                  disabled
                  size="lg"
                  className="w-full bg-orange-200 text-orange-950 cursor-not-allowed"
                >
                  You are subscribed
                </Button>
              ) : proCheckoutEnabled ? (
                <CheckoutButton
                  planId={proPlan.id}
                  planPeriod="month"
                  newSubscriptionRedirectUrl="/explore"
                  checkoutProps={{
                    appearance: {
                      elements: {
                        drawerRoot: {
                          zIndex: 2000,
                        },
                      },
                    },
                  }}
                >
                  <Button
                    size="lg"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    Upgrade to Pro
                  </Button>
                </CheckoutButton>
              ) : (
                <Button
                  disabled
                  size="lg"
                  className="w-full bg-orange-200 text-orange-950 cursor-not-allowed"
                >
                  Upgrade to Pro
                </Button>
              )}
            </Show>
            <Show when="signed-out">
              <SignInButton mode="modal">
                <Button
                  size="lg"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Sign in to upgrade
                </Button>
              </SignInButton>
            </Show>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
