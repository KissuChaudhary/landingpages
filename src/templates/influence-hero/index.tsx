/**
 * Marketplace preview for Influence.
 *
 * Influence is a standalone Next.js project with its own Tailwind tokens and fonts, so it is shown in an
 * isolated frame instead of being mixed into this app's CSS. The frame loads a static export of the real
 * production build, copied to public/demos/influence-hero.
 */
export default function InfluencePreview() {
  return (
    <iframe
      src="/demos/influence-hero/index.html"
      title="Influence live preview"
      className="block h-screen w-full border-0 bg-[#fcfcfa]"
    />
  );
}
