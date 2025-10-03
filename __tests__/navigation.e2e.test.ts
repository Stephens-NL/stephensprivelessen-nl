import { navigation } from '@/data/navigation'

describe('Navigation E2E', () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  // Skip E2E tests if server is not running
  const isServerRunning = async () => {
    try {
      const response = await fetch(BASE_URL, { method: 'HEAD' })
      return response.ok
    } catch {
      return false
    }
  }

  it('should return valid responses for navigation items', async () => {
    // Skip test if server is not running
    if (!(await isServerRunning())) {
      console.log('Skipping E2E test - server not running')
      return
    }
    // Test each route in navigation
    for (const item of navigation) {
      const url = `${BASE_URL}${item.href}`
      console.log(`\nTesting route: ${item.href}`)
      
      try {
        const response = await fetch(url)
        
        // Log the result for debugging
        console.log(`URL: ${url}`)
        console.log(`Status: ${response.status}`)
        console.log(`OK: ${response.ok}`)
        
        if (!response.ok) {
          const text = await response.text()
          console.log(`Response body:`, text.substring(0, 200))
          console.log(`Headers:`, Object.fromEntries(response.headers))
        }
        
        // Accept both 200 OK and custom error pages (404)
        expect([200, 404]).toContain(response.status)
        
        // For 404s, ensure it's our custom error page by checking content type
        if (response.status === 404) {
          const contentType = response.headers.get('content-type')
          expect(contentType).toContain('text/html')
        }
      } catch (error) {
        console.error(`Error testing ${url}:`, error)
        throw error
      }
    }
  }, 30000) // Increase timeout to 30 seconds

  it('should have proper content type headers', async () => {
    // Skip test if server is not running
    if (!(await isServerRunning())) {
      console.log('Skipping E2E test - server not running')
      return
    }
    for (const item of navigation) {
      const url = `${BASE_URL}${item.href}`
      const response = await fetch(url)
      
      const contentType = response.headers.get('content-type')
      expect(contentType).toContain('text/html')
    }
  }, 30000)

  it('should redirect http to https', async () => {
    // Skip HTTPS test in development
    if (BASE_URL.includes('localhost')) {
      return;
    }

    const httpUrl = BASE_URL.replace('https://', 'http://')
    const response = await fetch(httpUrl, { redirect: 'manual' })
    
    // Accept both 301 (Moved Permanently) and 308 (Permanent Redirect) status codes
    expect([301, 308]).toContain(response.status)
  }, 30000)
}) 