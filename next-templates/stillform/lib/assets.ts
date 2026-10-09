/** Keeps local assets working both standalone and when the site is served under a sub-path. */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
