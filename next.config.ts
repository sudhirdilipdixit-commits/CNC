import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/counselling",
        destination: "/ai-counsellor",
        permanent: true,
      },
      {
        source: "/counselling/:path*",
        destination: "/ai-counsellor",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cncimages.b-cdn.net",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
