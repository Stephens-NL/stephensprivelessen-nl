import type { Metadata } from 'next'
import workshopsData from '@/data/workshopsData'
import WorkshopDetailContent from '@/components/workshops/WorkshopDetailContent'
import { notFound } from 'next/navigation'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const workshop = workshopsData[params.id]
  
  if (!workshop) {
    return {
      title: 'Workshop Niet Gevonden',
      description: 'De opgevraagde workshop kon niet worden gevonden.',
    }
  }

  const isCreative = workshop.type === 'creative'
  const workshopType = isCreative ? 'Creatieve' : 'Academische'
  const title = `${workshop.title.NL} Workshop | ${workshopType} Workshop`
  const description = `${workshop.description.NL} ${workshop.durationText.NL}, ${workshop.format === 'interactive' ? 'interactief' : workshop.format} format.`

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
      title: `${title} | Stephens Privelessen`,
      description: `${description} Professionele begeleiding in wiskunde, statistiek en scripties in Amsterdam.`,
      type: 'article',
      url: `https://stephensprivelessen.nl/workshops/${params.id}`,
      locale: 'nl_NL',
      alternateLocale: 'en_US',
      siteName: 'Stephens Privelessen',
      images: [
        {
          url: `/images/workshops/${params.id}.jpg`,
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
      images: [`/images/workshops/${params.id}.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `/workshops/${params.id}`,
      languages: {
        'nl-NL': `/workshops/${params.id}`,
        'en-US': `/workshops/${params.id}`,
      },
    },
  }
}

export default function WorkshopPage({ params }: Props) {
  const workshop = workshopsData[params.id]

  if (!workshop) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['EducationalEvent', 'Course'],
    name: workshop.title.NL,
    description: workshop.description.NL,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: workshop.location.NL.includes('Online') ? 
      'https://schema.org/OnlineEventAttendanceMode' : 
      'https://schema.org/OfflineEventAttendanceMode',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Stephens Privelessen',
      url: 'https://stephensprivelessen.nl',
      description: 'Professionele wiskunde en statistiek bijles in Amsterdam. Scriptiebegeleiding en data-analyse ondersteuning.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Amsterdam',
        addressRegion: 'NH',
        addressCountry: 'NL'
      }
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: workshop.price || 'Contact for pricing',
        priceCurrency: 'EUR'
      }
    },
    educationalLevel: workshop.level,
    teaches: workshop.details.NL,
    courseWorkload: workshop.durationText.NL,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: workshop.format === 'interactive' ? 'interactive' : workshop.format,
      courseWorkload: workshop.durationText.NL
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkshopDetailContent workshop={workshop} />
    </>
  )
} 