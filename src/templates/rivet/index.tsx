/** Isolated preview of the reusable Rivet studio project. */
export default function RivetPreview() {
  return (
    <iframe
      src="/demos/rivet/index.html"
      title="Rivet design and engineering studio"
      allow="clipboard-write"
      className="block h-screen w-full border-0 bg-[#0b0c0a]"
    />
  );
}
