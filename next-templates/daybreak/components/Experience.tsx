import type { ReactNode } from "react";
import { site } from "@/site.config";
import { href } from "@/lib/urls";
/** The main call to action: your app when `links.app` is set, otherwise the plans. */
export function StartButton({
  children = site.hero.primary,
  light = false,
}: {
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <a
      className={`button ${light ? "button-light" : "button-dark"}`}
      href={site.links.app || href("/#pricing")}
    >
      {children}
    </a>
  );
}
