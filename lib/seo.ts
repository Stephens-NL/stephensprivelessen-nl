// Locale-correct canonical + hreflang alternates for a page.
// nlPath is the Dutch path starting with '/', e.g. '/privelessen' or '/' for home.
export function buildAlternates(locale: string, nlPath: string) {
  const isNl = locale === 'nl';
  const enPath = nlPath === '/' ? '/en' : `/en${nlPath}`;
  return {
    canonical: isNl ? nlPath : enPath,
    languages: {
      nl: nlPath,
      en: enPath,
      'x-default': nlPath,
    },
  };
}
