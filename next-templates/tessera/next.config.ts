import type { NextConfig } from "next";
const config: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  // Set TESSERA_EXPORT=1 to generate a static site in out/.
  ...(process.env.TESSERA_EXPORT === "1" ? { output: "export" } : {}),
  images: { unoptimized: true },
};
export default config;
