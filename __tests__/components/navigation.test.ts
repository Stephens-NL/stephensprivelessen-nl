import { navigation } from '@/data/navigation'

describe('Navigation Links', () => {
  it('should have valid app routes that match existing pages', async () => {
    // Get all navigation hrefs
    const routes = navigation.map(item => item.href)

    // Expected valid routes based on app directory structure
    const expectedValidRoutes = [
      '/',
      '/privelessen',
      '/scriptiebegeleiding',
      '/services',
      '/workshops',
      '/consultancy',
      '/about',
      '/blog',
      '/faq',
      '/contact'
    ]

    // Check if all navigation routes are in the expected valid routes
    routes.forEach(route => {
      expect(expectedValidRoutes).toContain(route)
    })

    // Check if we have a test for every navigation item
    expect(routes.length).toBe(expectedValidRoutes.length)
    
    // Check for case sensitivity in routes
    routes.forEach(route => {
      // All routes should be lowercase except for the root
      if (route !== '/') {
        expect(route).toBe(route.toLowerCase())
      }
    })

    // Check for trailing slashes
    routes.forEach(route => {
      // No route should end with a trailing slash except root
      if (route !== '/') {
        expect(route.endsWith('/')).toBe(false)
      }
    })
  })

  it('should have bilingual labels for all navigation items', () => {
    navigation.forEach(item => {
      expect(item.label.EN).toBeDefined()
      expect(item.label.NL).toBeDefined()
      expect(typeof item.label.EN).toBe('string')
      expect(typeof item.label.NL).toBe('string')
      expect(item.label.EN.length).toBeGreaterThan(0)
      expect(item.label.NL.length).toBeGreaterThan(0)
    })
  })

  it('should have unique hrefs', () => {
    const hrefs = navigation.map(item => item.href)
    const uniqueHrefs = new Set(hrefs)
    expect(hrefs.length).toBe(uniqueHrefs.size)
  })

  it('should have valid href format', () => {
    navigation.forEach(item => {
      // All hrefs should start with /
      expect(item.href.startsWith('/')).toBe(true)
      
      // No spaces allowed in hrefs
      expect(item.href.includes(' ')).toBe(false)
      
      // No special characters allowed except - and /
      expect(item.href).toMatch(/^[a-zA-Z0-9\-\/]+$/)
    })
  })
}) 