import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const MESSAGES_DIR = path.join(PROJECT_ROOT, 'messages');
const LOCALES = ['nl', 'en'];
const SCAN_DIRS = ['components', 'app'].map((d) => path.join(PROJECT_ROOT, d));

/**
 * Recursively get all .tsx files from a directory, excluding node_modules and .next.
 */
function getTsxFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '__tests__', 'tests'].includes(entry.name)) continue;
      results.push(...getTsxFiles(fullPath));
    } else if (entry.name.endsWith('.tsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Resolve a dotted key against a nested JSON object.
 * Returns true if the key exists.
 */
function keyExists(obj: Record<string, any>, key: string): boolean {
  const parts = key.split('.');
  let current: any = obj;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return false;
    if (!(part in current)) return false;
    current = current[part];
  }
  return true;
}

/**
 * Extract namespace and static t() keys from a single .tsx file.
 */
function extractKeysFromFile(filePath: string): { namespace: string; keys: string[] }[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const results: { namespace: string; keys: string[] }[] = [];

  // Find all useTranslations('X') or getTranslations('X') calls
  const nsRegex = /(?:useTranslations|getTranslations)\(\s*['"`]([^'"`]+)['"`]\s*\)/g;
  let nsMatch;
  const namespaces: string[] = [];
  while ((nsMatch = nsRegex.exec(content)) !== null) {
    const ns = nsMatch[1];
    if (!namespaces.includes(ns)) {
      namespaces.push(ns);
    }
  }

  if (namespaces.length === 0) return results;

  // Find all t('key'), t("key"), t(`key`) calls — only static keys
  // Skip dynamic keys like t(`items.${index}.text`) or t(variable)
  const keyRegex = /\bt\(\s*['"]([^'"]+)['"]\s*[,)]/g;
  const backtickKeyRegex = /\bt\(\s*`([^`$]+)`\s*[,)]/g;

  // Also catch keys assigned to variables that get passed to t() later
  // e.g. { labelKey: 'hero.stats.studentsHelped' } → t(stat.labelKey)
  // Only match property names that clearly indicate translation keys (must contain a dot = nested key)
  const indirectKeyRegex = /(?:labelKey|translationKey|messageKey|i18nKey)\s*:\s*['"]([^'"]*\.[^'"]+)['"]/g;

  const staticKeys: string[] = [];
  let keyMatch;

  while ((keyMatch = keyRegex.exec(content)) !== null) {
    staticKeys.push(keyMatch[1]);
  }
  while ((keyMatch = backtickKeyRegex.exec(content)) !== null) {
    staticKeys.push(keyMatch[1]);
  }
  while ((keyMatch = indirectKeyRegex.exec(content)) !== null) {
    staticKeys.push(keyMatch[1]);
  }

  // Associate keys with each namespace found in this file
  for (const ns of namespaces) {
    results.push({ namespace: ns, keys: staticKeys });
  }

  return results;
}

/**
 * Load a JSON message file, resolving nested namespace paths.
 * e.g. namespace 'boa.form' loads messages/nl/boa.json and digs into the 'form' key.
 */
function loadMessages(locale: string, namespace: string): Record<string, any> | null {
  const parts = namespace.split('.');
  const fileName = parts[0];
  const filePath = path.join(MESSAGES_DIR, locale, `${fileName}.json`);

  if (!fs.existsSync(filePath)) return null;

  let obj = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Navigate into nested path if namespace has dots (e.g. 'boa.form' -> boa.json -> form)
  for (let i = 1; i < parts.length; i++) {
    if (obj == null || typeof obj !== 'object') return null;
    obj = obj[parts[i]];
  }

  return obj ?? null;
}

describe('i18n key coverage', () => {
  const allFiles = SCAN_DIRS.flatMap(getTsxFiles);

  // Collect all { file, namespace, key } tuples
  const allEntries: { file: string; namespace: string; key: string }[] = [];

  for (const file of allFiles) {
    const extracted = extractKeysFromFile(file);
    for (const { namespace, keys } of extracted) {
      for (const key of keys) {
        allEntries.push({ file, namespace, key });
      }
    }
  }

  // Deduplicate by namespace+key for the actual checks
  const uniquePairs = new Map<string, { namespace: string; key: string; files: string[] }>();
  for (const entry of allEntries) {
    const id = `${entry.namespace}::${entry.key}`;
    if (!uniquePairs.has(id)) {
      uniquePairs.set(id, {
        namespace: entry.namespace,
        key: entry.key,
        files: [path.relative(PROJECT_ROOT, entry.file)],
      });
    } else {
      const existing = uniquePairs.get(id)!;
      const relPath = path.relative(PROJECT_ROOT, entry.file);
      if (!existing.files.includes(relPath)) {
        existing.files.push(relPath);
      }
    }
  }

  test('all static t() keys exist in both NL and EN message files', () => {
    const missing: string[] = [];

    for (const [, { namespace, key, files }] of uniquePairs) {
      for (const locale of LOCALES) {
        const messages = loadMessages(locale, namespace);
        if (messages === null) {
          missing.push(
            `[${locale}] Namespace "${namespace}" file not found (used in: ${files.join(', ')})`
          );
          continue;
        }
        if (!keyExists(messages, key)) {
          missing.push(
            `[${locale}] "${namespace}.${key}" missing (used in: ${files.join(', ')})`
          );
        }
      }
    }

    if (missing.length > 0) {
      throw new Error(
        `Found ${missing.length} missing i18n key(s):\n${missing.map((m) => `  - ${m}`).join('\n')}`
      );
    }
  });

  test('scanned at least some files and keys', () => {
    expect(allFiles.length).toBeGreaterThan(0);
    expect(allEntries.length).toBeGreaterThan(0);
  });
});
