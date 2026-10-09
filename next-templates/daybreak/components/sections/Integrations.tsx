"use client";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { integrations } from "@/data/integrations";
import { href } from "@/lib/urls";
import { IntegrationMark } from "../product/IntegrationMark";
import { Frame, SectionHead } from "../ui/Primitives";
export function Integrations() {
  return (
    <Frame id="integrations" className="integration-section">
      <div className="section-inner integration-layout">
        <div>
          <SectionHead
            label={site.integration.label}
            title={site.integration.heading}
            text={site.integration.text}
            align="left"
          />
          <ol className="integration-steps">
            {site.integration.steps.map((s, i) => (
              <li key={s}>
                <span>{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="integration-garden" data-reveal>
          <div className="garden-grid" aria-hidden="true" />
          {integrations.map((integration, i) => (
            <a
              key={integration.id}
              className={`garden-node garden-node-${i}`}
              aria-label={integration.name}
              href={href(`/integrations#${integration.id}`)}
            >
              <IntegrationMark
                mark={integration.mark}
                color={integration.color}
              />
            </a>
          ))}
          <a className="button button-dark" href={href("/integrations")}>
            Explore the connections
            <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
    </Frame>
  );
}
