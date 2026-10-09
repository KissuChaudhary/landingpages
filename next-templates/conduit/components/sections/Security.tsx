import { LockKeyhole, ScanLine, ShieldCheck } from "lucide-react";
import { site } from "@/site.config";
import { Frame, SectionHead } from "../ui/Primitives";
const icons = [LockKeyhole, ScanLine, ShieldCheck];
export function Security() {
  return (
    <Frame className="section security" id="control">
      <SectionHead
        label={site.security.label}
        title={site.security.title}
        centered
      />
      <div className="security-seals">
        {site.security.seals.map((seal, i) => {
          const Icon = icons[i];
          return (
            <div className="security-seal" key={seal.title} data-reveal>
              <span className="seal-code">Conduit / {seal.code}</span>
              <Icon size={24} strokeWidth={1.3} />
              <strong>{seal.title}</strong>
              <span>{seal.detail}</span>
            </div>
          );
        })}
      </div>
      <div className="security-grid">
        {site.security.items.map((item) => (
          <article key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </Frame>
  );
}
