/** The standalone export keeps Index's typography and motion isolated from marketplace styles. */
export default function IndexPreview() {
  return (
    <iframe
      src="/demos/index/index.html"
      title="Index research workspace preview"
      allow="clipboard-write"
      className="block h-screen w-full border-0 bg-[#f7f6f2]"
    />
  );
}
