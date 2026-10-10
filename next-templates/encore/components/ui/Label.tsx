/** The small label above a section title: a berry tick and mono caps. */
export function Label({ children, tone = "light", className = "" }: { children: React.ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={`label flex items-center gap-2.5 ${tone === "light" ? "text-muted-foreground" : "text-white/60"} ${className}`}>
      <span aria-hidden="true" className="h-px w-5 bg-berry" />
      {children}
    </p>
  );
}
