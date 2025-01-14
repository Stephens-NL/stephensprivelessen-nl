import { navigation } from '@/data/navigation'

describe('Navigation E2E', () => {
  const BASE_URL = 'https://www.stephensprivelessen.nl'

  it('should not have any 404 pages in navigation', async () => {
    // Test each route in navigation
    for (const item of navigation) {
      const url = `${BASE_URL}${item.href}`
      const response = await fetch(url)
      
      // Log the result for debugging
      console.log(`Testing ${url}...`)
      console.log(`Status: ${response.status}`)
      console.log(`Headers:`, Object.fromEntries(response.headers))
      
      if (response.status === 404) {
        console.error(`404 Error for ${url}`)
        const text = await response.text()
        console.error(`Response body:`, text.substring(0, 200))
      }
      
      expect(response.status).not.toBe(404)
      expect(response.ok).toBe(true)
    }
  }, 30000) // Increase timeout to 30 seconds

  it('should have proper content type headers', async () => {
    for (const item of navigation) {
      const url = `${BASE_URL}${item.href}`
      const response = await fetch(url)
      
      const contentType = response.headers.get('content-type')
      expect(contentType).toContain('text/html')
    }
  }, 30000) // Increase timeout to 30 seconds

  it('should redirect http to https', async () => {
    const httpUrl = BASE_URL.replace('https://', 'http://')
    const response = await fetch(httpUrl, { redirect: 'manual' })
    
    // Accept both 301 (Moved Permanently) and 308 (Permanent Redirect) status codes
    expect([301, 308]).toContain(response.status)
    const location = response.headers.get('location')
    expect(location).toContain('https://')
  }, 30000) // Increase timeout to 30 seconds
}) 