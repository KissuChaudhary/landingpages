"use client";
import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { getExample } from "@/data/examples";
import { site } from "@/site.config";
import { OutputPreview } from "./OutputPreview";
export function ResponsivePreview() {
  const [narrow, setNarrow] = useState(false);
  const content = site.features.preview;
  return (
    <div className="responsive-demo">
      <div className="responsive-toolbar">
        <span>Preview width</span>
        <div role="group" aria-label="Responsive component width">
          <button aria-pressed={!narrow} onClick={() => setNarrow(false)}>
            <Monitor size={13} />
            {content.desktop}
          </button>
          <button aria-pressed={narrow} onClick={() => setNarrow(true)}>
            <Smartphone size={13} />
            {content.mobile}
          </button>
        </div>
      </div>
      <div className="responsive-stage">
        <div className={`responsive-output ${narrow ? "is-narrow" : ""}`}>
          <OutputPreview example={getExample("signup")} applied />
        </div>
      </div>
    </div>
  );
}
