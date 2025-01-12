import { tutoringPage } from '@/data/tutoringPage';
import { workshops } from '@/data/workshopsData';
import { about } from '@/data/about';
import { services, generalContent } from '@/data/services';

describe('Content Validation', () => {
  describe('Tutoring Page Content', () => {
    it('should have all required sections', () => {
      expect(tutoringPage).toBeDefined();
      expect(tutoringPage.hero).toBeDefined();
      expect(tutoringPage.features).toBeDefined();
      expect(tutoringPage.subjects).toBeDefined();
      expect(tutoringPage.process).toBeDefined();
      expect(tutoringPage.testimonials).toBeDefined();
      expect(tutoringPage.pricing).toBeDefined();
      expect(tutoringPage.faq).toBeDefined();
      expect(tutoringPage.contact).toBeDefined();
    });

    it('should have valid hero section content', () => {
      const { hero } = tutoringPage;
      validateBilingualText(hero.title);
      validateBilingualText(hero.subtitle);
      expect(Array.isArray(hero.stats)).toBe(true);
      expect(hero.cta).toBeDefined();
    });

    it('should have valid features content', () => {
      const { features } = tutoringPage;
      expect(Array.isArray(features)).toBe(true);
      features.forEach(feature => {
        expect(feature.icon).toBeDefined();
        validateBilingualText(feature.title);
        validateBilingualText(feature.description);
      });
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

  describe('About Page Content', () => {
    it('should have all required sections', () => {
      expect(about).toBeDefined();
      validateBilingualText(about.title);
      expect(about.introduction).toBeDefined();
      validateBilingualText(about.philosophyTitle);
      expect(Array.isArray(about.philosophyPoints)).toBe(true);
    });
  });

  describe('Services Page Content', () => {
    it('should have valid services array', () => {
      expect(Array.isArray(services)).toBe(true);
      expect(services.length).toBeGreaterThan(0);
      
      services.forEach(service => {
        expect(service.id).toBeDefined();
        expect(service.icon).toBeDefined();
        validateBilingualText(service.title);
        validateBilingualText(service.shortDescription);
        validateBilingualText(service.longDescription);
      });
    });

    it('should have valid general content', () => {
      expect(generalContent).toBeDefined();
      validateBilingualText(generalContent.ourServices);
      validateBilingualText(generalContent.serviceDetails);
      validateBilingualText(generalContent.learnMore);
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

  // Helper function to validate content object
  const validateContentObject = (obj: any, requiredFields: string[]) => {
    expect(obj).toBeDefined();
    requiredFields.forEach(field => {
      expect(obj).toHaveProperty(field);
    });
  };
}); 