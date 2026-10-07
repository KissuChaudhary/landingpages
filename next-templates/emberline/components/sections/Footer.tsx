import { Github, Linkedin, Twitter } from "lucide-react";

import { siteConfig } from "@/site.config";

const ICONS = { X: Twitter, GitHub: Github, LinkedIn: Linkedin } as const;

export function Footer() {
  const { blurb, columns, social, legal } = siteConfig.footer;

  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto w-[var(--content)] py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr] md:gap-16">
          <div className="max-w-[20rem]">
            <a href="#top" className="inline-flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ember-300">
              <span className="grid size-8 place-items-center rounded-[10px] bg-gradient-to-b from-ember-100 to-ember-400">
                <span className="size-2.5 rounded-full bg-on-ember" />
              </span>
              <span className="text-[17px] font-semibold tracking-[-0.02em] text-ink">{siteConfig.name}</span>
            </a>
            <p className="mt-4 text-[14.5px] leading-relaxed text-ink-mid">{blurb}</p>
            <ul className="mt-6 flex gap-2">
              {social.map(({ label, href }) => {
                const Icon = ICONS[label];
                return (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      className="grid size-10 place-items-center rounded-full border border-line text-ink-mid outline-none transition-colors hover:border-ember-300/45 hover:text-ember-100 focus-visible:ring-2 focus-visible:ring-ember-300"
                    >
                      <Icon className="size-[18px]" strokeWidth={1.75} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-[12px] font-medium uppercase tracking-[0.14em] text-ink-low">{column.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="rounded text-[14.5px] text-ink-mid outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-ember-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-[13px] text-ink-low sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
