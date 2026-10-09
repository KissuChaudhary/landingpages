"use client";
import {
  ArrowRight,
  Check,
  Search,
  Sparkles,
  Mail,
  FileText,
  Database,
} from "lucide-react";
import { BrandMark } from "../ui/Brand";
import { Chart } from "./Chart";
import { site } from "@/site.config";
import { totals, campaignRows } from "@/data/campaigns";
export function AudienceScene({ scene }: { scene: string }) {
  if (scene === "signals")
    return (
      <div
        className="audience-scene signal-scene"
        aria-label="A view of three connected example sources"
      >
        <div className="signal-list">
          {[
            [
              Search,
              "Search campaigns",
              `${totals("month", "Search").roas.toFixed(1)}× blended return`,
            ],
            [
              Sparkles,
              "Social campaigns",
              `${campaignRows("month", "Social").length} campaigns to review`,
            ],
            [
              Mail,
              "Email campaigns",
              `${totals("month", "Email").roas.toFixed(1)}× return on spend`,
            ],
          ].map(([Icon, title, text]) => {
            const Symbol = Icon as typeof Search;
            return (
              <div key={String(title)}>
                <span>
                  <Symbol size={20} />
                </span>
                <p>
                  {String(title)}
                  <small>{String(text)}</small>
                </p>
                <Check size={14} />
              </div>
            );
          })}
        </div>
        <span className="signal-note">The same data. A clearer picture.</span>
      </div>
    );
  if (scene === "workflow")
    return (
      <div className="audience-scene audience-flow">
        <span className="flow-start">
          <Database size={24} />
          <small>Sources</small>
        </span>
        <span className="flow-line" />
        <span className="flow-center">
          <BrandMark />
          <small>{site.brand}</small>
        </span>
        <span className="flow-line" />
        <span className="flow-end">
          <FileText size={24} />
          <small>Review</small>
        </span>
        <span className="flow-particle" aria-hidden="true" />
      </div>
    );
  return (
    <div className="audience-scene floating-charts">
      <div className="float-chart chart-back">
        <h4>Channel mix</h4>
        <p>September 2026</p>
        <div className="donut">
          <span>
            3<small>channels</small>
          </span>
        </div>
      </div>
      <div className="float-chart chart-front">
        <h4>A clearer trend</h4>
        <p>Illustrative view</p>
        <Chart />
      </div>
      <span className="charts-note">
        Your context, ready to share
        <ArrowRight size={13} />
      </span>
    </div>
  );
}
