/**
 * Marketplace preview for Marlow.
 *
 * Marlow is a standalone Next.js project with its own Tailwind tokens and fonts, so it is shown in an
 * isolated frame instead of being mixed into this app's CSS. The frame loads a static export of the real
 * production build, copied to public/demos/marlow.
 */
export default function MarlowPreview() {
  return (
    <iframe
      src="/demos/marlow/index.html"
      title="Marlow live preview"
      className="block h-screen w-full border-0 bg-[#f6f2ea]"
    />
  );
}
