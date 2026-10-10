import type { Metadata } from "next";
import { WorkIndex } from "@/components/pages/WorkIndex";
import { Closing } from "@/components/sections/Closing";

export const metadata: Metadata = {
  title: "Work",
  description: "Pop-ups, launch nights, community programs and creator trips, and what each one did for the brand.",
};

export default function WorkPage() {
  return (
    <>
      <section className="container page-head">
        <span className="tag" data-reveal>
          Work
        </span>
        <h1 className="h1" data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          Every turnout.
        </h1>
        <p className="lead" data-reveal style={{ "--d": "160ms" } as React.CSSProperties}>
          A few of the rooms we have filled, what we built for them and what happened after the doors closed.
        </p>
      </section>
      <section className="container page-body">
        <WorkIndex />
      </section>
      <Closing />
    </>
  );
}
