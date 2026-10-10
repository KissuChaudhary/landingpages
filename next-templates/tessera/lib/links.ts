const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${basePath}${path}`;
/** Static sub-path hosting uses explicit HTML links; ordinary Next hosting uses routes. */
export function href(path: string) {
  if (!basePath || !path.startsWith("/") || path.startsWith("//")) return path;
  const split = path.search(/[?#]/);
  const route = split < 0 ? path : path.slice(0, split);
  const suffix = split < 0 ? "" : path.slice(split);
  return `${basePath}${route === "/" ? "/index.html" : `${route.replace(/\/$/, "")}.html`}${suffix}`;
}
