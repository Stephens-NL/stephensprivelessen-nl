import { websiteSchema } from '@/lib/structured-data';

describe('websiteSchema SearchAction guard', () => {
  const serialized = JSON.stringify(websiteSchema);

  test('does not contain SearchAction', () => {
    expect(serialized).not.toContain('SearchAction');
  });

  test('does not contain /zoeken', () => {
    expect(serialized).not.toContain('/zoeken');
  });

  test('does not have a potentialAction key', () => {
    expect(websiteSchema).not.toHaveProperty('potentialAction');
  });

  test('is a valid WebSite schema with correct type and url', () => {
    expect(websiteSchema['@type']).toBe('WebSite');
    expect(websiteSchema['url']).toBe('https://stephensprivelessen.nl');
  });
});
