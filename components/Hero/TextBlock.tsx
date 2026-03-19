// components/TextBlock.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const TextBlock = () => {
  const t = useTranslations('home');

  return (
    <>
      <p className="text-sm sm:text-base font-semibold tracking-wider text-blue-600 uppercase">
        {t('hero.title')}
      </p>
      <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black lg:mt-8">
        {t('hero.subtitle')}
      </h1>
      <p className="mt-4 text-sm sm:text-base md:text-lg text-black lg:mt-8">
        {t('hero.subtitle2')}
      </p>
    </>
  );
};

export default TextBlock;
