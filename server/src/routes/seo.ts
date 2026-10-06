import { Router, type Request, type Response } from 'express';
import { Country } from '../models/Country';
import { BlogPost, BLOG_CATEGORIES } from '../models/BlogPost';
import { Service } from '../models/Service';

const SITE_URL = process.env.SITE_URL || 'http://localhost:5174';

const xmlEscape = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

const staticRoutes = [
  { path: '/', priority: '1.0' },
  { path: '/about', priority: '0.8' },
  { path: '/visa-services', priority: '0.9' },
  { path: '/services', priority: '0.9' },
  { path: '/countries', priority: '0.9' },
  { path: '/process', priority: '0.8' },
  { path: '/eligibility', priority: '0.8' },
  { path: '/blog', priority: '0.7' },
  { path: '/faqs', priority: '0.6' },
  { path: '/contact', priority: '0.7' },
  { path: '/consultation', priority: '0.9' },
  ...['study', 'work', 'business', 'tourist', 'dependent', 'pr'].map((s) => ({
    path: `/visa/${s}`,
    priority: '0.9',
  })),
];

/** GET /sitemap.xml - generated from live content */
export const sitemap = async (_req: Request, res: Response) => {
  const now = new Date().toISOString();

  const [countries, posts] = await Promise.all([
    Country.find({ published: true }).select('slug updatedAt').lean(),
    BlogPost.find({ published: true }).select('slug publishedAt updatedAt').lean(),
  ]);

  const urls = [
    ...staticRoutes.map((r) => ({ loc: `${SITE_URL}${r.path}`, lastmod: now, priority: r.priority })),
    ...countries.map((c) => ({
      loc: `${SITE_URL}/countries/${c.slug}`,
      lastmod: (c.updatedAt || now).toISOString(),
      priority: '0.8',
    })),
    ...posts.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: (p.updatedAt || p.publishedAt || now).toISOString(),
      priority: '0.6',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${xmlEscape(u.loc)}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml').send(xml);
};

/** GET /robots.txt */
export const robots = (_req: Request, res: Response) => {
  res.header('Content-Type', 'text/plain').send(
    `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
  );
};

/** GET /api/meta - categories + site info for frontend filters */
export const meta = async (_req: Request, res: Response) => {
  const services = await Service.find({ published: true }).select('slug title').lean();
  res.json({
    success: true,
    data: {
      blogCategories: BLOG_CATEGORIES,
      services: services.map((s) => ({ slug: s.slug, title: s.title })),
      siteUrl: SITE_URL,
    },
  });
};

export default Router().get('/sitemap.xml', sitemap).get('/robots.txt', robots).get('/meta', meta);
