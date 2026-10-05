/**
 * Marketplace preview for Footnote.
 *
 * Footnote is a standalone Next.js project with its own Tailwind tokens and fonts, so it is shown in an
 * isolated frame instead of being mixed into this app's CSS. The frame loads a static export of the real
 * production build, copied to public/demos/footnote.
 */
export default function FootnotePreview() {
  return (
    <iframe
      src="/demos/footnote/index.html"
      title="Footnote live preview"
      className="block h-screen w-full border-0 bg-[#0b0b0d]"
    />
  );
}
