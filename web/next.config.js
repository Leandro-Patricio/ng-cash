/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landingPage",
        permanent: false,
      },
      {
        source: "/_error",
        destination: "/landingPage",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
