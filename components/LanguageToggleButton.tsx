import React from 'react';
import NavButton from './NavButton';

interface LanguageToggleButtonProps {
  isEnglish: boolean;
  toggleLanguage: () => void;
}

const LanguageToggleButton: React.FC<LanguageToggleButtonProps> = ({ isEnglish, toggleLanguage }) => {
  return (
    <NavButton onClick={toggleLanguage} className={isEnglish ? 'bg-yellow-400 text-black' : 'bg-blue-500 text-white'}>
      {isEnglish ? 'Prefer Dutch' : 'Prefer English?'}
    </NavButton>
  );
};

export default LanguageToggleButton;
