// components/TextBlock.tsx
'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const TextBlock = () => {
  const t = useTranslations('home');

  return (
    <>
      <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--amber)]">
        {t('hero.title')}
      </p>
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[var(--ink)] leading-[1.05] tracking-tight">
        {t('hero.subtitle')}
      </h1>
      <p className="text-base sm:text-lg text-[var(--muted-text)] leading-relaxed max-w-md">
        {t('hero.subtitle2')}
      </p>
    </>
  );
};

export default TextBlock;
