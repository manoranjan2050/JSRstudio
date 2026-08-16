# CONFIG.md — Editing JSR Studio's Website

Everything editable lives in a small number of files. You do **not** need to
touch `index.html` for routine content updates like photos, phone number, or
social links.

---

## How to Change Studio Information

Open **`js/config.js`**. This single file drives the phone number, WhatsApp
link, address, Google Maps link, and stats shown across the whole site
(header, hero, contact section, footer, floating WhatsApp button).

```javascript
const studioConfig = {
  name: "JSR Studio",
  phone: "+919777111281",
  whatsapp: "https://wa.me/919777111281",
  address: { line1: "...", line2: "...", ... },
  maps: "https://maps.google.com/?q=...",
  social: { instagram: "", facebook: "", ... },
  stats: [ { value: 100, suffix: "+", label: "Events Captured" }, ... ],
};
```

Change a value, save, and refresh — the phone/WhatsApp links, contact card,
and footer all update automatically via `js/app.js`.

> Note: the physical address, phone number and studio name also appear as
> static text in `index.html` (contact section, footer, JSON-LD structured
> data) for SEO reasons search engines read address text directly from the
> HTML. If you change the studio's address permanently, update both
> `js/config.js` **and** the address text in `index.html`.

---

## How to Change Social Media Links

In `js/config.js`, fill in any handle you have:

```javascript
social: {
  instagram: "https://www.instagram.com/jsr_studio_dengapol/",
  facebook: "",
  youtube: "",
  twitter: "",
  googleBusiness: "",
  whatsapp: "https://wa.me/919777111281",
},
```

**Only filled-in links are shown.** Empty strings (`""`) are automatically
hidden in the hero, contact section, and footer — no HTML editing needed.
As soon as you add a URL and refresh, the icon appears everywhere
automatically.

---

## How to Add New Photos

1. Drop your photo file into the matching folder under `images/`:
   - `images/wedding/`
   - `images/prewedding/`
   - `images/events/`
   - `images/birthday/`
   - `images/portraits/`
   - `images/other/`

   Use `.webp` (preferred, smallest file size) or `.jpg`. Keep filenames
   simple, e.g. `04.webp`.

2. Open **`data/portfolio.json`** and add an entry to the `"gallery"` array:

   ```json
   { "image": "images/wedding/04.webp", "title": "Reception Night", "category": "wedding" }
   ```

   `category` must be one of: `wedding`, `prewedding`, `events`, `birthday`,
   `portraits`, `other` — these match the filter tabs.

3. Save — the gallery, masonry layout, and lightbox rebuild themselves from
   this file. No other code changes needed.

### Featured Work (homepage highlight strip)

Edit the `"featured"` array in the same file (recommended: 3–5 items):

```json
{
  "image": "images/wedding/featured-01.webp",
  "category": "Wedding",
  "title": "Wedding Stories",
  "filter": "wedding"
}
```

`filter` controls which portfolio category the visitor jumps to when they
click the card.

### Hero Image

Replace `images/hero/hero.svg` with your real photo, e.g. `hero.webp`, then
update the two references in `index.html`:

- `<link rel="preload" as="image" href="images/hero/hero.svg" />`
- `<img src="images/hero/hero.svg" ... />` in the `.hero-media` block

### About Section Photo

Replace `images/about/studio.svg` and update the `<img>` in the About
section of `index.html`.

---

## How to Add a New Portfolio Category

1. Add a filter button in `index.html` inside `#filterTabs`:
   ```html
   <button class="filter-btn" data-filter="corporate" role="tab" aria-selected="false">Corporate</button>
   ```
2. Add the human-readable label in `js/gallery.js` at the top:
   ```javascript
   const CATEGORY_LABELS = { ..., corporate: "Corporate" };
   ```
3. Add photos to `data/portfolio.json` with `"category": "corporate"`.
4. (Optional) Create an `images/corporate/` folder to keep files organized.

---

## How to Change Colors

Open `css/style.css` and edit the CSS variables at the very top of the file
(`:root { ... }`):

```css
:root {
  --color-primary: #5dade2;      /* Light Sky Blue */
  --color-primary-dark: #3f8fc9;
  --color-light-blue: #eaf6ff;
  --color-very-light-blue: #f6fbff;
  --color-purple: #9b7ede;        /* Light purple accent */
  --color-purple-dark: #7c5cc7;
  --color-purple-light: #f3eeff;
  --color-navy: #12304a;          /* headings / dark text */
  --color-gray: #64748b;          /* body text */
}
```

