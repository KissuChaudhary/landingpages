"use client";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import { useTempo } from "@/components/TempoProvider";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { openApp } = useTempo();
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Brand />
        <nav
          className={`nav-links ${open ? "open" : ""}`}
          aria-label="Main navigation"
          id="navigation"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          <a href="#rhythm" onClick={() => setOpen(false)}>
            Your rhythm
          </a>
          <a href="#details" onClick={() => setOpen(false)}>
            The little things
          </a>
          <a href="#membership" onClick={() => setOpen(false)}>
            Membership
          </a>
        </nav>
        <div className="nav-actions">
          <button className="button button-forest nav-cta" onClick={openApp}>
            Try Tempo
            <ArrowUpRight size={14} />
          </button>
          <button
            className="icon-button menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
