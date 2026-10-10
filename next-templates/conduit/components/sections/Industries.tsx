"use client";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { blueprints, type BlueprintKey } from "@/data/blueprints";
import { showBlueprint } from "@/lib/blueprint";
import { Frame, SectionHead } from "../ui/Primitives";
export function Industries() {
  return (
    <Frame className="section usecases" id="use-cases">
      <div className="usecase-intro">
        <SectionHead label={site.industries.label} title={site.industries.title}>
          <p>{site.industries.intro}</p>
        </SectionHead>
      </div>
      <ul className="usecase-list">
        {site.industries.items.map((item, i) => {
          const bp = blueprints[item.blueprint as BlueprintKey];
          return (
            <li key={item.title} data-reveal>
              <button onClick={() => showBlueprint(item.blueprint as BlueprintKey)}>
                <span className="mono usecase-index">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="mono usecase-bp">
                  {bp.short}
                  <ArrowUpRight size={14} aria-hidden="true" />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}
