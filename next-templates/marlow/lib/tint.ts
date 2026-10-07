import type { Tint } from "@/site.config";

/**
 * Class names are written out in full (never built from strings) so Tailwind can see them.
 * To add a tint: add its two colours in app/globals.css, then add it here and to the Tint type in site.config.ts.
 */
export const TINT: Record<Tint, { solid: string; soft: string; text: string }> = {
  butter: { solid: "bg-butter", soft: "bg-butter-soft", text: "text-butter" },
  peach: { solid: "bg-peach", soft: "bg-peach-soft", text: "text-peach" },
  mint: { solid: "bg-mint", soft: "bg-mint-soft", text: "text-mint" },
  sky: { solid: "bg-sky", soft: "bg-sky-soft", text: "text-sky" },
  rose: { solid: "bg-rose", soft: "bg-rose-soft", text: "text-rose" },
};
