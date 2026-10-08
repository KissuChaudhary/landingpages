"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { site } from "@/site.config";
import type { BriefOptions } from "@/lib/quote";

interface BriefContextValue {
  options: BriefOptions;
  update: (changes: Partial<BriefOptions>) => void;
}
const BriefContext = createContext<BriefContextValue | null>(null);

export function BriefProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<BriefOptions>({
    format: site.pricing.defaultFormat,
    products: site.pricing.defaultProducts,
    social: false,
    rush: false,
  });
  const update = (changes: Partial<BriefOptions>) =>
    setOptions((current) => ({ ...current, ...changes }));
  return (
    <BriefContext.Provider value={{ options, update }}>
      {children}
    </BriefContext.Provider>
  );
}

export function useBrief() {
  const context = useContext(BriefContext);
  if (!context) throw new Error("useBrief must be used inside BriefProvider");
  return context;
}
