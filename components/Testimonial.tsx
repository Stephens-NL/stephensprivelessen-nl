'use client';

import { useTranslations } from 'next-intl';

interface TestimonialProps {
  index: number;
}

const Testimonial = ({ index }: TestimonialProps) => {
  const t = useTranslations('home');

  return (
    <div className="bg-[var(--cream)] p-6 rounded-lg shadow-md">
      <p className="text-[var(--muted-text)] italic mb-4">{t(`testimonials.items.${index}.text`)}</p>
      <p className="font-semibold">- {t(`testimonials.items.${index}.author`)}</p>
    </div>
  )
}

export default Testimonial
