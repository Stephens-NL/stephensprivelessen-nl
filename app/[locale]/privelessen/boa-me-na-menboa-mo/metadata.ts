import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boa me na menboa mo | Tutoring in Amsterdam Zuidoost',
  description: 'Weekend tutoring for Ghanaian youth in Amsterdam Zuidoost. Affordable rates and experienced tutors.',
  openGraph: {
    title: 'Boa me na menboa mo | Tutoring in Amsterdam Zuidoost',
    description: 'Weekend tutoring for Ghanaian youth in Amsterdam Zuidoost. Affordable rates and experienced tutors.',
    images: [{
      url: `/api/og?title=${encodeURIComponent("Boa me na menboa mo")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Info & Aanmelden")}&footerText=${encodeURIComponent("Weekendbijles A'dam ZO")}&featureImageUrl=/images/og-default-feature.jpg`,
      width: 1200,
      height: 630,
      alt: "Boa me na menboa mo - Weekendbijles Amsterdam Zuidoost"
    }]
  }
}; 