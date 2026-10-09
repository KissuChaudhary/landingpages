/** Prefixes local files with the base path, so they work under a sub-path too. */
export const asset = (src: string) =>
  src.startsWith("/") && !src.startsWith("//") ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${src}` : src;
