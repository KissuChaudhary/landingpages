import { Mark } from "@/components/ui/Chat";
import { Container } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

export function Footer() {
  const { footer, name } = siteConfig;

  return (
    <footer className="py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr]">
          <div>
            <p className="flex items-center gap-2">
              <Mark className="size-8" />
              <span className="display text-[1.5rem] leading-none text-ink">{name}</span>
            </p>
            <p className="mt-4 max-w-[18rem] text-[15px] leading-[1.6] text-ink-mid">{footer.blurb}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-[14px] font-semibold text-ink">{column.title}</p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-[15px] text-ink-mid transition-colors hover:text-ink">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <p className="mt-14 border-t border-line pt-6 text-[14px] text-ink-low">
          &copy; {new Date().getFullYear()} {name}. {footer.legal}
        </p>
      </Container>
    </footer>
  );
}
