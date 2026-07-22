import type { MetadataRoute } from 'next';
import { config } from '@/data/config';
import { blogPosts } from '@/data/blog';

const SITE = config.business.siteUrl;

// nlPath (starts with '/') -> priority. Home 1.0, money/content pages 0.8, rest 0.5.
// Excludes query-param/private pages (aantekeningen) and low-value pages
// (feedback, aanmelden, voorwaarden). Dynamic [id] routes are appended below.
const ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/privelessen', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/workshops', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/consultancy', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/scriptiebegeleiding', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/mbo-rekenen', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/bijles/amsterdam', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/bijles/campus/uva', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/bijles/campus/vu', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/bijles/onderwerp/calculus', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/bijles/onderwerp/programmeren', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/bijles/onderwerp/statistiek/psychologie', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/faq', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.5, changeFrequency: 'weekly' },
];

function urls(nlPath: string) {
  const enPath = nlPath === '/' ? '/en' : `/en${nlPath}`;
  // Home canonical resolves to the bare origin (no trailing slash); match it so
  // sitemap URLs equal each page's declared canonical.
  const nlUrl = nlPath === '/' ? SITE : `${SITE}${nlPath}`;
  return {
    url: nlUrl,
    languages: { nl: nlUrl, en: `${SITE}${enPath}` },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map(({ path, priority, changeFrequency }) => {
    const { url, languages } = urls(path);
    return { url, changeFrequency, priority, alternates: { languages } };
  });

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const { url, languages } = urls(`/blog/${post.id}`);
    return {
      url,
      lastModified: post.date ? new Date(post.date) : undefined,
      changeFrequency: 'monthly',
      priority: 0.5,
      alternates: { languages },
    };
  });

  return [...staticEntries, ...blogEntries];
}
