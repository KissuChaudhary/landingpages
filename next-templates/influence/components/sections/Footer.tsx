import { Logo } from "@/components/Navbar";
import { InstagramIcon, TikTokIcon, YouTubeIcon } from "@/components/ui/Icons";
import { Container } from "@/components/ui/Title";
import { siteConfig } from "@/site.config";

const socials = [
  { name: "TikTok", Icon: TikTokIcon },
  { name: "Instagram", Icon: InstagramIcon },
  { name: "YouTube", Icon: YouTubeIcon },
];

export function Footer() {
  const { footer, name } = siteConfig;

  return (
    <footer className="py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[5fr_7fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[18rem] text-[15px] leading-[1.6] text-ink-mid">{footer.blurb}</p>
            <ul className="mt-6 flex gap-2">
              {socials.map(({ name: label, Icon }) => (
                <li key={label}>
                  <a
                    href="#"
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full border border-line-strong text-ink outline-none transition-colors hover:border-ink hover:bg-ink hover:text-white focus-visible:ring-2 focus-visible:ring-orange"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footer.columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="text-[14px] font-bold text-ink">{column.title}</p>
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
