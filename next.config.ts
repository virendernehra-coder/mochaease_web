import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
});

const nextConfig: NextConfig = {
  turbopack: {},
  // Map non-prefixed variables to the client bundle
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xvjgvffbpbipdqdqlpwo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
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

export default withPWA(nextConfig);
