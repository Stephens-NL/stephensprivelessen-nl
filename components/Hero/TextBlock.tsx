// components/TextBlock.tsx
'use client';

import React, { ReactNode } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Hero } from '@/data';


const TextBlock = ({ hero }: {hero: Hero}) => {
  const { t } = useTranslation();
  const { title, subtitle, subtitle2 } = hero

  return (
    <>
      <p className="text-sm sm:text-base font-semibold tracking-wider text-blue-600 uppercase">
        {String(t(title))}
      </p>
      <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black lg:mt-8">
        {String(t(subtitle))}
      </h1>
      <p className="mt-4 text-sm sm:text-base md:text-lg text-black lg:mt-8">
        {String(t(subtitle2))}
      </p>
    </>
  );
};

export default TextBlock;