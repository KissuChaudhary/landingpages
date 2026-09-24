export function DoodleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0 flex items-center justify-center">
      {/* Background container scaled to the reference size and centered */}
      <div className="relative w-full max-w-[1000px] h-full min-h-[700px] opacity-[0.45] text-[#EDEDED]">
        {/* Large tilted oval bottom-left */}
        <svg
          className="absolute -bottom-10 -left-10 w-64 h-64 rotate-[-20deg]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        >
          <ellipse cx="100" cy="100" rx="80" ry="60" />
        </svg>

        {/* Asterisk/star shape left side */}
        <svg
          className="absolute top-[380px] left-[80px] w-24 h-24"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        >
          <path d="M50 10L50 90 M10 50L90 50 M22 22L78 78 M22 78L78 22" />
        </svg>

        {/* Triangle outline under heading left */}
        <svg
          className="absolute top-[300px] left-[250px] w-20 h-20 rotate-12"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M50 20L80 80H20Z" />
        </svg>

        {/* Small triangle near bottom center */}
        <svg
          className="absolute bottom-[80px] left-[60%] w-12 h-12 rotate-[-15deg]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M50 20L80 80H20Z" />
        </svg>

        {/* Wavy vertical scribble behind lower heading */}
        <svg
          className="absolute top-[400px] left-[45%] w-24 h-32"
          viewBox="0 0 100 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 20 C60 40 10 60 40 80 C70 100 20 120 50 140" />
        </svg>

        {/* Large curved arc behind buttons/right-center */}
        <svg
          className="absolute top-[250px] right-[25%] w-48 h-48 rotate-[15deg]"
          viewBox="0 0 150 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="12"
          strokeLinecap="round"
        >
          <path d="M20 130 C20 70 70 20 130 20" />
        </svg>

        {/* Asterisk/star right side */}
        <svg
          className="absolute top-[450px] right-[10%] w-24 h-24 rotate-[25deg]"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        >
          <path d="M50 10L50 90 M10 50L90 50 M22 22L78 78 M22 78L78 22" />
        </svg>

        {/* Ring/oval top-right */}
        <svg
          className="absolute top-[320px] right-[5%] w-20 h-20"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
        >
          <circle cx="50" cy="50" r="40" />
        </svg>

        {/* Angled line/chevron marks bottom-right */}
        <svg
          className="absolute bottom-[40px] right-[15%] w-20 h-20"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 50L50 80L80 50 M35 35L50 50L65 35" />
        </svg>
      </div>
    </div>
  );
}
