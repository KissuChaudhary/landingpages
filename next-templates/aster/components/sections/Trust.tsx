import { BookOpen, Users, History, Download } from "lucide-react";
import { site } from "@/site.config";
import { SectionHead } from "../ui/Primitives";
export function Trust() {
  const icons = [BookOpen, Users, History, Download];
  return (
    <section className="trust section">
      <div className="container">
        <SectionHead
          label={site.trust.label}
          lines={site.trust.heading}
          text={site.trust.text}
          center
        />
        <div className="trust-grid">
          {site.trust.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <article
                key={item.title}
                data-reveal
                style={{ "--delay": `${i * 60}ms` } as React.CSSProperties}
              >
                <Icon size={23} strokeWidth={1.5} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
