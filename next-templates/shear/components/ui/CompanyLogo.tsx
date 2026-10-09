import type { CompanyLogo as Logo } from "@/site.config";
import { asset } from "@/lib/assets";

/* Simple marks for the fictional companies in the demo. Set `src` in
   site.config.ts to show a real logo file instead. */
const marks: Record<Logo["mark"], React.ReactNode> = {
  peak: <path d="M2 18 9 6l4 6.5L15.5 9 22 18Z" fill="currentColor" />,
  orbit: (
    <>
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" fill="none" stroke="currentColor" strokeWidth="1.6" transform="rotate(-24 12 12)" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
      <rect x="13" y="3" width="8" height="8" rx="4" fill="currentColor" opacity=".55" />
      <rect x="3" y="13" width="8" height="8" rx="4" fill="currentColor" opacity=".55" />
      <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
    </>
  ),
  wave: <path d="M2 10c3-4 6-4 10 0s7 4 10 0v4c-3 4-6 4-10 0s-7-4-10 0Z" fill="currentColor" />,
  leaf: <path d="M4 20C4 9 10 4 20 4c0 10-5 16-16 16Zm0 0 9-9" fill="currentColor" stroke="currentColor" strokeWidth="1.2" />,
  stack: (
    <>
      <rect x="3" y="4" width="18" height="4" rx="2" fill="currentColor" />
      <rect x="6" y="10" width="15" height="4" rx="2" fill="currentColor" opacity=".7" />
      <rect x="9" y="16" width="12" height="4" rx="2" fill="currentColor" opacity=".45" />
    </>
  ),
  spark: <path d="M12 2c.8 5.2 4.8 9.2 10 10-5.2.8-9.2 4.8-10 10-.8-5.2-4.8-9.2-10-10 5.2-.8 9.2-4.8 10-10Z" fill="currentColor" />,
  ring: (
    <>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.2" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </>
  ),
};

export function CompanyLogo({ logo, className = "" }: { logo: Logo; className?: string }) {
  if (logo.src) return <img src={asset(logo.src)} alt={logo.name} className={`h-6 w-auto ${className}`} />;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[22px]">
        {marks[logo.mark]}
      </svg>
      <span className="text-[18px] font-[600] tracking-[-0.04em]" style={{ fontVariationSettings: '"wdth" 104' }}>
        {logo.name}
      </span>
    </span>
  );
}
