// app/contact/page.tsx
import React from 'react';
import Contact from '@/components/contact/Contact';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? "Contact | Stephens Privelessen Amsterdam" : "Contact | Stephens Private Tutoring Amsterdam",
    description: isNl
      ? "Contact Stephens Privelessen Amsterdam. Boek direct bijles in wiskunde, statistiek of scriptiebegeleiding. Online of Science Park. Van €75/uur. Snelle reactie."
      : "Contact Stephens Private Tutoring Amsterdam. Book tutoring in mathematics, statistics or thesis supervision. Online or Science Park. From €75/hr. Quick response.",
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
      title: isNl ? "Contact | Stephens Privelessen Amsterdam" : "Contact | Stephens Private Tutoring Amsterdam",
      description: isNl
        ? "Contact Stephens Privelessen Amsterdam. Boek direct bijles in wiskunde, statistiek of scriptiebegeleiding. Online of Science Park. Van €75/uur."
        : "Contact Stephens Private Tutoring Amsterdam. Book tutoring in mathematics, statistics or thesis supervision. Online or Science Park. From €75/hr.",
      url: "https://www.stephensprivelessen.nl/contact",
      type: 'website',
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: 'Stephens Privelessen',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent("Contact A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Neem Contact Op" : "Get in Touch")}&footerText=${encodeURIComponent(isNl ? "Wiskunde, Statistiek & Meer" : "Maths, Statistics & More")}&featureImageUrl=/images/contact-banner.jpg`,
          width: 1200,
          height: 630,
          alt: isNl ? "Contact Stephens Privelessen Amsterdam" : "Contact Stephens Private Tutoring Amsterdam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isNl ? "Contact | Stephens Privelessen Amsterdam" : "Contact | Stephens Private Tutoring Amsterdam",
      description: isNl
        ? "Neem contact op voor professionele bijles en begeleiding in Amsterdam."
        : "Get in touch for professional tutoring and guidance in Amsterdam.",
      images: [`/api/og?title=${encodeURIComponent("Contact A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Neem Contact Op" : "Get in Touch")}&footerText=${encodeURIComponent(isNl ? "Wiskunde, Statistiek & Meer" : "Maths, Statistics & More")}&featureImageUrl=/images/contact-banner.jpg`],
    },
    alternates: {
      canonical: '/contact',
      languages: {
        'nl-NL': '/contact',
        'en-US': '/contact',
      },
    },
  };
}

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;