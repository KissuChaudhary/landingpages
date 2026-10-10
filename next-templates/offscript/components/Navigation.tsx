"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { asset, contact, home } from "@/lib/links";
import { Arrow, Brand } from "./ui";

export function Navigation({ inner = false }: { inner?: boolean }) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  return (
    <header className="site-header wrap">
      <Brand inner={inner} />
      <p className="masthead-note">
        A creative studio.
        <br />
        An independent spirit.
      </p>
      <a className="nav-contact" href={contact()}>
        Have an idea? <Arrow diagonal size={16} />
      </a>
      <div ref={container} className="index-navigation">
        <button
          ref={trigger}
          className="index-trigger"
          aria-expanded={open}
          aria-controls="studio-index"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Index"}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        {open && (
          <nav
            id="studio-index"
            aria-label="Studio index"
            className="index-panel"
          >
            <div className="index-heading">
              <span>A little look around.</span>
              <span>OS / INDEX</span>
            </div>
            {site.navigation.map((item, index) => (
              <a
                key={item.href}
                href={`${inner ? home() : ""}${item.href}`}
                onClick={() => setOpen(false)}
              >
                <span className="index-number">0{index + 1}</span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.note}</small>
                </span>
                <Arrow diagonal />
              </a>
            ))}
            <div className="index-end">
              <img src={asset("/images/creator.webp")} alt="" />
              <p>
                Good people.
                <br />
                Good things ahead.
              </p>
              <a href={contact()}>
                Say hello <Arrow diagonal size={16} />
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
