import { useLanguage } from '../contexts/LanguageContext';
import { BilingualContent, CustomTranslationFunction } from '../data/types';

export function useTranslation(): { t: CustomTranslationFunction } {
  const { language } = useLanguage();

  const t = ((content: BilingualContent, ...args: any[]): string => {
    if (!content) return '';

    if (typeof content === 'string') return content;

    if (content.hasOwnProperty(language)) {
      return content[language];
    }

    return content.EN || '';
  }) as CustomTranslationFunction;

  return { t };
}