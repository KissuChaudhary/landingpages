export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${basePath}${path}`;

/** Same links work on a normal Next server and a static host under a subpath. */
export function href(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const split = path.search(/[?#]/);
  const pathname = split < 0 ? path : path.slice(0, split);
  const suffix = split < 0 ? "" : path.slice(split);
  const exported = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
  const route = exported
    ? pathname === "/"
      ? "/index.html"
      : `${pathname}.html`
    : pathname;
  return `${basePath}${route}${suffix}`;
}
