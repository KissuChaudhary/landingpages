export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
    >
      <path
        d="M13 1v24M1 13h24M4.5 4.5l17 17m0-17-17 17"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
