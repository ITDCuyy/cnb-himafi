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
              <footer className="border-t bg-background">
                <div className="mx-auto max-w-6xl px-4 py-8 md:px-20">
                  <div className="grid gap-8 md:grid-cols-3">
                    <div>
                      <h3 className="text-lg font-semibold">HIMAFI ITB</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Gedung Fisika, Jl. Ganesha No. 10, Bandung
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Tautan</h3>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>
                          <Link
                            href="/about"
                            className="text-muted-foreground hover:text-primary"
                          >
                            Tentang
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/news"
                            className="text-muted-foreground hover:text-primary"
                          >
                            Kabar
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/blog"
                            className="text-muted-foreground hover:text-primary"
                          >
                            Blog
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">Media Sosial</h3>
                      <div className="mt-2 flex space-x-4">
                        <Link
                          href="https://www.instagram.com/himafi.itb"
                          className="text-muted-foreground transition-colors hover:text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaInstagram className="h-5 w-5" />
                        </Link>
                        <Link
                          href="https://x.com/HIMAFI_ITB"
                          className="text-muted-foreground transition-colors hover:text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaTwitter className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
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
