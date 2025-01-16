import { NavItem, Workshop, WorkshopsPageContent } from '../data/types';
import { workshops } from '../data/workshopsData';
import { navigation } from '../data/navigation';
import { blogPosts } from '../data/blog';
import fs from 'fs';
import xml2js from 'xml2js';

const DOMAIN = 'https://www.stephensprivelessen.nl';
const LAST_MOD = new Date().toISOString().split('T')[0];

// Valid locations for tutoring services
const LOCATIONS = [
  'amsterdam-zuid',
  'amsterdam-centrum',
  'amsterdam-noord',
  'amsterdam-west',
  'amsterdam-oost'
] as const;

function createUrlEntry(path: string, changefreq: string = 'monthly', priority: string = '0.7'): any {
  return {
    loc: `${DOMAIN}${path}`,
    lastmod: LAST_MOD,
    changefreq: changefreq,
    priority: priority
  };
}

function generateSitemap() {
  const urlset: any[] = [];

  // Add main pages with high priority
  urlset.push(createUrlEntry('/', 'weekly', '1.0'));
  urlset.push(createUrlEntry('/services', 'weekly', '1.0'));
  urlset.push(createUrlEntry('/privelessen', 'weekly', '1.0'));
  urlset.push(createUrlEntry('/workshops', 'weekly', '1.0'));
  urlset.push(createUrlEntry('/consultancy', 'weekly', '0.9'));
  urlset.push(createUrlEntry('/contact', 'monthly', '0.8'));
  urlset.push(createUrlEntry('/faq', 'monthly', '0.8'));

  // Add location-specific tutoring pages
  LOCATIONS.forEach(location => {
    urlset.push(createUrlEntry(`/privelessen/${location}`, 'weekly', '0.9'));
  });

  // Add workshop detail pages
  Object.entries(workshops).forEach(([id, workshop]) => {
    if (workshop && typeof workshop === 'object' && 'id' in workshop) {
      urlset.push(createUrlEntry(
        `/workshops/${workshop.id}`,
        'monthly',
        '0.8'
      ));
    }
  });

  // Add blog posts
  blogPosts.forEach(post => {
    urlset.push(createUrlEntry(
      `/blog/${post.id}`,
      'monthly',
      '0.7'
    ));
  });

  // Add navigation pages (excluding already added pages)
  const addedPaths = new Set(['/', '/services', '/privelessen', '/workshops', '/consultancy', '/contact', '/faq'].map(p => p.toLowerCase()));
  navigation.forEach((item: NavItem) => {
    if (!addedPaths.has(item.href.toLowerCase())) {
      urlset.push(createUrlEntry(item.href.toLowerCase()));
    }
  });

  // Create sitemap XML
  const builder = new xml2js.Builder();
  const xml = builder.buildObject({
    urlset: {
      $: {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
      },
      url: urlset
    }
  });

  // Write sitemap to file
  fs.writeFileSync('public/sitemap.xml', xml);
  console.log('Sitemap generated successfully!');
}

generateSitemap(); 