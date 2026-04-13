"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ExploreSearchHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get("q") ?? "";
  const [query, setQuery] = React.useState(initial);

  function onSubmit(event) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/recipe?cook=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="mb-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
          Find something delicious
        </h1>
        <p className="text-base md:text-lg text-stone-600 font-light max-w-2xl">
          Search by dish name (e.g., Chicken Biryani, Pasta, Fried Rice) or browse
          categories and cuisines.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-7">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-stone-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes..."
              className="w-full h-12 pl-11 pr-4 border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
          <Button type="submit" variant="primary" className="h-12 px-6">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}

