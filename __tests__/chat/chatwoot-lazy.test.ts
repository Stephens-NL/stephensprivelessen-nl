import fs from 'fs';
import path from 'path';
import { openChat, SDK_ID } from '@/lib/chatwoot';

const ROOT = path.resolve(__dirname, '../..');

function env() {
  const listeners: Record<string, () => void> = {};
  const scripts: any[] = [];
  const w: any = {
    addEventListener: (e: string, f: () => void) => { listeners[e] = f; },
    removeEventListener: (e: string) => { delete listeners[e]; },
  };
  const d: any = {
    getElementById: (id: string) => scripts.find((s) => s.id === id && !s.removed) ?? null,
    createElement: (): any => ({ remove(this: any) { this.removed = true; } }),
    head: { appendChild: (s: any) => scripts.push(s) },
  };
  return { w, d, scripts, listeners };
}

describe('Chatwoot widget loads only on click (spec D1, privacy v1.6)', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it('first click injects one SDK script with the locale; a second click while loading adds nothing', () => {
    const { w, d, scripts } = env();
    openChat('tok', 'nl', jest.fn(), 5000, w, d);
    openChat('tok', 'nl', jest.fn(), 5000, w, d);
    expect(scripts).toHaveLength(1);
    expect(scripts[0]).toMatchObject({ id: SDK_ID, src: 'https://crm.sadei.nl/packs/js/sdk.js', async: true });
    expect(w.chatwootSettings).toEqual({ locale: 'nl', hideMessageBubble: true, position: 'right' });
  });

  it('runs the SDK with the token on load and opens the widget on chatwoot:ready', () => {
    const { w, d, scripts, listeners } = env();
    const run = jest.fn();
    const toggle = jest.fn();
    const setCustomAttributes = jest.fn();
    const setLocale = jest.fn();
    w.chatwootSDK = { run };
    openChat('tok', 'en', jest.fn(), 5000, w, d);
    scripts[0].onload();
    expect(run).toHaveBeenCalledWith({ websiteToken: 'tok', baseUrl: 'https://crm.sadei.nl' });
    w.$chatwoot = { toggle, setCustomAttributes, setLocale };
    listeners['chatwoot:ready']();
    expect(setLocale).toHaveBeenCalledWith('en');
    expect(setCustomAttributes).toHaveBeenCalledWith({ page_locale: 'en' });
    expect(toggle).toHaveBeenCalledWith('open');
    openChat('tok', 'en', jest.fn(), 5000, w, d);
    expect(toggle).toHaveBeenCalledTimes(2);
    expect(scripts).toHaveLength(1);
  });

  it('a blocked or slow SDK shows the fallback once, never opens late, and a new click retries', () => {
    const { w, d, scripts, listeners } = env();
    const onFail = jest.fn();
    openChat('tok', 'nl', onFail, 5000, w, d);
    jest.advanceTimersByTime(5000);
    expect(onFail).toHaveBeenCalledTimes(1);
    expect(scripts[0].removed).toBe(true);
    expect(listeners['chatwoot:ready']).toBeUndefined();
    openChat('tok', 'nl', onFail, 5000, w, d);
    expect(scripts).toHaveLength(2);
    scripts[1].onerror();
    jest.advanceTimersByTime(10000);
    expect(onFail).toHaveBeenCalledTimes(2);
  });

  it('no page, layout or component references the SDK or crm.sadei.nl directly', () => {
    const files = (dir: string): string[] =>
      fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
        const p = path.join(dir, e.name);
        return e.isDirectory() ? files(p) : /\.tsx?$/.test(e.name) ? [p] : [];
      });
    const offenders = [...files(path.join(ROOT, 'app')), ...files(path.join(ROOT, 'components'))]
      .filter((f) => /crm\.sadei\.nl|sdk\.js|chatwootSDK/.test(fs.readFileSync(f, 'utf8')));
    expect(offenders.map((f) => path.relative(ROOT, f))).toEqual([]);
  });
});
