// How the site runs on Cloudflare Workers (OpenNext adapter).
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is prerendered at build time and nothing revalidates, so the build's own output is the cache:
// no R2 bucket or KV namespace to create.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
