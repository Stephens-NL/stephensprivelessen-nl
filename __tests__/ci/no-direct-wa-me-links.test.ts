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

describe('privacy statement v1.7 (website chat, two draft processors)', () => {
  const nl = fs.readFileSync(path.join(ROOT, 'messages/nl/privacy.json'), 'utf8');
  const en = fs.readFileSync(path.join(ROOT, 'messages/en/privacy.json'), 'utf8');

  it('NL: v1.7, IP-less server log, CF analytics, chat cookie only after a click, Chatwoot, 6h holding message', () => {
    expect(nl).toContain('Versie 1.7');
    expect(nl).toContain('OpenAI');
    expect(nl).toContain('Anthropic');
    expect(nl).toContain('zonder IP-adres');
    expect(nl).toContain('Cloudflare Web Analytics');
    expect(nl).toContain('`cw_conversation`');
    expect(nl).toContain('Chatwoot');
    expect(nl).toContain('na 6 uur');
    expect(nl).not.toContain('**geen analytics** ingebed');
  });

  it('EN: the same facts', () => {
    expect(en).toContain('Version 1.7');
    expect(en).toContain('OpenAI');
    expect(en).toContain('Anthropic');
    expect(en).toContain('without IP address');
    expect(en).toContain('Cloudflare Web Analytics');
    expect(en).toContain('`cw_conversation`');
    expect(en).toContain('Chatwoot');
    expect(en).toContain('after 6 hours');
  });

  it('no internal jargon reaches visitors', () => {
    for (const x of [nl, en]) expect(x).not.toMatch(/Matrix-kamer|vps-bot|HITL|Opus|Sonnet|Haiku/);
  });
});
