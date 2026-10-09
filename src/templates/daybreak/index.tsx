/** Isolated static export of the reusable Daybreak project. */
export default function DaybreakPreview() {
  return (
    <iframe
      src="/demos/daybreak/index.html"
      title="Daybreak marketing workspace preview"
      allow="clipboard-write"
      className="block h-screen w-full border-0 bg-white"
    />
  );
}
