# Assets

Every image in `public/images/` is original to this template. Replace them with your own before launch.

## Product screens

Rendered for this template from purpose-built interface layouts, then encoded as WebP at 2× resolution. They show a fictional studio ("Morrow Studio"), fictional clients and fictional people, with initials instead of photos.

| File | Shows |
| --- | --- |
| `dashboard.webp` | Home screen: hours, utilization, running timer, capacity, budgets, invoices |
| `dashboard-phone.webp` | A shorter version of the home screen for phones |
| `timesheet.webp` | A drafted week with suggested entries |
| `timer.webp` | The timer with today's earlier entries |
| `capacity.webp` | Three weeks of team capacity with an overbooked day |
| `approvals.webp` | An approval chain |
| `card-invoice.webp`, `card-budget.webp`, `card-payout.webp` | Cards shown over the workflow photos |
| `planner.webp`, `portal.webp`, `rates.webp`, `reports.webp`, `mobile.webp` | The five feature-deck screens |

## Photographs and portraits

Generated with an AI image model (GPT Image 2.5) for this template and encoded as WebP. They depict fictional people and places. The six portraits (`ananya`, `marcus`, `yuna`, `daniel`, `lucia`, `karim`) were cropped from one generated grid.

| File | Prompt summary |
| --- | --- |
| `studio-review.webp` | Two colleagues reviewing work on a laptop at a pale oak table, window light, a cobalt notebook |
| `studio-plan.webp` | A project lead by a wall of sticky notes and a printed timeline, talking with two designers |
| `studio-focus.webp` | A designer at a standing desk beside a large window, a cobalt mug |
| `journal-notes.webp` | Hands writing in a notebook beside a laptop, a wristwatch and coffee |
| `journal-pricing.webp` | Two people sketching a plan in a glass meeting room |
| `journal-wall.webp` | A designer pinning blue printed layouts to a studio wall |
| Portraits | Six head-and-shoulders portraits on a light grey backdrop |

Every prompt asked for editorial documentary photography, natural daylight, a cool neutral palette with cobalt accents, and no text, logos or readable screens.

## Code assets

- Logo mark, favicon and customer marks: SVG in `components/ui/Brand.tsx`, `components/ui/Logos.tsx` and `public/icon.svg`. The customer names are fictional.
- Icons: [Lucide](https://lucide.dev), ISC license.
- Fonts: Geist and Geist Mono Latin variable WOFF2 files, bundled in `public/fonts/` and loaded through `next/font/local`. The files are the Google Fonts versions used by this design; their upstream SIL Open Font Licenses are included beside them. Builds require no font downloads. For other writing systems, add appropriately licensed subsets and update `app/layout.tsx`.
