// app/layout.tsx
import './globals.css';
import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Anton } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import WhatsAppButton from '@/components/shared/WhatsAppButton';
import { config } from '@/data/config';
import { organizationSchema, websiteSchema } from '@/lib/structured-data';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-anton' });

export const viewport: Viewport = {
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  metadataBase: new URL(config.business.siteUrl),
  title: {
    default: 'Stephens Privelessen | Wiskunde & Statistiek Privelessen Amsterdam',
    template: '%s | Stephens Privelessen Amsterdam'
  },
    description: 'Expert bijles in wiskunde, statistiek en programmeren in Amsterdam. Online of op Science Park. Van €75/uur. Scriptiebegeleiding, SPSS, R, Python. UvA & VU studenten.',
    keywords: [
    // Algemene termen
    'privelessen amsterdam',
    'bijles amsterdam',
    'bijles aan huis amsterdam',
    'bijles geven amsterdam',
    'bijles zoeken amsterdam',
    'bijles nodig amsterdam',
    'goede bijles amsterdam',
    'betaalbare bijles amsterdam',
    'professionele bijles amsterdam',
    'ervaren bijles amsterdam',
    'bijles docent amsterdam',
    'bijles leraar amsterdam',
    'bijles student amsterdam',
    'bijles universitair amsterdam',
    'bijles hbo amsterdam',
    'bijles middelbare school amsterdam',
    'bijles basisschool amsterdam',
    'huiswerkbegeleiding amsterdam',
    'huiswerk hulp amsterdam',
    'studiebegeleiding amsterdam',
    'studieondersteuning amsterdam',
    'examentraining amsterdam',
    
    // Wiskunde gerelateerd
    'wiskunde bijles amsterdam',
    'wiskunde privelessen amsterdam',
    'wiskunde examentraining',
    'wiskunde huiswerk hulp',
    'wiskunde tutor amsterdam',
    'wiskunde privelessen aan huis',
    'online wiskunde bijles',
    'online wiskunde privelessen',
    'bijles wiskunde vwo',
    'bijles wiskunde havo',
    'bijles wiskunde vmbo',
    'privelessen wiskunde vwo',
    'privelessen wiskunde havo',
    'privelessen wiskunde vmbo',
    'wiskunde a bijles',
    'wiskunde b bijles',
    'wiskunde c bijles',
    'wiskunde d bijles',
    
    // Statistiek gerelateerd
    'statistiek bijles',
    'statistiek privelessen',
    'statistiek hulp',
    'spss hulp amsterdam',
    'statistiek uitleg',
    'statistiek workshops',
    'data analyse hulp',
    'statistiek eindexamen',
    'statistiek tentamen hulp',
    'statistiek examen training',
    
    // Scriptie gerelateerd
    'scriptiebegeleiding amsterdam',
    'scriptie hulp statistiek',
    'thesis begeleiding',
    'onderzoeksmethoden hulp',
    'data analyse scriptie',
    'methodologie hulp',
    'scriptie bijles',
    'scriptie privelessen',
    'afstuderen hulp',
    'afstudeerbegeleiding',
    
    // Software/Tools
    'spss begeleiding',
    'spss bijles',
    'r studio hulp',
    'r studio bijles',
    'python data analyse',
    'python bijles',
    'stata hulp',
    'stata bijles',
    'excel data analyse',
    'excel bijles',
    
    // Niveau specifiek
    'universitair niveau',
    'hbo statistiek',
    'wo scriptie hulp',
    'academische begeleiding',
    'vwo bijles',
    'havo bijles',
    'vmbo bijles',
    'mbo bijles',
    'basisschool bijles',
    
    // Locatie specifiek
    'bijles zuid-amsterdam',
    'bijles centrum amsterdam',
    'bijles noord-amsterdam',
    'bijles west-amsterdam',
    'bijles oost-amsterdam',
    'privelessen zuid-amsterdam',
    'privelessen centrum amsterdam',
    'privelessen noord-amsterdam',
    'privelessen west-amsterdam',
    'privelessen oost-amsterdam',
    
    // Specifieke wijken
    'bijles oud-zuid',
    'bijles de pijp',
    'bijles rivierenbuurt',
    'bijles oud-west',
    'bijles jordaan',
    'bijles ijburg',
    'bijles zuid-as',
    'bijles buitenveldert',
    'bijles amstelveen',
    
    // Online varianten
    'online bijles',
    'online privelessen',
    'zoom bijles',
    'skype bijles',
    'teams bijles',
    'digitale bijles',
    'virtuele bijles',
    'afstandsbijles',
    
    // Specifieke doelgroepen
    'bijles voor studenten',
    'bijles voor scholieren',
    'bijles voor volwassenen',
    'bijles voor werkenden',
    'bijles voor beginners',
    'bijles voor gevorderden',
    'bijles examenvoorbereiding',
    'bijles tentamenvoorbereiding',
    
    // Universiteitsvakken
    'econometrie bijles',
    'econometrie hulp',
    'econometrie tentamen',
    'kwantitatieve methoden bijles',
    'kwantitatieve methoden hulp',
    'research methods bijles',
    'research methods hulp',
    'methodologie bijles',
    'methodologie hulp',
    'data science bijles',
    'data science hulp',
    'machine learning bijles',
    'machine learning hulp',
    'artificial intelligence bijles',
    'artificial intelligence hulp',
    'business analytics bijles',
    'business analytics hulp',
    'operations research bijles',
    'operations research hulp',
    'quantitative finance bijles',
    'quantitative finance hulp',
    'financial mathematics bijles',
    'financial mathematics hulp',
    'actuariële wiskunde bijles',
    'actuariële wiskunde hulp',
    'biostatistiek bijles',
    'biostatistiek hulp',
    'psychologische statistiek bijles',
    'psychologische statistiek hulp',
    'medische statistiek bijles',
    'medische statistiek hulp',
    'epidemiologie statistiek bijles',
    'epidemiologie statistiek hulp',
    'multivariate analyse bijles',
    'multivariate analyse hulp',
    'tijdreeksanalyse bijles',
    'tijdreeksanalyse hulp',
    'regressieanalyse bijles',
    'regressieanalyse hulp',
    'variantieanalyse bijles',
    'variantieanalyse hulp',
    'factoranalyse bijles',
    'factoranalyse hulp',
    'structural equation modeling bijles',
    'structural equation modeling hulp',
    'data mining bijles',
    'data mining hulp',
    'big data analyse bijles',
    'big data analyse hulp',
    'statistische software bijles',
    'statistische software hulp',
    'data visualisatie bijles',
    'data visualisatie hulp',
    'experimenteel ontwerp bijles',
    'experimenteel ontwerp hulp',
    'steekproeftheorie bijles',
    'steekproeftheorie hulp',
    'bayesiaanse statistiek bijles',
    'bayesiaanse statistiek hulp',
    'stochastiek bijles',
    'stochastiek hulp',
    'kansrekening bijles',
    'kansrekening hulp',
    'discrete wiskunde bijles',
    'discrete wiskunde hulp',
    'numerieke wiskunde bijles',
    'numerieke wiskunde hulp',
    'optimalisatie bijles',
    'optimalisatie hulp',
    'lineaire algebra bijles',
    'lineaire algebra hulp',
    'differentiaalvergelijkingen bijles',
    'differentiaalvergelijkingen hulp',
    'complexe analyse bijles',
    'complexe analyse hulp',
    'topologie bijles',
    'topologie hulp',
    'abstracte algebra bijles',
    'abstracte algebra hulp',
    'functionaalanalyse bijles',
    'functionaalanalyse hulp',
    'meetkunde bijles',
    'meetkunde hulp',
    'logica bijles',
    'logica hulp',
  ],
  authors: [{ name: 'Stephen Adei' }],
  creator: 'Stephen Adei',
  publisher: 'Stephens Privelessen',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
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
    title: 'Wiskunde & Statistiek Privelessen Amsterdam | Stephens Privelessen',
    description: 'Expert bijles in wiskunde, statistiek en programmeren in Amsterdam. Online of op Science Park. Van €75/uur. Scriptiebegeleiding, SPSS, R, Python. UvA & VU studenten.',
    url: 'https://www.stephensprivelessen.nl',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(
          'Expert Bijles & Coaching'
        )}&brandText=${encodeURIComponent(
          'Stephensprivelessen.nl'
        )}&buttonText=${encodeURIComponent(
          'Ontdek Meer'
        )}&footerText=${encodeURIComponent(
          'Wiskunde | Statistiek | Scriptie'
        )}&featureImageUrl=${encodeURIComponent(
          '/images/og-default-banner.jpg'
        )}`,
        width: 1200,
        height: 630,
        alt: 'Expert Bijles & Coaching | Stephensprivelessen.nl',
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
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${inter.variable} ${anton.variable} font-sans`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <WhatsAppButton />
          <main className="pt-14 md:pt-24">{children}</main>
          <Footer />
          <Analytics />
          <SpeedInsights/>
        </LanguageProvider>
      </body>
    </html>
  );
}