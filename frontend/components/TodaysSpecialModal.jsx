"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Flame, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TodaysSpecialModal({ recipe }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  if (!recipe) return null;

  const handleStartCooking = () => {
    router.push(`/recipe?cook=${encodeURIComponent(recipe.strMeal)}`);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="hover:text-orange-600 transition-colors flex items-center gap-1.5 text-sm font-medium text-stone-600">
          <Flame className="w-4 h-4" />
          Today&apos;s Special
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-600" />
            Today&apos;s Special
          </DialogTitle>
          <DialogDescription>
            A fresh recipe picked for you from around the world.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 border-2 border-stone-200 bg-white overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-4/3 md:aspect-auto border-b-2 md:border-b-0 md:border-r-2 border-stone-200">
              <Image
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 720px"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
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

                <h3 className="text-3xl md:text-4xl font-bold text-stone-900 mb-3 leading-tight">
                  {recipe.strMeal}
                </h3>

                {recipe.strInstructions && (
                  <p className="text-stone-600 font-light text-base line-clamp-4">
                    {recipe.strInstructions.substring(0, 260)}...
                  </p>
                )}
              </div>

              <Button
                onClick={handleStartCooking}
                className="w-fit bg-orange-600 hover:bg-orange-700 text-white font-bold border-2 border-orange-700 px-6 py-5"
              >
                Start Cooking <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

