import { useLanguage } from '../contexts/LanguageContext';
import { Bilingual, CustomTranslationFunction, Language } from '../data/types';

type BilingualContent = string | Bilingual | Record<string, unknown>;

export function useTranslation(): { t: CustomTranslationFunction; language: Language } {
  const { language } = useLanguage();

  const t = ((content: BilingualContent, ...args: any[]): string => {
    if (!content) return '';

    if (typeof content === 'string') return content;

    if (content.hasOwnProperty(language)) {
      return content[language];
    }

    return content.EN || '';
  }) as CustomTranslationFunction;

  return { t, language };
}