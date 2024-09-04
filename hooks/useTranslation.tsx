import { useLanguage } from '../contexts/LanguageContext';
import { Bilingual, TranslationFunction } from '../data';

export function useTranslation() {
  const { language } = useLanguage();

  const t: TranslationFunction = (content: Bilingual) => {
    if (typeof content === 'string') {
      return content;
    }

    if (!('EN' in content) || !('NL' in content)) {
      console.error('Content does not have EN or NL properties:', content);
      return '';
    }

    const translatedContent = content[language];

    if (Array.isArray(translatedContent)) {
      return translatedContent;
    }

    if (typeof translatedContent === 'object') {
      return translatedContent;
    }

    return String(translatedContent);
  };

  return { t, language };
}
