import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.10minuteschool.com'], // ✅ allows external images to be optimized by Next.js
  },
};

export default nextConfig;
