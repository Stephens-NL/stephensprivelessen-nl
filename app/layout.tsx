// app/layout.tsx
import { Inter } from "next/font/google";
import { Anton } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "../components/Footer";
import { ReactNode } from "react";
import { Metadata } from 'next';
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const anton = Anton({ 
    weight: '400',
    subsets: ['latin'],
    variable: '--font-anton'
});

export const metadata: Metadata = {
  title: {
    template: '%s | Stephens Privelessen',
    default: 'Stephens Privelessen | Wiskunde & Creatieve Workshops',
  },
  description: 'Gespecialiseerde workshops in wiskunde, statistiek en creatieve vaardigheden. Persoonlijke begeleiding voor studenten en docenten in Amsterdam.',
  keywords: ['wiskunde', 'statistiek', 'workshops', 'onderwijs', 'creatief', 'amsterdam', 'bijles', 'docenten', 'studenten', 'privelessen', 'wiskundeworkshops', 'statistiekworkshops'],
  authors: [{ name: 'Stephen Adei' }],
  creator: 'Stephen Adei',
  publisher: 'Stephens Privelessen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.stephensprivelessen.nl'),
  alternates: {
    canonical: '/',
    languages: {
      'nl-NL': '/nl',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'Stephens Privelessen | Wiskunde & Creatieve Workshops',
    description: 'Gespecialiseerde workshops in wiskunde, statistiek en creatieve vaardigheden. Persoonlijke begeleiding voor studenten en docenten in Amsterdam.',
    url: 'https://www.stephensprivelessen.nl',
    siteName: 'Stephens Privelessen',
    locale: 'nl_NL',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Stephens Privelessen - Wiskunde & Creatieve Workshops',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stephens Privelessen | Wiskunde & Creatieve Workshops',
    description: 'Gespecialiseerde workshops in wiskunde, statistiek en creatieve vaardigheden.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${anton.variable} font-sans`}>
      <body>
        <LanguageProvider>
          <Header />
          <main className="pt-24">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}