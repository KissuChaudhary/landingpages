"use client";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { path, bookingHref } from "@/lib/urls";
import { Brand } from "@/components/ui/Brand";
export function Footer() {
  return (
    <footer className="footer frame">
      <div className="footer-top">
        <div className="footer-brand">
          <a href={path("/")} aria-label={`${site.brand} home`}>
            <Brand />
          </a>
          <p>{site.footer.text}</p>
        </div>
        <div className="footer-links">
          <div>
            <span>The workspace</span>
            {site.navigation.map((link) => (
              <a key={link.label} href={path(link.href)}>
                {link.label}
              </a>
            ))}
          </div>
          <div>
            <span>A little more context</span>
            <a href={path("/#how-it-works")}>Getting started</a>
            <a href={path("/#faq")}>Common questions</a>
            <a href={bookingHref()}>
              Get in touch
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getUTCFullYear()} {site.footer.copyright}
        </span>
        <span>{site.footer.note}</span>
      </div>
    </footer>
  );
}
