"use client";
import { useState } from "react";
import { getExample } from "@/data/examples";
import type { ExampleId } from "@/site.config";
export type WorkspaceView = "build" | "review" | "preview";
export function useExample(
  initial: ExampleId = "signup",
  initiallyApplied = false,
  initialView: WorkspaceView = "build",
) {
  const [id, setId] = useState<ExampleId>(initial);
  const [applied, setApplied] = useState(initiallyApplied);
  const [view, setView] = useState<WorkspaceView>(initialView);
  const [message, setMessage] = useState("");
  const example = getExample(id);
  function choose(value: ExampleId) {
    setId(value);
    setApplied(false);
    setMessage("");
  }
  function apply() {
    setApplied((value) => !value);
    setMessage(
      applied ? "Original restored." : "Change applied to this example.",
    );
  }
  return {
    id,
    example,
    applied,
    view,
    setView,
    choose,
    apply,
    message,
    setMessage,
    code: applied ? example.after : example.before,
  };
}
export type ExampleState = ReturnType<typeof useExample>;
