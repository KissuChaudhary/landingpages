import { Divider } from "@/components/ui/Grid";
import { siteConfig } from "@/site.config";

export function Footer() {
  const { footer, name } = siteConfig;

  return (
    <footer>
      <Divider />
      <div className="grid gap-12 px-6 py-14 md:px-12 lg:grid-cols-[5fr_7fr]">
        <div>
          <p className="display text-[1.75rem] leading-none text-text">
            {name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-4 max-w-[18rem] text-[15px] leading-[1.6] text-text-mid">{footer.blurb}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-[14px] font-medium text-text">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[15px] text-text-mid transition-colors hover:text-text">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <Divider edges={false} />
      <p className="px-6 py-6 text-[14px] text-text-low md:px-12">
        &copy; {new Date().getFullYear()} {name}. {footer.legal}
      </p>
    </footer>
  );
}
