import React from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import HowToCookModal from "./HowToCookModal";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";
import UserDropdown from "./UserDropdown";
import { currentUser } from "@clerk/nextjs/server";
import HeaderNav from "./HeaderNav";
import MobileSidebar from "./MobileSidebar";
import PlanIndicator from "./PlanIndicator";

export default async function Header() {
  const clerkUser = await currentUser();
  const isSignedIn = Boolean(clerkUser);

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
            <PlanIndicator />

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
