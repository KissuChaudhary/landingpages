# Turnout design brief (maintainers only, not shipped)

## Brief

The owner asked for a template with a strong motion-led agency structure and a fresh identity, while keeping the same creative energy found in high-performing social / UGC studio patterns. The goal was a new name, new copy, new positioning and a story that reads as its own product without feeling derivative.

We already sell a short-form video agency template (Influence), so Turnout is positioned as an **experiential studio**: pop-ups, launch nights, community programs (run clubs, supper clubs) and creator trips, each one turned into a season of content. The structure stays agency-shaped so any studio can adopt it.

## What we kept, and what we changed

| Pattern | Turnout |
| --- | --- |
| Pink ribbon with text along a curve | Lime ribbon whose words drift on their own and speed up with scroll velocity, in the direction you scroll; draws itself on load; separate gentler curve on phones |
| Tall video card with stacked cards behind | Self-shuffling photo deck: the front card flicks out and tucks behind (CSS keyframes), timer is a CSS animation on a progress bar, caption morphs, pause and next buttons, swipe, holds on hover/focus/off-screen |
| Pain cards floating past a sticky headline on a dark background | Same mechanic, plus each problem is crossed out (× becomes a drawn ✓, lime strike) as it passes the middle, and the headline morphs into the answer before the page turns light again |
| Mission statement | Words light up with scroll progress |
| Loops drawn on scroll | Lime and iris threads that draw with scroll between sections, and the team stands along one |
| Featured projects with label bars | Same layout; the metric morphs into "Read the case study" on hover, arrow throws; full case study pages |
| Scattered images around "See more works" | A ring of tiles placed with CSS cos()/sin() that turns with scroll and opens when the link is hovered |
| Stacked service cards with folder tabs | Same folder stacking; tabs are real links, concave folder corners, the covered card dims and its photo settles |
| Comparison cards | Fly in with a throw and settle askew; the lime card's checks draw in sequence; hover straightens |
| Process cards | Hover widens a step (flex-grow) to reveal when it happens and what you get; icons draw |
| Monthly / yearly pricing | Quarterly / yearly retainers, thrown thumb, odometer prices, billing note slides from the side you chose, plan buttons carry the plan into the contact form |
| Footer reveal | Same idea; the wordmark rises letter by letter; newsletter button morphs through its states |

## Palette and type

Paper `#f1f1ee`, ink `#131313`, lime `#d4f25a` (brand), iris `#b9c4ff`, stone `#dad6cf`, blush `#ffc6d7`. Bricolage Grotesque (opsz axis) for display, Geist for reading. No drop shadows: 1px rings only.

## Photography

26 images generated through fal with `openai/gpt-image-2.5/flare/text-to-image`, quality low, smallest sizes (owner's choice for cost). Raw files in `work/turnout-art/`, URLs in `work/turnout-assets.json`, conversion in `work/turnout-assets.cjs`. The four testimonial avatars are cropped from one 2 × 2 grid.
