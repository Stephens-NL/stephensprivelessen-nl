import React from 'react';

type Props = {
  language: 'en' | 'nl';
  setLanguage: (lang: 'en' | 'nl') => void;
  isDarkMode: boolean;
};

const LanguageSelector: React.FC<Props> = ({ language, setLanguage, isDarkMode }) => {
  return (
    <div className={`mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <h2 className="mb-2">{language === 'en' ? 'Select Language' : 'Selecteer Taal'}</h2>
      <select 
        value={language} 
        onChange={(e) => setLanguage(e.target.value as 'en' | 'nl')}
        className={`w-full p-2 rounded ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'} border ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}
      >
        <option value="en">English</option>
        <option value="nl">Nederlands</option>
      </select>
    </div>
  );
};

export default LanguageSelector;