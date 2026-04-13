import React from "react";
import {
  ArrowRight,
  Star,
  Flame,
  Clock,
  Users,
  Camera,
  Sparkles,
  DollarSign,
  ScanLine,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SITE_STATS, FEATURES, HOW_IT_WORKS_STEPS } from "@/lib/data";
import Link from "next/link";

export default async function LandingPage() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <Badge
                variant="outline"
                className="border-2 border-orange-600 text-orange-700 bg-orange-50 text-sm font-bold mb-6 uppercase tracking-wide"
              >
                <Flame className="mr-1" />
                AI-Powered Cooking Assistant
              </Badge>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[0.95] tracking-tight">
                Make something{" "}
                <span className="text-orange-600 font-semibold">
                  delicious
                </span>{" "}
                from what you have
              </h1>

              <div className="mb-9 max-w-lg mx-auto md:mx-0">
                <p className="text-lg md:text-xl text-stone-700 font-light">
                  Snap Your Ingredients and Get Instant Recipe Suggestions.
                </p>
                <p className="mt-2 text-lg md:text-xl text-green-700 font-medium">
                  Cook Smarter, Waste Less and Save More.
                </p>
                
              </div>

              <Link href="/explore">
                <Button
                  size="xl"
                  variant="primary"
                  className="px-8 py-7 text-lg mt-5"
                >
                  Start Cooking Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <p className="mt-6 text-sm text-stone-500">
                <span className="font-bold text-stone-900">10k+ Cooks</span>{" "}
                Joined Last Month
              </p>
            </div>

            {/* Hero Image */}
            <Card className="relative w-full max-w-[450px] aspect-square md:aspect-4/5 border-4 border-stone-900 bg-stone-200 overflow-hidden py-0 mx-auto">
              <Image
                src="/ramyeon-dish.png" 
                alt="Delicious ramyeon dish"
                width={500}
                height={500}
                sizes="(min-width: 768px) 520px, 100vw"
                className="w-full h-full object-cover"
              />

              {/* Floating Card */}
              <Card className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm border-2 border-stone-900 py-0">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">
                        Korean Spicy Ramyeon
                      </h3>
                      <div className="flex gap-0.5 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3 fill-orange-500 text-orange-500"
                          />
                        ))}
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-2 border-green-700 bg-green-50 text-green-700 font-bold"
                    >
                      98% MATCH
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-xs text-stone-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 25 mins
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> 2 servings
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-4 border-y-2 border-stone-900 bg-stone-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
            {SITE_STATS.map((stat, i) => {
              const icons = [ScanLine, Sparkles, DollarSign, Star];
              const StatIcon = icons[i] ?? Sparkles;

              return (
                <div
                  key={i}
                  className="px-1 py-2 text-center md:py-0.5 md:px-4 md:border-l md:border-stone-800 first:md:border-l-0"
                >
                  <div className="flex items-center justify-center mb-1">
                    <div className="h-8 w-8 rounded-full bg-stone-800/40 flex items-center justify-center">
                      <StatIcon className="h-3.5 w-3.5 text-orange-500" />
                    </div>
                  </div>

                  <div className="text-xl md:text-5xl font-extrabold text-stone-50 leading-none">
                    {stat.val}
                  </div>
                  <div className="mt-0.5 text-[11px] md:text-base text-stone-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Your Smart Kitchen
            </h2>
            <p className="text-stone-600 text-xl font-light">
              Everything you need to master your meal prep.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="relative border-2 border-stone-200 bg-white hover:border-orange-500 hover:shadow-xl hover:-translate-y-0.5 transition-all group py-0 overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-orange-200/50 blur-3xl" />
                    </div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="border-2 border-orange-200 bg-orange-50 p-2.5 group-hover:border-orange-600 group-hover:bg-orange-600 transition-colors shrink-0">
                          <IconComponent className="w-5 h-5 text-orange-700 group-hover:text-white" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg md:text-xl font-bold leading-snug">
                            {feature.title}
                          </h3>
                          <p className="text-stone-600 text-sm md:text-base font-light leading-relaxed mt-1">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="shrink-0 text-[11px] font-mono bg-orange-600 text-white uppercase tracking-wide border-none px-2.5 py-1"
                      >
                        {feature.limit}
                      </Badge>
                    </div>

                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20 px-4 border-y-2 border-stone-200 bg-stone-900 text-stone-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 md:mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">Cook in 3 Steps</h2>
            <p className="text-stone-400 text-lg font-light max-w-2xl">
              A fast path from ingredients to a meal. Clear, simple, repeatable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((item, index) => {
              const icons = [Camera, Sparkles, UtensilsCrossed];
              const StepIcon = icons[index] ?? Sparkles;

              return (
                <div
                  key={item.step}
                  className="relative border-2 border-stone-700/80 bg-stone-950/40 p-7 pt-14 shadow-sm shadow-black/30 hover:border-orange-500/40 hover:shadow-md hover:shadow-black/40 transition-all overflow-hidden"
                >
                  <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-orange-500/10 blur-3xl" />

                  <Badge className="absolute top-4 left-4 rounded-full bg-orange-600 text-white border-none font-mono text-xs uppercase tracking-wide px-3 py-1">
                    Step {item.step}
                  </Badge>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-11 w-11 border-2 border-stone-700 bg-stone-900/60 flex items-center justify-center shrink-0">
                      <StepIcon className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-base md:text-lg text-stone-300 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
