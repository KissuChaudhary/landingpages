"use client";
import { Pause, Play, ArrowUpRight } from "lucide-react";
import { site } from "@/site.config";
import { href, route } from "@/lib/urls";
import { Brand } from "../ui/Brand";
import { useExperience } from "../Experience";
const homeLinks = [
  ["Benefits", "benefits"],
  ["Platform", "features"],
  ["Why Arclo", "why-arclo"],
  ["Pricing", "pricing"],
  ["How it works", "how-it-works"],
  ["Stories", "stories"],
  ["About us", "about"],
  ["The journal", "journal"],
  ["Questions", "faq"],
];
const pages = [
  ["Home", "/"],
  ["Pricing", "/pricing"],
  ["Contact", "/contact"],
  ["Journal", "/blog"],
  ["Waitlist", "/waitlist"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
];
export function Footer() {
  const { paused, toggleMotion } = useExperience();
  return (
    <footer className="frame footer">
      <div className="footer-top">
        <div className="footer-brand">
          <a aria-label="Arclo home" href={route("/")}>
            <Brand />
          </a>
          <h3>
            {site.footer.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h3>
          <a className="footer-email" href={`mailto:${site.email}`}>
            {site.email}
            <ArrowUpRight size={15} />
          </a>
        </div>
        <div className="footer-column">
          <h4>The product</h4>
          {homeLinks.map(([label, id]) => (
            <a key={id} href={href(`/#${id}`)}>
              {label}
            </a>
          ))}
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          {pages.map(([label, link]) => (
            <a key={link} href={route(link)}>
              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        ARCLO<span>®</span>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {site.brand}. Close with confidence.
        </span>
        <span>A thoughtfully made template.</span>
        <button onClick={toggleMotion} aria-pressed={paused}>
          {paused ? <Play size={12} /> : <Pause size={12} />}{" "}
          {paused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
    </footer>
  );
}
