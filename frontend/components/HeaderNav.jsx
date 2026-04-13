"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import {
  Compass,
  Cookie,
  Flame,
  Home,
  Refrigerator,
  Sparkles,
} from "lucide-react";

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

export default function HeaderNav({ isSignedIn, variant = "desktop" }) {
  const pathname = usePathname();

  const items = [
    {
      href: "/",
      label: "Home",
      Icon: Home,
      active: isActivePath(pathname, "/"),
    },
    {
      href: "/today",
      label: "Today\u2019s Special",
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
    {
      href: "/recipes",
      label: "My Recipes",
      Icon: Cookie,
      active: isRecipesActive(pathname),
    },
    {
      href: "/pantry",
      label: "My Pantry",
      Icon: Refrigerator,
      active: isActivePath(pathname, "/pantry"),
    },
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

  if (variant === "mobile") {
    const mobileItems = items.filter((item) =>
      ["/", "/explore", "/today"].includes(item.href),
    );

    return mobileItems.map(({ href, label, Icon, active, showPing }) => (
      <Link key={href} href={href} className="md:hidden">
        <Button
          variant="ghost"
          className={[
            "relative font-medium gap-2 overflow-hidden",
            active
              ? "text-orange-700 bg-orange-50 hover:bg-orange-100 hover:text-orange-700"
              : "text-stone-600 hover:text-orange-600 hover:bg-orange-50",
          ].join(" ")}
        >
          <Icon
            className={[
              "w-4 h-4",
              showPing ? "animate-flameflicker text-red-600" : "",
            ].join(" ")}
          />
          {showPing ? (
            <span className="relative today-label">
              {label === "Explore Recipes"
                ? "Explore"
                : label.replace("\u2019s Special", "")}
            </span>
          ) : label === "Explore Recipes" ? (
            "Explore"
          ) : (
            label.replace("\u2019s Special", "")
          )}
        </Button>
      </Link>
    ));
  }

  return (
    <div className="hidden md:flex items-center justify-center gap-2 text-sm font-medium text-stone-600 whitespace-nowrap">
      {items.map(({ href, label, Icon, active, showPing }) => (
        <Link
          key={href}
          href={href}
          className={[
            "relative flex gap-1.5 items-center rounded-md px-3 py-2 transition-colors overflow-hidden",
            active
              ? "text-orange-700 bg-orange-50"
              : "hover:text-orange-600 hover:bg-orange-50/60",
          ].join(" ")}
        >
          <Icon
            className={[
              "w-4 h-4",
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
    </div>
  );
}
