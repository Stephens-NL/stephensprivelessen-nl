import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/config';

export function useLanguage(): 'NL' | 'EN' {
  const locale = useLocale();
  return locale === 'nl' ? 'NL' : 'EN';
}

export function getOtherLocale(locale: string): Locale {
  return locale === 'nl' ? 'en' : 'nl';
}

export function getLanguageFromLocale(locale: string): 'NL' | 'EN' {
  return locale === 'nl' ? 'NL' : 'EN';
}
