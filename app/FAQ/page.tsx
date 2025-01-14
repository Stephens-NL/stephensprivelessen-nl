// app/faq/page.tsx
import { Metadata } from 'next';
import FAQPage from '@/components/Faq';

export const metadata: Metadata = {
  title: "Veelgestelde Vragen | Stephens Privelessen Amsterdam",
  description: "Vind antwoorden op veelgestelde vragen over onze bijles, scriptiebegeleiding en workshops in Amsterdam. Duidelijke informatie over onze aanpak en werkwijze.",
  keywords: [
    'faq stephens privelessen',
    'veelgestelde vragen bijles',
    'bijles amsterdam faq',
    'scriptiebegeleiding vragen',
    'wiskunde bijles informatie',
    'statistiek hulp vragen',
    'workshops amsterdam faq',
    'tutoring amsterdam vragen',
    'bijles kosten',
    'bijles werkwijze',
    'scriptiebegeleiding aanpak',
    'online bijles vragen',
  ],
  openGraph: {
    title: "FAQ | Stephens Privelessen Amsterdam",
    description: "Antwoorden op veelgestelde vragen over onze bijles en begeleiding in Amsterdam.",
    url: "https://www.stephensprivelessen.nl/faq",
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: '/images/faq-banner.jpg',
        width: 1200,
        height: 630,
        alt: "FAQ Stephens Privelessen Amsterdam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Stephens Privelessen Amsterdam",
    description: "Veelgestelde vragen over onze bijles en begeleiding in Amsterdam.",
    images: ['/images/faq-banner.jpg'],
  },
  alternates: {
    canonical: '/faq',
    languages: {
      'nl-NL': '/faq',
      'en-US': '/faq',
    },
  },
};

// Add revalidation settings
export const revalidate = 3600; // Revalidate every hour

export default function FaqPage() {
  return <FAQPage />;
}