import type { Metadata } from 'next'
import { workshops } from '@/data/workshopsData'
import WorkshopDetailContent from '@/components/workshops/WorkshopDetailContent'
import { notFound } from 'next/navigation'

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
    ],
    openGraph: {
      title,
      description,
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

  return <WorkshopDetailContent id={params.id} />
} 