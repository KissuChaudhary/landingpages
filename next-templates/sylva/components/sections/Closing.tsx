import { site, bookingHref } from "@/site.config";
import { Button } from "../ui/Primitives";
import { LeafMark } from "../ui/Brand";
export function Closing() {
  return (
    <section className="closing wrap">
      <div className="closing-panel" data-reveal>
        <LeafMark className="closing-mark" />
        <p className="eyebrow">{site.closing.eyebrow}</p>
        <h2>
          {site.closing.title}
          <br />
          <em>{site.closing.accent}</em>
        </h2>
        <p>{site.closing.description}</p>
        <Button to={bookingHref()}>{site.closing.cta}</Button>
        <svg
          className="closing-line"
          viewBox="0 0 1000 400"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-80 330C120 30 420 560 660 260S930-80 1060 120M-60 370C180 70 430 600 700 300S960-30 1100 160"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>
    </section>
  );
}
