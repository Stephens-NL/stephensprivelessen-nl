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
        className={`w-full p-2 rounded ${isDarkMode ? 'bg-[var(--ink-light)] text-white' : 'bg-[var(--cream)] text-black'} border ${isDarkMode ? 'border-[var(--ink-light)]' : 'border-[var(--border-warm)]'}`}
      >
        <option value="en">English</option>
        <option value="nl">Nederlands</option>
      </select>
    </div>
  );
};

export default LanguageSelector;