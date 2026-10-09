import type { Screen as ScreenImage } from "@/site.config";
import { asset } from "@/lib/assets";

/**
 * A product screen. Screens are images rather than coded mockups, so the page
 * stays light; their motion comes from how they arrive: out of a light blur,
 * settling from slightly larger, when `show` turns true.
 */
export function Screen({
  image,
  width,
  height,
  show = true,
  className = "",
  priority = false,
}: {
  image: ScreenImage;
  /** The image's size at 1× (the files are 2×). */
  width: number;
  height: number;
  show?: boolean;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={asset(image.src)}
      alt={image.alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      data-show={show}
      className={`screen select-none ${className}`}
    />
  );
}
