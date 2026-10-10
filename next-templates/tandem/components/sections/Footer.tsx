"use client";
import { site } from "@/site.config";
import { Brand } from "@/components/ui/Brand";
import { ArrowUpRight } from "lucide-react";
import { useScrollProgress } from "@/components/motion/useScrollProgress";
import { useMotion } from "@/components/motion/MotionProvider";

export function Footer() {
  const { reduced } = useMotion();
  const [ref] = useScrollProgress<HTMLElement>({
    disabled: reduced,
    fully: true,
  });
  return (
    <footer ref={ref} className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>{site.footer.note}</p>
          </div>
          <nav aria-label="Footer navigation">
            {site.footer.links.map((l) => (
              <a key={l.label} href={l.href}>
                {l.label}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-word" aria-hidden="true">
          {site.brand.name.split("").map((letter, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties}>
              {letter}
            </span>
          ))}
          <span className="footer-period">↗</span>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getUTCFullYear()} {site.brand.name}
          </span>
          <span>GOOD WORK. GREAT COMPANY.</span>
          <a href="#">
            Back to top <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
