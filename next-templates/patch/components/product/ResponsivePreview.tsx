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
        <span>OUTPUT / CONSIDERED AT EVERY SIZE</span>
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
        <span className="measurement-line" aria-hidden="true" />
        <div className={`responsive-output ${narrow ? "is-narrow" : ""}`}>
          <OutputPreview example={getExample("signup")} applied />
        </div>
        <span className="responsive-note">
          {narrow
            ? "THE SMALL SCREEN, GIVEN ROOM."
            : "GOOD IDEAS FIT MORE THAN ONE FRAME."}
        </span>
      </div>
    </div>
  );
}
