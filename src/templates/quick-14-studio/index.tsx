/**
 * Marketplace preview for Fourteen.
 *
 * Fourteen is a standalone Next.js project with its own Tailwind tokens and fonts, so it is shown in an
 * isolated frame instead of being mixed into this app's CSS. The frame loads a static export of the real
 * production build, copied to public/demos/quick-14-studio.
 */
export default function FourteenPreview() {
  return (
    <iframe
      src="/demos/quick-14-studio/index.html"
      title="Fourteen live preview"
      className="block h-screen w-full border-0 bg-[#fbfaf8]"
    />
  );
}
