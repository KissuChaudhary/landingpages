"use client";
import { useEffect } from "react";
import { site } from "@/site.config";
import { BrandMark } from "@/components/ui/Brand";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { useSeen, usePageVisible } from "@/components/motion/useInView";
import { useMotion } from "@/components/motion/MotionProvider";
import { Reveal } from "@/components/motion/Reveal";
import {
  Github,
  Mail,
  MessageSquare,
  Triangle,
  Layers,
  FileText,
} from "lucide-react";
const icons = [FileText, MessageSquare, Triangle, Layers, Github, Mail];
const coordinates = [
  [190, 100],
  [450, 65],
  [710, 100],
  [190, 390],
  [450, 425],
  [710, 390],
];

export function Integrations() {
  const [ref, seen, visible] = useSeen<HTMLDivElement>();
  const pageVisible = usePageVisible();
  const { reduced } = useMotion();
  useEffect(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    if (reduced || !visible || !pageVisible) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [ref, reduced, visible, pageVisible]);
  const s = site.integrations;
  return (
    <section
      id="integrations"
      className="integrations section"
      aria-labelledby="integrations-title"
    >
      <div className="container">
        <SectionIntro
          id="integrations-title"
          eyebrow={s.eyebrow}
          title={s.title}
          description={s.description}
          center
        />
        <div
          ref={ref}
          className={`integration-map ${seen ? "map-visible" : ""}`}
        >
          <svg
            viewBox="0 0 900 490"
            className="integration-wires"
            aria-hidden="true"
          >
            {coordinates.map(([x, y], i) => (
              <g key={i}>
                <path
                  d={`M450 245 C450 ${y < 245 ? 150 : 340}, ${x} 245, ${x} ${y}`}
                  pathLength="1"
                />
                <circle r="3.5">
                  <animateMotion
                    dur={`${3 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={`M${x} ${y} C${x} 245, 450 ${y < 245 ? 150 : 340}, 450 245`}
                  />
                </circle>
              </g>
            ))}
          </svg>
          <div className="integration-center">
            <BrandMark />
            <span>{site.brand.name}</span>
            <i />
          </div>
          {s.tools.map((name, i) => {
            const Icon = icons[i];
            return (
              <div
                key={name}
                className={`integration-tool tool-${i}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <Icon size={24} strokeWidth={1.6} />
                <span>{name}</span>
                <span className="tool-dot" />
              </div>
            );
          })}
          <span className="map-coordinate map-left">YOUR CONTEXT</span>
          <span className="map-coordinate map-right">ONE CONNECTED FLOW</span>
        </div>
        <Reveal>
          <p className="integration-note">{s.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
