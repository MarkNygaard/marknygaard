/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://marknygaard.dk',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: 'Algolia Crawler',
        disallow: ['/¨', '/about', '/blog'],
      },
    ],
  },
};
