import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const config: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  basePath,
  ...(process.env.STILLFORM_EXPORT === "1" ? { output: "export" } : {}),
  images: { unoptimized: true },
};

export default config;
