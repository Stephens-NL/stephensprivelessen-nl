import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scriptiebegeleiding Amsterdam | Thesis Begeleiding & Methodologie',
  description: 'Professionele scriptiebegeleiding in Amsterdam. Expert in statistiek, methodologie en data-analyse. Persoonlijke begeleiding voor bachelor en master scripties.',
  keywords: [
    'scriptiebegeleiding amsterdam',
    'thesis begeleiding',
    'scriptie hulp',
    'methodologie hulp',
    'statistiek scriptie',
    'data analyse scriptie',
    'spss hulp',
    'r studio hulp',
    'python data analyse',
    'kwantitatief onderzoek',
    'onderzoeksmethoden',
    'scriptie statistiek',
    'bachelor scriptie hulp',
    'master thesis begeleiding',
    'academische begeleiding',
    'statistische analyse scriptie',
  ],
  openGraph: {
    title: 'Scriptiebegeleiding Amsterdam | Expert Thesis Begeleiding',
    description: 'Professionele scriptiebegeleiding met focus op statistiek, methodologie en data-analyse. Persoonlijke begeleiding voor bachelor en master studenten.',
    url: 'https://www.stephensprivelessen.nl/scriptiebegeleiding',
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'en_US',
    siteName: 'Stephens Privelessen',
    images: [
      {
        url: '/images/thesis-supervision.jpg',
        width: 1200,
        height: 630,
        alt: 'Scriptiebegeleiding Amsterdam - Stephens Privelessen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scriptiebegeleiding Amsterdam | Expert Thesis Begeleiding',
    description: 'Professionele scriptiebegeleiding met focus op statistiek en methodologie. Persoonlijke aanpak voor studenten.',
    images: ['/images/thesis-supervision.jpg'],
  },
  alternates: {
    canonical: '/scriptiebegeleiding',
    languages: {
      'nl-NL': '/scriptiebegeleiding',
      'en-US': '/thesis-supervision',
    },
  },
}; 