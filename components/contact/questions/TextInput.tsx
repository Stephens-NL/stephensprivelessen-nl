import React from 'react';
import { TextQuestion } from '../../../data';

type Props = {
  question: TextQuestion;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  language: 'en' | 'nl';
  isDarkMode: boolean;
};

const TextInput: React.FC<Props> = ({ question, value, onChange, language, isDarkMode }) => {
  return (
    <div className={`mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <label htmlFor={question.id} className="block mb-2">{question.label[language]}</label>
      <input
        type={question.type}
        id={question.id}
        name={question.id}
        value={value}
        onChange={onChange}
        placeholder={question.placeholder ? question.placeholder[language] : undefined}
        className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
      />
    </div>
  );
};

export default TextInput;