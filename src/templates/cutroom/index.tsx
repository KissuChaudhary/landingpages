/**
 * Marketplace preview for Cutroom.
 *
 * Cutroom is a standalone Next.js project with its own Tailwind tokens and fonts, so it is shown in an
 * isolated frame instead of being mixed into this app's CSS. The frame loads a static export of the real
 * production build, copied to public/demos/cutroom.
 */
export default function CutroomPreview() {
  return (
    <iframe
      src="/demos/cutroom/index.html"
      title="Cutroom live preview"
      className="block h-screen w-full border-0 bg-white"
    />
  );
}
