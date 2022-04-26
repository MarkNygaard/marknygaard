/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.datocms-assets.com'],
  },
  async redirects() {
    return [
      {
        source: '/blog/2020/03/hue-dimmer-script-in-node-red/',
        destination: '/blog/hue-dimmer-switch-in-node-red/',
        permanent: true,
      },
      {
        source: '/blog/2019/09/building-a-magicmiror/',
        destination: '/blog/building-a-magicmirror/',
        permanent: true,
      },
      {
        source: '/blog/2019/09/my-new-website-hosted-on-netlify/',
        destination: '/blog/my-new-website-hosted-on-netlify/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
