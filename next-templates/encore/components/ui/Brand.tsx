import { site } from "@/site.config";

/** The Encore mark: a loop that comes back around (the next order). */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect width="24" height="24" rx="7" fill="currentColor" />
      <path className="mark-loop" d="M16.95 9.15A5.7 5.7 0 1 0 17.55 13.5" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" />
      <path d="M18.45 6.3v3.9h-3.9" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Brand({ className = "", tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <a href="#top" className={`brand inline-flex items-center gap-2 rounded-full ${className}`} aria-label={`${site.brand.name}, back to top`}>
      <Mark className="size-7 text-berry" />
      <span className={`display text-[25px] leading-none ${tone === "dark" ? "text-white" : "text-ink"}`} style={{ ["--wdth" as string]: 86 }}>
        {site.brand.name.toLowerCase()}
      </span>
    </a>
  );
}
