export interface SitemapEntry {
    loc: string[];
    lastmod?: string[];
    changefreq?: string[];
    priority?: string[];
}

export interface SitemapData {
    urlset: {
        url: SitemapEntry[];
    };
}

export interface Workshop {
    id: string;
    title: {
        EN: string;
        NL: string;
    };
    [key: string]: any; // for other workshop properties
}

export interface WorkshopsData {
    default?: Workshop[];
    workshops?: Workshop[];
} 