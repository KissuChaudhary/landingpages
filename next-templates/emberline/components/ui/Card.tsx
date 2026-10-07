import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** The one surface used by every card on the page. */
export function Card({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-line bg-bg-raised p-6 transition-colors duration-300 hover:border-line-strong md:p-7",
        className,
      )}
      {...props}
    >
      {/* Lit top edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-ember-200/35 to-transparent"
      />
      {children}
    </div>
  );
}

/** A recessed area inside a card, where the small illustrations live. */
export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-xl border border-line bg-bg-sunken p-4", className)}>{children}</div>;
}

/** The small rounded square that holds an icon at the top of a card. */
export function IconChip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-10 place-items-center rounded-xl border border-ember-300/20 bg-ember-300/10 text-ember-200",
        className,
      )}
    >
      {children}
    </span>
  );
}
