/** The standalone export keeps Conduit's fonts, page routes and motion isolated. */
export default function ConduitPreview() {
  return <iframe src="/demos/conduit/index.html" title="Conduit agent platform preview" allow="clipboard-write" className="block h-screen w-full border-0 bg-white" />;
}
