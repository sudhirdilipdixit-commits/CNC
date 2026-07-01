import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cncimages.b-cdn.net",
      },
    ],
  },
};

export default nextConfig;
