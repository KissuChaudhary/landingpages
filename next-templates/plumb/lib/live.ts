"use client";

import * as React from "react";
import { site } from "@/site.config";

/*
 * The live counter's value, shared by everything that shows it.
 *   endpoint  set site.live.endpoint to a URL returning { "value": 38 } and the
 *             figure is fetched every `every` ms while the tab is visible
 *   demo      without one, it drifts a step or two at a time inside `range`
 * One timer for the whole page, started by the first component that asks.
 */

type Listener = (value: number) => void;

let value = site.live.value;
let timer = 0;
const listeners = new Set<Listener>();

function emit(next: number) {
  if (next === value) return;
  value = next;
  listeners.forEach((l) => l(value));
}

async function tick() {
  if (document.visibilityState !== "visible") return;
  const { endpoint, range } = site.live;
  if (endpoint) {
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      const data = (await res.json()) as { value?: unknown };
      if (typeof data.value === "number" && Number.isFinite(data.value)) emit(Math.max(0, Math.round(data.value)));
    } catch {
      // Keep the last figure.
    }
    return;
  }
  // A small random walk that leans back toward the middle of the range.
  const [lo, hi] = range;
  const mid = (lo + hi) / 2;
  const lean = value > mid ? -0.35 : 0.35;
  const step = Math.round((Math.random() - 0.5 + lean) * 4);
  emit(Math.min(hi, Math.max(lo, value + (step || (Math.random() > 0.5 ? 1 : -1)))));
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  if (!timer) {
    timer = window.setInterval(tick, site.live.every);
    if (site.live.endpoint) tick();
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      window.clearInterval(timer);
      timer = 0;
    }
  };
}

/** The current figure; updates for every component at once. */
export function useLive() {
  const [current, setCurrent] = React.useState(site.live.value);
  React.useEffect(() => {
    setCurrent(value);
    return subscribe(setCurrent);
  }, []);
  return current;
}
