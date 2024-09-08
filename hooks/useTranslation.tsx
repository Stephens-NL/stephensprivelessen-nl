import { useLanguage } from '../contexts/LanguageContext';
import { TranslationFunction } from '../data';

export function useTranslation() {
  const { language } = useLanguage();

  const t: TranslationFunction = (content: any) => {
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

    if (typeof content === 'object' && content !== null) {  // Ensure it's an object and not null
      if ('EN' in content && 'NL' in content) {
        const translatedContent = content[language];
        if (Array.isArray(translatedContent)) {
          return translatedContent.map(item => t(item));
        }
        return translatedContent !== undefined ? String(translatedContent) : '';
      }

      // Handle nested objects
      const translatedObject: { [key: string]: any } = {}; // Type the object properly
      for (const key in content) {
        if (Object.prototype.hasOwnProperty.call(content, key)) { // Ensure key is a property of the object
          translatedObject[key] = t(content[key]);
        }
      }
      return translatedObject;
    }

    console.error('Unsupported content type:', content);
    return '';
  };

  return { t, language };
}