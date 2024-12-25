import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compress: true,
  crossOrigin: "anonymous",
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  output: "standalone",
  staticPageGenerationTimeout: 10000,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
