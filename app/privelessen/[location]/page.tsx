import React from 'react';
import { Metadata } from 'next';
import { TutoringPage } from '@/components/privelessen';
import { notFound } from 'next/navigation';

// Define valid locations
const validLocations = {
  'amsterdam-zuid': {
    title: 'Wiskunde & Statistiek Lessen Amsterdam Zuid | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek lessen in Amsterdam Zuid. Persoonlijke begeleiding op ons kantoor. Ervaren docent voor alle niveaus.',
    area: 'Amsterdam Zuid',
    keywords: [
      'priveles amsterdam zuid',
      'bijles amsterdam zuid',
      'wiskunde lessen zuid',
      'statistiek hulp zuid',
      'huiswerkbegeleiding zuid',
      'scriptiebegeleiding zuid amsterdam',
      'wiskunde tutor zuid',
      'statistiek docent zuid',
    ] as string[]
  },
  'amsterdam-centrum': {
    title: 'Wiskunde & Statistiek Lessen Amsterdam Centrum | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek lessen in Amsterdam Centrum. Persoonlijke begeleiding op ons kantoor. Ervaren docent voor alle niveaus.',
    area: 'Amsterdam Centrum',
    keywords: [
      'priveles amsterdam centrum',
      'bijles amsterdam centrum',
      'wiskunde lessen centrum',
      'statistiek hulp centrum',
      'huiswerkbegeleiding centrum',
      'scriptiebegeleiding centrum amsterdam',
      'wiskunde tutor centrum',
      'statistiek docent centrum',
    ] as string[]
  },
  'amsterdam-noord': {
    title: 'Wiskunde & Statistiek Lessen Amsterdam Noord | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek lessen in Amsterdam Noord. Persoonlijke begeleiding op ons kantoor. Ervaren docent voor alle niveaus.',
    area: 'Amsterdam Noord',
    keywords: [
      'priveles amsterdam noord',
      'bijles amsterdam noord',
      'wiskunde lessen noord',
      'statistiek hulp noord',
      'huiswerkbegeleiding noord',
      'scriptiebegeleiding noord amsterdam',
      'wiskunde tutor noord',
      'statistiek docent noord',
    ] as string[]
  },
  'amsterdam-west': {
    title: 'Wiskunde & Statistiek Lessen Amsterdam West | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek lessen in Amsterdam West. Persoonlijke begeleiding op ons kantoor. Ervaren docent voor alle niveaus.',
    area: 'Amsterdam West',
    keywords: [
      'priveles amsterdam west',
      'bijles amsterdam west',
      'wiskunde lessen west',
      'statistiek hulp west',
      'huiswerkbegeleiding west',
      'scriptiebegeleiding west amsterdam',
      'wiskunde tutor west',
      'statistiek docent west',
    ] as string[]
  },
  'amsterdam-oost': {
    title: 'Wiskunde & Statistiek Lessen Amsterdam Oost | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek lessen in Amsterdam Oost. Persoonlijke begeleiding op ons kantoor. Ervaren docent voor alle niveaus.',
    area: 'Amsterdam Oost',
    keywords: [
      'priveles amsterdam oost',
      'bijles amsterdam oost',
      'wiskunde lessen oost',
      'statistiek hulp oost',
      'huiswerkbegeleiding oost',
      'scriptiebegeleiding oost amsterdam',
      'wiskunde tutor oost',
      'statistiek docent oost',
    ] as string[]
  }
};

type LocationParams = {
  params: Promise<{
    location: keyof typeof validLocations;
  }>;
};

export async function generateMetadata(props: LocationParams): Promise<Metadata> {
  const params = await props.params;
  const locationData = validLocations[params.location];

  if (!locationData) {
    notFound();
  }

  return {
    title: locationData.title,
    description: locationData.description,
    keywords: locationData.keywords,
    openGraph: {
      title: locationData.title,
      description: locationData.description,
      url: `https://stephensprivelessen.nl/privelessen/${params.location}`,
      siteName: 'Stephens Privelessen',
      locale: 'nl_NL',
      type: 'website',
      images: [{
        url: '/images/tutoring-location.jpg',
        width: 1200,
        height: 630,
        alt: `Wiskunde & Statistiek Lessen ${locationData.area}`
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: locationData.title,
      description: locationData.description,
      images: ['/images/tutoring-location.jpg']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    alternates: {
      canonical: `/privelessen/${params.location}`,
      languages: {
        'nl-NL': `/privelessen/${params.location}`,
        'en-US': `/tutoring/${params.location}`
      }
    }
  };
}

export default async function LocationPage(props: LocationParams) {
  const params = await props.params;
  const locationData = validLocations[params.location];

  if (!locationData) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Wiskunde & Statistiek Bijles ${locationData.area}`,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Stephens Privelessen',
      address: {
        '@type': 'PostalAddress',
        addressLocality: locationData.area,
        addressRegion: 'NH',
        addressCountry: 'NL'
      }
    },
    serviceType: 'Bijles',
    areaServed: {
      '@type': 'City',
      name: locationData.area
    },
    description: locationData.description
  };

  return (
    <React.Fragment>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <TutoringPage 
          locationSpecific={{
            area: locationData.area,
            title: locationData.title,
            description: locationData.description
          }}
        />
      </main>
    </React.Fragment>
  );
} 