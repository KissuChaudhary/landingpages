export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="28"
      viewBox="0 0 24 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 3h8v6H2zM14 3h8v6h-8zM2 11h8v6H2zM14 11h8v6h-8zM2 19h8v6H2z"
        fill="currentColor"
      />
    </svg>
  );
}
