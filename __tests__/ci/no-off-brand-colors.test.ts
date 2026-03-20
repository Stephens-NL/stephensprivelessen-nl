import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const SCAN_DIRS = ['app', 'components'].map((d) => path.join(PROJECT_ROOT, d));
const EXTENSIONS = ['.tsx'];
const EXCLUDE_DIRS = ['node_modules', '.next'];

// shadcn/ui primitives may legitimately use raw Tailwind colors
const SKIP_DIRS = [path.join(PROJECT_ROOT, 'components', 'ui')];

/**
 * Raw Tailwind color pattern — these should not appear in brand-managed files.
 * Matches utility prefixes followed by any standard Tailwind named color + numeric shade.
 */
const OFF_BRAND_PATTERN =
  /\b(bg|text|border|from|to|via|ring|outline|shadow|divide|placeholder)-(red|orange|yellow|green|blue|indigo|violet|purple|pink|rose|emerald|teal|cyan|sky|lime|fuchsia|stone|zinc|neutral|gray|slate)-\d+\b/;

/**
 * Recursively collect all .tsx files from a directory, honouring exclusions.
 */
function getSourceFiles(dir: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (EXCLUDE_DIRS.includes(entry.name)) continue;
      if (SKIP_DIRS.includes(fullPath)) continue;
      results.push(...getSourceFiles(fullPath));
    } else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) {
      if (entry.name.includes('.test.') || entry.name.includes('.spec.')) continue;
      results.push(fullPath);
    }
  }
  return results;
}

interface Violation {
  file: string;
  line: number;
  match: string;
}

describe('no off-brand Tailwind colors', () => {
  const allFiles = SCAN_DIRS.flatMap(getSourceFiles);

  test('scanned files from expected directories', () => {
    expect(allFiles.length).toBeGreaterThan(0);
  });

  test('no raw Tailwind color classes outside brand palette', () => {
    const violations: Violation[] = [];

    for (const filePath of allFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Skip comment lines
        if (
          trimmed.startsWith('//') ||
          trimmed.startsWith('*') ||
          trimmed.startsWith('/*')
        ) {
          continue;
        }

        const match = OFF_BRAND_PATTERN.exec(line);
        if (match) {
          violations.push({
            file: path.relative(PROJECT_ROOT, filePath),
            line: i + 1,
            match: match[0],
          });
        }
      }
    }

    if (violations.length > 0) {
      const details = violations
        .map((v) => `  - ${v.file}:${v.line}: "${v.match}"`)
        .join('\n');
      throw new Error(
        `Found ${violations.length} off-brand Tailwind color(s). ` +
          `Use brand tokens (ink, cream, amber, sage, terracotta, etc.) instead:\n${details}`
      );
    }
  });
});
