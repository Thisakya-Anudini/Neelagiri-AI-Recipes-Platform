"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Flame, Compass, Cookie, Refrigerator, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import HowToCookModal from "./HowToCookModal";
import Image from "next/image";

function isActivePath(pathname, href) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function isRecipesActive(pathname) {
  return (
    pathname === "/recipes" ||
    pathname.startsWith("/recipes/") ||
    pathname === "/recipe" ||
    pathname.startsWith("/recipe/")
  );
}

export default function MobileSidebar({ isSignedIn }) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const items = [
    { href: "/", label: "Home", Icon: Home, active: isActivePath(pathname, "/") },
    {
      href: "/today",
      label: "Today’s Special",
      Icon: Flame,
      active: isActivePath(pathname, "/today"),
      showPing: true,
    },
    {
      href: "/explore",
      label: "Explore Recipes",
      Icon: Compass,
      active: isActivePath(pathname, "/explore"),
    },
    { href: "/recipes", label: "My Recipes", Icon: Cookie, active: isRecipesActive(pathname) },
    { href: "/pantry", label: "My Pantry", Icon: Refrigerator, active: isActivePath(pathname, "/pantry") },
    ...(!isSignedIn
      ? [
          {
            href: "/plans",
            label: "Subscriptions",
            Icon: Sparkles,
            active: isActivePath(pathname, "/plans"),
          },
        ]
      : []),
  ];

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md border border-stone-200 bg-white/70 hover:bg-white transition-colors"
      >
        <Menu className="h-5 w-5 text-stone-700" />
      </button>

      {open ? (
        <div className="md:hidden fixed inset-0 z-[60]">
          <button
            type="button"
            aria-label="Close menu backdrop"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          />

          <aside className="fixed left-0 top-0 h-[100dvh] w-72 bg-white text-stone-900 border-r border-stone-200 shadow-xl">
            <div className="min-h-full bg-white">
              <div className="h-16 px-4 flex items-center justify-between border-b border-stone-200">
              <div className="flex items-center gap-2">
                <Image
                  src="/orange-logo.png"
                  alt="Neelagiri Logo"
                  width={40}
                  height={40}
                  className="w-12 h-14"
                />
                <div className="font-semibold text-orange-700">NEELAGIRI</div>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-stone-100 transition-colors"
              >
                <X className="h-5 w-5 text-stone-700" />
              </button>
              </div>

              <div className="p-3">
                <nav className="flex flex-col gap-1">
                {items.map(({ href, label, Icon, active, showPing }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={[
                      "relative overflow-hidden flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-orange-50 text-orange-800"
                        : "text-stone-700 hover:bg-stone-100",
                    ].join(" ")}
                  >
                    <Icon
                      className={[
                        "h-4 w-4",
                        showPing ? "animate-flameflicker text-red-600" : "",
                      ].join(" ")}
                    />
                    {showPing ? (
                      <span className="relative today-label">{label}</span>
                    ) : (
                      label
                    )}
                  </Link>
                ))}
                </nav>

                <div className="mt-4 pt-4 border-t border-stone-200">
                  <HowToCookModal>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-stone-700 hover:text-orange-700 hover:bg-orange-50 font-medium gap-3"
                    >
                      <Sparkles className="h-4 w-4" />
                      How to Cook?
                    </Button>
                  </HowToCookModal>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
