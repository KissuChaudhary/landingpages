"use client";

import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { useBrief } from "@/components/BriefProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  const { update } = useBrief();
  return (
    <section className="services-section" id="expertise">
      <div className="container">
        <Reveal>
          <SectionHeading {...site.services} />
        </Reveal>
        <div className="service-list">
          {site.services.items.map((item) => (
            <Reveal key={item.number}>
              <a
                href="#investment"
                className="service-row"
                onClick={() => update({ format: item.format })}
              >
                <span className="eyebrow service-number">{item.number}</span>
                <h3>{item.name}</h3>
                <div>
                  <p>{item.text}</p>
                  <ul>
                    {item.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <span className="service-arrow">
                  <ArrowUpRight size={25} aria-hidden="true" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
