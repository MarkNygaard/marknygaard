/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.datocms-assets.com'],
  },
  redirects: async () => {
    return [
      {
        source: '/blog/2020/03/hue-dimmer-script-in-node-red/',
        destination: '/blog/hue-dimmer-script-in-node-red/', // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/blog/2019/09/building-a-magicmiror/',
        destination: '/blog/building-a-magicmiror/', // Matched parameters can be used in the destination
        permanent: true,
      },
      {
        source: '/blog/2019/09/my-new-website-hosted-on-netlify/',
        destination: '/blog/my-new-website-hosted-on-netlify/', // Matched parameters can be used in the destination
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
