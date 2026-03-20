import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const SCAN_DIRS = ['app', 'components', 'lib'].map((d) => path.join(PROJECT_ROOT, d));
const EXTENSIONS = ['.ts', '.tsx'];
const EXCLUDE_DIRS = ['node_modules', '.next', '__tests__', 'tests', 'scripts'];

/**
 * Recursively get all .ts/.tsx files from a directory.
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
      // Skip test files
      if (entry.name.includes('.test.') || entry.name.includes('.spec.')) continue;
      results.push(fullPath);
    }
  }
  return results;
}

describe('no console.log/warn in production code', () => {
  const allFiles = SCAN_DIRS.flatMap(getSourceFiles);

  test('no console.log statements', () => {
    const violations: string[] = [];

    for (const filePath of allFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Skip commented lines
        const trimmed = line.trim();
        if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
          continue;
        }
        if (line.includes('console.log')) {
          const relPath = path.relative(PROJECT_ROOT, filePath);
          violations.push(`${relPath}:${i + 1}: ${trimmed}`);
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `Found ${violations.length} console.log statement(s) in production code:\n${violations
          .map((v) => `  - ${v}`)
          .join('\n')}`
      );
    }
  });

  test('no console.warn statements', () => {
    const violations: string[] = [];

    for (const filePath of allFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
          continue;
        }
        if (line.includes('console.warn')) {
          const relPath = path.relative(PROJECT_ROOT, filePath);
          violations.push(`${relPath}:${i + 1}: ${trimmed}`);
        }
      }
    }

    if (violations.length > 0) {
      throw new Error(
        `Found ${violations.length} console.warn statement(s) in production code:\n${violations
          .map((v) => `  - ${v}`)
          .join('\n')}`
      );
    }
  });

  test('scanned files from expected directories', () => {
    expect(allFiles.length).toBeGreaterThan(0);
  });
});
