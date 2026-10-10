import { notes } from "@/data/notes";
import { pageHref } from "@/lib/links";
import { Arrow, Label } from "../ui";
export function Journal() {
  return (
    <section
      className="journal wrap section-pad"
      aria-labelledby="journal-title"
    >
      <div className="journal-heading">
        <Label>06 / A few things on our minds</Label>
        <h2 id="journal-title" data-reveal>
          From the
          <br />
          <span className="muted-line">studio notebook.</span>
        </h2>
        <p>
          Small observations on thinking clearly
          <br />
          and making things worth seeing.
        </p>
      </div>
      <div className="journal-notes">
        {notes.map((note, index) => (
          <a
            className={`journal-note journal-note-${index}`}
            key={note.slug}
            href={pageHref(`/notes/${note.slug}`)}
            data-reveal
          >
            <span className="note-top">
              {note.category}
              <span>OS / {note.number}</span>
            </span>
            <h3>{note.title}</h3>
            <span className="note-bottom">
              {note.read}
              <Arrow diagonal size={22} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
