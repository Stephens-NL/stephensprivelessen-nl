import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import { workshops } from '@/data/workshopsData';
import { navigation } from '@/data/navigation';

interface SitemapEntry {
    loc: string[];
    lastmod: string[];
    changefreq: string[];
    priority: string[];
}

interface SitemapData {
    urlset: {
        url: SitemapEntry[];
    };
}

describe('Sitemap Validation', () => {
    let sitemapContent: string;
    let parsedSitemap: SitemapData;
    let sitemapUrls: string[];

    beforeAll(async () => {
        // Read and parse sitemap
        sitemapContent = fs.readFileSync(path.join(process.cwd(), 'public/sitemap.xml'), 'utf-8');
        parsedSitemap = await xml2js.parseStringPromise(sitemapContent);
        
        // Extract URLs from sitemap and convert to lowercase
        sitemapUrls = parsedSitemap.urlset.url
            .map(entry => {
                const fullUrl = entry.loc[0];
                return fullUrl.replace('https://www.stephensprivelessen.nl', '').toLowerCase();
            })
            .filter(url => url !== ''); // Filter out empty URLs
    });

    test('all navigation pages are included in sitemap', () => {
        // Convert navigation items to lowercase paths
        const navPaths = navigation.map(item => item.href.toLowerCase());
        
        // Check if all navigation paths are in sitemap (convert absolute URLs to relative)
        const relativeSitemapUrls = sitemapUrls.map(url => {
            if (url.startsWith('https://stephensprivelessen.nl')) {
                return url.replace('https://stephensprivelessen.nl', '');
            }
            return url;
        });
        
        navPaths.forEach(path => {
            expect(relativeSitemapUrls).toContain(path);
        });
    });

    test('all sitemap URLs are valid format', () => {
        // Allow for more granular location and service-specific URLs, and blog posts with numbers
        const urlPattern = /^(\/|\/[a-z-]+|\/workshops\/[a-z-]+|\/privelessen\/[a-z-]+(\/[a-z-]+)?|\/scriptiebegeleiding\/[a-z-]+|\/mbo-rekenen|\/aantekeningen|\/blog\/\d+)$/;
        
        // Convert absolute URLs to relative for pattern matching
        const relativeSitemapUrls = sitemapUrls.map(url => {
            if (url.startsWith('https://stephensprivelessen.nl')) {
                return url.replace('https://stephensprivelessen.nl', '');
            }
            return url;
        });
        
        relativeSitemapUrls.forEach(url => {
            expect(url).toMatch(urlPattern);
        });
    });

    test('all workshop detail pages exist in workshopsData', () => {
        const workshopUrls = sitemapUrls.filter(url => url.startsWith('/workshops/'));
        const allWorkshops = workshops.categories.flatMap(category => category.items);
        
        workshopUrls.forEach(url => {
            const workshopId = url.replace('/workshops/', '');
            const workshopExists = allWorkshops.some(w => 
                w.id.toLowerCase() === workshopId
            );
            expect(workshopExists).toBeTruthy();
        });
    });

    test('navigation pages have correct priorities', () => {
        const navEntries = parsedSitemap.urlset.url.filter(entry => {
            const path = entry.loc[0].replace('https://www.stephensprivelessen.nl', '').toLowerCase();
            return navigation.some(nav => nav.href.toLowerCase() === path);
        });

        navEntries.forEach(entry => {
            const path = entry.loc[0].replace('https://www.stephensprivelessen.nl', '').toLowerCase();
            if (path === '/') {
                expect(entry.priority[0]).toBe('1.0');
                expect(entry.changefreq[0]).toBe('weekly');
            } else {
                expect(parseFloat(entry.priority[0])).toBeGreaterThanOrEqual(0.6);
            }
        });
    });

    test('sitemap entries follow SEO best practices', () => {
        const entries = parsedSitemap.urlset.url;
        
        entries.forEach(entry => {
            const url = entry.loc[0].toLowerCase();
            const priority = parseFloat(entry.priority[0]);
            const changefreq = entry.changefreq[0];

            // Validate priority based on content importance
            if (url.endsWith('stephensprivelessen.nl/')) {
                expect(priority).toBe(1.0); // Homepage highest priority
                expect(changefreq).toBe('weekly');
            } else if (url.includes('/privelessen/') || url.includes('/scriptiebegeleiding/')) {
                expect(priority).toBeGreaterThanOrEqual(0.8); // Service pages high priority
                expect(['daily', 'weekly', 'monthly']).toContain(changefreq);
            } else if (url.includes('/workshops/')) {
                expect(priority).toBeGreaterThanOrEqual(0.7); // Workshop pages medium-high priority
                expect(['weekly', 'monthly']).toContain(changefreq);
            }

            // Ensure all entries have lastmod date
            expect(entry.lastmod).toBeDefined();
            expect(entry.lastmod[0]).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        });
    });

    test('location-specific pages have proper hierarchy', () => {
        const locationPages = sitemapUrls.filter(url => 
            url.includes('/privelessen/amsterdam-') || 
            url.includes('/scriptiebegeleiding/amsterdam-')
        );

        locationPages.forEach(url => {
            const entry = parsedSitemap.urlset.url.find(e => 
                e.loc[0].toLowerCase().endsWith(url)
            );
            expect(entry).toBeDefined();
            expect(parseFloat(entry!.priority[0])).toBeGreaterThanOrEqual(0.8);
            expect(['daily', 'weekly', 'monthly']).toContain(entry!.changefreq[0]);
        });
    });
}); 