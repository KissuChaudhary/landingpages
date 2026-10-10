"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@/site.config";
import { briefText, type Brief } from "@/lib/contact";
export type BriefStatus = "idle" | "sending" | "ready" | "sent" | "error";
const empty: Brief = {
  name: "",
  email: "",
  company: "",
  service: "",
  engagement: "",
  budget: "",
  message: "",
};
export function useBrief() {
  const [brief, setBrief] = useState<Brief>(empty);
  const [status, setStatus] = useState<BriefStatus>("idle");
  const request = useRef<AbortController | null>(null);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const plan = site.plans.find(
      (item) => item.id === params.get("engagement"),
    );
    setBrief((value) => ({
      ...value,
      service: site.services.some((item) => item.name === service)
        ? service!
        : "",
      engagement: plan?.name || "",
    }));
    return () => request.current?.abort();
  }, []);
  const update = (key: keyof Brief, value: string) => {
    setBrief((current) => ({ ...current, [key]: value }));
    setStatus("idle");
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    for (const key of ["name", "message"] as const) {
      if (!brief[key].trim()) {
        const field = event.currentTarget.elements.namedItem(key) as
          | HTMLInputElement
          | HTMLTextAreaElement;
        field.setCustomValidity(
          key === "name"
            ? "Please enter your name."
            : "Tell us a little about your ambition.",
        );
        field.reportValidity();
        field.addEventListener("input", () => field.setCustomValidity(""), {
          once: true,
        });
        return;
      }
    }
    if (!site.links.contactEndpoint) {
      setStatus("ready");
      return;
    }
    setStatus("sending");
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(site.links.contactEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...brief, text: briefText(brief, site.brand) }),
        signal: controller.signal,
      });
      if (!response.ok)
        throw new Error("The endpoint did not accept the brief.");
      setStatus("sent");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      request.current = null;
    }
  };
  return { brief, status, update, submit };
}
