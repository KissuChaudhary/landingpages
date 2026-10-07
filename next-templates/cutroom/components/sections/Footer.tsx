import { siteConfig } from "@/site.config";

/** Links in three columns on ink, closed by a ruler strip and a running-time line, like the end of a timeline. */
export function Footer() {
  const { blurb, columns, legal } = siteConfig.footer;

  return (
    <footer className="bg-ink text-on-ink">
      <div className="mx-auto w-[var(--content)] pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display text-[2rem] leading-none">{siteConfig.name}</p>
            <p className="text-pretty mt-4 max-w-[22rem] text-[15px] leading-[1.6] text-on-ink-mid">{blurb}</p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="timecode text-on-ink-mid">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="break-words rounded text-[15px] font-medium text-on-ink outline-none transition-colors hover:text-flame focus-visible:ring-2 focus-visible:ring-on-ink"
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

        <div aria-hidden className="ruler-on-ink mt-16 h-4 w-full" />
        <p className="timecode flex flex-wrap justify-between gap-2 py-6 text-on-ink-mid">
          <span>
            &copy; {new Date().getFullYear()} {siteConfig.name}. {legal}
          </span>
          <span>End of reel</span>
        </p>
      </div>
    </footer>
  );
}
