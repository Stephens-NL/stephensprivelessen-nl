import { useLanguage } from '../contexts/LanguageContext';
import { Bilingual, TranslationFunction } from '../data';

export function useTranslation() {
  const { language } = useLanguage();

  const t: TranslationFunction = (content: Bilingual): any => {
    if (content === null || content === undefined) {
      console.error('Content is null or undefined');
      return '';
    }

    if (typeof content === 'string') {
      return content;
    }

    if (Array.isArray(content)) {
      return content.map(item => t(item));
    }

    if (typeof content === 'object') {
      if ('EN' in content && 'NL' in content) {
        const translatedContent = content[language];
        if (Array.isArray(translatedContent)) {
          return translatedContent.map(item => t(item));
        }
        return translatedContent !== undefined ? String(translatedContent) : '';
      }

      // Handle nested objects
      const translatedObject: any = {};
      for (const key in content) {
        translatedObject[key] = t(content[key]);
      }
      return translatedObject;
    }

    console.error('Unsupported content type:', content);
    return '';
  };

  return { t, language };
}