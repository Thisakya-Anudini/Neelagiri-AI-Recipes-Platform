"use client";

import { useEffect } from "react";
import { Bookmark, Loader2, ChefHat } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { getSavedRecipes } from "@/actions/recipe.actions";
import RecipeCard from "@/components/RecipeCard";

export default function SavedRecipesPage() {
  const {
    loading,
    data: recipesData,
    fn: fetchSavedRecipes,
  } = useFetch(getSavedRecipes);

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const recipes = recipesData?.recipes || [];

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl border-2 border-stone-900 bg-orange-50 flex items-center justify-center shrink-0">
                <Bookmark className="w-7 h-7 text-orange-700" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
                  My Saved Recipes
                </h1>
                <p className="text-stone-600 font-light text-base md:text-lg mt-1">
                  Your personal collection of favorite recipes.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-700 shadow-xs">
                <span className="h-2 w-2 rounded-full bg-orange-600" />
                {recipes.length} saved
              </div>
              <Link href="/explore">
                <Button variant="outline" className="border-stone-300">
                  Browse More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-6" />
            <p className="text-stone-600">Loading your saved recipes...</p>
          </div>
        )}

        {/* Recipes Grid */}
        {!loading && recipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.documentId}
                recipe={recipe}
                variant="list"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && recipes.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-stone-200 shadow-xs">
            <div className="bg-orange-50 w-20 h-20 rounded-2xl border-2 border-stone-900 flex items-center justify-center mx-auto mb-6">
              <Bookmark className="w-10 h-10 text-orange-700" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              No Saved Recipes Yet
            </h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              Start exploring recipes and save your favorites to build your
              personal cookbook!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/explore">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
                  <ChefHat className="w-4 h-4" />
                  Explore Recipes
                </Button>
              </Link>
              <Link href="/pantry">
                <Button variant="outline" className="border-stone-300 gap-2">
                  Check Your Pantry
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
