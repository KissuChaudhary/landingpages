import { SectionHead, AppButton } from "../ui/Primitives";
import { pages } from "@/data/pages";
export function ResourcePage({ slug }: { slug: string }) {
  const page = pages[slug];
  return (
    <main id="main" className="container resource-page">
      <SectionHead
        label={page.label}
        lines={[page.title]}
        text={page.intro}
        primary
      />
      <div className="resource-prose">
        {page.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
        <AppButton>Explore the workspace</AppButton>
      </div>
    </main>
  );
}
