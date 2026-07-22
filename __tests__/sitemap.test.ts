import sitemap from '@/app/sitemap';
import { config } from '@/data/config';

const SITE = config.business.siteUrl;

describe('app/sitemap.ts (dynamic bilingual sitemap)', () => {
  const entries = sitemap();

  it('returns a non-empty list of unique URLs', () => {
    expect(entries.length).toBeGreaterThan(0);
    const urls = entries.map((e) => e.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('home entry uses the bare origin (matches the page canonical) with priority 1.0', () => {
    const home = entries.find((e) => e.url === SITE);
    expect(home).toBeDefined();
    expect(home!.url).toBe(SITE); // no trailing slash
    expect(home!.priority).toBe(1.0);
  });

  it('every entry carries locale-correct nl/en alternates', () => {
    for (const e of entries) {
      const langs = e.alternates?.languages as Record<string, string> | undefined;
      expect(langs).toBeDefined();
      expect(langs!.nl).toMatch(new RegExp(`^${SITE}`));
      expect(langs!.en).toMatch(new RegExp(`^${SITE}/en`));
      // nl alternate must equal the entry's own url (self-referential)
      expect(langs!.nl).toBe(e.url);
    }
  });

  it('a money page resolves to the right nl and /en URLs', () => {
    const priv = entries.find((e) => e.url === `${SITE}/privelessen`);
    expect(priv).toBeDefined();
    const langs = priv!.alternates!.languages as Record<string, string>;
    expect(langs.en).toBe(`${SITE}/en/privelessen`);
  });
});
