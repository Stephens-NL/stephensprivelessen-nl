import React from 'react';
import { TextQuestion } from '../../../data';
import { useLanguage } from '@/hooks/useLanguage';

type Props = {
  question: TextQuestion;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  language: 'en' | 'nl';
  isDarkMode: boolean;
};

const TextInput: React.FC<Props> = ({ question, value, onChange, isDarkMode }) => {
  const language = useLanguage();
  return (
    <div className={`mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <label htmlFor={String(question.id)} className="block mb-2">{question.label[language]}</label>
      <input
        type={question.type}
        id={String(question.id)}
        name={String(question.id)}
        value={value}
        onChange={onChange}
        placeholder={question.placeholder ? question.placeholder[language] : undefined}
        className={`w-full p-2 rounded ${isDarkMode ? 'bg-[var(--ink-light)] text-white' : 'bg-[var(--cream)] text-black'} border ${isDarkMode ? 'border-[var(--ink-light)]' : 'border-[var(--border-warm)]'}`}
      />
    </div>
  );
};

export default TextInput;