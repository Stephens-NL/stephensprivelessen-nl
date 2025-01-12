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
        
        // Check if all navigation paths are in sitemap
        navPaths.forEach(path => {
            expect(sitemapUrls).toContain(path);
        });
    });

    test('all sitemap URLs are valid format', () => {
        const urlPattern = /^(\/|\/[a-z-]+|\/workshops\/[a-z-]+)$/;
        sitemapUrls.forEach(url => {
            expect(url).toMatch(urlPattern);
        });
    });

    test('all workshop detail pages exist in workshopsData', () => {
        const workshopUrls = sitemapUrls.filter(url => url.startsWith('/workshops/'));
        workshopUrls.forEach(url => {
            const workshopId = url.replace('/workshops/', '');
            const workshopExists = Object.values(workshops).some(w => 
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
}); 