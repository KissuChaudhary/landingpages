"use client";

import { useId, useState, type CSSProperties } from "react";
import { site } from "@/site.config";
import { asset } from "@/lib/urls";
import { useInView, useMotion } from "../Motion";
import { Icon, SectionTitle } from "../ui/Primitives";

// Three steps that advance on their own while the section is on screen. The progress
// line under the active step is a CSS animation; when it ends, the next step opens.
// Hovering, the footer's pause control or choosing a step stops the rotation.
export function Workflow() {
  const { workflow } = site;
  const { reduced, paused } = useMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, threshold: 0.35 });
  const id = useId();
  const running = auto && !reduced;
  const playing = running && inView && !paused && !hovered;

  const choose = (i: number) => {
    setActive(i);
    setAuto(false);
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = workflow.items.length;
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? (i + 1) % n : e.key === "ArrowUp" || e.key === "ArrowLeft" ? (i - 1 + n) % n : e.key === "Home" ? 0 : e.key === "End" ? n - 1 : -1;
    if (next < 0) return;
    e.preventDefault();
    choose(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <section className="section workflow-section" id="workflow">
      <div className="container">
        <SectionTitle lines={workflow.heading} />
        <div
          className="workflow"
          ref={ref}
          onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <div className="workflow-media" data-reveal="" style={{ "--ry": "40px" } as CSSProperties} role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`}>
            {workflow.items.map((item, i) => (
              <img
                key={item.photo}
                className={`workflow-photo${i === active ? " is-active" : ""}`}
                src={asset(item.photo)}
                width={1024}
                height={768}
                alt={i === active ? item.photoAlt : ""}
                aria-hidden={i === active ? undefined : true}
                loading="lazy"
                decoding="async"
              />
            ))}
            {workflow.items.map((item, i) => (
              <img
                key={item.card}
                className={`workflow-card${i === active ? " is-active" : ""}`}
                src={asset(item.card)}
                width={388}
                height={i === 0 ? 423 : i === 1 ? 388 : 374}
                alt={i === active ? item.cardAlt : ""}
                aria-hidden={i === active ? undefined : true}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
          <div className="workflow-steps" role="tablist" aria-orientation="vertical" aria-label="How Notch runs your month">
            {workflow.items.map((item, i) => (
              <button
                key={item.title}
                id={`${id}-tab-${i}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls={`${id}-panel`}
                tabIndex={i === active ? 0 : -1}
                className={`workflow-step${i === active ? " is-active" : ""}`}
                onClick={() => choose(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                data-reveal=""
                style={{ "--rd": `${120 + i * 90}ms` } as CSSProperties}
              >
                <span className="workflow-head">
                  <span className="icon-tile icon-tile-sm">
                    <Icon name={item.icon} size={16} />
                  </span>
                  <span className="workflow-title">{item.title}</span>
                </span>
                <span className="workflow-text">{item.text}</span>
                <span className="workflow-progress" aria-hidden="true">
                  {i === active && (
                    <i
                      key={`${active}-${running}`}
                      className={running ? "is-running" : "is-full"}
                      style={{ animationDuration: `${workflow.interval}ms`, animationPlayState: playing ? "running" : "paused" }}
                      onAnimationEnd={running ? () => setActive((a) => (a + 1) % workflow.items.length) : undefined}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
