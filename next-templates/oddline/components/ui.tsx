import { site } from "@/site.config";
export function Arrow({
  diagonal = false,
  size = 20,
}: {
  diagonal?: boolean;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 42 42"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 10h25v25H7zM21 4h17v17M37 5 17 25"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path d="M32 10h-7v11h7" stroke="var(--bg)" strokeWidth="5" />
    </svg>
  );
}
export function Star({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m60 0 8 35 28-24-17 34 38-4-34 19 34 19-38-4 17 34-28-24-8 35-8-35-28 24 17-34-38 4 34-19L3 41l38 4-17-34 28 24z" />
    </svg>
  );
}
export function Brand() {
  return (
    <a href="#top" className="brand" aria-label={`${site.brand} home`}>
      <Mark />
      <span>
        {site.brand.toLowerCase()}
        <i>✳</i>
      </span>
    </a>
  );
}
export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
export function Button({
  children,
  href,
  outline = false,
}: {
  children: React.ReactNode;
  href: string;
  outline?: boolean;
}) {
  return (
    <a className={`button ${outline ? "button-outline" : ""}`} href={href}>
      <span>{children}</span>
      <span className="button-arrow">
        <Arrow diagonal size={17} />
      </span>
    </a>
  );
}
export function Title({
  lines,
  className = "",
}: {
  lines: readonly string[];
  className?: string;
}) {
  return (
    <h2 className={className} data-reveal>
      {lines.map((line, index) => (
        <span
          key={line}
          className={index === lines.length - 1 ? "muted-line" : ""}
        >
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
    </h2>
  );
}
