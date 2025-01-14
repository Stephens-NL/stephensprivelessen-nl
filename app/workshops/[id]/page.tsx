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
    notFound()
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
      'training'
    ]
  }
}

export default function WorkshopPage({ params }: Props) {
  const workshop = workshopsData[params.id]

  if (!workshop) {
    notFound()
  }

  return <WorkshopDetailContent workshop={workshop} />
} 