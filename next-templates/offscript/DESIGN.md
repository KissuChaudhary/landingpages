# Offscript design direction

Reference studied: https://shinta.framer.media/. Its pill navigation, stacked portrait, curved marquee and pink accents supplied a quality benchmark. Offscript uses no reference media, copy, compositions or interaction systems.

The unfinished folder had been mixed with an Oddline draft. It was archived in `work/offscript/draft-backup` before implementation. The dark olive split hero, orbit artwork, service tabs, selectable pricing card and starbursts were replaced.

Offscript uses warm paper, black ink, acid yellow, lilac and local Manrope. The two-line headline leads into an expanding photographic contact sheet. Mouse exploration, focus or tap changes a frame's width, crop and caption. Navigation is a fixed compact index disclosure with numbered destinations.

Hierarchy: headline/contact sheet → flagship and staggered campaigns → studio belief and editorial photograph → three typographic capability posters → working wall → two open engagement rows → notebook → FAQ → pencil-marked invitation.

The process carries one campaign through three physical states: a paper brief, a moodboard of color and imagery, and a finished frame. Stage buttons and a native range share one state. Three campaign stories and two full articles have their own routes. Contact uses configured destinations; no invented metrics, testimonials, video player or simulated form submission.

Native motion: finite opening, frame expansion, once-only reveals, traced annotations and assembled print layers. System reduced motion preserves content and interaction. No motion-control buttons. Components and CSS are grouped by responsibility.

Standalone Next.js 15 package with four original WebP photos, local variable font and small content modules. Export `/demos/offscript` with `npm run export:demo` inside the Hairline UI repository.
