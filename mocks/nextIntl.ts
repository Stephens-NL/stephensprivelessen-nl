// Mock for next-intl
export function useTranslations(namespace: string) {
  return (key: string) => `${namespace}.${key}`;
}

export function useLocale() {
  return 'nl';
}

export function getTranslations(namespace: string) {
  return (key: string) => `${namespace}.${key}`;
}

export function useMessages() {
  return {};
}

export function NextIntlClientProvider({ children }: { children: React.ReactNode }) {
  return children;
}
