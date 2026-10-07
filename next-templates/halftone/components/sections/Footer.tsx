import { site } from "@/site.config";
import { BrandMark } from "@/components/ui/BrandMark";
import { LiveDot } from "@/components/ui/Status";

export function Footer() {
  const { footer, brand, status } = site;
  return (
    <footer className="border-t border-neutral-200/80 bg-white py-12 text-xs text-neutral-600 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-6">
          <div className="col-span-2">
            <a href="#top" aria-label={`${brand.name} home`} className="mb-3 inline-flex">
              <BrandMark />
            </a>
            <p className="mb-5 max-w-xs text-xs leading-relaxed text-neutral-500">{footer.blurb}</p>
            <a
              href={status.href}
              className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-3 py-1.5 text-[11.5px] font-semibold text-neutral-600 transition-colors hover:bg-black/[0.07]"
            >
              <LiveDot />
              {status.label}
            </a>
          </div>

          {footer.columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3 text-xs font-bold tracking-tight text-neutral-900">{column.title}</h2>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors hover:text-neutral-900">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-neutral-100 pt-8 text-[11px] text-neutral-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brand.company} All rights reserved.
          </p>
          <a href={`mailto:${brand.email}`} className="transition-colors hover:text-neutral-600">
            {brand.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
