import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

import { Toaster } from "~/components/ui/sonner";
import { TopNav } from "~/components/topnav";
import { api } from "~/trpc/server";
import { ThemeProvider } from "~/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Mail01Icon,
  MapPinHouseIcon,
} from "@hugeicons/core-free-icons";

import { auth } from "~/server/auth";

export const metadata: Metadata = {
  title: "HIMAFI ITB",
  description: "Himpunan Mahasiswa Fisika ITB",
  icons: [{ rel: "icon", url: "/favicon.webp" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <TRPCReactProvider>
              <TopNav />
              {children}
              <footer className="border-t border-border/50 bg-muted/25">
                <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-14">
                  <div className="grid gap-8 lg:grid-cols-[1.25fr_0.9fr_0.9fr]">
                    <div className="space-y-4 rounded-2xl border border-primary/20 bg-card/90 p-5">
                      <h3 className="text-2xl font-bold">HIMAFI ITB</h3>
                      <p className="max-w-md text-base font-medium leading-8 text-foreground/80">
                        Komunitas mahasiswa fisika yang terus belajar dan
                        berdampak dengan pergerakan kolektif-integratif.
                      </p>
                      <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        <HugeiconsIcon icon={MapPinHouseIcon} size={16} />
                        Gedung Fisika, Jl. Ganesha No. 10, Bandung
                      </p>
                      <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                        <HugeiconsIcon icon={Mail01Icon} size={16} />
                        himafi_itb@km.itb.ac.id
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                        Navigasi
                      </h4>
                      <ul className="space-y-2 text-base font-semibold">
                        {[
                          { href: "/", label: "Beranda" },
                          { href: "/about", label: "Tentang" },
                          { href: "/programs", label: "Program" },
                          { href: "/news", label: "Kabar" },
                          { href: "/blog", label: "Blog" },
                          { href: "/faq", label: "FAQ" },
                        ].map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              className="inline-flex items-center gap-2 text-foreground/80 transition-colors hover:text-primary"
                            >
                              <HugeiconsIcon
                                icon={ArrowRight01Icon}
                                size={14}
                              />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
                        Media Sosial
                      </h4>
                      <div className="flex items-center gap-3">
                        <Link
                          href="https://www.instagram.com/himafi.itb"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground/75 transition-colors hover:border-primary/40 hover:text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram HIMAFI ITB"
                        >
                          <FaInstagram className="h-5 w-5" />
                        </Link>
                        <Link
                          href="https://x.com/HIMAFI_ITB"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground/75 transition-colors hover:border-primary/40 hover:text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="X HIMAFI ITB"
                        >
                          <FaTwitter className="h-5 w-5" />
                        </Link>
                      </div>
                      <p className="text-sm font-medium leading-7 text-foreground/70">
                        Ikuti kanal resmi HIMAFI ITB untuk informasi kegiatan,
                        publikasi, dan agenda terbaru.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-border/60 pt-4 text-center text-sm font-medium text-foreground/65">
                    © {new Date().getFullYear()} HIMAFI ITB. All rights
                    reserved.
                  </div>
                </div>
              </footer>
            </TRPCReactProvider>
          </SessionProvider>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
