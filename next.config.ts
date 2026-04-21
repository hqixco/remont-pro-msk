import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.local",
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
  ],
  serverExternalPackages: ["ws"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
      },
      {
        protocol: "https",
        hostname: "*.storage.yandexcloud.net",
      },
    ],
  },
};

export default nextConfig;
