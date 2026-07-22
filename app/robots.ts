import type { MetadataRoute } from 'next';
import { config } from '@/data/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${config.business.siteUrl}/sitemap.xml`,
    host: config.business.siteUrl,
  };
}
