/**
 * CI ratchet test — PR-0 of the #28 consolidation.
 *
 * Fails if any file under components/ or app/ imports legacy bilingual copy
 * from the 5 target data modules:
 *   faq.json, tutoringPage, infoSection, feedbackFormData, navigation
 *
 * Detection covers two import patterns:
 *   (a) Direct module-path import: `import ... from '@/data/<target>'`
 *   (b) Barrel named-import: `import { <targetSymbol> } from '@/data'`
 *       — this is what catches feedbackFormData in the two app/api routes.
 *
 * The ALLOWLIST is seeded with all current importers so the test passes today.
 * It SELF-SHRINKS as each namespace migrates in PR-1..PR-7: removing a file
 * from the allowlist will cause the stale-entry assertion to fail, reminding
 * the author to delete the entry once the importer is fully migrated.
 *
 * NOT targets (must NOT be flagged):
 *   - @/i18n/navigation  (next-intl routing helper)
 *   - next/navigation    (Next.js navigation)
 *   - longVersion / shortVersion from @/data  (feedbackQuestions barrel symbols, out of scope)
 *   - data/config.ts, data/pricingData, data/business-config.generated.ts, blog bodies
 */

import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const SCAN_DIRS = ['app', 'components'].map((d) => path.join(PROJECT_ROOT, d));
const EXTENSIONS = ['.ts', '.tsx'];
const EXCLUDE_DIRS = ['node_modules', '.next', '__tests__', 'tests'];

// The 5 legacy data modules being phased out via #28.
const TARGET_MODULES = ['faq.json', 'tutoringPage', 'infoSection', 'feedbackFormData', 'navigation'];

// Named symbols re-exported by the @/data barrel that belong to target modules.
// Only these are flagged when encountered in a barrel import — other barrel
// symbols (longVersion, shortVersion, feedbackQuestions, etc.) are out of scope.
const TARGET_SYMBOLS = new Set(['feedbackFormData', 'navigation', 'siteTitle']);

/**
 * Pattern A: direct path import of any target module.
 * Anchored to '@/data/<target>' to avoid matching '@/i18n/navigation' or 'next/navigation'.
 */
const DIRECT_IMPORT_RE = new RegExp(
  `from\\s+['"]@/data/(${TARGET_MODULES.map((m) => m.replace('.', '\\.')).join('|')})['"]`
);

/** Pattern B: barrel import — `from '@/data'` (the index re-export). */
const BARREL_IMPORT_RE = /from\s+['"]@\/data['"]/g;

/**
 * Extract named import symbols from an import statement string.
 * Handles `import { a, b as c }` forms.
 */
function extractNamedImports(statement: string): string[] {
  const match = statement.match(/import\s+\{([^}]+)\}/);
  if (!match) return [];
  return match[1]
    .split(',')
    .map((s) => s.trim().split(/\s+as\s+/)[0].trim())
    .filter(Boolean);
}

/**
 * Returns true if the file content contains a violation:
 *   (a) A direct `from '@/data/<target>'` import, OR
 *   (b) A barrel `from '@/data'` import that names a TARGET_SYMBOL.
 *
 * For pattern (b) we locate each `from '@/data'` occurrence and look backwards
 * to the nearest `import` keyword to isolate only that statement's named imports
 * — this correctly handles files with multiple import lines before the barrel.
 */
function hasLegacyBilingualImport(content: string): boolean {
  // Pattern A: direct path import of any target module
  if (DIRECT_IMPORT_RE.test(content)) return true;

  // Pattern B: barrel import — locate each occurrence and extract its named imports
  const barrelRe = /from\s+['"]@\/data['"]/g;
  let m: RegExpExecArray | null;
  while ((m = barrelRe.exec(content)) !== null) {
    const before = content.substring(0, m.index);
    const lastImport = before.lastIndexOf('import');
    if (lastImport === -1) continue;
    const stmt = content.substring(lastImport, m.index + m[0].length);
    const named = extractNamedImports(stmt);
    if (named.some((sym) => TARGET_SYMBOLS.has(sym))) return true;
  }
  return false;
}

/**
 * Allowlist — PROJECT_ROOT-relative POSIX paths of all files that currently
 * import a target module. Add new files here only if they are intentional
 * legacy callers awaiting migration. Remove entries once a file is migrated;
 * the stale-entry assertion below will catch forgotten entries.
 */
const ALLOWLIST = new Set([
  // faq.json
  'app/[locale]/faq/page.tsx',
  // tutoringPage
  'app/[locale]/privelessen/page.tsx',
  'components/privelessen/TutoringPage.tsx',
  // infoSection
  'components/contact/steps/InfoSection.tsx',
  'components/contact/steps/InfoSectionCoursesBlock.tsx',
  'components/contact/steps/form-steps/SubjectSelection.tsx',
  // feedbackFormData (via @/data barrel)
  'app/api/feedback/route.ts',
  'app/api/feedback/component-data/route.ts',
  // navigation — currently ZERO importers (already migrated to next-intl)
]);

/**
 * Recursively collect all .ts/.tsx source files (excluding test files and
 * excluded directories) from the given directory.
 */
function getSourceFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.includes(entry.name)) continue;
      results.push(...getSourceFiles(fullPath));
    } else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      if (entry.name.includes('.test.') || entry.name.includes('.spec.')) continue;
      results.push(fullPath);
    }
  }
  return results;
}

describe('no-legacy-bilingual-imports (PR-0 ratchet for #28)', () => {
  const allFiles = SCAN_DIRS.flatMap(getSourceFiles);

  test('scanned at least some files', () => {
    expect(allFiles.length).toBeGreaterThan(0);
  });

  test('no new files import legacy bilingual copy from the 5 target data modules', () => {
    const violations: string[] = [];

    for (const filePath of allFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (!hasLegacyBilingualImport(content)) continue;

      const relPath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
      if (!ALLOWLIST.has(relPath)) {
        violations.push(relPath);
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `Legacy bilingual import introduced in file(s) not on the allowlist.\n` +
          `Either migrate the import to next-intl, or add the file to ALLOWLIST in\n` +
          `__tests__/ci/no-legacy-bilingual-imports.test.ts if migration is pending.\n\n` +
          `Violating files:\n${violations.map((v) => `  - ${v}`).join('\n')}`
      );
    }
  });

  test('allowlist has no stale entries (each entry still imports a target)', () => {
    const stale: string[] = [];

    for (const allowedRelPath of ALLOWLIST) {
      const filePath = path.join(PROJECT_ROOT, allowedRelPath);
      if (!fs.existsSync(filePath)) {
        stale.push(`${allowedRelPath} (file no longer exists)`);
        continue;
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      if (!hasLegacyBilingualImport(content)) {
        stale.push(`${allowedRelPath} (no longer imports a target — remove from ALLOWLIST)`);
      }
    }

    if (stale.length > 0) {
      throw new Error(
        `Stale ALLOWLIST entries found in __tests__/ci/no-legacy-bilingual-imports.test.ts.\n` +
          `Remove these entries (the migration is complete for these files):\n` +
          `${stale.map((s) => `  - ${s}`).join('\n')}`
      );
    }
  });
});
