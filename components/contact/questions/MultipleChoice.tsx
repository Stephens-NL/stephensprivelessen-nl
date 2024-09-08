import React from 'react';
import { MultipleChoiceQuestion } from '../../../data';
import { useTranslation } from '../../../hooks/useTranslation';

type Props = {
  question: MultipleChoiceQuestion;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  language: 'en' | 'nl';
  isDarkMode: boolean;
};

const MultipleChoice: React.FC<Props> = ({ question, value, onChange, language, isDarkMode }) => {
  const { t } = useTranslation();
  return (
    <div className={`mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <label htmlFor={question.id} className="block mb-2">{String(t(question.label))}</label>
      <select
        id={question.id}
        name={question.id}
        value={value}
        onChange={onChange}
        className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
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