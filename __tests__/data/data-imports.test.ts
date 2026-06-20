import workshopsData from '@/data/workshopsData'
import { navigation, siteTitle } from '@/data/navigation'
import { tutoringPage } from '@/data/tutoringPage'
import { blogInfo, blogPosts } from '@/data/blog'
import type { Workshop, NavItem } from '@/data/types'

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

  describe('tutoringPage', () => {
    it('should have valid tutoring page content', () => {
      expect(tutoringPage).toBeDefined()
      expect(tutoringPage.hero).toBeDefined()
      expect(tutoringPage.hero.title).toBeDefined()
      expect(tutoringPage.pricing).toBeDefined()
      expect(tutoringPage.pricing.plans).toBeDefined()
      expect(tutoringPage.pricing.plans.length).toBeGreaterThan(0)
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
