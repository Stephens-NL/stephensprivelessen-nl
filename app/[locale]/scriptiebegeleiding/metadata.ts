import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isNl = locale === 'nl';
  return {
    title: isNl ? 'Scriptiebegeleiding Amsterdam | Thesis Begeleiding & Methodologie' : 'Thesis Supervision Amsterdam | Research Methods & Methodology',
    description: isNl
      ? 'Scriptiebegeleiding Amsterdam: Expert in statistiek, SPSS, R & methodologie. Van €90/uur. Bachelor & master thesis hulp. Persoonlijke begeleiding op Science Park of online.'
      : 'Thesis supervision Amsterdam: Expert in statistics, SPSS, R & methodology. From €90/hr. Bachelor & master thesis support. Personal guidance at Science Park or online.',
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
      title: isNl ? 'Scriptiebegeleiding Amsterdam | Expert Thesis Begeleiding' : 'Thesis Supervision Amsterdam | Expert Research Guidance',
      description: isNl
        ? 'Scriptiebegeleiding Amsterdam: Expert in statistiek, SPSS, R & methodologie. Van €90/uur. Bachelor & master thesis hulp. Persoonlijke begeleiding.'
        : 'Thesis supervision Amsterdam: Expert in statistics, SPSS, R & methodology. From €90/hr. Bachelor & master thesis support. Personal guidance.',
      url: 'https://www.stephensprivelessen.nl/scriptiebegeleiding',
      type: 'website',
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: 'Stephens Privelessen',
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(isNl ? "Scriptie Hulp A'dam" : "Thesis Help A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Start Scriptie" : "Start Thesis")}&footerText=${encodeURIComponent(isNl ? "Thesis & Methodologie" : "Thesis & Methodology")}&featureImageUrl=/images/thesis-supervision.jpg`,
          width: 1200,
          height: 630,
          alt: isNl ? 'Scriptiebegeleiding Amsterdam | Stephens Privelessen' : 'Thesis Supervision Amsterdam | Stephens Private Tutoring',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isNl ? 'Scriptiebegeleiding Amsterdam | Expert Thesis Begeleiding' : 'Thesis Supervision Amsterdam | Expert Research Guidance',
      description: isNl
        ? 'Professionele scriptiebegeleiding met focus op statistiek en methodologie. Persoonlijke aanpak voor studenten.'
        : 'Professional thesis supervision focused on statistics and methodology. Personal approach for students.',
      images: [`/api/og?title=${encodeURIComponent(isNl ? "Scriptie Hulp A'dam" : "Thesis Help A'dam")}&brandText=${encodeURIComponent("Stephensprivelessen.nl")}&buttonText=${encodeURIComponent(isNl ? "Start Scriptie" : "Start Thesis")}&footerText=${encodeURIComponent(isNl ? "Thesis & Methodologie" : "Thesis & Methodology")}&featureImageUrl=/images/thesis-supervision.jpg`],
    },
    alternates: {
      canonical: '/scriptiebegeleiding',
      languages: {
        'nl-NL': '/scriptiebegeleiding',
        'en-US': '/thesis-supervision',
      },
    },
  };
}
