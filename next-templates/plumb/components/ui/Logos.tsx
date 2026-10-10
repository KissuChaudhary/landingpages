import { site } from "@/site.config";

/*
 * Fictional customer wordmarks, each set a little differently so the row reads as six
 * brands rather than six words. Replace the names in site.config.ts (hero.logos), or swap
 * a <span> for an <img> of a real logo you have permission to show.
 */

const marks: Record<string, React.ReactNode> = {
  tidyform: (
    <svg width="18" height="18" viewBox="0 0 12 12" aria-hidden="true">
      <rect x="1.5" y="2" width="9" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="1.5" y="5.4" width="6" height="2.2" rx="1.1" fill="currentColor" />
      <rect x="1.5" y="8.8" width="4" height="1.6" rx=".8" fill="currentColor" />
    </svg>
  ),
  "Lumen Notes": (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 2v14" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  "orbit.fm": (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="3" fill="currentColor" />
      <ellipse cx="9" cy="9" rx="8" ry="3.4" fill="none" stroke="currentColor" strokeWidth="1.4" transform="rotate(-24 9 9)" />
    </svg>
  ),
};

const styles = ["logo-tight", "logo-light", "logo-caps", "logo-mono", "logo-heavy", "logo-round"];

export function Logos() {
  return (
    <ul className="logos" aria-label="Sites that use Plumb">
      {site.hero.logos.map((name, i) => (
        <li key={name} className={`logo ${styles[i % styles.length]}`}>
          {marks[name] ?? null}
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}
