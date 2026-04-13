import React from "react";
import { getCategories, getAreas } from "@/actions/mealdb.actions";
import ExploreSearchHeader from "@/components/ExploreSearchHeader";
import ExploreBrowser from "@/components/ExploreBrowser";

export default async function ExplorePage() {
  // Fetch data server-side
  const categoriesData = await getCategories();
  const areasData = await getAreas();

  const categories = categoriesData?.categories || [];
  const areas = areasData?.areas || [];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <ExploreSearchHeader />
        <ExploreBrowser categories={categories} areas={areas} />
      </div>
    </div>
  );
}
