# ARCHITECTURE.md — JSR Studio Website

## Overview

A single-page static website (`index.html`) composed of stacked `<section>`
blocks, styled by one stylesheet, driven by three small vanilla-JS modules.
No framework, no bundler, no backend — designed to be uploaded straight to
GitHub Pages.

```
index.html  ──uses──▶  css/style.css
     │
     ├─ js/config.js   (loaded first: sets window.studioConfig)
     ├─ js/gallery.js  (loaded second: fetches data/portfolio.json,
     │                   renders masonry + featured grids, lightbox)
     └─ js/app.js      (loaded third: header/nav, animations, counters,
                         testimonial carousel, injects config.js values
                         into the DOM — phone, WhatsApp, social icons)
```

Script load order matters: `config.js` must load before `app.js` (which
reads `window.studioConfig`), and `gallery.js` calls
`window.initScrollAnimations()` (defined in `app.js`) once its dynamic
content is rendered, so newly-added gallery/featured elements also
fade in on scroll.

## Data Flow

- **Studio info** (phone, address, social links, stats): lives in
  `js/config.js` as a single `studioConfig` object on `window`. `app.js`
  reads it once on load and writes the values into the DOM (contact card,
  footer, hero social row, floating WhatsApp button, tel/wa.me links).
- **Portfolio photos**: live in `data/portfolio.json`, fetched at runtime by
  `js/gallery.js`, which renders the masonry grid, the featured-work strip,
  and powers the lightbox (next/prev iterate over the currently *filtered*
  array, not the full dataset).

This keeps all editable content out of the HTML/JS logic — see
[CONFIG.md](CONFIG.md) for what to edit and where.

## Sections (in `index.html`, top to bottom)

1. Header / sticky nav (`.site-header`)
2. Hero (`#home`)
3. About (`#about`)
4. Services (`#services`) — 6 static cards, each links to a portfolio filter
5. Portfolio / Our Work (`#portfolio`) — filter tabs + masonry grid, both
   rendered from `data/portfolio.json` by `gallery.js`
6. Featured Work (`#featured`) — rendered from the `"featured"` array in
   `data/portfolio.json`
7. Why Choose Us (`#why-us`) — 6 static cards
8. Statistics (`#stats`) — rendered from `studioConfig.stats`, animated via
   `IntersectionObserver` in `app.js`
9. Testimonials (`#testimonials`) — static sample cards (horizontal
   scroll-snap carousel, no external library)
10. Call To Action — static, links to phone/WhatsApp/portfolio
11. Contact (`#contact`) — address/phone/WhatsApp/maps/social cards
12. Footer

## Key Interaction Patterns

- **Filtering**: clicking a filter tab (or any `[data-filter]` element
  elsewhere on the page, e.g. a service card's "View Work" link) re-renders
  `#masonryGrid` from the in-memory `portfolioItems` array — no page reload,
  no re-fetch.
- **Lightbox**: operates on `filteredItems` (the currently visible subset),
  so next/prev only cycle through the active category. Supports Escape to
  close, arrow keys to navigate, and touch swipe. Focus is moved to the
  close button on open and restored to the trigger element on close for
  keyboard/screen-reader users.
- **Scroll animations**: elements with `data-aos="fade-up|fade-left|fade-right|zoom-in"`
  start hidden and fade/slide in via a single shared `IntersectionObserver`
  in `app.js` (`initScrollAnimations`). Respects
  `prefers-reduced-motion` (animations are skipped entirely, content shown
  immediately).
- **Active nav highlighting**: a second `IntersectionObserver` watches each
  section and toggles `.active` on the matching nav link as the visitor
  scrolls.
- **Header state**: a scroll listener toggles `.scrolled` on `.site-header`,
  switching it from a transparent overlay (on the hero) to a frosted white
  glass bar.

## Performance Choices

- Only the hero image is `<link rel="preload">`ed; every other image uses
  `loading="lazy"`.
- No JS framework, no build step, minimal dependencies (Google Fonts +
  Font Awesome via CDN only).
- CSS animations/transitions instead of a JS animation library.
- Gallery/featured images render on demand from JSON rather than being
  hard-coded, keeping `index.html` lean and the DOM small until data loads.

## Why No Framework / Build Step

The site needs to run unmodified from a plain GitHub Pages
"deploy from branch" setup — no CI, no `npm install`, no compiled output to
keep in sync with source. Plain HTML/CSS/JS keeps the deployment path to
"push to `main`" with zero moving parts.
