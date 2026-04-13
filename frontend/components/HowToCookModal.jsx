"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChefHat, Lightbulb, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function HowToCookModal({ children }) {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipeName.trim()) {
      toast.error("Please enter a recipe name");
      return;
    }

    router.push(`/recipe?cook=${encodeURIComponent(recipeName.trim())}`);
    setIsOpen(false);
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
    if (!open) setRecipeName("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <button className="hover:text-orange-600 transition-colors flex items-center gap-1.5 text-sm font-medium text-stone-600">
            <ChefHat className="w-4 h-4" />
            How to Cook?
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="p-0 overflow-hidden sm:max-w-xl">
        <div className="p-6 border-b border-stone-200 bg-stone-50">
          <DialogHeader className="gap-1">
            <DialogTitle className="text-2xl font-serif font-bold flex items-center gap-2 text-stone-900">
              <ChefHat className="w-6 h-6 text-orange-600" />
              How to Cook?
            </DialogTitle>
            <DialogDescription className="text-stone-600">
              Enter a recipe name and get a step-by-step guide from our AI chef.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-800">
              What would you like to cook?
            </label>
            <div className="relative">
              <input
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                placeholder="Chicken Biryani, Chocolate Cake, Pasta Carbonara..."
                className="w-full h-12 px-4 pr-11 border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                autoFocus
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            </div>
            <p className="text-xs text-stone-500">
              Tip: type a dish name and press Enter.
            </p>
          </div>

          <div className="border-2 border-stone-200 bg-white p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-800 mb-3">
              <Lightbulb className="w-4 h-4 text-orange-600" />
              Suggested recipes
            </div>
            <div className="flex flex-wrap gap-2">
              {["Butter Chicken", "Chocolate Brownies", "Caesar Salad"].map(
                (example) => (
                  <Button
                    key={example}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="rounded-full border-stone-300"
                    onClick={() => setRecipeName(example)}
                  >
                    {example}
                  </Button>
                )
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!recipeName.trim()}
            className="w-full h-12"
          >
            <ChefHat className="w-5 h-5" />
            Get Recipe
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
