/** Keeps local assets working both standalone and in the marketplace's static export. */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${path}`;
}
