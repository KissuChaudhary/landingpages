export async function copyCode(code: string) {
  if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
  await navigator.clipboard.writeText(code);
}
export function assetPath(src: string) {
  return src.startsWith("/") && !src.startsWith("//")
    ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${src}`
    : src;
}
