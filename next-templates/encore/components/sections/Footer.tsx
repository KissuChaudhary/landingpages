"use client";

import { ArrowUp } from "lucide-react";
import { site } from "@/site.config";
import { Brand } from "@/components/ui/Brand";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { useMotion } from "@/components/motion/MotionProvider";

/*
 * FOOTER: links, then the name set wide across the page. As the footer comes
 * into view the wordmark narrows from Hubot Sans' widest cut to its
 * condensed one, so the last thing on the page settles into place.
 */

export function Footer() {
  const { footer, brand } = site;
  const { reduced } = useMotion();
  const [ref] = useScrollProgress<HTMLDivElement>({ fully: true, disabled: reduced });
  const social = footer.social.filter((l) => l.href);
  const legal = footer.legal.filter((l) => l.href);
  return (
    <footer className="mx-auto max-w-[1320px] px-4 pt-20 sm:px-6 md:pt-28">
      <div className="grid gap-12 md:grid-cols-[1.3fr_1fr]">
        <div>
          <Brand />
          <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-muted-foreground">{brand.description}</p>
          <p className="label mt-6 text-subtle">{footer.partner}</p>
          {social.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {social.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="flex h-9 items-center rounded-full border border-line px-4 text-[14px] text-ink/70 transition-colors hover:border-ink/30 hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8">
          {footer.columns.map((column) => (
            <div key={column.title}>
              <p className="label text-subtle">{column.title}</p>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[15px] text-ink/80 transition-colors hover:text-berry-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div ref={ref} aria-hidden="true" className="mt-16 select-none overflow-hidden md:mt-24">
        <p
          className="display whitespace-nowrap text-center text-[27vw] leading-[0.82] text-ink xl:text-[340px]"
          style={{ fontVariationSettings: `"wdth" calc(125 - var(--e, 1) * 45)`, letterSpacing: "-0.035em" }}
        >
          {brand.name.toLowerCase()}
          <span className="text-berry">.</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 border-t border-line py-6 text-[13.5px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {brand.legalName}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          {legal.map((link) => (
            <a key={link.label} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </a>
          ))}
          <a href="#top" className="flex items-center gap-1.5 transition-colors hover:text-ink">
            Back to top
            <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
