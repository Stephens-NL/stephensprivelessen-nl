import { test, expect } from '@playwright/test';

// Define pages and expected language settings
const pagesToTest = [
  { url: '/', expectedLang: 'nl' },
  { url: '/about', expectedLang: 'nl' },
  { url: '/contact', expectedLang: 'nl' },
  { url: '/blog', expectedLang: 'nl' },
  // Add additional pages as needed
];

test.describe('Language Requirements', () => {
  for (const pageInfo of pagesToTest) {
    test(`should display lang="${pageInfo.expectedLang}" on ${pageInfo.url}`, async ({ page }) => {
      await page.goto(pageInfo.url);
      const langAttribute = await page.getAttribute('html', 'lang');
      expect(langAttribute).toBe(pageInfo.expectedLang);
    });
  }
}); 