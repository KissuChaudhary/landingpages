import { RevealText, Reveal } from "@/components/motion/Reveal";
import { Badge } from "./Badge";

/** Badge, title and description at the top of a section. */
export function SectionIntro({
  badge,
  title,
  description,
  align = "left",
  tone = "light",
  id,
  className = "",
  children,
}: {
  badge: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
  /** Extra content beside the title on wide screens, e.g. a button. */
  children?: React.ReactNode;
}) {
  const center = align === "center";
  return (
    <div className={`flex flex-col gap-6 ${children ? "md:flex-row md:items-end md:justify-between" : ""} ${center ? "items-center text-center" : ""} ${className}`}>
      <div className={`flex flex-col ${center ? "items-center" : "items-start"}`}>
        <Reveal>
          <Badge tone={tone}>{badge}</Badge>
        </Reveal>
        <RevealText
          id={id}
          text={title}
          className={`mt-5 text-[32px] sm:text-[40px] md:text-[52px] ${tone === "dark" ? "text-white" : "text-ink"}`}
        />
        {description && (
          <Reveal delay={160} className={`mt-4 max-w-[52ch] text-[15.5px] leading-relaxed md:text-[17px] ${tone === "dark" ? "text-white/60" : "text-muted-foreground"}`}>
            <p>{description}</p>
          </Reveal>
        )}
      </div>
      {children && <Reveal delay={220}>{children}</Reveal>}
    </div>
  );
}
