# Index

A complete Next.js landing page for research, personal knowledge and AI products. Warm paper, persimmon, readable Instrument Sans and small, purposeful motion. The product examples work locally and contain original fictional source passages.

## Run

Requires Node 20.9 or later.

```sh
npm ci
npm run dev
npm run typecheck
npm run verify:content
npm run build
npm start
```

Deploy this folder as its own Next.js project. Leave `NEXT_PUBLIC_BASE_PATH` unset for a normal domain. `INDEX_EXPORT=1 npm run build` creates a static `out/` directory; set `NEXT_PUBLIC_BASE_PATH` only if hosting under a subdirectory.

## Make it yours

| What | Where |
| --- | --- |
| Brand, metadata, main copy, FAQ, plan names and links | `site.config.ts` |
| Topic examples, sources, passages, findings and citations | `data/topics.ts` |
| Color, shared gutters, type and control sizes | `styles/base.css` |
| Font selection | `app/layout.tsx` |
| Section order | `app/page.tsx` |
| Heading accents, label decode and ambient motion | `components/motion/` and `styles/motion.css` |
| Research UI and source previews | `components/product/` |
| Main product action | `site.config.ts → links.app` |
| Documentation and contact | `site.config.ts → links.docs / links.email` |
| Independent billing destinations | `site.config.ts → plans[].checkout.monthly / yearly` |

The main action explores the local example while `links.app` is empty. Each plan button is an ordinary link. It goes to the plan's `checkout` link; until one is set, the free plan opens the working example and paid plans start an email to `links.email`. Together is priced per person. The yearly number is the monthly equivalent; the card shows the full annual total. Update the savings label if changing the rates.

## Working interactions

- Three topics update the research scene, product story, evidence and example library together.
- Source buttons and citation numbers open the complete source passage inside the card they were chosen from. Back or Escape returns to the card and to the button you came from.
- Desktop scrolling advances Collect, Connect and Understand. The same stages have manual controls. Phones show all three in normal reading order.
- Example rows support Up/Down, Home/End and click. Copy and download include the selected answer and its original sources.
- Clipboard failure opens a selectable text fallback. Download links are actual UTF-8 text files.
- Monthly/yearly pricing and each plan's review use the same calculation.
- Native FAQ, mobile navigation, useful anchors and a remembered motion pause control are included.

No account, AI service, document import, payment or email submission is implemented. Connect those to your own application. The sample feature allowances are illustrative product copy, not functional limits in this landing page. Replace the fictional brand, prices, passages and claims before launch.

## Assets and motion

All artwork is editable HTML/CSS/SVG. There are no stock assets. Next/font hosts the included font subsets with the build. Headline text stays visible during the segmented accent animation. Labels decode briefly, never whole paragraphs. Ambient loops pause out of view and in hidden tabs. Operating-system reduced motion takes precedence over the footer control.

See `ASSETS.md` and `LICENSE`.
