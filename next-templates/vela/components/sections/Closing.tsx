import { site } from "@/site.config";
import { appHref } from "@/lib/urls";
import { Button } from "@/components/ui/Primitives";
import { BrandMark } from "@/components/ui/Brand";
export function Closing() {
  return (
    <section className="closing">
      <div className="closing-inner reveal">
        <span className="eyebrow">
          <i />
          {site.closing.label}
        </span>
        <h2>
          {site.closing.heading.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p>{site.closing.text}</p>
        <Button href={appHref()}>{site.closing.cta}</Button>
      </div>
      <BrandMark className="closing-mark" />
    </section>
  );
}
