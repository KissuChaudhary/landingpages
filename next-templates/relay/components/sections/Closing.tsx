"use client";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { useRelay } from "@/components/RelayProvider";
import { Mark } from "@/components/ui/Brand";
import { GridSection } from "@/components/ui/GridSection";
export function Closing() {
  const { start } = useRelay();
  return (
    <GridSection className="closing-section" innerClassName="closing-inner" aria-labelledby="closing-title">
        <Mark />
        <h2 id="closing-title">{site.closing.title}</h2>
        <p>{site.closing.description}</p>
        <button className="button button-white" onClick={start}>
          {site.closing.action}
          <ArrowUpRight size={18} />
        </button>
    </GridSection>
  );
}
