import { useLocale } from 'next-intl';
import type { Locale } from '@/i18n/config';

/** Returns 'NL' | 'EN' for bilingual data lookups */
export function useLanguage(): 'NL' | 'EN' {
  const locale = useLocale();
  return locale === 'nl' ? 'NL' : 'EN';
}

/** Returns the other locale for language switcher */
export function getOtherLocale(locale: string): Locale {
  return locale === 'nl' ? 'en' : 'nl';
}

/** Server-side equivalent for data lookups */
export function getLanguageFromLocale(locale: string): 'NL' | 'EN' {
  return locale === 'nl' ? 'NL' : 'EN';
}
