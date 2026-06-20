import { workshops } from '@/data/workshopsData';
import nlTutoring from '@/messages/nl/tutoring.json';
import enTutoring from '@/messages/en/tutoring.json';

describe('Content Validation', () => {
  describe('Tutoring Messages (messages/*/tutoring.json)', () => {
    it('NL tutoring.json should have all required sections', () => {
      expect(nlTutoring).toBeDefined();
      expect(nlTutoring.hero).toBeDefined();
      expect(nlTutoring.features).toBeDefined();
      expect(nlTutoring.subjects).toBeDefined();
      expect(nlTutoring.process).toBeDefined();
      expect(nlTutoring.pricing).toBeDefined();
      expect(nlTutoring.faq).toBeDefined();
    });

    it('EN tutoring.json should have all required sections', () => {
      expect(enTutoring).toBeDefined();
      expect(enTutoring.hero).toBeDefined();
      expect(enTutoring.features).toBeDefined();
      expect(enTutoring.subjects).toBeDefined();
      expect(enTutoring.process).toBeDefined();
      expect(enTutoring.pricing).toBeDefined();
      expect(enTutoring.faq).toBeDefined();
    });

    it('should have valid hero section content in both locales', () => {
      expect(typeof nlTutoring.hero.title).toBe('string');
      expect(typeof nlTutoring.hero.subtitle).toBe('string');
      expect(typeof nlTutoring.hero.ctaPrimary).toBe('string');
      expect(typeof enTutoring.hero.title).toBe('string');
      expect(typeof enTutoring.hero.subtitle).toBe('string');
      expect(typeof enTutoring.hero.ctaPrimary).toBe('string');
    });

    it('should have valid features content in both locales', () => {
      expect(Array.isArray(nlTutoring.features)).toBe(true);
      expect(nlTutoring.features.length).toBeGreaterThan(0);
      nlTutoring.features.forEach((feature: { title: string; description: string }) => {
        expect(typeof feature.title).toBe('string');
        expect(typeof feature.description).toBe('string');
      });
      expect(nlTutoring.features.length).toBe(enTutoring.features.length);
    });

    it('should have NL/EN parity for pricing plans', () => {
      expect(nlTutoring.pricing.plans.length).toBe(enTutoring.pricing.plans.length);
      expect(typeof nlTutoring.pricing.mostPopular).toBe('string');
      expect(typeof enTutoring.pricing.mostPopular).toBe('string');
    });
  });

  describe('Workshops Page Content', () => {
    it('should have all required sections', () => {
      expect(workshops).toBeDefined();
      validateBilingualText(workshops.title);
      validateBilingualText(workshops.description);
      expect(Array.isArray(workshops.categories)).toBe(true);
    });
  });

  // Helper function to validate bilingual text
  const validateBilingualText = (text: any) => {
    expect(text).toBeDefined();
    expect(text).toHaveProperty('EN');
    expect(text).toHaveProperty('NL');
    expect(typeof text.EN).toBe('string');
    expect(typeof text.NL).toBe('string');
  };
});
