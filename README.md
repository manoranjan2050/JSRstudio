# JSR Studio — Photography Portfolio Website

A premium, modern, mobile-first static website for **JSR Studio**, a photography
studio based in Balikuda, Jagatsinghpur, Odisha, India.

Live site (after GitHub Pages is enabled): `https://manoranjan2050.github.io/JSRstudio/`

---

## Tech Stack

Pure static site — **no backend, no build step**:

- HTML5
- CSS3 (custom, no framework)
- Vanilla JavaScript (ES6+)
- [Google Fonts](https://fonts.google.com/) (Playfair Display + Inter)
- [Font Awesome](https://fontawesome.com/) (icon CDN)

Works directly on **GitHub Pages**, any static host, or opened locally.

---

## Folder Structure

```
JSRstudio/
├── index.html              Main (and only) page
├── css/style.css           All styling
├── js/
│   ├── config.js           Studio info, contact, social links, stats — EDIT THIS FIRST
│   ├── gallery.js          Loads data/portfolio.json, renders gallery + lightbox
│   └── app.js               Header, mobile nav, animations, counters, testimonials
├── data/portfolio.json     Gallery + featured photo list — EDIT TO ADD PHOTOS
├── images/
│   ├── hero/                Hero background
│   ├── wedding/  prewedding/  events/  birthday/  portraits/  other/
│   └── about/                About-section photo
├── assets/logo/             Favicon / logo
└── docs: CONFIG.md, ARCHITECTURE.md, DEPLOYMENT.md, CHANGELOG.md, TODO.md
```

## Documentation

| File | Purpose |
|---|---|
| [CONFIG.md](CONFIG.md) | How to edit studio info, contact details, social links, colors, stats |
| [ARCHITECTURE.md](ARCHITECTURE.md) | How the site is structured and how the pieces fit together |
| [DEPLOYMENT.md](DEPLOYMENT.md) | GitHub Pages setup, custom domain setup |
| [CHANGELOG.md](CHANGELOG.md) | Version history |
| [TODO.md](TODO.md) | Outstanding tasks / future ideas |

---

## Quick Start (local preview)

No build step is required — just serve the folder statically (opening
`index.html` directly with `file://` will mostly work, but `fetch()` for
`data/portfolio.json` requires a local server in most browsers):

```bash
# Python
python -m http.server 8080

# or Node
npx serve .
```

Then open `http://localhost:8080`.

---

## Placeholder Photography — IMPORTANT

All images currently in `images/` are **generated placeholder graphics**
(blue-gradient SVGs with labels), not real photographs. No copyrighted or
downloaded images are included in this repository.

**Before going live, replace every placeholder with real JSR Studio photos.**
See "[How to add new photos](CONFIG.md#how-to-add-new-photos)" in CONFIG.md.

---

## Editing Cheat Sheet

| I want to... | Edit this file |
|---|---|
| Change phone / address / WhatsApp / social links / stats | `js/config.js` |
| Add, remove or reorder gallery photos | `data/portfolio.json` |
| Change colors | `css/style.css` (`:root` variables at the top) |
| Change page text/sections | `index.html` |
| Add a new portfolio category | See [CONFIG.md](CONFIG.md#how-to-add-a-new-portfolio-category) |

Full details for each of these are in [CONFIG.md](CONFIG.md).

---

## Deployment

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for full GitHub Pages and custom
domain instructions.

---

## License / Usage

This code was built specifically for JSR Studio. Only publish photographs
that JSR Studio has the right to display publicly.
