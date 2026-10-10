"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { asset } from "@/lib/assets";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { AgentIcon } from "@/components/ui/AgentIcon";
import { NumberRoll } from "@/components/hairline/number-roll";
import { useMotion } from "@/components/motion/MotionProvider";

export function Agents() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const drag = useRef<{ x: number; scroll: number } | null>(null);
  const destination = useRef<number | null>(null);
  const { reduced } = useMotion();
  const a = site.agents;
  const move = (direction: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".agent-card");
    if (!card) return;
    const next = Math.max(0, Math.min(el.scrollWidth - el.clientWidth,
      (destination.current ?? el.scrollLeft) + direction * (card.offsetWidth + 18)));
    destination.current = next;
    el.scrollTo({
      left: next,
      behavior: reduced ? "instant" : "smooth",
    });
  };
  const update = () => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".agent-card");
    if (!card) return;
    setIndex(
      Math.min(
        a.items.length - 1,
        Math.round(el.scrollLeft / (card.offsetWidth + 18)),
      ),
    );
    setAtEnd(el.scrollWidth - el.clientWidth - el.scrollLeft < 4);
  };
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      destination.current = null;
      setAtEnd(el.scrollWidth - el.clientWidth - el.scrollLeft < 4);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      id="agents"
      className="agents section"
      aria-labelledby="agents-title"
    >
      <div className="container section-top-row">
        <SectionIntro
          id="agents-title"
          eyebrow={a.eyebrow}
          title={a.title}
          description={a.description}
        />
        <div className="carousel-navigation">
          <span>
            <NumberRoll
              value={index + 1}
              locales={site.locale}
              format={{ minimumIntegerDigits: 2 }}
            />{" "}
            / 06
          </span>
          <button
            onClick={() => move(-1)}
            disabled={index === 0}
            aria-label="Previous agents"
          >
            <ArrowLeft size={19} />
          </button>
          <button
            onClick={() => move(1)}
            aria-label="Next agents"
            disabled={atEnd}
          >
            <ArrowRight size={19} />
          </button>
        </div>
      </div>
      <div
        className="agent-track"
        ref={ref}
        onScroll={update}
        onWheel={() => { destination.current = null; }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || (e.target as HTMLElement).closest("a")) return;
          drag.current = { x: e.clientX, scroll: e.currentTarget.scrollLeft };
          destination.current = null;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.style.scrollSnapType = "none";
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerMove={(e) => {
          if (drag.current) e.currentTarget.scrollLeft = drag.current.scroll - (e.clientX - drag.current.x);
        }}
        onPointerUp={(e) => {
          drag.current = null;
          e.currentTarget.style.scrollSnapType = "";
          e.currentTarget.style.cursor = "";
        }}
        onPointerCancel={(e) => {
          drag.current = null;
          e.currentTarget.style.scrollSnapType = "";
          e.currentTarget.style.cursor = "";
        }}
        tabIndex={0}
        role="region"
        aria-label="Agent specialists. Scroll to explore."
        onKeyDown={(e) => {
          if (e.key === "Home" || e.key === "End") {
            e.preventDefault();
            const el = e.currentTarget;
            destination.current = e.key === "Home" ? 0 : el.scrollWidth - el.clientWidth;
            el.scrollTo({ left: destination.current, behavior: reduced ? "instant" : "smooth" });
            return;
          }
          if (["ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {a.items.map((agent, i) => (
          <article key={agent.id} className="agent-card">
            <div className="agent-card-top">
              <span className="agent-symbol">
                <AgentIcon name={agent.icon} />
              </span>
              <span className="mono">
                0{i + 1} / {agent.tag}
              </span>
            </div>
            <div className="agent-card-art">
              <img
                src={asset(agent.image)}
                alt={`Illustrative ${agent.name} output`}
                width="720"
                height="520"
                loading="lazy"
                draggable={false}
              />
            </div>
            <div className="agent-card-copy">
              <h3>{agent.name}</h3>
              <p className="agent-role">{agent.role}</p>
              <p>{agent.description}</p>
              <a href="#start" className="agent-example">
                <span>{agent.example}</span>
                <ArrowUpRight size={17} />
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="container">
        <div className="carousel-rule">
          <span style={{ transform: `translateX(${index * 100}%)` }} />
        </div>
        <p className="carousel-hint">
          A specialist for the little things. A team for the big ones.
        </p>
      </div>
    </section>
  );
}
