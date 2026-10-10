"use client";

import * as React from "react";

/* Numbers that change like an odometer.
 *
 *   rolling   each digit is a column that rolls to its new value, in the direction the
 *             number moved: going up, a 9 rolls on to 0 instead of spinning back
 *   places    new places slide open from nothing; lost ones fold away
 *   format    anything Intl.NumberFormat does: currency, percent, compact ("11K"), decimals
 *
 * The real number is always there as text for screen readers. Styles: .nr* in styles/base.css. */

export interface NumberRollProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  value: number;
  /** Intl.NumberFormat options, e.g. { style: "currency", currency: "USD" }. */
  format?: Intl.NumberFormatOptions;
  locales?: string | string[];
  prefix?: string;
  suffix?: string;
  /** Start from this value and roll to `value` once mounted, e.g. 0 for stats. */
  from?: number;
  /** Roll duration in ms. */
  duration?: number;
}

type Column = { key: string; char: string; digit: number | null };

const EASE = "cubic-bezier(0.16,1,0.3,1)";
const SETS = 5; // the strip repeats 0–9 five times so a roll never runs out of digits
const MIDDLE = 20;

const reducedQuery = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const useReducedMotion = () =>
  React.useSyncExternalStore(subscribeReduced, () => window.matchMedia(reducedQuery).matches, () => false);

/** Digits are keyed by their place counted from the right, so the units column stays the units column. */
function columns(text: string): Column[] {
  const chars = [...text];
  const seen = new Map<string, number>();
  let place = 0;
  const out: Column[] = [];
  for (let i = chars.length - 1; i >= 0; i--) {
    const char = chars[i];
    if (/\d/.test(char)) out.push({ key: `d${place++}`, char, digit: Number(char) });
    else {
      // Symbols are keyed by how many of the same symbol sit to their right, so a comma that shifts is the same comma.
      const n = seen.get(char) ?? 0;
      seen.set(char, n + 1);
      out.push({ key: `s${char}${n}`, char, digit: null });
    }
  }
  return out.reverse();
}

function Digit({ digit, trend, duration, reduced, rollIn }: { digit: number; trend: number; duration: number; reduced: boolean; rollIn: boolean }) {
  const [pos, setPos] = React.useState(MIDDLE + (rollIn ? 0 : digit));
  const [moving, setMoving] = React.useState(false);
  const posRef = React.useRef(pos);

  React.useLayoutEffect(() => {
    const current = posRef.current;
    const showing = ((current % 10) + 10) % 10;
    if (showing === digit) return;
    if (reduced) {
      posRef.current = MIDDLE + digit;
      setMoving(false);
      setPos(MIDDLE + digit);
      return;
    }
    const up = trend > 0 || (trend === 0 && digit > showing);
    const target = up ? current + ((digit - showing + 10) % 10) : current - ((showing - digit + 10) % 10);
    posRef.current = target;
    setMoving(true);
    setPos(target);
  }, [digit, trend, reduced]);

  // After a roll, quietly re-centre on the middle set so the next roll always has room.
  const settle = () => {
    const centred = MIDDLE + (((posRef.current % 10) + 10) % 10);
    posRef.current = centred;
    setMoving(false);
    setPos(centred);
  };

  return (
    <span className="nr-d">
      <span className="nr-ghost">{digit}</span>
      <span
        aria-hidden="true"
        onTransitionEnd={settle}
        className="nr-strip"
        style={{
          transform: `translateY(${(-pos * 100) / (SETS * 10)}%)`,
          transition: moving ? `transform ${duration}ms ${EASE}` : "none",
        }}
      >
        {Array.from({ length: SETS * 10 }, (_, i) => (
          <span key={i}>{i % 10}</span>
        ))}
      </span>
    </span>
  );
}

/** A place that appeared after the first paint slides open; places that were there from the start just sit. */
function Place({ enter, children }: { enter: boolean; children: React.ReactNode }) {
  const [entering] = React.useState(enter);
  return <span className={entering ? "nr-p nr-in" : "nr-p"}>{children}</span>;
}

export function NumberRoll({ value, format, locales = "en-US", prefix = "", suffix = "", from, duration = 1000, className = "", ...props }: NumberRollProps) {
  const reduced = useReducedMotion();
  const [shown, setShown] = React.useState(from ?? value);
  const previous = React.useRef(shown);
  const mounted = React.useRef(false);

  // Roll from `from` to the real value once on screen (a frame later, so the start is painted).
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setShown(value));
    return () => cancelAnimationFrame(frame);
  }, [value]);

  React.useEffect(() => {
    mounted.current = true;
  }, []);

  const formatter = React.useMemo(() => new Intl.NumberFormat(locales, format), [locales, format && JSON.stringify(format)]); // eslint-disable-line react-hooks/exhaustive-deps
  const text = `${prefix}${formatter.format(shown)}${suffix}`;
  const cols = React.useMemo(() => columns(text), [text]);
  const trend = Math.sign(shown - previous.current);

  // Places that disappear fold away instead of vanishing.
  const [leaving, setLeaving] = React.useState<Column[]>([]);
  const lastCols = React.useRef(cols);
  React.useLayoutEffect(() => {
    const gone = lastCols.current.filter((c) => !cols.some((n) => n.key === c.key));
    lastCols.current = cols;
    previous.current = shown;
    if (!gone.length || reduced) return;
    setLeaving(gone);
    const timer = window.setTimeout(() => setLeaving([]), 420);
    return () => window.clearTimeout(timer);
  }, [cols, shown, reduced]);

  return (
    <span className={`nr ${className}`} {...props}>
      <span className="sr-only">{`${prefix}${formatter.format(value)}${suffix}`}</span>
      <span aria-hidden="true" className="nr-v">
        {leaving.map((c) => (
          <span key={`out-${c.key}`} className="nr-p nr-out">
            {c.char}
          </span>
        ))}
        {cols.map((c) => (
          <Place key={c.key} enter={mounted.current && !reduced}>
            {c.digit === null ? c.char : <Digit digit={c.digit} trend={trend} duration={duration} reduced={reduced} rollIn={mounted.current} />}
          </Place>
        ))}
      </span>
    </span>
  );
}

/**
 * Rolls up from zero the first time it scrolls into view. The server renders the real
 * figure, so it reads correctly without JavaScript; in the browser it quietly resets to
 * zero while it's off screen and rolls up when it arrives.
 */
export function StatRoll({ value, decimals, compact, ...props }: Omit<NumberRollProps, "format" | "from"> & { decimals?: number; compact?: boolean }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [phase, setPhase] = React.useState<"static" | "waiting" | "rolling">("static");
  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    setPhase("waiting");
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setPhase("rolling");
      observer.disconnect();
    }, { threshold: 0.6 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);
  const format: Intl.NumberFormatOptions = compact
    ? { notation: "compact", maximumFractionDigits: 1 }
    : { minimumFractionDigits: decimals ?? 0, maximumFractionDigits: decimals ?? 0 };
  return (
    <span ref={ref}>
      {phase === "static" ? (
        <NumberRoll value={value} format={format} {...props} />
      ) : (
        <NumberRoll key="live" value={phase === "rolling" ? value : 0} from={0} format={format} {...props} />
      )}
    </span>
  );
}
