/**
 * Marketplace preview for Parley.
 *
 * Parley is a standalone Next.js project with its own Tailwind tokens and fonts, so it is shown in an
 * isolated frame instead of being mixed into this app's CSS. The frame loads a static export of the real
 * production build, copied to public/demos/parley.
 */
export default function ParleyPreview() {
  return (
    <iframe
      src="/demos/parley/index.html"
      title="Parley live preview"
      className="block h-screen w-full border-0 bg-[#fffaf8]"
    />
  );
}
