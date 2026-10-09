import type { CSSProperties, ReactNode } from "react";
import {
  ArrowRight, BadgeDollarSign, Building2, CalendarRange, ChartColumn, Gauge, LayoutGrid,
  Network, ReceiptText, Smartphone, Sparkles, Timer, Wallet,
} from "lucide-react";
import type { IconName } from "@/site.config";
import { href, isExternal } from "@/lib/urls";

const icons = {
  sparkles: Sparkles, timer: Timer, grid: LayoutGrid, network: Network, receipt: ReceiptText,
  gauge: Gauge, wallet: Wallet, calendar: CalendarRange, building: Building2,
  "badge-dollar": BadgeDollarSign, chart: ChartColumn, smartphone: Smartphone,
} satisfies Record<IconName, unknown>;

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const Glyph = icons[name];
  return <Glyph size={size} strokeWidth={1.8} aria-hidden="true" />;
}

const glyph = (c: string) => (c === " " ? " " : c);

/** A label whose letters roll up, one after another, when its link or button is hovered. */
export function Roll({ text }: { text: string }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span className="roll" aria-hidden="true">
        {Array.from(text).map((c, i) => (
          <span className="roll-c" style={{ "--i": i } as CSSProperties} key={i}>
            <span>{glyph(c)}</span>
            <span>{glyph(c)}</span>
          </span>
        ))}
      </span>
    </>
  );
}

const DIGITS = "0123456789";

/**
 * Odometer-style number. Each digit is a column that rolls to its value, so a change
 * from 18 to 15 turns only the last digit. `play` false parks every digit at 0.
 */
export function NumberRoll({ value, play = true, className }: { value: string; play?: boolean; className?: string }) {
  const chars = Array.from(value);
  return (
    <span className={`nr ${className ?? ""}`}>
      <span className="sr-only">{value}</span>
      <span className="nr-v" aria-hidden="true">
        {chars.map((c, i) => {
          const fromRight = chars.length - i;
          if (!/\d/.test(c)) return <span key={`s${fromRight}`}>{c}</span>;
          const digit = play ? Number(c) : 0;
          return (
            <span className="nr-d" key={`d${fromRight}`}>
              <span className="nr-s" style={{ transform: `translateY(${-digit * 10}%)`, transitionDelay: `${i * 70}ms` }}>
                {Array.from(DIGITS).map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

type ButtonProps = {
  to: string;
  label: string;
  variant?: "ink" | "blue" | "light";
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
  style?: CSSProperties;
};

/** Every call to action is a real link: an anchor on the page, a URL or an email. */
export function ButtonLink({ to, label, variant = "ink", size = "md", arrow, className, style }: ButtonProps) {
  const external = isExternal(to) && !to.startsWith("mailto:");
  return (
    <a
      className={`btn btn-${variant}${size === "sm" ? " btn-sm" : ""}${className ? ` ${className}` : ""}`}
      href={href(to)}
      style={style}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      <Roll text={label} />
      {arrow && <ArrowRight className="btn-arrow" size={18} strokeWidth={2} aria-hidden="true" />}
    </a>
  );
}

/** Two-tone section heading. The second line is quieter; each line rises in on its own. */
export function SectionTitle({ lines, as: Tag = "h2", className }: { lines: string[]; as?: "h1" | "h2"; className?: string }) {
  return (
    <Tag className={`section-title${className ? ` ${className}` : ""}`}>
      {lines.map((line, i) => (
        <span className="section-line" data-reveal="" style={{ "--rd": `${i * 90}ms` } as CSSProperties} key={i}>
          {line}{" "}
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
