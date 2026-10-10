export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${basePath}${path}`;
export function href(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const split = path.search(/[?#]/);
  const pathname = split < 0 ? path : path.slice(0, split);
  const suffix = split < 0 ? "" : path.slice(split);
  return `${basePath ? `${basePath}${pathname === "/" ? "/index.html" : `${pathname}.html`}` : pathname}${suffix}`;
}
