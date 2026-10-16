// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",        // static export
  distDir: "out",          // build output dir
  trailingSlash: true,     // ensures static routing works
};

export default nextConfig;
