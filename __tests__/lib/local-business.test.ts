import { localBusinessSchema } from '@/lib/structured-data';

describe('localBusinessSchema', () => {
  it('is a LocalBusiness with sourced NAP and no street address', () => {
    const s = localBusinessSchema('nl');
    expect(s['@type']).toContain('LocalBusiness');
    expect(s.email).toBe('info@stephensprivelessen.nl');
    expect(s.priceRange).toMatch(/^Vanaf €/);
    expect(s.address).not.toHaveProperty('streetAddress');
    expect(localBusinessSchema('en').priceRange).toMatch(/^From €/);
  });
});