Every button, gradient, badge, and accent color across the site references
these variables — changing them here updates the whole site consistently.
The blue→purple gradient used on buttons, icon badges, and dark section
backgrounds is `--gradient-accent`, also defined at the top of
`css/style.css`.

### Tailwind CSS

The site loads Tailwind via CDN (`<script src="https://cdn.tailwindcss.com">`
in `index.html`) with `preflight` disabled, so it only adds utility classes
— it never resets or overrides the custom design system in
`css/style.css`. It currently powers the animated gradient "blob" shapes
(hero, about, services, contact sections) and a couple of responsive
utility touches. Two custom colors are registered in the inline
`tailwind.config` script in `index.html`'s `<head>`: `skyblue` and
`lavender` — keep these in sync with the CSS variables above if you change
the palette.

> The CDN build shows a console warning about not being for production use
> — this is expected and harmless for a static, no-build-step site like
> this one. If you later add a build step, switch to the Tailwind CLI or
> PostCSS plugin per the [Tailwind docs](https://tailwindcss.com/docs/installation).

---

## How to Edit Testimonials

Testimonials are sample/placeholder content (clearly labeled as such on the
site). Edit the `.testimonial-card` blocks inside the Testimonials section
of `index.html` with real client quotes, names, and event types once
available.

## How to Update Statistics

Edit the `stats` array in `js/config.js`. Numbers animate automatically when
the visitor scrolls to the Statistics section — no extra code changes
needed.

## How to Update Google Maps Link

1. Open Google Maps, search for the studio (or the address), click **Share**
   → **Copy link**.
2. Paste it as the `maps` value in `js/config.js`.

The website intentionally does **not** embed a heavy interactive map — it
uses a lightweight "Open in Google Maps" button for performance.

---

## How to Edit the Digital Service Centre List

The 12 services (Xerox, Photo, Video Shooting, Video Editing, Mobile
Recharge, Mobile Accessories, Cash Withdrawal, Lamination, Internet, Bill
Payments, Bike Insurance, Gift Items) are plain list items in `index.html`
inside the `<ul class="service-chip-list">` block within the "Digital
Service Centre" service card. Add, remove, or rename `<li>` entries there —
they wrap automatically. The same information is echoed briefly in the
About section paragraph and the footer's Services list; update those too if
the service list changes meaningfully.

---

## PWA — Installable on Mobile

The site is a installable Progressive Web App:

- **`manifest.webmanifest`** — app name, colors, and icons. Edit `name`,
  `short_name`, `theme_color`, or `background_color` here.
- **`sw.js`** — the service worker that caches the app shell for offline
  use and repeat-visit speed. If you add new core files (not gallery
  photos — those cache automatically on first view), add them to the
  `APP_SHELL` array and bump `CACHE_VERSION` so returning visitors get the
  update.
- **Icons** — `assets/icons/icon-192.png`, `icon-512.png`, and their
  `-maskable-` variants, plus `assets/icons/apple-touch-icon.png`. These
  were generated from a Python/Pillow script; if you redesign the logo,
  regenerate matching icons at the same sizes and file names so the
  manifest keeps working.
- An **"Install App"** button appears automatically in the header (and
  mobile menu) once the visitor's browser reports the site as installable
  (Chrome/Edge on Android and desktop). iOS Safari doesn't support this
  prompt — users there install via **Share → Add to Home Screen**, which
  works automatically thanks to the `apple-touch-icon` and
  `apple-mobile-web-app-*` meta tags in `index.html`.

## Logo

The logo mark (favicon, header, and footer) is
`assets/logo/favicon.svg` — a single gradient-and-camera-ring SVG used
everywhere via `<img>`, so editing that one file updates the logo
site-wide. `assets/logo/logo-mark-preview.png` is a larger PNG preview of
the same design for sharing outside the website (e.g. social profiles).

## Contact QR Code

`assets/qr/contact-qr.png` is a QR code encoding JSR Studio's contact info
as a vCard — scanning it on a phone offers to save the contact directly (no
app or internet lookup needed). It's shown in the Contact section. If the
phone number or address changes, regenerate it with the `qrcode` Python
package encoding the same vCard fields used in `js/config.js`, then replace
the file at the same path.
