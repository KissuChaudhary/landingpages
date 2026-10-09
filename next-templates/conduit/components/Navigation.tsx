"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { site } from "@/site.config";
import { href, route } from "@/lib/urls";
import { Brand } from "./ui/Brand";
import { Button } from "./ui/Primitives";
export function Navigation() {
  const [mobile, setMobile] = useState(false);
  const [company, setCompany] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const companyToggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) {
        setCompany(false);
        setMobile(false);
      }
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && (company || mobile)) {
        setCompany(false);
        setMobile(false);
        if (mobile) toggle.current?.focus();
        else companyToggle.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [company, mobile]);
  useEffect(() => {
    if (mobile) root.current?.querySelector<HTMLAnchorElement>('#main-navigation a')?.focus();
  }, [mobile]);
  const close = () => {
    setMobile(false);
    setCompany(false);
  };
  return (
    <>
      <a className="announcement" href={route("/changelog")}>
        {site.announcement}
        <ArrowRight size={14} aria-hidden="true" />
      </a>
      <header className="site-header" ref={root}>
        <div className="nav-inner">
          <a
            href={route("/")}
            className="brand-link"
            aria-label={`${site.brand} home`}
            onClick={close}
          >
            <Brand />
          </a>
          <nav
            className={`main-nav ${mobile ? "is-open" : ""}`}
            aria-label="Main navigation"
            id="main-navigation"
          >
            <a href={href("/#solution")} onClick={close}>
              Product
            </a>
            <a href={href("/#stories")} onClick={close}>
              Workflow stories
            </a>
            <a href={route("/pricing")} onClick={close}>
              Pricing
            </a>
            <div className="company">
              <button
                ref={companyToggle}
                aria-expanded={company}
                aria-controls="company-links"
                onClick={() => setCompany(!company)}
              >
                Company
                <ChevronDown size={14} aria-hidden="true" />
              </button>
              {company && (
                <div className="company-menu" id="company-links">
                  {[
                    {
                      title: `About ${site.brand}`,
                      detail: "The idea behind connected work",
                      path: "/about",
                    },
                    {
                      title: "Field notes",
                      detail: "A guide to useful agents",
                      path: "/guides",
                    },
                    {
                      title: "Changelog",
                      detail: "What is new in the workspace",
                      path: "/changelog",
                    },
                    {
                      title: "Get in touch",
                      detail: "Start with your next workflow",
                      path: "/contact",
                    },
                  ].map((link) => (
                    <a href={route(link.path)} key={link.path} onClick={close}>
                      <strong>{link.title}</strong>
                      <span>{link.detail}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <div className="nav-actions">
            <Button href={site.links.app || href("/#solution")}>
              Get started
            </Button>
            <button
              className="menu-toggle"
              ref={toggle}
              onClick={() => setMobile(!mobile)}
              aria-label={mobile ? "Close menu" : "Open menu"}
              aria-expanded={mobile}
              aria-controls="main-navigation"
            >
              {mobile ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
