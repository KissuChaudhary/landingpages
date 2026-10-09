import { Frame, SectionHead } from "./ui/Primitives";
import { pages } from "@/data/pages";
import { href } from "@/lib/urls";
import { ArrowUpRight } from "lucide-react";
export function ResourcePage({ slug }: { slug: string }) {
  const page = pages[slug];
  return (
    <Frame className="resource-section">
      <div className="resource-inner">
        <SectionHead
          level={1}
          label={page.label}
          title={page.title}
          text={page.intro}
          align="left"
        />
        <div className="resource-body">
          {page.sections.map((section, i) => (
            <section key={section.title}>
              <span className="resource-number">0{i + 1}</span>
              <div>
                <h2>{section.title}</h2>
                <p>{section.text}</p>
              </div>
            </section>
          ))}
        </div>
        <a
          className="button button-light"
          href={href(
            slug.includes("monday") ||
              slug.includes("return") ||
              slug.includes("context")
              ? "/journal"
              : "/contact",
          )}
        >
          {slug.includes("monday") ||
          slug.includes("return") ||
          slug.includes("context")
            ? "Back to the journal"
            : "Start a conversation"}
          <ArrowUpRight size={16} />
        </a>
      </div>
    </Frame>
  );
}
