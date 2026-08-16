/**
 * JSR Studio — Service Worker
 * Minimal offline support + installability. Precaches the app shell,
 * runtime-caches everything else (gallery images, fonts, icons) with a
 * cache-first strategy so repeat visits and offline use are fast.
 *
 * Bump CACHE_VERSION whenever core files change so old caches are dropped.
 */

const CACHE_VERSION = "jsr-studio-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/config.js",
  "./js/gallery.js",
  "./js/app.js",
  "./data/portfolio.json",
  "./manifest.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Only handle same-origin GET requests; let everything else (Google
  // Fonts, Font Awesome CDN, Tailwind CDN, cross-origin) pass through
  // untouched so third-party caching/CORS behaviour is unaffected.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
