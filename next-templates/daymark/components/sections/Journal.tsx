import { notes } from "@/data/journal";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
import { Heading } from "../ui/Heading";
import { TextLink } from "../ui/Button";
import { Arrow } from "../ui/Arrow";
export function NoteCards() {
  return (
    <div className="note-grid">
      {notes.map((note, index) => (
        <a
          className={"note-card tone-" + note.color}
          href={href("/journal/" + note.slug)}
          key={note.slug}
          data-reveal
        >
          <div className="note-meta">
            <span>{note.category}</span>
            <Arrow diagonal />
          </div>
          <div className={"note-art note-art-" + index} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <h3>{note.title}</h3>
          <span className="note-read">
            {note.readTime}
            <Arrow />
          </span>
        </a>
      ))}
    </div>
  );
}
export function Journal() {
  return (
    <section className="section wrap">
      <Heading {...site.journal} />
      <NoteCards />
      <div className="journal-foot">
        <TextLink to="/journal">All studio notes</TextLink>
      </div>
    </section>
  );
}
