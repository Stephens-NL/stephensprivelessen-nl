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

const defaultKeywords = [
  // Algemene termen
  'bijles amsterdam',
  'privelessen amsterdam',
  'huiswerkbegeleiding amsterdam',
  
  // Wiskunde gerelateerd
  'wiskunde bijles amsterdam',
  'wiskunde examentraining',
  'wiskunde huiswerk hulp',
  'wiskunde tutor amsterdam',
  'wiskundebijles aan huis',
  'online wiskunde bijles',
  'bijles wiskunde vwo',
  'bijles wiskunde havo',
  'bijles wiskunde vmbo',
  
  // Statistiek gerelateerd
  'statistiek bijles',
  'statistiek hulp',
  'spss hulp amsterdam',
  'statistiek uitleg',
  'statistiek workshops',
  'data analyse hulp',
  'statistiek eindexamen',
  
  // Scriptie gerelateerd
  'scriptiebegeleiding amsterdam',
  'scriptie hulp statistiek',
  'thesis begeleiding',
  'onderzoeksmethoden hulp',
  'data analyse scriptie',
  'methodologie hulp',
  
  // Software/Tools
  'spss begeleiding',
  'r studio hulp',
  'python data analyse',
  'stata hulp',
  'excel data analyse',
  
  // Niveau specifiek
  'universitair niveau',
  'hbo statistiek',
  'wo scriptie hulp',
  'academische begeleiding',
  
  // Locatie specifiek
  'bijles zuid-amsterdam',
  'bijles centrum amsterdam',
  'bijles noord-amsterdam',
  'bijles west-amsterdam',
  'bijles oost-amsterdam',
];

export const metadata: Metadata = {
  metadataBase: new URL('https://www.stephensprivelessen.nl'),
  title: {
    default: 'Stephens Privelessen | Wiskunde & Statistiek Bijles Amsterdam',
    template: '%s | Stephens Privelessen Amsterdam'
  },
  description: 'Professionele wiskunde en statistiek bijles in Amsterdam. Scriptiebegeleiding, data-analyse en examentraining. Persoonlijke begeleiding op alle niveaus.',
  keywords: defaultKeywords,
  authors: [{ name: 'Stephen Adei' }],
  creator: 'Stephen Adei',
  publisher: 'Stephens Privelessen',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: '/',
    languages: {
      'nl-NL': '/',
      'en-US': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    title: 'Wiskunde & Statistiek Bijles Amsterdam | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek bijles in Amsterdam. Scriptiebegeleiding, data-analyse en examentraining. Persoonlijke begeleiding op alle niveaus.',
    url: 'https://www.stephensprivelessen.nl',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Stephens Privelessen - Wiskunde & Statistiek Bijles Amsterdam',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Voeg hier je Google verificatie code toe
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Stephens Privelessen',
  description: 'Professionele wiskunde en statistiek bijles in Amsterdam. Scriptiebegeleiding en data-analyse ondersteuning.',
  url: 'https://www.stephensprivelessen.nl',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Amsterdam',
    addressRegion: 'NH',
    addressCountry: 'NL'
  },
  areaServed: {
    '@type': 'City',
    name: 'Amsterdam',
    '@id': 'https://www.wikidata.org/wiki/Q727'
  },
  teaches: [
    'Wiskunde',
    'Statistiek',
    'Data Analyse',
    'Onderzoeksmethoden',
    'Scriptiebegeleiding'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Onderwijsdiensten',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wiskunde Bijles',
          description: 'Persoonlijke wiskunde bijles voor alle niveaus'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Statistiek Begeleiding',
          description: 'Professionele begeleiding bij statistiek en data-analyse'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Scriptiebegeleiding',
          description: 'Ondersteuning bij scriptie en onderzoeksmethoden'
        }
      }
    ]
  },
  sameAs: [
    'https://www.linkedin.com/in/yourusername', // Voeg hier je sociale media links toe
  ]
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${anton.variable} font-sans`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="alternate" hrefLang="nl" href="https://www.stephensprivelessen.nl" />
        <link rel="alternate" hrefLang="en" href="https://www.stephensprivelessen.nl/en" />
        <link rel="canonical" href="https://www.stephensprivelessen.nl" />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main className="pt-14 md:pt-24">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}