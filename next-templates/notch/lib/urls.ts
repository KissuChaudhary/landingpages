// Paths work both at the site root and under a base path (NEXT_PUBLIC_BASE_PATH) on static hosts.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** A file in /public. */
export const asset = (path: string) => `${basePath}${path}`;

/** A page link. Under a base path, static exports need explicit .html files. */
export const href = (path: string) => {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const split = path.search(/[?#]/);
  const pathname = split < 0 ? path : path.slice(0, split);
  const suffix = split < 0 ? "" : path.slice(split);
  if (!basePath) return path;
  return `${basePath}${pathname === "/" ? "/index.html" : `${pathname}.html`}${suffix}`;
};

/** True for links that leave the site (or open mail). */
export const isExternal = (path: string) => /^(https?:)?\/\//.test(path) || path.startsWith("mailto:");
