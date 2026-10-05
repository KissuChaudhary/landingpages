/**
 * Marketplace preview for Kept.
 *
 * Kept is a standalone Next.js project with its own Tailwind tokens and fonts, so it is shown in an
 * isolated frame instead of being mixed into this app's CSS. The frame loads a static export of the real
 * production build, copied to public/demos/kept.
 */
export default function KeptPreview() {
  return (
    <iframe
      src="/demos/kept/index.html"
      title="Kept live preview"
      className="block h-screen w-full border-0 bg-[#f4f3ec]"
    />
  );
}
