/**
 * Marketplace preview for Emberline.
 *
 * Emberline is a standalone Next.js project with its own Tailwind tokens and fonts, so it is shown in an
 * isolated frame instead of being mixed into this app's CSS. The frame loads a static export of the real
 * production build, copied to public/demos/emberline.
 */
export default function EmberlinePreview() {
  return (
    <iframe
      src="/demos/emberline/index.html"
      title="Emberline live preview"
      className="block h-screen w-full border-0 bg-[#060504]"
    />
  );
}
