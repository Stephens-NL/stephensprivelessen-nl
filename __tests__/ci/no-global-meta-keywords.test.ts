import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../..');
const LAYOUT_FILE = path.join(PROJECT_ROOT, 'app', '[locale]', 'layout.tsx');

/**
 * CI gate: the root layout must NOT inject a global <meta name="keywords"> block.
 *
 * Google has ignored meta keywords since 2009 and keyword-stuffing is a
 * recognised spam signal. A ~220-entry array on every page is harmful.
 *
 * Per-page keyword arrays in individual page.tsx / metadata.ts files are
 * intentionally left untouched (scoped, modest ~12 terms each) — this test
 * only guards the root layout.
 */
describe('no global meta keywords in root layout', () => {
  let source: string;

  beforeAll(() => {
    expect(fs.existsSync(LAYOUT_FILE)).toBe(true);
    source = fs.readFileSync(LAYOUT_FILE, 'utf-8');
  });

  test('layout.tsx contains generateMetadata function', () => {
    expect(source).toMatch(/generateMetadata/);
  });

  test('global keywords ternary is absent from generateMetadata', () => {
    // This pattern matches the opening of the global keywords field:
    //   keywords: isNl
    // (present on its own line inside generateMetadata)
    const globalKeywordsPattern = /\n\s*keywords:\s*isNl/;
    expect(source).not.toMatch(globalKeywordsPattern);
  });

  test('NL sentinel string "differentiaalvergelijkingen bijles" is absent from layout', () => {
    expect(source).not.toContain('differentiaalvergelijkingen bijles');
  });

  test('EN sentinel string "online tutoring netherlands" is absent from layout', () => {
    expect(source).not.toContain('online tutoring netherlands');
  });
});
