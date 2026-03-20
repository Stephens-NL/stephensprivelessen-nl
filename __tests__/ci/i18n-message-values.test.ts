import fs from 'fs';
import path from 'path';

/**
 * Message value integrity tests.
 *
 * Note: NL/EN key parity is already tested in tests/i18n/message-parity.test.ts.
 * This file focuses on value-level issues not covered there.
 */

const MESSAGES_DIR = path.resolve(__dirname, '../../messages');
const LOCALES = ['nl', 'en'];

function collectStringValues(
  obj: Record<string, any>,
  prefix = ''
): { keyPath: string; value: string }[] {
  const results: { keyPath: string; value: string }[] = [];
  for (const [key, val] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') {
      results.push({ keyPath: fullKey, value: val });
    } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      results.push(...collectStringValues(val, fullKey));
    } else if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        if (typeof val[i] === 'string') {
          results.push({ keyPath: `${fullKey}[${i}]`, value: val[i] });
        } else if (typeof val[i] === 'object' && val[i] !== null) {
          results.push(...collectStringValues(val[i], `${fullKey}[${i}]`));
        }
      }
    }
  }
  return results;
}

function getNamespaces(): string[] {
  return fs
    .readdirSync(path.join(MESSAGES_DIR, 'nl'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

describe('i18n message values', () => {
  const namespaces = getNamespaces();

  test('no message values are empty strings (across all locales)', () => {
    const empty: string[] = [];

    for (const locale of LOCALES) {
      for (const ns of namespaces) {
        const filePath = path.join(MESSAGES_DIR, locale, `${ns}.json`);
        if (!fs.existsSync(filePath)) continue;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const strings = collectStringValues(data);
        for (const { keyPath, value } of strings) {
          if (value === '') {
            empty.push(`[${locale}/${ns}] "${keyPath}"`);
          }
        }
      }
    }

    if (empty.length > 0) {
      throw new Error(`Found ${empty.length} empty message value(s):\n${empty.map((e) => `  - ${e}`).join('\n')}`);
    }
  });

  test('all JSON message files are valid JSON', () => {
    const errors: string[] = [];
    for (const locale of LOCALES) {
      for (const ns of namespaces) {
        const filePath = path.join(MESSAGES_DIR, locale, `${ns}.json`);
        try {
          JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch (e) {
          errors.push(`[${locale}/${ns}] Invalid JSON: ${(e as Error).message}`);
        }
      }
    }
    if (errors.length > 0) {
      throw new Error(`Found ${errors.length} invalid JSON file(s):\n${errors.map((e) => `  - ${e}`).join('\n')}`);
    }
  });

  test('no excessively long values (> 5000 chars) that may indicate copy-paste errors', () => {
    const problems: string[] = [];
    for (const locale of LOCALES) {
      for (const ns of namespaces) {
        const filePath = path.join(MESSAGES_DIR, locale, `${ns}.json`);
        if (!fs.existsSync(filePath)) continue;
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const strings = collectStringValues(data);
        for (const { keyPath, value } of strings) {
          if (value.length > 5000) {
            problems.push(`[${locale}/${ns}] "${keyPath}" is ${value.length} chars`);
          }
        }
      }
    }
    if (problems.length > 0) {
      throw new Error(`Found ${problems.length} excessively long value(s):\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    }
  });
});
