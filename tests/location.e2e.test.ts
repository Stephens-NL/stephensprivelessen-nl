import { test, expect } from '@playwright/test';

const locations = [
  'amsterdam-zuid',
  'amsterdam-centrum',
  'amsterdam-noord',
  'amsterdam-west',
  'amsterdam-oost'
];

test.describe('Location Pages', () => {
  test('should have correct metadata for each location', async ({ page }) => {
    for (const location of locations) {
      await page.goto(`/privelessen/${location}`);
      
      // Check if page loads
      await expect(page).toHaveTitle(new RegExp(`Amsterdam ${location.split('-')[1].charAt(0).toUpperCase() + location.split('-')[1].slice(1)}`));
      
      // Check meta description
      const metaDescription = await page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute('content', new RegExp('kantoor'));
      
      // Check if main content is present
      await expect(page.locator('main')).toBeVisible();
      
      // Check if area-specific content is present
      const areaText = location.split('-')[1].charAt(0).toUpperCase() + location.split('-')[1].slice(1);
      await expect(page.getByText(new RegExp(areaText))).toBeVisible();
    }
  });

  test('should return 404 for invalid location', async ({ page }) => {
    const response = await page.goto('/privelessen/invalid-location');
    expect(response?.status()).toBe(404);
  });

  test('should have correct OpenGraph tags', async ({ page }) => {
    for (const location of locations) {
      await page.goto(`/privelessen/${location}`);
      
      // Check OpenGraph tags
      const ogTitle = await page.locator('meta[property="og:title"]');
      await expect(ogTitle).toHaveAttribute('content', new RegExp('Amsterdam'));
      
      const ogUrl = await page.locator('meta[property="og:url"]');
      await expect(ogUrl).toHaveAttribute('content', new RegExp(`stephensprivelessen.nl/privelessen/${location}`));
      
      const ogType = await page.locator('meta[property="og:type"]');
      await expect(ogType).toHaveAttribute('content', 'website');
    }
  });

  test('should have correct keywords meta tag', async ({ page }) => {
    for (const location of locations) {
      await page.goto(`/privelessen/${location}`);
      
      const metaKeywords = await page.locator('meta[name="keywords"]');
      const keywords = await metaKeywords.getAttribute('content');
      
      // Check if both 'priveles' and 'bijles' are present for SEO
      expect(keywords).toContain('priveles');
      expect(keywords).toContain('bijles');
      
      // Check location-specific keywords
      const area = location.split('-')[1];
      expect(keywords).toContain(area);
    }
  });
}); 