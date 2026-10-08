"use client";
import { useId, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { site, type Mode } from "@/site.config";
import { Phone } from "@/components/app/Phone";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { useTempo } from "@/components/TempoProvider";

export function Chapters() {
  const id = useId();
  const [active, setActive] = useState<Mode>("plan");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { openApp } = useTempo();
  const index = site.chapters.findIndex((chapter) => chapter.id === active);
  const chapter = site.chapters[index];
  function onKey(event: React.KeyboardEvent, current: number) {
    const keys: Record<string, number> = {
      ArrowDown: (current + 1) % 3,
      ArrowUp: (current + 2) % 3,
      Home: 0,
      End: 2,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = keys[event.key];
    setActive(site.chapters[next].id);
    tabs.current[next]?.focus();
  }
  return (
    <section
      className="section chapters-section container"
      id="rhythm"
      aria-label="Find your everyday rhythm"
    >
      <div className="chapters-heading">
        <SectionIntro
          label="A good day has a little rhythm"
          title={
            <>
              Less to juggle.
              <br />
              <em>More to enjoy.</em>
            </>
          }
        />
        <p>
          Three little spaces.
          <br />
          One more considered everyday.
        </p>
      </div>
      <div className="chapters-layout">
        <div className="chapter-narrative">
          <div
            className="chapter-tabs"
            role="tablist"
            aria-label="Your everyday rhythm"
            aria-orientation="vertical"
          >
            {site.chapters.map((item, current) => (
              <button
                key={item.id}
                role="tab"
                id={`${id}-${item.id}`}
                aria-selected={active === item.id}
                aria-controls={`${id}-panel`}
                tabIndex={active === item.id ? 0 : -1}
                ref={(element) => {
                  tabs.current[current] = element;
                }}
                onClick={() => setActive(item.id)}
                onKeyDown={(event) => onKey(event, current)}
              >
                <span className="mono">{item.number}</span>
                <span>
                  <strong>
                    {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                  </strong>
                  <span>{item.label}</span>
                </span>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <div
            className="chapter-copy"
            role="tabpanel"
            id={`${id}-panel`}
            aria-labelledby={`${id}-${active}`}
            tabIndex={0}
          >
            <h3>{chapter.title}</h3>
            <p>{chapter.description}</p>
            <ul>
              {chapter.points.map((point) => (
                <li key={point}>
                  <Check size={13} />
                  {point}
                </li>
              ))}
            </ul>
            <button className="text-link" onClick={openApp}>
              Make a little space
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
        <div className={`chapter-stage ${active}`}>
          <span className="chapter-stage-label mono">
            THE {active.toUpperCase()} SPACE / {chapter.number}
          </span>
          <div className="chapter-orbit" aria-hidden="true" />
          <div className="chapter-phone">
            <Phone
              mode={active}
              onModeChange={setActive}
              label="Product chapter app preview"
            />
          </div>
          <div className="chapter-paper" aria-hidden="true">
            <span className="mono">A NOTE TO SELF</span>
            <p>
              {active === "plan"
                ? "Make time for"
                : active === "focus"
                  ? "Be here,"
                  : "Keep the"}
              <br />
              <em>
                {active === "plan"
                  ? "the little things."
                  : active === "focus"
                    ? "a little longer."
                    : "little good things."}
              </em>
            </p>
            <span>✳</span>
          </div>
          <span className="chapter-stage-foot">
            Try the screen. Find your rhythm.
          </span>
        </div>
      </div>
    </section>
  );
}
