'use client';

import React, { useContext } from 'react'
import { LanguageContext, useLanguage } from '../contexts/LanguageContext';
// import { useLanguage } from '@/contexts/LanguageContext';
import { Testimonial as TestimonialType } from '../data';



const Testimonial = ({ text, author }: TestimonialType) => {
  const { language } = useLanguage();
  const testimonialText = language === 'EN' ? text.EN : text.NL;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="text-gray-600 italic mb-4">"{testimonialText}"</p>
      <p className="font-semibold">- {author}</p>
    </div>
  )
}

export default Testimonial
