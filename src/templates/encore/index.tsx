/** Isolated static export of next-templates/encore. */
export default function EncorePreview() {
  return (
    <iframe
      src="/demos/encore/index.html"
      title="Encore email and SMS studio preview"
      allow="clipboard-write"
      className="block h-screen w-full border-0 bg-[#ffffff]"
    />
  );
}
