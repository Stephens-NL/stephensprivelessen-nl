import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.join(process.cwd(), 'messages');
const LOCALES = ['nl', 'en'];

function getKeys(obj: Record<string, any>, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return getKeys(value, fullKey);
    }
    return [fullKey];
  });
}

function getNamespaces(): string[] {
  return fs
    .readdirSync(path.join(MESSAGES_DIR, 'nl'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

describe('Message file parity', () => {
  const namespaces = getNamespaces();

  test.each(namespaces)('%s: NL and EN have identical keys', (ns) => {
    const nl = JSON.parse(
      fs.readFileSync(path.join(MESSAGES_DIR, 'nl', `${ns}.json`), 'utf-8')
    );
    const en = JSON.parse(
      fs.readFileSync(path.join(MESSAGES_DIR, 'en', `${ns}.json`), 'utf-8')
    );

    const nlKeys = getKeys(nl).sort();
    const enKeys = getKeys(en).sort();

    expect(enKeys).toEqual(nlKeys);
  });

  test('all namespaces exist in both locales', () => {
    for (const locale of LOCALES) {
      const files = fs.readdirSync(path.join(MESSAGES_DIR, locale));
      const nsNames = files.filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''));
      expect(nsNames.sort()).toEqual(namespaces.sort());
    }
  });

  test('no empty message files', () => {
    for (const locale of LOCALES) {
      for (const ns of namespaces) {
        const content = JSON.parse(
          fs.readFileSync(path.join(MESSAGES_DIR, locale, `${ns}.json`), 'utf-8')
        );
        expect(Object.keys(content).length).toBeGreaterThan(0);
      }
    }
  });
});
