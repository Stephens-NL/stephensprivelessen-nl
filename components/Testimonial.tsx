'use client';

import { Testimonial as TestimonialType } from '../data';
import { useTranslation } from '@/hooks/useTranslation';



const Testimonial = ({ text, author }: TestimonialType) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 italic mb-4">{t(text)}</p>
      <p className="font-semibold">- {author}</p>
    </div>
  )
}

export default Testimonial
