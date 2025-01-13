import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Private Tutoring | Stephen&apos;s Private Lessons',
  description: 'Expert private tutoring in mathematics, statistics, programming, and more. Personalized lessons tailored to your needs.',
  openGraph: {
    title: 'Private Tutoring | Stephen&apos;s Private Lessons',
    description: 'Expert private tutoring in mathematics, statistics, programming, and more. Personalized lessons tailored to your needs.',
    locale: 'en',
    alternateLocale: ['nl'],
    type: 'website',
    siteName: 'Stephen&apos;s Private Lessons',
  },
  alternates: {
    canonical: '/bijles',
    languages: {
      'en': '/bijles',
      'nl': '/bijles'
    },
  },
  robots: {
    index: true,
    follow: true,
  }
}; 