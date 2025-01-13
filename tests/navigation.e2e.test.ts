import { navigation } from '@/data/navigation'

describe('Navigation E2E', () => {
  const BASE_URL = 'https://www.stephensprivelessen.nl'

  it('should not have any 404 pages in navigation', async () => {
    // Test each route in navigation
    for (const item of navigation) {
      const url = `${BASE_URL}${item.href}`
      const response = await fetch(url)
      
      expect(response.status).not.toBe(404)
      expect(response.ok).toBe(true)
      
      // Log the result for debugging
      console.log(`Tested ${url}: ${response.status}`)
    }
  })

  it('should have proper content type headers', async () => {
    for (const item of navigation) {
      const url = `${BASE_URL}${item.href}`
      const response = await fetch(url)
      
      const contentType = response.headers.get('content-type')
      expect(contentType).toContain('text/html')
    }
  })

  it('should redirect http to https', async () => {
    const httpUrl = BASE_URL.replace('https://', 'http://')
    const response = await fetch(httpUrl, { redirect: 'manual' })
    
    // Accept both 301 (Moved Permanently) and 308 (Permanent Redirect) status codes
    expect([301, 308]).toContain(response.status)
    const location = response.headers.get('location')
    expect(location).toContain('https://')
  })
}) 