// src/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

// Initialize i18next
i18n
  .use(HttpApi) // Load translations using http (default public folder)
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    fallbackLng: 'en', // Fallback language
    supportedLngs: ['en', 'nl'], // Supported languages
    ns: ['common'], // Default namespaces
    defaultNS: 'common',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['cookie'],
    },
    react: {
      useSuspense: false, // Set to false if you are using server-side rendering
    },
  });

export default i18n;
