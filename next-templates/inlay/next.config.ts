import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  // Set NEXT_PUBLIC_BASE_PATH only when the site lives under a sub-path.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // INLAY_EXPORT=1 npm run build writes a static site to out/.
  ...(process.env.INLAY_EXPORT === "1" ? { output: "export" } : {}),
  images: { unoptimized: true },
};

export default config;
