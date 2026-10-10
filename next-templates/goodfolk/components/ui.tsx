import { route } from "@/lib/urls";
export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
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
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path d="M22 4 7 17l10 5L8 35l25-17-13-5 12-9H22Z" fill="currentColor" />
    </svg>
  );
}
export function ButtonLink({
  href,
  children,
  light = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <a
      className={`button ${light ? "button-light" : ""} ${className}`}
      href={route(href)}
    >
      <span>{children}</span>
      <span className="button-arrow">
        <Arrow diagonal />
      </span>
    </a>
  );
}
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={`eyebrow ${className}`}>
      <span className="label-dot" />
      {children}
    </p>
  );
}
export function Multiline({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span className="line" key={i}>
          {line}
          {i < text.split("\n").length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
