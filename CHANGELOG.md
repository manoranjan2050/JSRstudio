# Changelog

All notable changes to the JSR Studio website are documented in this file.

## [1.2.0] — 2026-08-16

### Added
- **Installable PWA**: `manifest.webmanifest`, a service worker (`sw.js`)
  for offline/repeat-visit caching, generated app icons (192/512, plus
  maskable variants) and iOS meta tags. An "Install App" button appears in
  the header/mobile nav automatically once the browser reports the site is
  installable.
- **New logo mark**: a designed camera-ring + sparkle icon (blue→purple
  gradient) replacing the plain icon-font badge, used as the favicon and
  header/footer logo (`assets/logo/favicon.svg`).
- **Digital Service Centre section**: a dedicated, wider service card
  listing all 12 real services (Xerox, Photo, Video Shooting, Video
  Editing, Mobile Recharge, Mobile Accessories, Cash Withdrawal,
  Lamination, Internet, Bill Payments, Bike Insurance, Gift Items),
  plus matching mentions in the About text and footer.
- **Contact QR code**: a vCard QR code in the Contact section
  (`assets/qr/contact-qr.png`) that lets visitors scan-to-save JSR
  Studio's contact details directly on their phone. Verified to decode
  correctly.
- `assets/docs/photo-size-guide.png` — a shareable reference sheet listing
  every photo file's recommended pixel/inch/cm size, for briefing a
  photographer.

## [1.1.0] — 2026-08-16

### Added
- Light-purple (lavender) accent mixed into the sky-blue palette across
  buttons, icon badges, dark sections, filter tabs, and section labels for
  a more colorful, premium look.
- Tailwind CSS via CDN (preflight disabled so it never conflicts with the
  hand-built design system in `css/style.css`) — used for the animated
  gradient blobs and a couple of utility touches.
- Animated decorative gradient blobs (Tailwind `animate-blob` keyframes) in
  the hero, about, services, and contact sections; hidden on small screens
  to keep mobile clean and fast.
- Animated gradient text on the hero headline, a shimmer sweep on primary
  buttons, and a soft glow pulse on icon badges. All respect
  `prefers-reduced-motion`.

## [1.0.0] — 2026-08-16

### Added
- Initial build of the full premium photography portfolio website:
  header/nav with mobile hamburger menu, hero, about, services, portfolio
  (masonry gallery + filters + lightbox), featured work, why-choose-us,
  animated statistics, testimonials carousel, call-to-action, contact
  section, footer, and floating WhatsApp button.
- Central configuration (`js/config.js`) for studio info, contact details,
  social links, and stats.
- Data-driven portfolio (`data/portfolio.json`) for easy photo management
  without touching HTML.
- SEO: meta description, Open Graph, Twitter Card, canonical URL,
  `PhotographyBusiness` JSON-LD structured data.
- Accessibility: semantic HTML, keyboard-navigable lightbox, ARIA labels,
  visible focus states, `prefers-reduced-motion` support.
- Placeholder SVG imagery for hero, gallery, and featured sections (no
  copyrighted/downloaded images included).
- Documentation: README, CONFIG, ARCHITECTURE, DEPLOYMENT guides.
- Instagram link added: `https://www.instagram.com/jsr_studio_dengapol/`.
