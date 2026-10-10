"use client";

import * as React from "react";
import { useInView } from "./useInView";

/*
 * Section text that arrives when you do: each word rises out of a light blur
 * while the type breathes in from a wider cut of Mona Sans. Lines split on
 * "\n" in the copy (desktop only; phones wrap naturally).
 * Without JavaScript, or with reduced motion, the text is simply there.
 */

type RevealTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  /** Delay before the first word, in ms. */
  delay?: number;
  id?: string;
};

export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  id,
}: RevealTextProps) {
  const [ref, inView] = useInView<HTMLElement>();
  let index = 0;
  const lines = text.split("\n");
  return (
    <Tag
      ref={ref as React.Ref<never>}
      id={id}
      data-reveal={inView ? "in" : "wait"}
      className={className}
      style={{ "--base": `${delay}ms` } as React.CSSProperties}
    >
      {lines.map((line, l) => (
        <React.Fragment key={l}>
          {l > 0 && (
            <>
              {" "}
              <br className="max-md:hidden" />
            </>
          )}
          {line.split(" ").map((word, w, words) => (
            <React.Fragment key={w}>
              <span
                className="reveal-word"
                style={{ "--i": index++ } as React.CSSProperties}
              >
                {word}
              </span>
              {w < words.length - 1 ? " " : null}
            </React.Fragment>
          ))}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/** A block that rises in when it reaches the screen. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article" | "section";
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal={inView ? "in" : "wait"}
      className={`fade-up ${className}`}
      style={{ "--delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
