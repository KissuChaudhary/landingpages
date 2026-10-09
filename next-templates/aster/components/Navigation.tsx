"use client";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Brand } from "./ui/Brand";
import { site, appHref } from "@/site.config";
import { href } from "@/lib/urls";
import { usePathname } from "next/navigation";
export function Navigation() {
  const [menu, setMenu] = useState(false);
  const [company, setCompany] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const companyButton = useRef<HTMLButtonElement>(null);
  const root = useRef<HTMLElement>(null);
  const path = usePathname();
  useEffect(() => {
    setMenu(false);
    setCompany(false);
  }, [path]);
  useEffect(() => {
    if (menu)
      root.current?.querySelector<HTMLAnchorElement>(".mobile-menu a")?.focus();
  }, [menu]);
  useEffect(() => {
    const down = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
        setCompany(false);
        setMenu(false);
      }
    };
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (menu) {
          setMenu(false);
          menuButton.current?.focus();
        } else if (company) {
          setCompany(false);
          companyButton.current?.focus();
        }
      }
    };
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, [company, menu]);
  const links = [
    ["Integrations", "/integrations"],
    ["Customers", "/customers"],
    ["Pricing", "/pricing"],
  ];
  return (
    <header ref={root} className="navigation">
      <div className="nav-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Main navigation">
          <div className="company-wrap">
            <button
              ref={companyButton}
              aria-expanded={company}
              aria-controls="company-menu"
              onClick={() => setCompany(!company)}
            >
              Company
              <ChevronDown size={13} />
            </button>
            <div id="company-menu" className="company-menu" hidden={!company}>
              {[
                ["Our approach", "/about"],
                ["The journal", "/journal"],
                ["What's new", "/updates"],
                ["Talk to us", "/contact"],
              ].map(([name, url]) => (
                <a href={href(url)} key={url}>
                  {name}
                </a>
              ))}
            </div>
          </div>
          {links.map(([name, url]) => (
            <a
              key={url}
              href={href(url)}
              aria-current={
                path.replace(/\.html$/, "").endsWith(url) ? "page" : undefined
              }
            >
              {name}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="text-link" href={href(appHref())}>
            Open workspace
          </a>
          <a className="button" href={href(appHref())}>
            {site.hero.cta}
          </a>
        </div>
        <button
          ref={menuButton}
          className="mobile-toggle icon-button"
          aria-expanded={menu}
          aria-controls="mobile-navigation"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          onClick={() => {
            setMenu(!menu);
            setCompany(false);
          }}
        >
          {menu ? <X size={22} /> : <Menu size={24} />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-menu"
        aria-label="Mobile navigation"
        hidden={!menu}
      >
        {[
          ["Our approach", "/about"],
          ...links,
          ["Journal", "/journal"],
          ["Contact", "/contact"],
        ].map(([name, url]) => (
          <a key={url} href={href(url)}>
            {name}
          </a>
        ))}
        <a className="button" href={href(appHref())}>
          {site.hero.cta}
        </a>
      </nav>
    </header>
  );
}
