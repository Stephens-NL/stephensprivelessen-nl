import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl
      ? 'Boa me na menboa mo | Tutoring in Amsterdam Zuidoost'
      : 'Boa me na menboa mo | Tutoring in Amsterdam Zuidoost',
    description: isNl
      ? 'Weekendbijles voor Ghanese jongeren in Amsterdam Zuidoost. Betaalbare tarieven en ervaren docenten.'
      : 'Weekend tutoring for Ghanaian youth in Amsterdam Zuidoost. Affordable rates and experienced tutors.',
    openGraph: {
      title: isNl
        ? 'Boa me na menboa mo | Tutoring in Amsterdam Zuidoost'
        : 'Boa me na menboa mo | Tutoring in Amsterdam Zuidoost',
      description: isNl
        ? 'Weekendbijles voor Ghanese jongeren in Amsterdam Zuidoost. Betaalbare tarieven en ervaren docenten.'
        : 'Weekend tutoring for Ghanaian youth in Amsterdam Zuidoost. Affordable rates and experienced tutors.',
      images: [{
        url: `/api/og?title=${encodeURIComponent("Boa me na menboa mo")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Info & Aanmelden" : "Info & Sign Up")}&footerText=${encodeURIComponent("Weekendbijles A'dam ZO")}&featureImageUrl=/images/og-default-feature.jpg`,
        width: 1200,
        height: 630,
        alt: "Boa me na menboa mo - Weekendbijles Amsterdam Zuidoost"
      }]
    }
  };
}
