import type { NextConfig } from "next";

/**
 * Custom domain (www.mattszaszko.com) serves this Pages site at the root,
 * so no basePath / assetPrefix is needed.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "",
  },
};

export default nextConfig;
