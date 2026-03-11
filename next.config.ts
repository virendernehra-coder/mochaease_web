import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/use-cases/cafe',
        destination: '/solutions/cafe-pos',
        permanent: true,
      },
      {
        source: '/use-cases/qsr',
        destination: '/solutions/qsr-pos',
        permanent: true,
      },
      {
        source: '/use-cases/fashion',
        destination: '/solutions/fashion-pos',
        permanent: true,
      },
      {
        source: '/use-cases/enterprise',
        destination: '/solutions/enterprise-pos',
        permanent: true,
      },
      {
        source: '/experience',
        destination: '/solutions',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
