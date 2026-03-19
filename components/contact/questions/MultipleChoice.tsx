import React from 'react';
import { MultipleChoiceQuestion } from '../../../data';
import { useLocale, useTranslations } from 'next-intl';

type Props = {
  question: MultipleChoiceQuestion;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  language: 'en' | 'nl';
  isDarkMode: boolean;
};

const MultipleChoice: React.FC<Props> = ({ question, value, onChange, language, isDarkMode }) => {
  const locale = useLocale();
    const language = locale === 'nl' ? 'NL' : 'EN';
    const t = useTranslations('contact');
  return (
    <div className={`mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <label htmlFor={question.id} className="block mb-2">{String(t(question.label))}</label>
      <select
        id={question.id}
        name={question.id}
        value={value}
        onChange={onChange}
        className={`w-full p-2 rounded ${isDarkMode ? 'bg-[var(--ink-light)] text-white' : 'bg-[var(--cream)] text-black'} border ${isDarkMode ? 'border-[var(--ink-light)]' : 'border-[var(--border-warm)]'}`}
      >
        {question.options.map((option) => (
          <option key={option.value} value={option.value}>
            {String(t(option.label))}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MultipleChoice;