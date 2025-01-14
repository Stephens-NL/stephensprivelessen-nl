import { Metadata } from 'next';
import About from '../../components/About'
import React from 'react'

export const metadata: Metadata = {
  title: "Over Ons | Stephens Privelessen Amsterdam",
  description: "Leer meer over onze visie op onderwijs en onze aanpak van wiskunde, statistiek en scriptiebegeleiding in Amsterdam.",
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
    description: "Ontdek onze visie op onderwijs en persoonlijke begeleiding in wiskunde, statistiek en scriptiebegeleiding.",
    url: "https://www.stephensprivelessen.nl/about",
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: '/images/about-banner.jpg',
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
    images: ['/images/about-banner.jpg'],
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
