"use client";

import { ArrowUp } from "lucide-react";
import { site } from "@/site.config";
import { Brand } from "@/components/ui/Brand";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { useMotion } from "@/components/motion/MotionProvider";

/*
 * FOOTER: the dark frame again, closing the page the way the hero opened it.
 * The giant wordmark is cut along its middle; as the footer scrolls in, the
 * two halves slide back into line (a shear, undone) and the mint cut fades.
 */

export function Footer() {
  const { footer, brand } = site;
  const { reduced } = useMotion();
  const [ref] = useScrollProgress<HTMLDivElement>({ fully: true, disabled: reduced });
  const social = footer.social.filter((l) => l.href);
  const legal = footer.legal.filter((l) => l.href);
  const word = brand.name.toLowerCase();

  return (
    <footer className="px-2 pb-2 md:px-3 md:pb-3">
      <div className="tone-dark overflow-hidden rounded-[26px] bg-ink text-white md:rounded-[36px]">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-6 pt-14 md:grid-cols-[1.4fr_1fr] md:px-10 md:pt-20">
          <div>
            <Brand />
            <p className="mt-4 max-w-[38ch] text-[14.5px] leading-relaxed text-white/55">{brand.description}</p>
            {social.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {social.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="flex h-9 items-center rounded-full border border-white/10 px-4 text-[13px] text-white/70 transition-colors hover:border-white/25 hover:text-white">
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
                <p className="text-[13px] text-white/40">{column.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[14.5px] text-white/75 transition-colors hover:text-white">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div ref={ref} aria-hidden="true" className="relative mt-14 select-none overflow-hidden px-4 pb-[2vw] md:mt-20 md:px-6 xl:pb-6">
          <div className="relative text-center text-[27vw] font-[640] leading-[0.9] tracking-[-0.07em] text-[#16191d] xl:text-[340px]" style={{ fontVariationSettings: '"wdth" 112' }}>
            <span className="block [clip-path:inset(0_0_50%_0)]" style={{ transform: "translateX(calc((1 - var(--e, 1)) * -9%))" }}>
              {word}
            </span>
            <span className="absolute inset-0 block [clip-path:inset(50%_0_0_0)]" style={{ transform: "translateX(calc((1 - var(--e, 1)) * 9%))" }}>
              {word}
            </span>
            <span className="absolute inset-x-0 top-1/2 h-px bg-mint" style={{ opacity: "calc((1 - var(--e, 1)) * 0.9)" }} />
          </div>
        </div>

        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 border-t border-white/[0.08] px-6 py-6 text-[13px] text-white/45 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <p>
            © {new Date().getFullYear()} {brand.legalName}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            {legal.map((link) => (
              <a key={link.label} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
            <a href="#top" className="flex items-center gap-1.5 transition-colors hover:text-white">
              Back to top
              <ArrowUp aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
