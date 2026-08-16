# TODO — JSR Studio Website

## Before Going Live

- [ ] **Replace all demo photos with real JSR Studio photography.** Every
      photo slot (hero, about, service cards, gallery, featured) currently
      hotlinks a temporary [Lorem Picsum](https://picsum.photos) demo image
      — real photos used only as visual placeholders, not stored in this
      repo. Swap each `https://picsum.photos/...` URL for a real local file
      per [CONFIG.md — How to Add New Photos](CONFIG.md#how-to-add-new-photos)
      and the [Photo Size Guide](README.md#photo-size-guide). The original
      SVG gradient placeholders are still in `images/` if you want a
      "coming soon" look instead of demo photos in the meantime.
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
- [x] Custom domain live: `https://jsrstudio.in/` — `og:url`/`canonical`
      updated to match.
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
