import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  outputFileTracingRoot: process.cwd(),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  ...(process.env.TANDEM_EXPORT === "1" ? { output: "export" } : {}),
  images: { unoptimized: true },
};

export default config;
