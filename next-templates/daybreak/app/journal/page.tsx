import { Frame, SectionHead } from "@/components/ui/Primitives";
import { articles } from "@/data/pages";
import { asset, href } from "@/lib/urls";
import { ArrowUpRight } from "lucide-react";
export const metadata = { title: "The journal" };
export default function JournalPage() {
  return (
    <main id="main">
      <Frame className="journal-section">
        <div className="section-inner">
          <SectionHead
            level={1}
            label="Notes for a clearer working day"
            title="A little perspective."
            text="Useful ideas on the work, the numbers and the space between."
          />
          <div className="journal-grid">
            {articles.map((a, i) => (
              <a
                href={href(`/${a.slug}`)}
                className="journal-article"
                key={a.slug}
              >
                <div className={`journal-image journal-image-${i}`}>
                  <img
                    src={asset(
                      `/images/${i === 1 ? "landscape" : "hero"}.webp`,
                    )}
                    alt="A painted sunlit landscape"
                    width="1536"
                    height="1024"
                  />
                </div>
                <p className="eyebrow">{a.category}</p>
                <h2>{a.title}</h2>
                <p>{a.text}</p>
                <span>
                  Read the note
                  <ArrowUpRight size={16} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </Frame>
    </main>
  );
}
