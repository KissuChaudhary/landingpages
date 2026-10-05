import type { ReactNode } from "react";

import { Footer } from "@/templates/drawgle/components/marketing/Footer";
import { Navbar } from "@/templates/drawgle/components/marketing/Navbar";
import { marketingFontVariables } from "@/templates/drawgle/components/marketing/fonts";
import { cn } from "@/templates/drawgle/lib/utils";

/** Page frame for every public page: fonts, floating nav, footer. */
export function MarketingShell({
  children,
  className,
  footer = true,
}: {
  children: ReactNode;
  className?: string;
  footer?: boolean;
}) {
  return (
    <div className={cn("mk-root relative", marketingFontVariables, className)}>
      <Navbar />
      {children}
      {footer ? <Footer /> : null}
    </div>
  );
}

