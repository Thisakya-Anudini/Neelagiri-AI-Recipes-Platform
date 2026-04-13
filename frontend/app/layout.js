import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Neelagiri - AI Recipes Platform",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: neobrutalism,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="px-4 py-3 border-t border-stone-200 bg-linear-to-b from-white via-white to-orange-50/40">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center gap-3 text-center">
                <div className="h-12 w-12 rounded-2xl border border-stone-200 bg-white shadow-sm flex items-center justify-center shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Neelagiri Logo"
                    width={44}
                    height={44}
                    className="w-10 h-12"
                    priority
                  />
                </div>
                <div className="text-stone-700 font-semibold text-sm leading-none whitespace-nowrap">
                  Neelagiri Hotel & Bakery
                </div>
                <div className="text-stone-600 text-xs whitespace-nowrap">
                  © 2026. All Rights Reserved.
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
