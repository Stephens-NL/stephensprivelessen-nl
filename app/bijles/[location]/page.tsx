import { Metadata } from 'next';
import { TutoringPage } from '@/components/tutoring/TutoringPage';
import { notFound } from 'next/navigation';

// Define valid locations
const validLocations = {
  'amsterdam-zuid': {
    title: 'Bijles Amsterdam Zuid | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek bijles in Amsterdam Zuid. Persoonlijke begeleiding aan huis of op locatie. Ervaren docent voor alle niveaus.',
    area: 'Amsterdam Zuid',
    keywords: [
      'bijles amsterdam zuid',
      'wiskunde bijles zuid',
      'statistiek hulp zuid',
      'huiswerkbegeleiding zuid',
      'scriptiebegeleiding zuid amsterdam',
      'bijles aan huis zuid',
    ]
  },
  'amsterdam-centrum': {
    title: 'Bijles Amsterdam Centrum | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek bijles in Amsterdam Centrum. Persoonlijke begeleiding aan huis of op locatie. Ervaren docent voor alle niveaus.',
    area: 'Amsterdam Centrum',
    keywords: [
      'bijles amsterdam centrum',
      'wiskunde bijles centrum',
      'statistiek hulp centrum',
      'huiswerkbegeleiding centrum',
      'scriptiebegeleiding centrum amsterdam',
      'bijles aan huis centrum',
    ]
  },
  'amsterdam-noord': {
    title: 'Bijles Amsterdam Noord | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek bijles in Amsterdam Noord. Persoonlijke begeleiding aan huis of op locatie. Ervaren docent voor alle niveaus.',
    area: 'Amsterdam Noord',
    keywords: [
      'bijles amsterdam noord',
      'wiskunde bijles noord',
      'statistiek hulp noord',
      'huiswerkbegeleiding noord',
      'scriptiebegeleiding noord amsterdam',
      'bijles aan huis noord',
    ]
  },
  'amsterdam-west': {
    title: 'Bijles Amsterdam West | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek bijles in Amsterdam West. Persoonlijke begeleiding aan huis of op locatie. Ervaren docent voor alle niveaus.',
    area: 'Amsterdam West',
    keywords: [
      'bijles amsterdam west',
      'wiskunde bijles west',
      'statistiek hulp west',
      'huiswerkbegeleiding west',
      'scriptiebegeleiding west amsterdam',
      'bijles aan huis west',
    ]
  },
  'amsterdam-oost': {
    title: 'Bijles Amsterdam Oost | Stephens Privelessen',
    description: 'Professionele wiskunde en statistiek bijles in Amsterdam Oost. Persoonlijke begeleiding aan huis of op locatie. Ervaren docent voor alle niveaus.',
    area: 'Amsterdam Oost',
    keywords: [
      'bijles amsterdam oost',
      'wiskunde bijles oost',
      'statistiek hulp oost',
      'huiswerkbegeleiding oost',
      'scriptiebegeleiding oost amsterdam',
      'bijles aan huis oost',
    ]
  }
} as const;

type LocationParams = {
  params: {
    location: keyof typeof validLocations;
  };
};

export async function generateMetadata({ params }: LocationParams): Promise<Metadata> {
  const locationData = validLocations[params.location];
  
  if (!locationData) {
    return notFound();
  }

  return {
    title: locationData.title,
    description: locationData.description,
    keywords: locationData.keywords,
    openGraph: {
      title: locationData.title,
      description: locationData.description,
      url: `https://www.stephensprivelessen.nl/bijles/${params.location}`,
      siteName: 'Stephens Privelessen',
      locale: 'nl_NL',
      type: 'website',
    },
  };
}

export default function LocationPage({ params }: LocationParams) {
  const locationData = validLocations[params.location];
  
  if (!locationData) {
    return notFound();
  }

  return (
    <TutoringPage 
      locationSpecific={{
        area: locationData.area,
        title: locationData.title,
        description: locationData.description
      }}
    />
  );
} 