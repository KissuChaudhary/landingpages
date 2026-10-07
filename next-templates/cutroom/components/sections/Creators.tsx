import { siteConfig } from "@/site.config";

/**
 * Channel names as plain text with their (made-up) subscriber counts, so there are no logos to license.
 * Replace with your real clients, with their permission.
 */
export function Creators() {
  const { label, items } = siteConfig.creators;
  return (
    <section aria-label={label} className="relative pb-6">
      <div className="mx-auto w-[var(--content)]">
        <p className="timecode mb-6 text-center text-text-low">{label}</p>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <li key={item.name} className="bg-paper px-4 py-6 text-center">
              <p className="display text-[1.375rem] leading-none text-text">{item.name}</p>
              <p className="timecode mt-2.5 text-text-low">{item.subs} subs</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
