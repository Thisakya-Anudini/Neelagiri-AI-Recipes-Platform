"use client";

import React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCategoryEmoji, getCountryFlag } from "@/lib/data";

export default function ExploreBrowser({ categories, areas }) {
  const [tab, setTab] = React.useState("categories");
  const [filter, setFilter] = React.useState("");

  const normalized = filter.trim().toLowerCase();

  const filteredCategories = React.useMemo(() => {
    if (!normalized) return categories;
    return categories.filter((c) =>
      String(c?.strCategory ?? "")
        .toLowerCase()
        .includes(normalized),
    );
  }, [categories, normalized]);

  const filteredAreas = React.useMemo(() => {
    if (!normalized) return areas;
    return areas.filter((a) =>
      String(a?.strArea ?? "")
        .toLowerCase()
        .includes(normalized),
    );
  }, [areas, normalized]);

  return (
    <div className="bg-white border-2 border-stone-200 shadow-sm">
      <div className="p-5 md:p-6 border-b border-stone-200">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 justify-between">
          <Tabs value={tab} onValueChange={setTab} className="w-full md:w-auto">
            <TabsList className="bg-stone-100 text-stone-700">
              <TabsTrigger value="categories" className="px-4">
                Categories
              </TabsTrigger>
              <TabsTrigger value="cuisines" className="px-4">
                Cuisines
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full md:w-[360px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder={
                tab === "categories" ? "Search categories..." : "Search cuisines..."
              }
              className="w-full h-10 pl-9 pr-3 border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="p-5 md:p-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsContent value="categories">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
                  Browse by Category
                </h2>
                <p className="text-stone-600 font-light">
                  Find recipes that match your mood
                </p>
              </div>
              <div className="text-sm text-stone-500 whitespace-nowrap">
                {filteredCategories.length} shown
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredCategories.map((category) => (
                <Link
                  key={category.strCategory}
                  href={`/recipes/category/${category.strCategory.toLowerCase()}`}
                >
                  <div className="bg-stone-50 p-4 border-2 border-stone-200 hover:border-orange-600 hover:bg-white hover:shadow-md transition-all text-center group cursor-pointer h-full">
                    <div className="text-3xl mb-2">
                      {getCategoryEmoji(category.strCategory)}
                    </div>
                    <h3 className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors text-sm">
                      {category.strCategory}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="cuisines">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
                  Explore World Cuisines
                </h2>
                <p className="text-stone-600 font-light">
                  Travel the globe through food
                </p>
              </div>
              <div className="text-sm text-stone-500 whitespace-nowrap">
                {filteredAreas.length} shown
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredAreas.map((area) => (
                <Link
                  key={area.strArea}
                  href={`/recipes/cuisine/${area.strArea
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  <div className="bg-stone-50 p-4 border-2 border-stone-200 hover:border-orange-600 hover:bg-white hover:shadow-md transition-all group cursor-pointer h-full">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCountryFlag(area.strArea)}</span>
                      <span className="font-bold text-stone-900 group-hover:text-orange-600 transition-colors text-sm">
                        {area.strArea}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

