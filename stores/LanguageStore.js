// LanguageStore.js
class LanguageStore {
    constructor() {
      this.language = this.getInitialLanguage();
    }
  
    getInitialLanguage() {
      if (typeof window !== 'undefined') {
        // Use localStorage for persistence
        return localStorage.getItem('appLanguage') || 'en';
      }
      // Default to 'en' for server-side or initial load
      return 'en';
    }
  
    getLanguage() {
      return this.language;
    }
  
    setLanguage(newLanguage) {
      if (newLanguage !== this.language) {
        this.language = newLanguage;
        if (typeof window !== 'undefined') {
          localStorage.setItem('appLanguage', newLanguage);
        }
      }
    }
  }
  
  export const languageStore = new LanguageStore();