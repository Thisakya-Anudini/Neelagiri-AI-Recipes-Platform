import React from "react";
import { ArrowRight, Flame, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getRecipeOfTheDay } from "@/actions/mealdb.actions";

export default async function TodaysSpecialPage() {
  let recipe = null;

  try {
    const recipeData = await getRecipeOfTheDay();
    recipe = recipeData?.recipe || null;
  } catch {
    recipe = null;
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 mb-3 tracking-tight leading-tight">
            Today&apos;s Special
          </h1>
          <p className="text-lg text-stone-600 font-light max-w-2xl">
            A fresh recipe picked for you from around the world.
          </p>
        </div>

        {!recipe && (
          <div className="bg-white border-2 border-stone-200 p-10 text-center">
            <h2 className="text-2xl font-bold text-stone-900 mb-2">
              Couldn&apos;t load today&apos;s special
            </h2>
            <p className="text-stone-600 mb-6 font-light">
              Please try again in a moment.
            </p>
            <Link href="/today" prefetch={false}>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                Retry
              </Button>
            </Link>
          </div>
        )}

        {recipe && (
          <section className="relative">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="w-6 h-6 text-orange-600" />
              <h2 className="text-3xl font-serif font-bold text-stone-900">
                Recipe of the Day
              </h2>
            </div>

            <div className="absolute top-20 left-5 z-10 flex items-center gap-3 mb-6">
              <Badge
                variant="outline"
                className="border-2 border-orange-600 text-orange-700 bg-orange-50 font-bold uppercase tracking-wide"
              >
                <Flame className="mr-1 w-4 h-4" />
                Today&apos;s Special
              </Badge>
            </div>

            <Link href={`/recipe?cook=${encodeURIComponent(recipe.strMeal)}`}>
              <div className="relative bg-white border-2 border-stone-900 overflow-hidden hover:border-orange-600 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-4/3 md:aspect-auto border-b-2 md:border-b-0 md:border-r-2 border-stone-900">
                    <Image
                      src={recipe.strMealThumb}
                      alt={recipe.strMeal}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 720px"
                    />
                  </div>

                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {recipe.strCategory && (
                        <Badge
                          variant="outline"
                          className="border-2 border-orange-600 text-orange-700 bg-orange-50 font-bold"
                        >
                          {recipe.strCategory}
                        </Badge>
                      )}
                      {recipe.strArea && (
                        <Badge
                          variant="outline"
                          className="border-2 border-stone-900 text-stone-700 bg-stone-50 font-bold"
                        >
                          <Globe className="w-3 h-3 mr-1" />
                          {recipe.strArea}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-4xl md:text-5xl font-bold text-stone-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                      {recipe.strMeal}
                    </h3>

                    {recipe.strInstructions && (
                      <p className="text-stone-600 mb-6 line-clamp-3 font-light text-lg">
                        {recipe.strInstructions.substring(0, 200)}...
                      </p>
                    )}

                    <Button className="w-fit bg-orange-600 hover:bg-orange-700 text-white font-bold border-2 border-orange-700 px-6 py-5">
                      Start Cooking <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}

