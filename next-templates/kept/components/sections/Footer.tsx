import { Wordmark } from "@/components/Navbar";
import { Container } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

/** The footer continues the pine band, so the page ends in one dark block. */
export function Footer() {
  const { footer, name } = siteConfig;

  return (
    <footer className="bg-pine pb-12 text-on-pine">
      <Container>
        <div className="grid gap-12 border-t border-white/15 pt-14 lg:grid-cols-[5fr_7fr]">
          <div>
            <Wordmark light />
            <p className="mt-4 max-w-[18rem] text-[15px] leading-[1.6] text-on-pine-mid">{footer.blurb}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-[14px] font-medium text-on-pine">{column.title}</p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[15px] text-on-pine-mid transition-colors hover:text-on-pine">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <p className="mt-14 text-[14px] text-on-pine-mid">
          &copy; {new Date().getFullYear()} {name}. {footer.legal}
        </p>
      </Container>
    </footer>
  );
}
