/**
 * Marketplace preview for Halftone.
 *
 * Halftone is a standalone Next.js project with its own Tailwind tokens and fonts, so it is shown in an
 * isolated frame instead of being mixed into this app's CSS. The frame loads a static export of the real
 * production build, copied to public/demos/halftone.
 */
export default function HalftonePreview() {
  return (
    <iframe
      src="/demos/halftone/index.html"
      title="Halftone live preview"
      className="block h-screen w-full border-0 bg-white"
    />
  );
}
