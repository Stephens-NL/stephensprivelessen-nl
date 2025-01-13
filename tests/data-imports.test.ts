import workshopsData from '@/data/workshopsData'
import { services } from '@/data/services'
import { navigation, siteTitle } from '@/data/navigation'
import { tutoringPage } from '@/data/tutoringPage'
import { faqInfo, faqItems } from '@/data/faq'
import type { Workshop, Service, NavItem } from '@/data/types'

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

  describe('services', () => {
    it('should have valid service entries', () => {
      expect(services).toBeDefined()
      expect(services.length).toBeGreaterThan(0)
      
      services.forEach((service: Service) => {
        expect(service.id).toBeDefined()
        expect(service.title).toBeDefined()
        expect(service.title.EN).toBeDefined()
        expect(service.title.NL).toBeDefined()
        expect(service.icon).toBeDefined()
        
        if (service.description) {
          expect(service.description.EN).toBeDefined()
          expect(service.description.NL).toBeDefined()
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

  describe('faq', () => {
    it('should have valid FAQ content', () => {
      expect(faqInfo).toBeDefined()
      expect(faqInfo.title).toBeDefined()
      expect(faqInfo.title.EN).toBeDefined()
      expect(faqInfo.title.NL).toBeDefined()
      
      expect(faqItems).toBeDefined()
      expect(faqItems.length).toBeGreaterThan(0)
      
      faqItems.forEach(item => {
        expect(item.question).toBeDefined()
        expect(item.question.EN).toBeDefined()
        expect(item.question.NL).toBeDefined()
        expect(item.answer).toBeDefined()
        expect(item.answer.EN).toBeDefined()
        expect(item.answer.NL).toBeDefined()
      })
    })
  })

  describe('siteTitle', () => {
    it('should have valid site title', () => {
      expect(siteTitle).toBeDefined()
      expect(siteTitle.EN).toBeDefined()
      expect(siteTitle.NL).toBeDefined()
    })
  })
}) 