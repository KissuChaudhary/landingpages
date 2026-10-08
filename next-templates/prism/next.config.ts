import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: process.env.PRISM_EXPORT === "1" ? "1" : "0",
  },
  ...(process.env.PRISM_EXPORT === "1" ? { output: "export" } : {}),
  images: { unoptimized: true },
};

export default config;
