// app/contact/page.tsx
import { Metadata } from 'next';
import React from 'react';
import Contact from '@/components/contact/Contact';

export const metadata: Metadata = {
  title: "Contact | Stephens Privelessen Amsterdam",
  description: "Neem contact op voor professionele bijles in wiskunde, statistiek of scriptiebegeleiding in Amsterdam. Persoonlijke aanpak en flexibele planning.",
  keywords: [
    'contact stephens privelessen',
    'bijles afspraak amsterdam',
    'wiskunde bijles contact',
    'statistiek hulp contact',
    'scriptiebegeleiding contact',
    'bijles aanvragen',
    'contact tutoring amsterdam',
    'afspraak maken bijles',
    'contact opnemen bijles',
    'wiskunde tutor contact',
    'statistiek begeleiding contact',
  ],
  openGraph: {
    title: "Contact | Stephens Privelessen Amsterdam",
    description: "Neem contact op voor professionele bijles in wiskunde, statistiek of scriptiebegeleiding in Amsterdam.",
    url: "https://www.stephensprivelessen.nl/contact",
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Contact A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Neem Contact Op")}&footerText=${encodeURIComponent("Wiskunde, Statistiek & Meer")}&featureImageUrl=/images/contact-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Contact Stephens Privelessen Amsterdam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Stephens Privelessen Amsterdam",
    description: "Neem contact op voor professionele bijles en begeleiding in Amsterdam.",
    images: [`/api/og?title=${encodeURIComponent("Contact A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Neem Contact Op")}&footerText=${encodeURIComponent("Wiskunde, Statistiek & Meer")}&featureImageUrl=/images/contact-banner.jpg`],
  },
  alternates: {
    canonical: '/contact',
    languages: {
      'nl-NL': '/contact',
      'en-US': '/contact',
    },
  },
};

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;