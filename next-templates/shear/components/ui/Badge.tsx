/** The small label above a section title. */
export function Badge({ children, tone = "light", className = "" }: { children: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12.5px] font-[480] tracking-[-0.005em] ${
        tone === "light" ? "border border-line bg-white text-muted-foreground" : "border border-white/10 bg-white/[0.04] text-white/70"
      } ${className}`}
    >
      <span aria-hidden="true" className={`size-1.5 rounded-[2px] ${tone === "light" ? "bg-mint-ink" : "bg-mint"}`} />
      {children}
    </span>
  );
}
