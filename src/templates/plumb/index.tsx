/** Isolated static export of next-templates/plumb. */
export default function PlumbPreview() {
  return (
    <iframe
      src="/demos/plumb/index.html"
      title="Plumb indie SaaS preview"
      allow="clipboard-write"
      className="block h-screen w-full border-0 bg-white"
    />
  );
}
