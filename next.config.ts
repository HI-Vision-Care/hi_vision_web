import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
      },
      { protocol: "https", hostname: "images.unsplash.com", port: "" },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
      },
      { protocol: "https", hostname: "cdn2.fptshop.com.vn", port: "" },
      { protocol: "https", hostname: "i.pinimg.com", port: "" },
      { protocol: "https", hostname: "cevn.com.vn", port: "" },
      {
        protocol: "https",
        hostname: "psyme.org",
        port: "",
      },
      { protocol: "https", hostname: "advertisingvietnam.com", port: "" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
