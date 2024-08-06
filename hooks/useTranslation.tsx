'use client';

// hooks/useTranslation.ts
import { useLanguage } from '@/contexts/LanguageContext';
import { Bilingual } from '@/data';


export function useTranslation() {
  const { language } = useLanguage();
  const isEnglish = language === 'EN';

  const t = (content: Bilingual | string) => {
    if (typeof content === 'string') {
      return content;
    }
    return isEnglish ? content.EN : content.NL;
  };

  return { t, isEnglish };
}