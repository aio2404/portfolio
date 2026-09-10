# MESURE — Systems Specification

This document is the design source of truth for the AlexOps portfolio. The machine-readable companion is `.impeccable/design-system.json`.

## Direction

The interface should feel like a precise systems document: warm technical paper, dark ink, a single deep-green signal color, rectilinear modules, explicit labels, and visible evidence. It is light-only. Decoration must explain structure or remain absent.

## Core rules

- Use `#F2F0EB` as the page ground and `#EAE8E2` only for quiet technical surfaces.
- Use `#1A1917` for primary text, `#5C5A55` for secondary text, and `#1F4E4A` for signals and focus.
- Use only 2px and 4px corner radii. No gradients, glassmorphism, backdrop blur, large shadows, or pill-shaped cards.
- Use Geist Sans for interface and prose, Geist Mono for labels, captions, status, and technical data.
- Use the full viewport with fluid gutters (`clamp(20px, 3.5vw, 72px)`). Constrain only long-form prose to roughly 62 characters; grids, figures, rails, and data modules should occupy the remaining width.
- Treat homepage project cards as one complete link. Show a functional category, not a raw stack list.
- Case studies use a fluid 112–180px document-label rail with a fluid 24–56px gap. The rail collapses above the content below 860px, while prose remains capped at 62 characters.
- Never communicate state through color alone. Pair icons, text, numbering, or underlines with color.
- Every interactive target is at least 44px square and receives the global 2px signal focus ring.

## Typography implementation

The supplied specification named `next/font/google` and an MIT license. Next.js 14 does not expose Geist there. The implementation therefore uses the official `geist` package, which wraps `next/font/local`, self-hosts the variable WOFF2 files, and is licensed under the SIL Open Font License 1.1. No browser request to Google Fonts is made.

## Surfaces

- Homepage: persuasive overview with text-first LCP, selected systems, capabilities, experiments, process, and contact.
- Case study: reading surface with evidence rows, outcome signals, implementation points, technical environment, and explicit external links.
- Visual lab: experimental surface at `/lab`, containing only clearly labeled live or local interactions.

## Systems Manifold

The hero signature is decorative and never receives focus. Its SVG fallback is present in the initial HTML. The Three.js scene loads only after hydration and idle time when motion and device capability permit it.

The renderer budget is three draw calls: merged static module edges, the autonomous ROUTE outline, and three instanced channel rods. It uses an orthographic camera, DPR capped at 1.5, unlit basic materials, no textures, shadows, PBR, or post-processing. Reduced motion, low-memory heuristics, missing WebGL2, initialization failure, or context loss keep the static SVG.

## Motion

Section entry is a one-time 240ms fade with a 6px vertical offset. Hover transitions are 80–150ms. Reduced motion disables transforms, animation loops, and smooth scrolling while preserving visible state changes.

## Content integrity

The redesign does not invent clients, architectures, metrics, availability telemetry, or service status. Existing project data may be displayed, but diagrams must describe only information already visible on the page. Example testimonials remain excluded.
