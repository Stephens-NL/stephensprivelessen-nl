import type { Metadata } from 'next'
import workshopsData from '@/data/workshopsData'
import WorkshopDetailContent from '@/components/workshops/WorkshopDetailContent'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ id: string; locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const workshop = workshopsData[params.id]

  if (!workshop) {
    notFound()
  }

  const language = params.locale === 'nl' ? 'NL' : 'EN';
  const isCreative = workshop.type === 'creative'
  const workshopType = isCreative ? (language === 'NL' ? 'Creatieve' : 'Creative') : (language === 'NL' ? 'Academische' : 'Academic')
  const title = `${workshop.title[language]} Workshop | ${workshopType} Workshop`
  const description = `${workshop.description?.[language] ?? ''} ${workshop.durationText[language]}, ${workshop.format === 'interactive' ? (language === 'NL' ? 'interactief' : 'interactive') : workshop.format} format.`

  return {
    title,
    description,
    keywords: [
      workshop.title[language].toLowerCase(),
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

export default async function WorkshopPage(props: Props) {
  const params = await props.params;
  const workshop = workshopsData[params.id]

  if (!workshop) {
    notFound()
  }

  return <WorkshopDetailContent workshop={workshop} />
} 