import fs from 'fs';
import path from 'path';
import robots from '@/app/robots';
import sitemap from '@/app/sitemap';

const ROOT = path.resolve(__dirname, '../..');

function files(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? files(p) : /\.tsx?$/.test(e.name) ? [p] : [];
  });
}

describe('first-party /go redirects', () => {
  it('no component links straight to wa.me (go through /go/whatsapp)', () => {
    const offenders = files(path.join(ROOT, 'components')).filter((f) => /wa\.me/.test(fs.readFileSync(f, 'utf8')));
    expect(offenders.map((f) => path.relative(ROOT, f))).toEqual([]);
  });

  it('robots disallows /go/ and still allows /', () => {
    const rules = ([] as any[]).concat(robots().rules)[0];
    expect(rules.allow).toBe('/');
    expect(rules.disallow).toBe('/go/');
  });

  it('sitemap has no /go URLs', () => {
    expect(sitemap().filter((e) => e.url.includes('/go/'))).toEqual([]);
  });

  it('middleware matcher skips /go/', () => {
    const src = fs.readFileSync(path.join(ROOT, 'middleware.ts'), 'utf8');
    expect(src).toMatch(/\(\?!api\|go\//);
  });
});

describe('privacy statement v1.5', () => {
  const nl = fs.readFileSync(path.join(ROOT, 'messages/nl/privacy.json'), 'utf8');
  const en = fs.readFileSync(path.join(ROOT, 'messages/en/privacy.json'), 'utf8');

  it('NL: v1.5, IP-less server log, Cloudflare Web Analytics', () => {
    expect(nl).toContain('Versie 1.5');
    expect(nl).toContain('zonder IP-adres');
    expect(nl).toContain('Cloudflare Web Analytics');
    expect(nl).not.toContain('**geen analytics** ingebed');
  });

  it('EN: v1.5, IP-less server log, Cloudflare Web Analytics', () => {
    expect(en).toContain('Version 1.5');
    expect(en).toContain('without IP address');
    expect(en).toContain('Cloudflare Web Analytics');
  });
});
