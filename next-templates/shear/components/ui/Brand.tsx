import { site } from "@/site.config";

/**
 * The Shear mark: a disc cut along a diagonal, its two halves slid apart
 * along the cut (a shear). On hover they slide a little further.
 */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <g className="mark-top">
        <path d="M4.64 16.25A8.5 8.5 0 0 1 19.36 7.75Z" transform="translate(-1.27 0.1)" fill="currentColor" />
      </g>
      <g className="mark-bottom">
        <path d="M19.36 7.75A8.5 8.5 0 0 1 4.64 16.25Z" transform="translate(1.27 -0.1)" fill="currentColor" />
      </g>
    </svg>
  );
}

export function Brand({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <a href="#top" className={`brand inline-flex items-center gap-2 rounded-full ${className}`} aria-label={`${site.brand.name}, back to top`}>
      <Mark className={`size-[26px] ${tone === "dark" ? "text-mint" : "text-ink"}`} />
      <span className="text-[21px] font-[560] tracking-[-0.045em]" style={{ fontVariationSettings: '"wdth" 108' }}>
        {site.brand.name.toLowerCase()}
      </span>
    </a>
  );
}
