import React from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import HowToCookModal from "./HowToCookModal";
import PricingModal from "./PricingModal";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import { Badge } from "./ui/badge";
import UserDropdown from "./UserDropdown";
import { auth, currentUser } from "@clerk/nextjs/server";
import HeaderNav from "./HeaderNav";
import MobileSidebar from "./MobileSidebar";

export default async function Header() {
  const clerkUser = await currentUser();
  const isSignedIn = Boolean(clerkUser);

  let subscriptionTier = "free";
  try {
    const { has } = auth();
    subscriptionTier = has?.({ plan: "pro" }) ? "pro" : "free";
  } catch {
    subscriptionTier = "free";
  }

  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-stone-200 bg-white/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-white/60">
      <nav className="w-full px-4 h-16 grid grid-cols-[auto_1fr_auto] items-center gap-3">
        {/* Logo (left) */}
        <div className="flex items-center gap-2 justify-self-start">
          <MobileSidebar isSignedIn={isSignedIn} />
          <Link
            href={isSignedIn ? "/explore" : "/"}
            className="flex items-center gap-2 group"
          >
            <Image
              src="/orange-logo.png"
              alt="Neelagiri Logo"
              width={40}
              height={40}
              className="w-12"
            />
          </Link>
        </div>

        {/* Middle nav */}
        <div className="hidden md:flex items-center justify-center gap-2 min-w-0">
          <HeaderNav isSignedIn={isSignedIn} variant="desktop" />
          <HowToCookModal />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 justify-self-end">
          <Show when="signed-in">
            <PricingModal subscriptionTier={subscriptionTier}>
                <Badge
                  variant="outline"
                  className={`flex h-8 px-3 gap-1.5 rounded-full text-xs font-semibold transition-all ${
                    subscriptionTier === "pro"
                      ? "bg-linear-to-r from-orange-600 to-amber-500 text-white border-none shadow-sm"
                      : "bg-white text-emerald-700 border-emerald-500 cursor-pointer hover:bg-emerald-50"
                  }`}
                >
                  <Sparkles
                    className={`h-3 w-3 ${
                      subscriptionTier === "pro"
                        ? "text-white fill-white/20"
                        : "text-emerald-600"
                    }`}
                  />
                <span>{subscriptionTier === "pro" ? "Pro Plan" : "Free Plan"}</span>
              </Badge>
            </PricingModal>

            <UserDropdown />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button
                variant="ghost"
                className="text-stone-600 hover:text-orange-600 hover:bg-orange-50 font-medium"
              >
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="primary" className="rounded-full px-6">
                Get Started
              </Button>
            </SignUpButton>
          </Show>
        </div>
      </nav>
    </header>
  );
}
