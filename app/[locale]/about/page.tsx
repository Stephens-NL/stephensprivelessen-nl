import { Metadata } from 'next';
import About from '../../components/About'
import React from 'react'

export const metadata: Metadata = {
  title: "Over Ons | Stephens Privelessen Amsterdam",
  description: "Over Stephens Privelessen Amsterdam: Expert in wiskunde, statistiek & scriptiebegeleiding. Persoonlijke aanpak, ervaren docent. Online of Science Park.",
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
    title: "Over Ons | Stephens Privelessen Amsterdam",
    description: "Over Stephens Privelessen Amsterdam: Expert in wiskunde, statistiek & scriptiebegeleiding. Persoonlijke aanpak, ervaren docent.",
    url: "https://www.stephensprivelessen.nl/about",
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: `/api/og?title=${encodeURIComponent("Over Ons A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Lees Meer")}&footerText=${encodeURIComponent("Onze Visie & Aanpak")}&featureImageUrl=/images/about-banner.jpg`,
        width: 1200,
        height: 630,
        alt: "Over Stephens Privelessen Amsterdam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Over Ons | Stephens Privelessen Amsterdam",
    description: "Ontdek onze visie op onderwijs en persoonlijke begeleiding.",
    images: [`/api/og?title=${encodeURIComponent("Over Ons A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Lees Meer")}&footerText=${encodeURIComponent("Onze Visie & Aanpak")}&featureImageUrl=/images/about-banner.jpg`],
  },
  alternates: {
    canonical: '/about',
    languages: {
      'nl-NL': '/about',
      'en-US': '/about',
    },
  },
};

const page = () => {
  return (
    <About />
  )
}

export default page
