import { readFileSync } from 'fs';
import { join } from 'path';

// The beacon is the only third-party script; it must stay cookieless Cloudflare Web Analytics,
// matching privacy statement v1.5. Removing it (review 2026-11-02) means updating the statement too.
describe('Cloudflare Web Analytics beacon', () => {
  const layout = readFileSync(join(__dirname, '../../app/[locale]/layout.tsx'), 'utf8');
  it('loads the CF beacon with a token', () => {
    expect(layout).toContain('static.cloudflareinsights.com/beacon.min.js');
    expect(layout).toMatch(/data-cf-beacon='\{"token": "[0-9a-f]{32}"\}'/);
  });
  it('privacy statement mentions Cloudflare Web Analytics', () => {
    const nl = readFileSync(join(__dirname, '../../messages/nl/privacy.json'), 'utf8');
    expect(nl).toContain('Cloudflare Web Analytics');
  });
});
