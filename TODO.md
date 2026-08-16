# TODO — JSR Studio Website

## Before Going Live

- [ ] Replace all placeholder SVG images in `images/` with real JSR Studio
      photography (`.webp` preferred). See
      [CONFIG.md — How to Add New Photos](CONFIG.md#how-to-add-new-photos).
- [ ] Replace `images/hero/hero.svg` with a real hero photo and update the
      two references in `index.html`.
- [ ] Replace `images/about/studio.svg` with a real studio/photographer
      photo.
- [ ] Confirm/replace the Google Maps link in `js/config.js` (`maps` field)
      with the exact studio location share link.
- [ ] Replace placeholder statistics in `js/config.js` (`stats` array —
      currently marked `PLACEHOLDER`) with real numbers.
- [ ] Replace sample testimonials in `index.html` with real client reviews
      (currently clearly labeled as sample content).
- [ ] Add remaining social links as they become available: Facebook,
      YouTube, Twitter/X, Google Business — icons appear automatically once
      filled into `js/config.js`.
      - [x] Instagram added: `https://www.instagram.com/jsr_studio_dengapol/`
- [ ] Update `og:url` / `canonical` / JSON-LD URLs in `index.html` if a
      custom domain is set up (see [DEPLOYMENT.md](DEPLOYMENT.md)).
- [ ] Run a Lighthouse audit after real photos are added (large unoptimized
      images are the most likely thing to drop the performance score below
      90 — keep photos compressed and appropriately sized).

## Nice to Have (future)

- [ ] Add a booking/contact form (would require a form backend service
      such as Formspree, since this is a static site with no server).
- [ ] Add a blog / recent-work update section.
- [ ] Add more portfolio categories (e.g. Maternity, Corporate) — see
      [CONFIG.md](CONFIG.md#how-to-add-a-new-portfolio-category).
- [ ] Add a sitemap.xml / robots.txt once the custom domain is finalized.
