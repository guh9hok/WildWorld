import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.replit.dev",
    "*.repl.co",
    "*.replit.app",
    "*.sisko.replit.dev",
    "*.janeway.replit.dev",
    "*.picard.replit.dev",
    "*.kirk.replit.dev",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
