# Relay — design decisions

Relay interprets the supplied SkyAgent reference through its structural principles: continuous rails, full-width section rules, generous shared cells and navigation that contracts only after scrolling. Its branding, content, conversation and feature artwork are original.

## Grid and composition

A 1280px outer frame contains two continuous inner rails, inset 40px on desktop, 24px on tablet and 12px on phone. Every GridSection uses the same measure. Horizontal section rules extend across the viewport using clipped shadows, which avoids scrollbar-width overflow. Feature and pricing gutters carry a restrained diagonal hatch.

Section introductions belong inside the same rail system as their content. Feature cells share square edges; their illustrations and captions occupy one uninterrupted surface. There is no enclosing rounded feature card or separate caption divider. Features become a single column on phones.

At the top, navigation is open and transparent. After 48px of scrolling it contracts to a maximum 900px, gains a translucent surface and stays near the top. The mobile version preserves its compact width and opens a keyboard-operable menu.

The hero presents a large, readable conversation with three selectable prepared examples. It is followed by four expansive illustrations: a conversation, a context orbit, a populated weekly schedule and an actual draft. The working workspace sits in its own section, flush with the page grid. Example library, context, pricing, FAQ, closing and footer continue the same rails.

## Type and colour

DM Sans is the single typeface. Shared tokens define display, section, subheading, body and supporting text. Product illustrations use smaller detail text only where appropriate. Cloud white, ink and cobalt carry the light appearance; the alternate ink palette covers the whole page. Blue emphasis is concentrated in actions, conversation and the closing section.

Marketing actions have 10px corners. Rounded conversation bubbles and product papers distinguish UI objects from the square page structure. Motion is limited to navigation contraction and interaction feedback, with reduced-motion support.

## Function and customization

The hero and workspace share three prepared scenarios. Choosing an example updates the conversation, request, selected context and document. A hero action focuses the matching workspace request. Replay can pause, resume or reset. Context changes require another run. Save/remove stores only scenario IDs locally; copy and a native file link export the displayed output.

Free-form requests go to a configured real application or explain the local examples. Empty checkout destinations open accurate local plan previews. No response is represented as live AI.

Buyer content and destinations live in site.config.ts; prepared scenarios live in data/scenarios.ts. GridSection and styles/grid.css own the layout contract. Sections, product visuals, state and styles remain separate so buyers can replace individual parts.
