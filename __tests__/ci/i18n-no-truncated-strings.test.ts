import fs from 'fs';
import path from 'path';

const MESSAGES_DIR = path.resolve(__dirname, '../../messages');
const LOCALES = ['nl', 'en'];

/**
 * Recursively collect all string values from a nested object,
 * returning them as { keyPath, value } pairs.
 */
function collectStrings(
  obj: Record<string, any>,
  prefix = ''
): { keyPath: string; value: string }[] {
  const results: { keyPath: string; value: string }[] = [];
  for (const [key, val] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof val === 'string') {
      results.push({ keyPath: fullKey, value: val });
    } else if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      results.push(...collectStrings(val, fullKey));
    } else if (Array.isArray(val)) {
      // Arrays of objects (e.g. testimonials items)
      for (let i = 0; i < val.length; i++) {
        if (typeof val[i] === 'string') {
          results.push({ keyPath: `${fullKey}[${i}]`, value: val[i] });
        } else if (typeof val[i] === 'object' && val[i] !== null) {
          results.push(...collectStrings(val[i], `${fullKey}[${i}]`));
        }
      }
    }
  }
  return results;
}

function getNamespaceFiles(): { locale: string; namespace: string; filePath: string }[] {
  const files: { locale: string; namespace: string; filePath: string }[] = [];
  for (const locale of LOCALES) {
    const dir = path.join(MESSAGES_DIR, locale);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.json')) continue;
      files.push({
        locale,
        namespace: file.replace('.json', ''),
        filePath: path.join(dir, file),
      });
    }
  }
  return files;
}

describe('i18n no truncated or malformed strings', () => {
  const allFiles = getNamespaceFiles();

  test('no strings ending with backslash (truncated)', () => {
    const problems: string[] = [];
    for (const { locale, namespace, filePath } of allFiles) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const strings = collectStrings(data);
      for (const { keyPath, value } of strings) {
        if (value.endsWith('\\')) {
          problems.push(`[${locale}/${namespace}] "${keyPath}" ends with backslash: ...${value.slice(-30)}`);
        }
      }
    }
    if (problems.length > 0) {
      throw new Error(`Found ${problems.length} truncated string(s):\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    }
  });

  test('no double-escaped apostrophes', () => {
    const problems: string[] = [];
    for (const { locale, namespace, filePath } of allFiles) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      // Check the raw JSON for \\' which would be a double-escaped apostrophe
      if (raw.includes("\\\\'")) {
        // Find specific keys
        const data = JSON.parse(raw);
        const strings = collectStrings(data);
        for (const { keyPath, value } of strings) {
          if (value.includes("\\'")) {
            problems.push(`[${locale}/${namespace}] "${keyPath}" has double-escaped apostrophe`);
          }
        }
      }
    }
    if (problems.length > 0) {
      throw new Error(`Found ${problems.length} double-escaped apostrophe(s):\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    }
  });

  test('no empty string values', () => {
    const problems: string[] = [];
    for (const { locale, namespace, filePath } of allFiles) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const strings = collectStrings(data);
      for (const { keyPath, value } of strings) {
        if (value === '') {
          problems.push(`[${locale}/${namespace}] "${keyPath}" is empty`);
        }
      }
    }
    if (problems.length > 0) {
      throw new Error(`Found ${problems.length} empty string(s):\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    }
  });

  test('no placeholder brackets like [email], [phone], etc.', () => {
    const placeholderPattern = /\[(e-?mail(?:adres)?|telefoon(?:nummer)?|phone|email|naam|name|address|adres)\]/i;
    const problems: string[] = [];
    for (const { locale, namespace, filePath } of allFiles) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const strings = collectStrings(data);
      for (const { keyPath, value } of strings) {
        const match = value.match(placeholderPattern);
        if (match) {
          problems.push(
            `[${locale}/${namespace}] "${keyPath}" contains placeholder: ${match[0]}`
          );
        }
      }
    }
    if (problems.length > 0) {
      throw new Error(`Found ${problems.length} placeholder bracket(s):\n${problems.map((p) => `  - ${p}`).join('\n')}`);
    }
  });
});
