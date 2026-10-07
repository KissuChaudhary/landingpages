import { Linkedin, Mail } from "lucide-react";

import { Wordmark } from "@/components/Navbar";
import { siteConfig } from "@/site.config";

export function Footer() {
  const { footer } = siteConfig;

  return (
    <footer className="px-2 pb-2 sm:px-8 sm:pb-8">
      <div className="mx-auto max-w-[1100px] rounded-[22px] border border-line bg-wash/80 px-5 py-10 sm:rounded-[24px] sm:px-10 sm:py-12">
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-[22rem] text-[15px] leading-[1.6] text-ink-mid">{footer.blurb}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-mid">
              <span aria-hidden className="size-2 rounded-full bg-good" />
              {footer.status}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="font-serif text-[1.0625rem] text-ink">{column.title}</p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[14px] text-ink-mid transition-colors hover:text-ink">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="text-[14px] text-ink-low">
            &copy; {new Date().getFullYear()} {footer.legal}
          </p>
          <ul className="flex gap-2.5">
            {[
              { label: "LinkedIn", Icon: Linkedin },
              { label: "Email", Icon: Mail },
            ].map(({ label, Icon }) => (
              <li key={label}>
                <a
                  href="#"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-lg border border-line bg-card text-ink-mid outline-none transition-colors hover:text-ink focus-visible:ring-2 focus-visible:ring-flame"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
