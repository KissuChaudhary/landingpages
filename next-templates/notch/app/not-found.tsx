import { href } from "@/lib/urls";
import { signupHref } from "@/site.config";
import { ButtonLink } from "@/components/ui/Primitives";

export default function NotFound() {
  return (
    <section className="page page-404">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1>This page wasn&apos;t counted.</h1>
        <p>The link may be old, or the page may have moved.</p>
        <div className="page-404-actions">
          <ButtonLink to="/" label="Back to home" />
          <a className="text-link" href={href(signupHref())}>
            Start a free trial
          </a>
        </div>
      </div>
    </section>
  );
}
