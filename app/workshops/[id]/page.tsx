import type { Metadata } from 'next'
import { workshops } from '@/data/workshopsData'
import WorkshopDetailContent from '@/components/workshops/WorkshopDetailContent'
import { notFound } from 'next/navigation'
import Script from 'next/script'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const workshop = workshops[params.id]
  
  if (!workshop) {
    return {
      title: 'Workshop Niet Gevonden',
      description: 'De opgevraagde workshop kon niet worden gevonden.',
    }
  }

  const isCreative = workshop.type === 'creative';
  const workshopType = isCreative ? 'Creatieve' : 'Academische';
  const title = `${workshop.title.NL} Workshop | ${workshopType} Workshop`;
  const description = `${workshop.description.NL} ${workshop.durationText.NL}, ${workshop.format === 'interactive' ? 'interactief' : workshop.format} format.`;

  return {
    title,
    description,
    keywords: [
      workshop.title.NL.toLowerCase(),
      'workshop',
      workshop.type,
      workshop.format,
      workshop.level,
      'amsterdam',
      'privelessen',
      'bijles',
      'onderwijs',
      'cursus',
      'training',
      'wiskunde bijles amsterdam',
      'statistiek bijles',
      'scriptiebegeleiding',
      'thesis begeleiding',
      'statistiek hulp',
      'wiskunde tutor',
      'statistiek tutor',
      'scriptie hulp',
      'scriptie begeleiding amsterdam',
      'statistiek expert',
      'wiskunde expert',
      'spss hulp',
      'data analyse',
      'onderzoeksmethoden',
      'statistiek workshop',
      'statistiek cursus',
      'wiskunde cursus',
      'bijles aan huis',
      'online bijles',
      'examen training',
      workshop.sessionStructure === 'series' ? 'cursusreeks' : 'eenmalige workshop',
      'nederlands',
      'english',
      ...workshop.details.NL.map(detail => detail.toLowerCase()),
      ...workshop.details.EN.map(detail => detail.toLowerCase())
    ],
    openGraph: {
      title: `${title} | Wiskunde & Statistiek Bijles Amsterdam`,
      description: `${description} Professionele begeleiding in wiskunde, statistiek en scripties in Amsterdam. Online en op locatie beschikbaar.`,
      type: 'article',
      url: `https://www.stephensprivelessen.nl/workshops/${params.id}`,
      images: [
        {
          url: `/workshops/${params.id}-og.jpg`,
          width: 1200,
          height: 630,
          alt: `${workshop.title.NL} Workshop bij Stephens Privelessen`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: workshop.description.NL,
      images: [`/workshops/${params.id}-og.jpg`],
    },
  }
}

export default function WorkshopPage({ params }: Props) {
  const workshop = workshops[params.id]

  if (!workshop) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['EducationalEvent', 'Service'],
    name: workshop.title.NL,
    description: workshop.description.NL,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: workshop.location.NL.includes('Online') ? 
      'https://schema.org/OnlineEventAttendanceMode' : 
      'https://schema.org/OfflineEventAttendanceMode',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: 'Contact for pricing',
        priceCurrency: 'EUR'
      }
    },
    provider: {
      '@type': 'Organization',
      name: 'Stephens Privelessen',
      url: 'https://www.stephensprivelessen.nl',
      description: 'Professionele wiskunde en statistiek bijles in Amsterdam. Scriptiebegeleiding en data-analyse ondersteuning.',
      areaServed: {
        '@type': 'City',
        name: 'Amsterdam',
        '@id': 'https://www.wikidata.org/wiki/Q727'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Onderwijsdiensten',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Wiskunde Bijles',
              description: 'Persoonlijke wiskunde bijles voor alle niveaus'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Statistiek Begeleiding',
              description: 'Professionele begeleiding bij statistiek en data-analyse'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Scriptiebegeleiding',
              description: 'Ondersteuning bij scriptie en onderzoeksmethoden'
            }
          }
        ]
      }
    },
    location: workshop.location.NL.includes('Online') ? {
      '@type': 'VirtualLocation',
      url: 'https://www.stephensprivelessen.nl'
    } : {
      '@type': 'Place',
      name: 'Amsterdam',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amsterdam',
        addressCountry: 'NL'
      }
    },
    duration: `PT${workshop.durationMinutes}M`,
    teaches: workshop.details.NL.join(', '),
    educationalLevel: workshop.level,
    numberOfCredits: workshop.totalSessions || 1,
    maximumAttendeeCapacity: workshop.maxParticipants,
    isAccessibleForFree: false,
    inLanguage: ['nl', 'en'],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: workshop.level
    },
  };

  return (
    <>
      <Script
        id="workshop-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkshopDetailContent id={params.id} />
    </>
  )
} 