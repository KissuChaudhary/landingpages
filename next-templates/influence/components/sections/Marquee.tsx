import { siteConfig } from "@/site.config";

/**
 * A slow, endless strip of headline numbers and platforms. The list is repeated once, and the strip slides by
 * exactly half its width, so the loop has no seam. With reduced motion it simply stays still.
 */
export function Marquee() {
  const items = siteConfig.marquee;

  return (
    <div aria-label={items.join(", ")} role="group" className="overflow-hidden border-y border-line bg-sheet py-5">
      <div aria-hidden className="flex w-max animate-[marquee_38s_linear_infinite] items-center">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="flex items-center">
            <span className="display px-8 text-[1.375rem] text-ink sm:text-[1.625rem]">{item}</span>
            <span className="size-2 rotate-45 bg-orange" />
          </span>
        ))}
      </div>
    </div>
  );
}
