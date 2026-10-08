"use client";
import { useEffect, useState } from "react";
import {
  getScenario,
  prepareResult,
  scenarios,
  resultText,
} from "@/data/scenarios";
import { site, type ScenarioId, type SourceId } from "@/site.config";
type Prepared = { id: ScenarioId; sources: SourceId[] };
export function useAssistant() {
  const [id, setId] = useState<ScenarioId>("week");
  const [request, setRequest] = useState(getScenario("week").request);
  const [sources, setSources] = useState<SourceId[]>(
    getScenario("week").defaults,
  );
  const [prepared, setPrepared] = useState<Prepared | null>({
    id: "week",
    sources: getScenario("week").defaults,
  });
  const [phase, setPhase] = useState(3);
  const [running, setRunning] = useState(false);
  const [saved, setSaved] = useState<ScenarioId[]>([]);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    try {
      const value: unknown = JSON.parse(
        localStorage.getItem(site.savedKey) || "[]",
      );
      if (Array.isArray(value))
        setSaved(
          value.filter((entry): entry is ScenarioId =>
            scenarios.some((s) => s.id === entry),
          ),
        );
    } catch {
      /* The preview remains usable without storage. */
    }
  }, []);
  useEffect(() => {
    if (!running) return;
    if (phase >= 3) {
      setRunning(false);
      return;
    }
    const timer = window.setTimeout(
      () => setPhase((current) => Math.min(3, current + 1)),
      850,
    );
    return () => window.clearTimeout(timer);
  }, [running, phase]);
  function choose(next: ScenarioId) {
    const scenario = getScenario(next);
    setId(next);
    setRequest(scenario.request);
    setSources([...scenario.defaults]);
    setPrepared({ id: next, sources: [...scenario.defaults] });
    setPhase(3);
    setRunning(false);
    setNotice("");
  }
  function run() {
    if (request.trim() !== getScenario(id).request) {
      if (site.links.app) {
        window.location.assign(site.links.app);
        return;
      }
      setNotice(site.workspace.customNotice);
      return;
    }
    if (!sources.length) {
      setNotice("Choose at least one source to prepare this example.");
      return;
    }
    setNotice("");
    setPrepared({ id, sources: [...sources] });
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setPhase(reduced ? 3 : 1);
    setRunning(!reduced);
  }
  function toggleSource(source: SourceId) {
    if (running || (phase > 0 && phase < 3)) return;
    setSources((current) =>
      current.includes(source)
        ? current.filter((item) => item !== source)
        : [...current, source],
    );
    setNotice("");
  }
  function toggleSaved(next = id) {
    const value = saved.includes(next)
      ? saved.filter((item) => item !== next)
      : [...saved, next];
    try {
      localStorage.setItem(site.savedKey, JSON.stringify(value));
      setSaved(value);
      setNotice(
        value.includes(next)
          ? "Example saved in this browser."
          : "Saved example removed.",
      );
    } catch {
      setNotice(
        "Browser storage is unavailable. You can still copy or download the output.",
      );
    }
  }
  const result =
    prepared && phase === 3
      ? prepareResult(prepared.id, prepared.sources)
      : null;
  const changed =
    !!prepared &&
    prepared.sources.slice().sort().join() !== sources.slice().sort().join();
  async function copy() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(resultText(result));
      setNotice("Output copied.");
    } catch {
      setNotice("Clipboard unavailable. Use the text download instead.");
    }
  }
  function reset() {
    setPhase(0);
    setPrepared(null);
    setRunning(false);
    setNotice("");
  }
  return {
    id,
    request,
    setRequest,
    sources,
    prepared,
    phase,
    running,
    saved,
    notice,
    setNotice,
    result,
    changed,
    choose,
    run,
    toggleSource,
    toggleSaved,
    copy,
    reset,
    pause: () => setRunning(false),
    resume: () => setRunning(true),
  };
}
export type AssistantState = ReturnType<typeof useAssistant>;
