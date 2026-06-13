import About from '@/components/About'
import React from 'react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? "Over Mij | Stephen's Privélessen Amsterdam" : "About Me | Stephen's Private Tutoring Amsterdam",
    description: isNl
      ? "Over Stephen's Privélessen Amsterdam: Expert in wiskunde, statistiek & scriptiebegeleiding. Persoonlijke aanpak, ervaren docent. Online of Science Park."
      : "About Stephen's Private Tutoring Amsterdam: Expert in mathematics, statistics & thesis supervision. Personal approach, experienced tutor. Online or Science Park.",
    keywords: [
      'bijles amsterdam',
      'wiskunde docent amsterdam',
      'statistiek expert',
      'scriptiebegeleider',
      'over stephens privelessen',
      'wiskundebijles amsterdam',
      'ervaren docent',
      'persoonlijke aanpak',
      'professionele begeleiding',
      'onderwijsvisie',
      'statistiek specialist',
      'methodologie expert',
    ],
    openGraph: {
      title: isNl ? "Over Mij | Stephen's Privélessen Amsterdam" : "About Me | Stephen's Private Tutoring Amsterdam",
      description: isNl
        ? "Over Stephen's Privélessen Amsterdam: Expert in wiskunde, statistiek & scriptiebegeleiding. Persoonlijke aanpak, ervaren docent."
        : "About Stephen's Private Tutoring Amsterdam: Expert in mathematics, statistics & thesis supervision. Personal approach, experienced tutor.",
      url: "https://www.stephensprivelessen.nl/about",
      type: 'website',
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: "Stephen's Privélessen",
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(isNl ? "Over Ons A'dam" : "About Us A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Lees Meer" : "Read More")}&footerText=${encodeURIComponent(isNl ? "Onze Visie & Aanpak" : "Our Vision & Approach")}&featureImageUrl=/images/about-banner.jpg`,
          width: 1200,
          height: 630,
          alt: isNl ? "Over Stephen's Privélessen Amsterdam" : "About Stephen's Private Tutoring Amsterdam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isNl ? "Over Mij | Stephen's Privélessen Amsterdam" : "About Me | Stephen's Private Tutoring Amsterdam",
      description: isNl
        ? "Ontdek onze visie op onderwijs en persoonlijke begeleiding."
        : "Discover our vision on education and personal tutoring.",
      images: [`/api/og?title=${encodeURIComponent(isNl ? "Over Ons A'dam" : "About Us A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Lees Meer" : "Read More")}&footerText=${encodeURIComponent(isNl ? "Onze Visie & Aanpak" : "Our Vision & Approach")}&featureImageUrl=/images/about-banner.jpg`],
    },
    alternates: {
      canonical: '/about',
      languages: {
        'nl-NL': '/about',
        'en-US': '/about',
      },
    },
  };
}

const page = () => {
  return (
    <About />
  )
}

export default page
