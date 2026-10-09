/** Isolated static export of the reusable Arclo project. */
export default function ArcloPreview() {
  return (
    <iframe
      src="/demos/arclo/index.html"
      title="Arclo finance close platform preview"
      allow="clipboard-write"
      className="block h-screen w-full border-0 bg-white"
    />
  );
}
