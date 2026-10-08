"use client";
import { useId, useRef, useState } from "react";
import { CalendarDays, CircleDot, Feather, Signal, Wifi } from "lucide-react";
import { site, type Mode } from "@/site.config";
import { TempoMark } from "@/components/ui/Brand";
import { PlanScreen } from "./PlanScreen";
import { FocusScreen } from "./FocusScreen";
import { ReflectScreen } from "./ReflectScreen";

const modes: { id: Mode; label: string; icon: typeof CalendarDays }[] = [
  { id: "plan", label: "Plan", icon: CalendarDays },
  { id: "focus", label: "Focus", icon: CircleDot },
  { id: "reflect", label: "Reflect", icon: Feather },
];
export function Phone({
  mode,
  onModeChange,
  label = "Tempo app preview",
}: {
  mode?: Mode;
  onModeChange?: (mode: Mode) => void;
  label?: string;
}) {
  const id = useId();
  const [localMode, setLocalMode] = useState<Mode>("focus");
  const active = mode || localMode;
  const screenshot = site.screens[active];
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  function change(value: Mode) {
    if (onModeChange) onModeChange(value);
    else setLocalMode(value);
  }
  function onKey(event: React.KeyboardEvent, index: number) {
    const keys: Record<string, number> = {
      ArrowRight: (index + 1) % 3,
      ArrowLeft: (index + 2) % 3,
      Home: 0,
      End: 2,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    const next = keys[event.key];
    change(modes[next].id);
    controls.current[next]?.focus();
  }
  return (
    <div className="phone-shell" role="group" aria-label={label}>
      <div className="phone-edge">
        <div className="phone-display">
          <div className="phone-status" aria-hidden="true">
            <span>9:41</span>
            <div className="phone-island" />
            <span>
              <Signal size={12} />
              <Wifi size={12} />
              <span className="battery" />
            </span>
          </div>
          <div className="phone-app-bar">
            <span>
              <TempoMark />
              {site.brand.name}.
            </span>
            <span className="phone-avatar">Y</span>
          </div>
          <div
            id={`${id}-panel`}
            className="phone-panel"
            role="tabpanel"
            aria-labelledby={`${id}-${active}`}
          >
            {screenshot ? (
              <img
                className="app-screenshot"
                src={
                  screenshot.src.startsWith("/")
                    ? `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${screenshot.src}`
                    : screenshot.src
                }
                alt={screenshot.alt}
                width="540"
                height="780"
              />
            ) : active === "plan" ? (
              <PlanScreen />
            ) : active === "focus" ? (
              <FocusScreen />
            ) : (
              <ReflectScreen />
            )}
          </div>
          <div className="phone-tabs" role="tablist" aria-label="App screens">
            {modes.map(({ id: value, label: text, icon: Icon }, index) => (
              <button
                key={value}
                role="tab"
                id={`${id}-${value}`}
                aria-controls={`${id}-panel`}
                aria-selected={active === value}
                tabIndex={active === value ? 0 : -1}
                ref={(element) => {
                  controls.current[index] = element;
                }}
                onClick={() => change(value)}
                onKeyDown={(event) => onKey(event, index)}
              >
                <Icon size={17} strokeWidth={1.5} />
                {text}
                <span />
              </button>
            ))}
          </div>
          <div className="phone-home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
