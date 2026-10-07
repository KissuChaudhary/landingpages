import { Eye } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ReelLook } from "@/site.config";

import { TikTokIcon, Verified } from "./Icons";

/** Splits "a *b* c" into plain and highlighted parts, so a hook can carry one lit-up word like a live caption. */
export function parseHook(hook: string) {
  return hook.split("*").map((text, index) => ({ text, mark: index % 2 === 1 }));
}

/** The caption highlight: an orange block behind the word, kept inline so it wraps with the text. */
export function Lit({ children }: { children: React.ReactNode }) {
  return <mark className="rounded-[6px] bg-orange px-1.5 py-px text-ink [box-decoration-break:clone]">{children}</mark>;
}

/** The decorative layer on a thumbnail. Pure CSS, so there is nothing to host. */
function Shape({ shape }: { shape: ReelLook["shape"] }) {
  if (shape === "arc") {
    return (
      <>
        <span aria-hidden className="absolute -right-1/4 -top-[8%] size-[85%] rounded-full border-[3px] border-current opacity-30" />
        <span aria-hidden className="absolute -right-[8%] top-[6%] size-[55%] rounded-full bg-current opacity-15" />
      </>
    );
  }
  if (shape === "dots") {
    return (
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[60%] opacity-25"
        style={{ backgroundImage: "radial-gradient(currentColor 1.6px, transparent 1.7px)", backgroundSize: "18px 18px" }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className="absolute inset-x-0 top-0 h-[62%] opacity-[0.14]"
      style={{ backgroundImage: "repeating-linear-gradient(135deg, currentColor 0 2px, transparent 2px 16px)" }}
    />
  );
}

/**
 * One short video, drawn rather than photographed: a colour field, a shape, a big hook and the handle.
 * `size="lg"` is used inside the phone in the hero.
 */
export function Reel({
  look,
  hook,
  handle,
  views,
  category,
  size = "md",
  className,
}: {
  look: ReelLook;
  hook: string;
  handle: string;
  views?: string;
  category?: string;
  size?: "md" | "lg";
  className?: string;
}) {
  return (
    <div
      className={cn("relative isolate aspect-[9/16] overflow-hidden", size === "lg" ? "rounded-[2.1rem]" : "rounded-[24px]", className)}
      style={{ background: `linear-gradient(165deg, ${look.from}, ${look.to})`, color: look.ink }}
    >
      <Shape shape={look.shape} />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <span className="flex size-8 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm">
          <TikTokIcon className="size-4" />
        </span>
        {category ? <span className="rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">{category}</span> : null}
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5">
        <p className={cn("display text-balance font-extrabold leading-[1.04]", size === "lg" ? "text-[1.875rem]" : "text-[clamp(1.375rem,1rem+1vw,1.75rem)]")}>
          {parseHook(hook).map((part, index) => (part.mark ? <Lit key={index}>{part.text}</Lit> : <span key={index}>{part.text}</span>))}
        </p>

        <div aria-hidden className="h-[3px] overflow-hidden rounded-full bg-current/25">
          <span className="block h-full w-2/5 rounded-full bg-current" />
        </div>

        <div className="flex items-center justify-between gap-2 max-sm:flex-col max-sm:items-start">
          <span className="flex min-w-0 max-w-full items-center gap-1.5 text-[13px] font-semibold">
            <span className="truncate">{handle}</span>
            <Verified className="size-4 shrink-0" />
          </span>
          {views ? (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">
              <Eye className="size-3.5" />
              {views}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
