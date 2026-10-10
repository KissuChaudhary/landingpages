"use client";
import { Check } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { useMotion } from "@/components/motion/MotionProvider";

export function Workspace() {
  const w = site.workspace;
  const { reduced } = useMotion();
  const [ref] = useScrollProgress<HTMLDivElement>({
    disabled: reduced,
    start: 1,
    end: 0.15,
  });
  return (
    <section
      id="workspace"
      className="workspace section"
      aria-labelledby="workspace-title"
    >
      <div className="container">
        <SectionIntro
          id="workspace-title"
          eyebrow={w.eyebrow}
          title={w.title}
          description={w.description}
          center
        />
      </div>
      <div ref={ref} className="workspace-stage container">
        <div className="workspace-frame">
          <div className="workspace-frame-top">
            <span>
              <span className="status-dot" /> YOUR WORK, IN GOOD COMPANY
            </span>
            <span>LIVE PREVIEW / ILLUSTRATIVE</span>
          </div>
          <img
            src={asset(w.image)}
            width="1400"
            height="810"
            alt={w.alt}
            loading="lazy"
          />
          <div className="workspace-frame-bottom">
            {w.chips.map((c) => (
              <span key={c}>
                <Check size={13} />
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="workspace-side-label">
          A LITTLE BACKUP. A BIGGER PICTURE.
        </div>
      </div>
    </section>
  );
}
