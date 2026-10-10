# Design decisions

Conduit's first release followed its design reference too closely: a centred serif hero, cobalt glass imagery beside a portrait, an announcement strip, a dark three-cell problem chapter, alternating glass product rows, a 3D impact chart, a dark five-cell bento with task rails, a six-icon sector grid, tabbed testimonials, round seals, a split FAQ and a pixel wordmark, in the reference's order. The 10 October 2026 redesign keeps only the dashed frame grid and rebuilds the rest around one idea.

## Concept: the grid is the conduit

A conduit is a channel that carries something. The dashed frame lines are the page's conduits. Signals travel them and square junctions light where they arrive: into the hero board on load, between the board's columns, down the product rail and the capability stack, and around the footer wordmark. Every product moment is a route from intent to action.

## System

- **Type:** Instrument Sans throughout, headings at 500 with `wdth` 90 and tight tracking; IBM Plex Mono for labels, ports and code. No serif.
- **Colour:** white, graphite ink, a cool tint (#f6f7f8) and one emerald signal (#00b386; #00795d for text on white; #2ee6a8 on dark). Amber marks the moments that need a person.
- **Frame:** one dashed rule each side, continued through the header; 9px junctions where rules meet. Dark and tinted chapters extend to the viewport edge while the frame stays aligned.
- **Controls:** buttons are a label plus a port; the port takes the signal and swaps its arrow on hover. Outline buttons are dashed until hovered.
- **Labels:** a signal square with a short dashed tail, in mono.

## Hierarchy

1. **Hero:** left-set headline with copy and actions to the right, then the route board on the grid's columns: Intent (typed), Context (tools link), Steps (worked through), Action (result resolves, then the approval rule). Four blueprints cycle until chosen. A logo row of cells closes the frame.
2. **The disconnect:** numbered problems beside six tools whose broken handoffs re-route through one hub as the section scrolls.
3. **Product:** sticky screen panel (images, not coded mockups) beside three stages on a filling rail, closed by a counted outcome band.
4. **Stories:** tinted chapter, four case cards; each can replay its blueprint on the board.
5. **Platform stack:** dark chapter with a live run log and five layers, each with a line diagram, on one vertical conduit.
6. **Control:** three principles beside a readable policy; each highlights its lines.
7. **Use cases:** sticky intro and an index of six teams; each row runs its blueprint on the board.
8. **FAQ:** two columns of rows. **Closing and footer:** dark closing, link columns, dashed wordmark with running light.

## Motion

Finite where it explains and ambient only where it's a signal: the arrival pulse runs once; a board run lasts 7.6 seconds and holds before the next; the problem map is scroll-linked; the product rail fills with scroll; the stack pulse, run log and wordmark light loop quietly (the log pauses on hover, the board pauses off screen). Section entrances move 18px. Reduced motion shows finished states: a complete run, the joined map, a static log and no loops.

## Honest examples

Stories describe the included blueprints, not customer results. Figures in the outcome band count the example's own steps and decision. The policy is an example of how boundaries could be expressed. A buyer replaces all of this with verified product claims.
