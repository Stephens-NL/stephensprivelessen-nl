import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl
      ? 'Weekendbijles in Amsterdam Zuidoost'
      : 'Weekend Tutoring in Amsterdam Zuidoost',
    description: isNl
      ? 'Weekendbijles in Amsterdam Zuidoost. Flexibele planning en expert begeleiding voor alle vakken.'
      : 'Weekend tutoring services in Amsterdam Zuidoost. Flexible scheduling and expert tutoring for all subjects.',
    openGraph: {
      title: isNl
        ? 'Weekendbijles in Amsterdam Zuidoost'
        : 'Weekend Tutoring in Amsterdam Zuidoost',
      description: isNl
        ? 'Weekendbijles in Amsterdam Zuidoost. Flexibele planning en expert begeleiding voor alle vakken.'
        : 'Weekend tutoring services in Amsterdam Zuidoost. Flexible scheduling and expert tutoring for all subjects.',
      images: [{
        url: `/api/og?title=${encodeURIComponent("Weekendbijles A'dam ZO")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Plan Weekendles" : "Book Weekend Lesson")}&footerText=${encodeURIComponent(isNl ? "Zaterdag & Zondag" : "Saturday & Sunday")}&featureImageUrl=/images/og-default-feature.jpg`,
        width: 1200,
        height: 630,
        alt: "Weekendbijles Amsterdam Zuidoost | Stephens Privelessen"
      }]
    }
  };
}
