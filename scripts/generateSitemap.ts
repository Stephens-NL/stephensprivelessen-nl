import type { NavItem } from '../data/types';
import type { Workshop, Workshops } from '../data/workshopTypes';

const fs = require('fs');
const path = require('path');
const workshopsData = require('../data/workshopsData');
const navigationData = require('../data/navigation');

const DOMAIN = 'https://www.stephensprivelessen.nl';
const LAST_MOD = new Date().toISOString().split('T')[0];

// Helper to create URL entry
const createUrlEntry = (path: string, changefreq: string, priority: string) => `  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${LAST_MOD}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

// Generate sitemap content
const generateSitemap = () => {
  const urlset = [`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Pages -->`];

  // Add homepage
  urlset.push(createUrlEntry('/', 'weekly', '1.0'));

  // Add navigation pages
  navigationData.navigation.forEach((item: NavItem) => {
    if (item.href !== '/') { // Skip homepage as it's already added
      urlset.push(createUrlEntry(
        item.href,
        item.href === '/workshops' || item.href === '/blog' ? 'weekly' : 'monthly',
        item.href === '/faq' ? '0.6' : '0.8'
      ));
    }
  });

  // Add workshop detail pages
  urlset.push('\n  <!-- Workshop Detail Pages -->');
  Object.values(workshopsData.workshops as Workshops).forEach((workshop: Workshop) => {
    urlset.push(createUrlEntry(
      `/workshops/${workshop.id}`,
      'monthly',
      '0.7'
    ));
  });

  urlset.push('</urlset>');
  return urlset.join('\n');
};

// Write sitemap to file
const sitemap = generateSitemap();
const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
fs.writeFileSync(outputPath, sitemap);
console.log('Sitemap generated successfully!'); 