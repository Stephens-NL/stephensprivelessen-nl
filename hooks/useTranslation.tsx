import { useLanguage } from '../contexts/LanguageContext';
import { Language, Bilingual } from '../data';

type TranslationContent = Bilingual<string | string[] | { [key: string]: any }> | string;

export function useTranslation() {
  const { language } = useLanguage();

  const t = <T extends string | string[] | { [key: string]: any }>(
    content: TranslationContent
  ): T => {
    if (typeof content === 'string') {
      return content as T;
    }

    if (!('EN' in content) || !('NL' in content)) {
      console.error('Content does not have EN or NL properties:', content);
      return '' as T;
    }

    const translatedContent = content[language];

    if (Array.isArray(translatedContent) || typeof translatedContent === 'object') {
      return translatedContent as T;
    }

    return String(translatedContent) as T;
  };

  return { t, language };
}