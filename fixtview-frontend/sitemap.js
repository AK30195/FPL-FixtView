import { writeFileSync } from 'fs';

const baseUrl = 'https://fpl-fixtview.vercel.app/';

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

writeFileSync('./public/sitemap.xml', sitemap, 'utf8');

console.log('✅ sitemap.xml generated for site');