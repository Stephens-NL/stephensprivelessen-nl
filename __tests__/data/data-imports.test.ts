import workshopsData from '@/data/workshopsData'
import { navigation, siteTitle } from '@/data/navigation'
import { blogInfo, blogPosts } from '@/data/blog'
import type { Workshop, NavItem } from '@/data/types'
import nlTutoring from '@/messages/nl/tutoring.json'
import enTutoring from '@/messages/en/tutoring.json'

describe('Data Imports', () => {
  describe('workshopsData', () => {
    it('should have valid workshop entries', () => {
      expect(workshopsData).toBeDefined()
      expect(Object.keys(workshopsData).length).toBeGreaterThan(0)

      // Check each workshop has required fields
      Object.values(workshopsData).forEach((workshop: Workshop) => {
        expect(workshop.id).toBeDefined()
        expect(workshop.title).toBeDefined()
        expect(workshop.title.EN).toBeDefined()
        expect(workshop.title.NL).toBeDefined()
        expect(workshop.type).toBeDefined()
        expect(['academic', 'creative']).toContain(workshop.type)

        if (workshop.description) {
          expect(workshop.description.EN).toBeDefined()
          expect(workshop.description.NL).toBeDefined()
        }
      })
    })
  })

  describe('navigation', () => {
    it('should have valid navigation items', () => {
      expect(navigation).toBeDefined()
      expect(navigation.length).toBeGreaterThan(0)

      navigation.forEach((item: NavItem) => {
        expect(item.href).toBeDefined()
        expect(item.label).toBeDefined()
        expect(item.label.EN).toBeDefined()
        expect(item.label.NL).toBeDefined()
      })
    })
  })

  describe('tutoring messages (migrated from tutoringPage)', () => {
    it('should have valid tutoring hero and pricing in messages/nl', () => {
      expect(nlTutoring).toBeDefined()
      expect(nlTutoring.hero).toBeDefined()
      expect(nlTutoring.hero.title).toBeDefined()
      expect(nlTutoring.pricing).toBeDefined()
      expect(nlTutoring.pricing.plans).toBeDefined()
      expect(nlTutoring.pricing.plans.length).toBeGreaterThan(0)
    })

    it('should have valid tutoring hero and pricing in messages/en', () => {
      expect(enTutoring).toBeDefined()
      expect(enTutoring.hero).toBeDefined()
      expect(enTutoring.hero.title).toBeDefined()
      expect(enTutoring.pricing).toBeDefined()
      expect(enTutoring.pricing.plans).toBeDefined()
      expect(enTutoring.pricing.plans.length).toBeGreaterThan(0)
    })
  })

  describe('siteTitle', () => {
    it('should have valid site title', () => {
      expect(siteTitle).toBeDefined()
      expect(siteTitle.EN).toBeDefined()
      expect(siteTitle.NL).toBeDefined()
    })
  })

  describe('blog', () => {
    it('should have valid blogInfo and blogPosts', () => {
      expect(blogInfo).toBeDefined()
      expect(blogInfo.title).toBeDefined()
      expect(blogInfo.title.EN).toBeDefined()
      expect(blogInfo.title.NL).toBeDefined()
      expect(blogPosts).toBeDefined()
      expect(Array.isArray(blogPosts)).toBe(true)
    })
  })
})
