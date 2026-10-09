"use client";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Brand } from "./ui/Brand";
import { href } from "@/lib/urls";
import { site } from "@/site.config";
export function Navigation() {
  const [mobile, setMobile] = useState(false);
  const [resources, setResources] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const resourceTrigger = useRef<HTMLButtonElement>(null);
  const resourceRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mobile && !resources) return;
    if (mobile) menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        setResources(false);
        (mobile ? trigger : resourceTrigger).current?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (resources && !resourceRef.current?.contains(e.target as Node))
        setResources(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("pointerdown", outside);
    };
  }, [mobile, resources]);
  const links = [
    { text: "Product", url: "/product" },
    { text: "Pricing", url: "/pricing" },
    { text: "Integrations", url: "/integrations" },
  ];
  return (
    <header className="navigation frame">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <span className="corner corner-left" aria-hidden="true" />
      <span className="corner corner-right" aria-hidden="true" />
      <div className="nav-inner">
        <Brand />
        <nav className="desktop-links" aria-label="Main navigation">
          {links.map((l) => (
            <a
              key={l.url}
              href={href(l.url)}
              aria-current={pathname === l.url ? "page" : undefined}
            >
              {l.text}
            </a>
          ))}
          <div className="resource-menu" ref={resourceRef}>
            <button
              ref={resourceTrigger}
              aria-expanded={resources}
              aria-controls="resources-menu"
              onClick={() => setResources(!resources)}
            >
              Resources
              <ChevronDown size={14} />
            </button>
            {resources && (
              <div className="menu-popover" id="resources-menu">
                <a href={href("/journal")}>
                  The journal<span>Notes for a clearer working day</span>
                </a>
                <a href={href("/about")}>
                  Our approach<span>Good tools leave room to think</span>
                </a>
                <a href={href("/contact")}>
                  Contact<span>Start a conversation</span>
                </a>
              </div>
            )}
          </div>
        </nav>
        <a className="button button-dark nav-cta" href={href("/pricing")}>
          Get started
        </a>
        <button
          ref={trigger}
          className="mobile-trigger icon-button"
          aria-label={mobile ? "Close navigation" : "Open navigation"}
          aria-expanded={mobile}
          aria-controls="mobile-navigation"
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {mobile && (
        <div className="mobile-links" id="mobile-navigation" ref={menuRef}>
          <nav aria-label="Mobile navigation">
            {[
              ...links,
              { text: "Journal", url: "/journal" },
              { text: "About", url: "/about" },
              { text: "Contact", url: "/contact" },
            ].map((l) => (
              <a
                key={l.url}
                href={href(l.url)}
                onClick={() => setMobile(false)}
              >
                {l.text}
              </a>
            ))}
          </nav>
          <a className="button button-dark" href={href("/pricing")}>
            Find your plan
          </a>
          <p>{site.footer.tagline}</p>
        </div>
      )}
    </header>
  );
}
