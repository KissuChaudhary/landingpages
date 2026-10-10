import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  outputFileTracingRoot: process.cwd(),
  distDir: process.env.NEXT_DIST_DIR || ".next",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT === "1"
    ? { output: "export" }
    : {}),
  images: { unoptimized: true },
};
export default config;
