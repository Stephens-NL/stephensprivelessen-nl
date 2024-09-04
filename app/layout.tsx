'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { LanguageProvider, useLanguage } from "../contexts/LanguageContext";
import type { ReactNode } from "react";
import Head from "next/head";
import { usePathname } from 'next/navigation'; // Import usePathname hook
import { metadata as defaultMetadata } from "../data/";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";


const inter = Inter({ subsets: ["latin"] });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

function MetadataManager({ metadataOverride }: { metadataOverride?: Partial<typeof defaultMetadata> }) {
  const { language } = useLanguage();

  const metadata = { ...defaultMetadata, ...metadataOverride };

  return (
    <Head>
      <title>{metadata.title ?? ''}</title> {/* Ensure title is a string */}
      <meta name="description" content={metadata.description ?? ''} />
      <meta property="og:title" content={metadata.openGraph?.title ?? ''} />
      <meta property="og:description" content={metadata.openGraph?.description ?? ''} />
      <meta property="og:url" content={metadata.openGraph?.url ?? ''} />
      <meta property="og:image" content={metadata.openGraph?.images?.[0].url ?? ''} />
      <meta name="twitter:card" content={metadata.twitter?.card ?? ''} />
      <meta name="twitter:title" content={metadata.twitter?.title ?? ''} />
      <meta name="twitter:description" content={metadata.twitter?.description ?? ''} />
      <meta name="twitter:image" content={metadata.twitter?.images?.[0] ?? ''} />
      {/* Add other metadata as needed */}
    </Head>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // Use usePathname to get the current path

  const showHeader = !pathname!.includes('feedback');
  return (
    <html lang="nl">
      <LanguageProvider>
        <MetadataManager />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        // className={inter.className}
        >
          {showHeader && <Header />}
          {/* <FloatingNav navItems={navItems}/> */}
          <main className="flex-grow">{children}</main>
          {showHeader && <Footer />}
        </body>
      </LanguageProvider>
    </html>
  );
}