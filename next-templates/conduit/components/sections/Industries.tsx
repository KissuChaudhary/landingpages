"use client";
import {
  ArrowUpRight,
  Building2,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { site } from "@/site.config";
import type { BlueprintKey } from "@/data/blueprints";
import { asset } from "@/lib/urls";
import { showBlueprint } from "@/lib/blueprint";
import { Frame, SectionHead } from "../ui/Primitives";
const icons = [
  Landmark,
  HeartPulse,
  ShoppingCart,
  GraduationCap,
  Building2,
  TrendingUp,
];
export function Industries() {
  return (
    <Frame className="section industries" id="industries">
      <SectionHead
        label={site.industries.label}
        title={site.industries.title}
      />
      <div className="industry-grid">
        {site.industries.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <article key={item.title} data-reveal>
              <div
                className="industry-icon"
                style={{
                  backgroundImage: `url(${asset("/images/glass.webp")})`,
                }}
              >
                <Icon size={32} strokeWidth={1.4} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <button
                className="text-action"
                onClick={() =>
                  showBlueprint(item.blueprint as BlueprintKey)
                }
              >
                See an example
                <ArrowUpRight size={14} />
              </button>
            </article>
          );
        })}
      </div>
    </Frame>
  );
}
