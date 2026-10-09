/** Isolated export of the reusable Aster project. */
export default function AsterPreview() {
  return (
    <iframe
      src="/demos/aster/index.html"
      title="Aster creative review workspace preview"
      allow="clipboard-write"
      className="block h-screen w-full border-0 bg-[#faf9f6]"
    />
  );
}
