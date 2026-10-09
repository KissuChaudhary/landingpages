export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (path: string) => `${basePath}${path}`;
export const route = (path: string) =>
  basePath
    ? `${basePath}${path === "/" ? "/index.html" : `${path}.html`}`
    : path;
export const href = (path: string) => {
  const [pathname, hash] = path.split("#");
  return `${route(pathname || "/")}${hash ? `#${hash}` : ""}`;
};
