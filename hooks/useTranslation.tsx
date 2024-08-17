import { useLanguage } from '../contexts/LanguageContext';
import { Bilingual } from '../data';

export function useTranslation() {
  const { language } = useLanguage();
  const isEnglish = language === 'EN';

  const t = (content: Bilingual | string): string => {
    try {
      if (typeof content === 'string') {
        return content;
      }
      if (typeof content !== 'object' || content === null) {
        console.error('Content is not an object:', content);
        return '';
      }
      if (!('EN' in content) || !('NL' in content)) {
        console.error('Content does not have EN or NL properties:', content);
        return '';
      }
      const translatedContent = isEnglish ? content.EN : content.NL;
      return Array.isArray(translatedContent) ? translatedContent.join(' ') : String(translatedContent);
    } catch (error) {
      console.error('Error in translation function:', error);
      return '';
    }
  };

  return { t, isEnglish };
}