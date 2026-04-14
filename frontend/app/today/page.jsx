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

  const recipeHref = recipe?.strMeal
    ? `/recipe?cook=${encodeURIComponent(recipe.strMeal)}`
    : "/today";

  return (
    <div className="min-h-screen bg-linear-to-b from-stone-50 via-stone-50 to-orange-50/40 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 md:mb-7">
          <h1 className="text-5xl md:text-6xl font-bold text-stone-900 tracking-tight leading-[1.05]">
            Today&apos;s Special
          </h1>
          <p className="mt-2 text-lg md:text-xl text-stone-600 font-light max-w-2xl">
            A fresh recipe picked for you from around the world.
          </p>
        </header>

        {!recipe && (
          <div className="bg-white border border-stone-200 p-10 md:p-12 text-center shadow-xs rounded-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Couldn&apos;t load today&apos;s special
            </h2>
            <p className="text-stone-600 mb-6 font-light">
              Please try again in a moment.
            </p>
            <Link href="/today" prefetch={false}>
              <Button variant="primary" size="lg">Retry</Button>
            </Link>
          </div>
        )}

        {recipe && (
          <section aria-label="Recipe of the day">
            <div className="mb-3 flex items-center gap-2 text-stone-600">
              <Flame className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium">
                Recipe of the Day
              </span>
              <span className="text-sm text-stone-400">•</span>
              <span className="text-sm font-light">
                Curated for variety, seasonality, and inspiration.
              </span>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xs hover:shadow-xl transition-shadow">
              <div className="grid md:grid-cols-2">
                <Link
                  href={recipeHref}
                  className="relative block aspect-4/3 md:aspect-auto md:min-h-[420px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <Image
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 720px"
                    priority
                  />
                  <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
                </Link>

                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-5">
                    {recipe.strCategory ? (
                      <Badge
                        variant="outline"
                        className="border-orange-200 bg-orange-50 text-orange-700 font-semibold"
                      >
                        {recipe.strCategory}
                      </Badge>
                    ) : null}
                    {recipe.strArea ? (
                      <Badge
                        variant="outline"
                        className="border-stone-200 bg-stone-50 text-stone-700 font-semibold"
                      >
                        <Globe className="w-3.5 h-3.5 mr-1" />
                        {recipe.strArea}
                      </Badge>
                    ) : null}
                  </div>

                  <Link
                    href={recipeHref}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-md"
                  >
                    <h3 className="text-4xl md:text-5xl font-bold text-stone-900 leading-tight tracking-tight group-hover:text-orange-700 transition-colors">
                      {recipe.strMeal}
                    </h3>
                  </Link>

                  {recipe.strInstructions ? (
                    <p className="mt-4 text-stone-600 line-clamp-4 font-light text-lg leading-relaxed">
                      {recipe.strInstructions.substring(0, 220)}...
                    </p>
                  ) : null}

                  <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                    <Button
                      asChild
                      variant="primary"
                      size="xl"
                      className="w-full sm:w-auto"
                    >
                      <Link href={recipeHref}>
                        Start Cooking <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="xl"
                      className="w-full sm:w-auto border-stone-200"
                    >
                      <Link href={recipeHref}>View Recipe</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
