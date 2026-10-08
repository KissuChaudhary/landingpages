import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"section"> & {
  innerClassName?: string;
  hatch?: boolean;
};

/** Every section uses the same rails. Only shared cell edges draw borders. */
export function GridSection({ children, className = "", innerClassName = "", hatch = false, ...props }: Props) {
  return (
    <section className={`grid-section ${hatch ? "grid-hatch" : ""} ${className}`} {...props}>
      <div className={`grid-inner ${innerClassName}`}>{children}</div>
    </section>
  );
}
