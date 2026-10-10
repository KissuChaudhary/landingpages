/** Keep the complete standalone site isolated from the catalog's styles. */
export default function DaymarkPreview() {
  return (
    <iframe
      src="/demos/daymark/index.html"
      title="Daymark growth and retention studio preview"
      className="block h-screen w-full border-0 bg-white"
    />
  );
}
