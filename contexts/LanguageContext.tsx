'use client';

import { Language, LanguageContextType } from "../data";
import React, { createContext, useContext, useState, ReactNode } from "react";


const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps): React.ReactElement => {
  const [language, setLanguage] = useState<Language>('NL');

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Export de LanguageContext als deze elders nodig is
export { LanguageContext };