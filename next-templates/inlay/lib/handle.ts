"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/site.config";

// The handle a visitor types in the hero follows them down the page: the example page's
// address, the dock and the footer all show it. Kept for the visit in sessionStorage.

const KEY = "inlay-handle";
let handle = "";
const listeners = new Set<() => void>();

try {
  if (typeof window !== "undefined") handle = window.sessionStorage.getItem(KEY) ?? "";
} catch {}

export function setHandle(next: string) {
  if (next === handle) return;
  handle = next;
  try {
    if (next) window.sessionStorage.setItem(KEY, next);
    else window.sessionStorage.removeItem(KEY);
  } catch {}
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** The handle typed so far, or "" before anyone has typed (also on the server). */
export const useHandle = () => useSyncExternalStore(subscribe, () => handle, () => "");

/** Lowercase letters, numbers, dots and underscores; 3 to 24 characters; no dot at either end. */
export const HANDLE = /^[a-z0-9](?:[a-z0-9._]{1,22})[a-z0-9]$/;

export type HandleProblem = "short" | "chars" | "edge" | null;

export function handleProblem(value: string): HandleProblem {
  if (!value) return null;
  if (/[^a-z0-9._]/.test(value)) return "chars";
  if (value.length < 3) return "short";
  if (!HANDLE.test(value)) return "edge";
  return null;
}

/** Turn whatever was typed or pasted into a handle: lowercase, no spaces, no leading @. */
export const cleanHandle = (raw: string) =>
  raw
    .trim()
    .replace(/^@+/, "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .slice(0, 24);

export const pageAddress = (h: string) => `${site.handleDomain}/${h}`;
