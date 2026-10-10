import { articles, articleDate } from "@/data/articles";
import { route } from "@/lib/urls";
import { Label, Action } from "../ui/Action";
import { Arrow } from "../ui/Mark";
import { ProjectArt } from "../art/ProjectArt";
export function Journal({ full = false }: { full?: boolean }) {
  return (
    <section className="journal section-wrap" id="journal">
      {!full && (
        <div className="section-heading">
          <Label>Thoughts from the studio</Label>
          <div>
            <h2 data-reveal>In the making.</h2>
            <p>
              A few observations on products, practice, and making things with
              care.
            </p>
            <Action href="/journal" quiet>
              All field notes
            </Action>
          </div>
        </div>
      )}
      <div className="journal-grid">
        {articles.map((a) => (
          <a
            href={route(`/journal/${a.slug}`)}
            key={a.slug}
            className="journal-card"
            data-reveal
          >
            <div className="journal-art">
              <ProjectArt kind={a.art} />
            </div>
            <div className="journal-meta label-type">
              <span>{a.category}</span>
              <time dateTime={a.date}>{articleDate(a.date)}</time>
            </div>
            <h3>{a.title}</h3>
            <p>{a.excerpt}</p>
            <span className="journal-read label-type">
              Read the note <Arrow diagonal />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
