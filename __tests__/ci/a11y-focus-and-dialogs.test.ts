import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '../..');
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), 'utf8');

describe('a11y: keyboard focus', () => {
  const css = read('app/globals.css');

  it('has a global focus-visible ring outside any @layer (beats Tailwind outline-none)', () => {
    const idx = css.indexOf('\n:focus-visible {');
    expect(idx).toBeGreaterThan(-1);
    const before = css.slice(0, idx);
    // brace depth 0 = not inside any @layer/@media block
    const depth = (before.match(/\{/g) || []).length - (before.match(/\}/g) || []).length;
    expect(depth).toBe(0);
    expect(css.slice(idx, idx + 200)).toMatch(/outline:\s*2px solid/);
  });

  it('defines --amber-text with at least 4.5:1 on cream-dark', () => {
    const hex = (name: string) => css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`))![1];
    const lum = (h: string) => {
      const [r, g, b] = [1, 3, 5].map((i) => {
        const v = parseInt(h.slice(i, i + 2), 16) / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a: string, b: string) => {
      const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
      return (hi + 0.05) / (lo + 0.05);
    };
    expect(ratio(hex('amber-text'), hex('cream-dark'))).toBeGreaterThanOrEqual(4.5);
  });

  it('layout has a skip link to #main-content', () => {
    const layout = read('app/[locale]/layout.tsx');
    expect(layout).toContain('href="#main-content"');
    expect(layout).toContain('id="main-content"');
  });
});

describe('a11y: dialogs', () => {
  const files = [
    'components/Modal.tsx',
    'components/Services.tsx',
    'components/ServicesShort.tsx',
    'components/shared/WhatsAppButton.tsx',
    'components/contact/components/NotesPreviewModal.tsx',
    'components/contact/components/BackConfirmationDialog.tsx',
    'components/contact/components/GoogleCalendarAppointment.tsx',
  ];

  it.each(files)('%s is a labelled aria-modal dialog wired to useDialog', (f) => {
    const src = read(f);
    expect(src).toMatch(/role="(alert)?dialog"/);
    expect(src).toContain('aria-modal="true"');
    expect(src).toContain('useDialog(');
  });

  it('calendar iframe is gated behind a consent notice', () => {
    const src = read('components/contact/components/GoogleCalendarAppointment.tsx');
    expect(src).toMatch(/consented \? \(\s*<iframe/);
  });
});
