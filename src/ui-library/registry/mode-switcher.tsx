"use client";

import * as React from "react";
import { Lock } from "lucide-react";

/* ─────────────────────────────────────────────────────────
 * MODE SWITCHER: Fast, Thinking, Research…
 *
 * A segmented radio group with a pill that slides to the chosen
 * mode. Locked modes stay visible with a lock, so people see what
 * an upgrade unlocks; choosing one calls onLockedSelect instead.
 * Arrow keys move between modes, like any radio group.
 * ───────────────────────────────────────────────────────── */

export interface Mode {
  value: string;
  label: string;
  /** One line shown under the switcher for the chosen mode. */
  description?: string;
  icon?: React.ReactNode;
  /** Visible but not selectable, e.g. a paid mode. */
  locked?: boolean;
}

export interface ModeSwitcherProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  modes: Mode[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Called when someone picks a locked mode, e.g. to open pricing. */
  onLockedSelect?: (mode: Mode) => void;
  /** Show the chosen mode's description underneath. */
  showDescription?: boolean;
  label?: string;
}

const FOCUS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40";

export function ModeSwitcher({
  modes,
  value,
  defaultValue,
  onValueChange,
  onLockedSelect,
  showDescription = false,
  label = "Mode",
  className = "",
  ...props
}: ModeSwitcherProps) {
  const [own, setOwn] = React.useState(defaultValue ?? modes.find((m) => !m.locked)?.value);
  const current = value ?? own;
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = React.useState<{ left: number; width: number } | null>(null);
  const index = modes.findIndex((m) => m.value === current);
  const active = modes[index];

  // Measure the chosen button so the pill can slide to it; re-measure when the container resizes.
  React.useLayoutEffect(() => {
    const el = refs.current[index];
    if (!el) return;
    const measure = () => setPill({ left: el.offsetLeft, width: el.offsetWidth });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const choose = (mode: Mode) => {
    if (mode.locked) {
      onLockedSelect?.(mode);
      return;
    }
    if (value === undefined) setOwn(mode.value);
    onValueChange?.(mode.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
    const open = modes.map((m, i) => ({ m, i })).filter(({ m }) => !m.locked);
    const at = open.findIndex(({ i }) => i === index);
    const next = open[(at + dir + open.length) % open.length];
    if (!next) return;
    choose(next.m);
    refs.current[next.i]?.focus();
  };

  return (
    <div className={`inline-flex flex-col gap-1.5 ${className}`} {...props}>
      <div role="radiogroup" aria-label={label} onKeyDown={onKeyDown} className="relative inline-flex w-fit items-center rounded-full bg-muted p-0.5">
        {pill && (
          <span
            aria-hidden="true"
            className="absolute inset-y-0.5 rounded-full bg-background shadow-[0_0_0_1px_var(--border)] transition-[left,width] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
            style={{ left: pill.left, width: pill.width }}
          />
        )}
        {modes.map((mode, i) => {
          const selected = mode.value === current;
          return (
            <button
              key={mode.value}
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-disabled={mode.locked || undefined}
              tabIndex={selected ? 0 : -1}
              title={mode.locked ? `${mode.label} isn’t available on your plan` : mode.description}
              onClick={() => choose(mode)}
              className={`relative z-10 flex h-7 items-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium transition-colors ${FOCUS} ${
                selected ? "text-foreground" : mode.locked ? "text-muted-foreground/70" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode.icon && (
                <span aria-hidden="true" className="flex [&>svg]:size-3.5">
                  {mode.icon}
                </span>
              )}
              {mode.label}
              {mode.locked && <Lock aria-hidden="true" className="size-3" />}
            </button>
          );
        })}
      </div>
      {showDescription && active?.description && (
        <p key={active.value} className="px-1 text-[12px] text-muted-foreground animate-[ui-fade-in_250ms_ease-out_both]">
          {active.description}
        </p>
      )}
    </div>
  );
}
