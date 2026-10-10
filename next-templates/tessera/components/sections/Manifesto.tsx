import { site } from "@/site.config";
import { Eyebrow, Title } from "@/components/ui";
export function Manifesto() {
  return (
    <section id="intro" className="manifesto section light" data-scene>
      <div className="manifesto-top">
        <Eyebrow>{site.manifesto.eyebrow}</Eyebrow>
        <span className="mono">A MORE CONSIDERED KIND OF AI</span>
      </div>
      <Title lines={site.manifesto.lines} className="manifesto-title" />
      <div className="manifesto-bottom">
        <div className="principle-list">
          {site.manifesto.principles.map((item, i) => (
            <span data-reveal key={item}>
              <small className="mono">0{i + 1}</small>
              {item}
            </span>
          ))}
        </div>
        <p data-reveal>{site.manifesto.body}</p>
      </div>
    </section>
  );
}
