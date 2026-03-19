import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weekend Tutoring in Amsterdam Zuidoost',
  description: 'Weekend tutoring services in Amsterdam Zuidoost. Flexible scheduling and expert tutoring for all subjects.',
  openGraph: {
    title: 'Weekend Tutoring in Amsterdam Zuidoost',
    description: 'Weekend tutoring services in Amsterdam Zuidoost. Flexible scheduling and expert tutoring for all subjects.',
    images: [{
      url: `/api/og?title=${encodeURIComponent("Weekendbijles A'dam ZO")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Plan Weekendles")}&footerText=${encodeURIComponent("Zaterdag & Zondag")}&featureImageUrl=/images/og-default-feature.jpg`,
      width: 1200,
      height: 630,
      alt: "Weekendbijles Amsterdam Zuidoost | Stephens Privelessen"
    }]
  }
}; 