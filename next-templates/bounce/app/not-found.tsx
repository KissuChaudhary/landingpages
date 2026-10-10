import { enrollHref } from "@/site.config";
import { href } from "@/lib/urls";
import { ButtonLink } from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <section className="page missing">
      <div className="container">
        <p className="missing-code" aria-hidden="true">
          4<span className="ball" />4
        </p>
        <h1>This track never got bounced.</h1>
        <p>The page may have moved, or the link is out of date.</p>
        <div className="missing-actions">
          <ButtonLink to="/" label="Back to home" />
          <a className="text-link" href={href(enrollHref())}>
            See the course
          </a>
        </div>
      </div>
    </section>
  );
}
