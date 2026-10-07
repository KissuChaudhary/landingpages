import { siteConfig } from "@/site.config";

/**
 * Links in three columns, then the studio name set enormous and cropped by the page edge. The wordmark is
 * sized in vw so it always fits the width, and it is decorative (aria-hidden): the real name is in the blurb.
 */
export function Footer() {
  const { blurb, columns, legal } = siteConfig.footer;

  return (
    <footer className="relative overflow-hidden pt-16 md:pt-24">
      <div className="mx-auto w-[var(--content)]">
        <div className="grid gap-12 border-t border-line-strong pt-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-[1.75rem] leading-none text-ink">{siteConfig.name}</p>
            <p className="text-pretty mt-4 max-w-[20rem] text-[15px] leading-[1.6] text-ink-mid">{blurb}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-low">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="break-words rounded text-[15px] text-ink outline-none transition-colors hover:text-clay focus-visible:ring-2 focus-visible:ring-ink"
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

        <p className="mt-12 flex flex-wrap justify-between gap-2 text-[13px] text-ink-low">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}. {legal}
          </span>
        </p>
      </div>

      <p
        aria-hidden
        className="display mt-4 select-none overflow-hidden text-center text-[clamp(6rem,28vw,26rem)] leading-[0.8] tracking-[-0.055em] text-ink/[0.92]"
      >
        <span className="block translate-y-[5%]">{siteConfig.name}</span>
      </p>
    </footer>
  );
}
