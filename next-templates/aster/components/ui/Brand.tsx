import { site } from "@/site.config";
import { href } from "@/lib/urls";
export function AsterMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="7" fill="currentColor" />
      <g stroke="var(--paper, #faf9f6)" strokeWidth="2.6" strokeLinecap="round">
        <path d="M16 7v18M7 16h18M9.6 9.6l12.8 12.8M9.6 22.4L22.4 9.6" />
      </g>
      <circle cx="16" cy="16" r="3.2" fill="currentColor" />
    </svg>
  );
}
export function Brand() {
  return (
    <a href={href("/")} className="brand" aria-label={`${site.brand} home`}>
      <AsterMark size={25} />
      <span>{site.brand}</span>
    </a>
  );
}
export function TeamMark({ type }: { type: string }) {
  return (
    <svg
      width="29"
      height="29"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      {type === "leaf" ? (
        <>
          <path d="M5 26C6 8 19 2 28 4c0 17-9 26-23 22Z" fill="currentColor" />
          <path d="m7 25 15-16" stroke="var(--paper)" strokeWidth="2" />
        </>
      ) : type === "orbit" ? (
        <g stroke="currentColor" strokeWidth="2.7">
          <ellipse
            cx="16"
            cy="16"
            rx="13"
            ry="6"
            transform="rotate(-35 16 16)"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="13"
            ry="6"
            transform="rotate(35 16 16)"
          />
        </g>
      ) : type === "triangles" ? (
        <>
          <path d="M4 25 13 6l9 19H4Z" fill="currentColor" />
          <path d="m14 25 9-19 9 19H14Z" fill="currentColor" opacity=".45" />
        </>
      ) : (
        <g fill="currentColor">
          <rect x="3" y="3" width="11" height="11" rx="3" />
          <rect x="18" y="3" width="11" height="11" rx="3" />
          <rect x="3" y="18" width="11" height="11" rx="3" />
          <rect x="18" y="18" width="11" height="11" rx="3" />
        </g>
      )}
    </svg>
  );
}
