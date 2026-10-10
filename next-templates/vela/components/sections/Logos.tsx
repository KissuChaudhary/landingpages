import {
  Layers,
  CircleDashed,
  Command,
  Triangle,
  GalleryVerticalEnd,
} from "lucide-react";
import { site } from "@/site.config";
const marks = [Layers, Command, CircleDashed, Triangle, GalleryVerticalEnd];
export function Logos() {
  return (
    <section className="logos frame" aria-label="Illustrative teams">
      <p>{site.logos.label}</p>
      <div>
        {site.logos.names.map((name, index) => {
          const Mark = marks[index % marks.length];
          return (
            <span key={name}>
              <Mark size={26} strokeWidth={2} />
              {name}
            </span>
          );
        })}
      </div>
      <small>Illustrative teams for this template</small>
    </section>
  );
}
