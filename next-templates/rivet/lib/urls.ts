const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const exported = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";
export function asset(path: string) {
  return `${base}${path}`;
}
export function route(path: string) {
  if (/^(https?:|mailto:|tel:)/.test(path)) return path;
  const [page, hash] = path.split("#");
  const [pathname = "/", query] = (page || "/").split("?");
  const target = exported
    ? pathname === "/"
      ? "/index.html"
      : `${pathname.replace(/\/$/, "")}.html`
    : pathname;
  return `${base}${target}${query ? `?${query}` : ""}${hash ? `#${hash}` : ""}`;
}
