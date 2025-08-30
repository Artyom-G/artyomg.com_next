// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",        // static export
  distDir: "out",          // build output dir
  trailingSlash: true,     // ensures static routing works

  webpack(config) {
    // 1. Find the existing file-loader rule for images
    const fileLoaderRule = config.module.rules.find(
      (rule:any) => typeof rule !== "string" && rule.test?.test?.(".svg")
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
