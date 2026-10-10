"use client";
import { useEffect, useRef, useState } from "react";
import { site } from "@/site.config";
import { route } from "@/lib/urls";
import { Mark, Arrow } from "./ui/Mark";
export function Navigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const links = site.navigation.slice(0, -1);
  const cta = site.navigation.at(-1);
  useEffect(() => {
    const wide = matchMedia("(min-width: 1025px)");
    const close = () => wide.matches && setOpen(false);
    wide.addEventListener("change", close);
    return () => wide.removeEventListener("change", close);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const content = document.getElementById("page-content");
    if (content) content.inert = true;
    const first = panel.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus({ preventScroll: true });
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
      if (event.key !== "Tab") return;
      const links = Array.from(
        panel.current?.querySelectorAll<HTMLAnchorElement>("a[href]") || [],
      );
      const nodes: HTMLElement[] = [button.current!, ...links];
      const at = nodes.indexOf(document.activeElement as HTMLElement);
      if (event.shiftKey && at === 0) {
        event.preventDefault();
        nodes.at(-1)?.focus();
      } else if (!event.shiftKey && at === nodes.length - 1) {
        event.preventDefault();
        nodes[0]?.focus();
      }
    }
    addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (content) content.inert = false;
      removeEventListener("keydown", key);
    };
  }, [open]);
  return (
    <>
      <header className={`navigation ${open ? "menu-open" : ""}`}>
        <a
          className="brand"
          href={route("/")}
          aria-label={`${site.brand} home`}
          tabIndex={open ? -1 : undefined}
        >
          <Mark />
          <span>
            {site.brand.toLowerCase()}
            <sup>®</sup>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((item) => (
            <a key={item.label} href={route(item.href)}>
              {item.label}
            </a>
          ))}
        </nav>
        {cta && (
          <a className="nav-cta" href={route(cta.href)}>
            <span>{cta.label}</span>
            <Arrow diagonal />
          </a>
        )}
        <button
          ref={button}
          className="menu-toggle label-type"
          aria-expanded={open}
          aria-controls="studio-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-symbol">
            <i />
            <i />
          </span>
          <span>{open ? "Close" : "Menu"}</span>
        </button>
        <span className="nav-progress" aria-hidden="true" />
      </header>
      <div
        ref={panel}
        id="studio-menu"
        className={`menu-panel ${open ? "is-open" : ""}`}
        aria-hidden={!open}
        inert={!open}
      >
        <div className="menu-main">
          <p className="label-type">Navigate / {site.copyrightYear}</p>
          <nav aria-label="Main navigation">
            {site.navigation.map((item, i) => (
              <a
                key={item.label}
                style={{ "--menu-i": i } as React.CSSProperties}
                href={route(item.href)}
                onClick={() => setOpen(false)}
              >
                <span className="label-type">0{i + 1}</span>
                <span>{item.label}</span>
                <Arrow diagonal />
              </a>
            ))}
          </nav>
        </div>
        <div className="menu-aside">
          <Mark />
          <p>
            Good things begin
            <br />
            with a conversation.
          </p>
          <a
            href={route(site.links.booking || "/contact")}
            onClick={() => setOpen(false)}
          >
            Tell us what’s next <Arrow diagonal />
          </a>
          <span className="label-type">{site.location}</span>
        </div>
        <div className="menu-bottom label-type">
          <span>
            © {site.copyrightYear} {site.brand} Studio
          </span>
          <a href={route("/privacy")}>Privacy</a>
        </div>
      </div>
    </>
  );
}
