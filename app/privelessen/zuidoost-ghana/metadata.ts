import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ghanaian Tutoring in Amsterdam Zuidoost',
  description: 'Specialized tutoring services for Ghanaian students in Amsterdam Zuidoost. Expert tutors and personalized learning.',
  openGraph: {
    title: 'Ghanaian Tutoring in Amsterdam Zuidoost',
    description: 'Specialized tutoring services for Ghanaian students in Amsterdam Zuidoost. Expert tutors and personalized learning.',
    images: [{
      url: `/api/og?title=${encodeURIComponent("Ghanese Bijles ZO")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent("Meer Info")}&footerText=${encodeURIComponent("Voor Ghanese studenten")}&featureImageUrl=/images/og-default-feature.jpg`,
      width: 1200,
      height: 630,
      alt: "Ghanese Bijles Amsterdam Zuidoost | Stephens Privelessen"
    }]
  }
}; 