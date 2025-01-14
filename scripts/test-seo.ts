import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

const locations = [
  'amsterdam-zuid',
  'amsterdam-centrum',
  'amsterdam-noord',
  'amsterdam-west',
  'amsterdam-oost'
];

async function testSEO() {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://www.stephensprivelessen.nl'
    : 'http://localhost:3000';

  for (const location of locations) {
    console.log(`\nTesting SEO for ${location}:`);
    
    const url = `${baseUrl}/privelessen/${location}`;
    const response = await fetch(url);
    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Test title
    const title = document.querySelector('title')?.textContent;
    console.log('Title:', title);
    console.log('Title length:', title?.length, '(Should be 50-60 characters)');

    // Test meta description
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    console.log('Description:', description);
    console.log('Description length:', description?.length, '(Should be 150-160 characters)');

    // Test keywords
    const keywords = document.querySelector('meta[name="keywords"]')?.getAttribute('content');
    console.log('Keywords present:', keywords?.split(',').length);

    // Test headings structure
    const h1s = document.querySelectorAll('h1');
    console.log('H1 count:', h1s.length, '(Should be 1)');

    // Test canonical URL
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    console.log('Canonical URL:', canonical);

    // Test OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')?.getAttribute('content');
    const ogDescription = document.querySelector('meta[property="og:description"]')?.getAttribute('content');
    const ogUrl = document.querySelector('meta[property="og:url"]')?.getAttribute('content');
    
    console.log('OpenGraph tags present:', {
      title: !!ogTitle,
      description: !!ogDescription,
      url: !!ogUrl
    });

    // Test for mobile viewport
    const viewport = document.querySelector('meta[name="viewport"]')?.getAttribute('content');
    console.log('Mobile viewport:', !!viewport);

    // Test for language attributes
    const htmlLang = document.querySelector('html')?.getAttribute('lang');
    console.log('HTML lang attribute:', htmlLang);

    console.log('----------------------------------------');
  }
}

testSEO().catch(console.error); 