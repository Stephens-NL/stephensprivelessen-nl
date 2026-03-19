import React from 'react';
import { TextQuestion } from '../../../data';
import { useLocale } from 'next-intl';
type Props = {
  question: TextQuestion;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  language: 'en' | 'nl';
  isDarkMode: boolean;
};

const TextInput: React.FC<Props> = ({ question, value, onChange, language, isDarkMode }) => {
  const locale = useLocale();
    const language = locale.toUpperCase() as 'EN' | 'NL';
    const t = (obj: Record<string, string> | string) => typeof obj === 'string' ? obj : obj[language] || obj['EN'] || '';
  return (
    <div className={`mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <label htmlFor={question.id} className="block mb-2">{String(t(question.label))}</label>
      <input
        type={question.type}
        id={question.id}
        name={question.id}
        value={value}
        onChange={onChange}
        placeholder={question.placeholder ? String(t(question.placeholder)) : undefined}
        className={`w-full p-2 rounded ${isDarkMode ? 'bg-[var(--ink-light)] text-white' : 'bg-[var(--cream)] text-black'} border ${isDarkMode ? 'border-[var(--ink-light)]' : 'border-[var(--border-warm)]'}`}
      />
    </div>
  );
};

export default TextInput;