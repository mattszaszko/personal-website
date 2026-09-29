import type { NextConfig } from "next";

/** Set in GitHub Actions when deploying to project Pages */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "personal-website";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isGithubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;
