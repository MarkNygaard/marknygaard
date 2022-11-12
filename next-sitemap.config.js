/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://marknygaard.dk',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: 'Algolia Crawler',
        allow: ['/sitemap.xml', '/sitemap-0.xml', '/blog/*'],
      },
      {
        userAgent: 'Algolia Crawler',
        disallow: ['/about', '/blog', '/'],
      },
    ],
  },
};
