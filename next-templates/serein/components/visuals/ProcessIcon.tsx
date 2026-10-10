export function ProcessIcon({ kind }: { kind: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className={`process-icon icon-${kind}`}
    >
      {kind === "discover" && (
        <>
          <circle cx="28" cy="28" r="17" />
          <circle cx="28" cy="28" r="8" />
          <path d="m40 40 14 14M28 3v8M3 28h8" />
        </>
      )}
      {kind === "direction" && (
        <>
          <circle cx="32" cy="32" r="25" />
          <circle cx="32" cy="32" r="17" />
          <path d="m24 40 5-16 11-5-5 16-11 5Z" />
        </>
      )}
      {kind === "craft" && (
        <>
          <path d="m8 20 24-13 24 13-24 13L8 20Zm0 12 24 13 24-13M8 44l24 13 24-13" />
          <path d="M32 7v26" />
        </>
      )}
      {kind === "launch" && (
        <>
          <path d="M15 49 49 15M16 15h33v33" />
          <circle cx="18" cy="46" r="10" />
        </>
      )}
    </svg>
  );
}
