// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // 1. Find the existing file-loader rule for images
    const fileLoaderRule = config.module.rules.find(
      (rule) => typeof rule !== "string" && rule.test?.test?.(".svg")
    );

    if (fileLoaderRule && typeof fileLoaderRule !== "string") {
      // 2. Exclude .svg from it
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // 3. Add SVGR for SVGs
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
