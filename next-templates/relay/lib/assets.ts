export const assetPath = (src: string) =>
  src.startsWith("/") && !src.startsWith("//")
    ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${src}`
    : src;
