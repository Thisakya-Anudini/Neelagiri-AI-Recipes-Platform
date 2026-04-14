"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { Show } from "@clerk/nextjs";
import { useSubscription } from "@clerk/nextjs/experimental";
import { Badge } from "./ui/badge";
import Link from "next/link";

export default function PlanIndicator() {
  const { data: subscription } = useSubscription();
  const isPro = subscription?.status === "active";

  return (
    <Show when="signed-in">
      <Link href="/plans" className="inline-flex">
        {isPro ? (
          <Badge
            variant="outline"
            className="flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all bg-linear-to-r from-orange-600 to-amber-500 text-white border-none shadow-sm cursor-pointer hover:opacity-95"
            title="Manage subscription"
          >
            <Sparkles className="h-3 w-3 text-white fill-white/20" />
            <span>Pro Plan</span>
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all bg-white text-emerald-700 border-emerald-500 cursor-pointer hover:bg-emerald-50"
            title="Manage subscription"
          >
            <Sparkles className="h-3 w-3 text-emerald-600" />
            <span>Free Plan</span>
          </Badge>
        )}
      </Link>
    </Show>
  );
}
