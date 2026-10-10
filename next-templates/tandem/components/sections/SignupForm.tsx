"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { site } from "@/site.config";
import { TextMorph } from "@/components/hairline/text-morph";

export function SignupForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [hint, setHint] = useState("");
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") || "").trim();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    if (site.signup.url) {
      try {
        const url = new URL(site.signup.url, window.location.href);
        if (!["http:", "https:"].includes(url.protocol))
          throw new Error("Invalid destination");
        url.searchParams.set("email", email);
        window.location.assign(url.toString());
      } catch {
        setStatus("error");
        setHint("Please check the configured sign-up URL.");
      }
      return;
    }
    if (!site.signup.endpoint) {
      setHint("Choose a plan below to take the next step.");
      document
        .getElementById("pricing")
        ?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "instant"
            : "smooth",
        });
      return;
    }
    setStatus("sending");
    setHint("");
    controller.current = new AbortController();
    const timeout = window.setTimeout(() => controller.current?.abort(), 15000);
    try {
      const response = await fetch(site.signup.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.current.signal,
      });
      if (!response.ok) throw new Error("Sign-up failed");
      setStatus("success");
      setHint(site.signup.success);
    } catch {
      setStatus("error");
      setHint("That didn't go through. Please try again.");
    } finally {
      window.clearTimeout(timeout);
    }
  };
  return (
    <div className="signup">
      <form onSubmit={submit} className={`signup-form signup-${status}`}>
        <label className="sr-only" htmlFor="signup-email">
          Your email address
        </label>
        <input
          id="signup-email"
          type="email"
          name="email"
          required
          placeholder="Your email address"
          autoComplete="email"
          disabled={status === "sending" || status === "success"}
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "success"}
        >
          <TextMorph>
            {status === "sending"
              ? "One moment"
              : status === "success"
                ? "You're in"
                : status === "error"
                  ? "Try again"
                  : "Find your flow"}
          </TextMorph>
          <span className="signup-icon">
            {status === "sending" ? (
              <LoaderCircle className="spin" size={16} />
            ) : status === "success" ? (
              <Check className="draw-check" size={16} />
            ) : (
              <ArrowUpRight size={16} />
            )}
          </span>
        </button>
      </form>
      <p className="signup-hint" aria-live="polite">
        {hint || "One small step toward your next big thing."}
      </p>
    </div>
  );
}
