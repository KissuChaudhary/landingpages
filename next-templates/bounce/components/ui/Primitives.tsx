import type { CSSProperties, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { href, isExternal } from "@/lib/urls";

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

/** Odometer-style number: each digit rolls to its value. `play` false parks every digit at 0. */
export function NumberRoll({ value, play = true, className }: { value: string; play?: boolean; className?: string }) {
  const chars = Array.from(value);
  return (
    <span className={`nr${className ? ` ${className}` : ""}`}>
      <span className="sr-only">{value}</span>
      <span className="nr-v" aria-hidden="true">
        {chars.map((c, i) => {
          const fromRight = chars.length - i;
          if (!/\d/.test(c)) return <span key={`s${fromRight}`}>{c}</span>;
          return (
            <span className="nr-d" key={`d${fromRight}`}>
              <span className="nr-s" style={{ transform: `translateY(${-(play ? Number(c) : 0) * 10}%)`, transitionDelay: `${i * 70}ms` }}>
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

type ButtonProps = { to: string; label: string; variant?: "ink" | "light" | "pink" | "white"; arrow?: boolean; className?: string };

/** Every call to action is a real link: a section, a URL or an email. */
export function ButtonLink({ to, label, variant = "ink", arrow = true, className }: ButtonProps) {
  const external = isExternal(to) && !to.startsWith("mailto:");
  return (
    <a className={`btn btn-${variant}${className ? ` ${className}` : ""}`} href={href(to)} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
      <Roll text={label} />
      {arrow && (
        <span className="btn-orb" aria-hidden="true">
          <ArrowUpRight size={16} strokeWidth={2.2} />
        </span>
      )}
    </a>
  );
}

/** A heading whose lines rise in one after another. The last line can be quieter. */
export function Title({ lines, as: Tag = "h2", className, quiet = true }: { lines: string[]; as?: "h1" | "h2"; className?: string; quiet?: boolean }) {
  return (
    <Tag className={`title${quiet ? " is-quiet" : ""}${className ? ` ${className}` : ""}`}>
      {lines.map((line, i) => (
        <span className="title-line" data-reveal="" style={{ "--rd": `${i * 90}ms` } as CSSProperties} key={i}>
          {line}{" "}
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <p className={`eyebrow${color ? ` c-${color}` : ""}`}>
      <i aria-hidden="true" />
      {children}
    </p>
  );
}
