import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Message } from "@/site.config";

/** The Parley mark: two ribbons that read as a speech bubble. Also used as the agent's avatar. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path d="M6 12a6 6 0 0 1 6-6h4v20h-4a6 6 0 0 1-6-6v-8Z" fill="#e0526f" />
      <path d="M26 20a6 6 0 0 1-6 6h-4V6h4a6 6 0 0 1 6 6v8Z" fill="#f4a3b1" />
    </svg>
  );
}

export function Avatar({ className }: { className?: string }) {
  return (
    <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-full bg-paper", className)}>
      <Mark className="size-5" />
    </span>
  );
}

/**
 * One chat message. Customers sit on the right in ink, the agent on the left on white.
 * `compact` tightens the type for the smaller hero chat.
 */
export function Bubble({ message, compact = false }: { message: Message; compact?: boolean }) {
  const customer = message.from === "customer";
  return (
    <div className={cn("flex items-end gap-2.5", customer && "flex-row-reverse")}>
      {customer ? null : <Avatar className="mb-0.5 border border-line" />}
      <div className={cn("flex max-w-[84%] flex-col gap-1.5", customer ? "items-end" : "items-start")}>
        <p
          className={cn(
            "text-pretty px-4 py-2.5 leading-[1.5]",
            compact ? "text-[15px]" : "text-[15px] sm:text-[16px]",
            customer ? "rounded-[20px] rounded-br-md bg-ink text-paper" : "rounded-[20px] rounded-bl-md border border-line bg-white text-ink",
          )}
        >
          {message.text}
        </p>
        {message.action ? (
          <p className="flex items-center gap-1.5 pl-1 text-[13px] font-medium text-good">
            <Check className="size-3.5" strokeWidth={2.5} />
            {message.action}
          </p>
        ) : null}
      </div>
    </div>
  );
}
