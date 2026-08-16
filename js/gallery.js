/**
 * ============================================================
 * JSR Studio — Gallery / Portfolio / Lightbox
 * Loads data/portfolio.json, renders the masonry grid, featured
 * grid, filter tabs, and drives the lightbox viewer.
 * ============================================================
 */

(function () {
  "use strict";

  const CATEGORY_LABELS = {
    wedding: "Wedding",
    prewedding: "Pre-Wedding",
    events: "Events",
    birthday: "Birthday",
    portraits: "Portrait",
    other: "Other",
  };

  const masonryGrid = document.getElementById("masonryGrid");
  const featuredGrid = document.getElementById("featuredGrid");
  const filterTabs = document.getElementById("filterTabs");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  let portfolioItems = [];
  let filteredItems = [];
  let currentIndex = 0;
  let lastFocusedEl = null;

  function createMasonryItem(item, index) {
    const el = document.createElement("div");
    el.className = "masonry-item";
    el.style.animationDelay = (index % 8) * 0.06 + "s";
    el.setAttribute("data-category", item.category);
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.setAttribute("aria-label", "Open photo: " + item.title);

    el.innerHTML =
      '<img src="' + item.image + '" alt="' + item.title + '" loading="lazy" />' +
      '<div class="masonry-overlay">' +
      '<span class="zoom-icon" aria-hidden="true"><i class="fa-solid fa-expand"></i></span>' +
      '<div class="masonry-overlay-text">' +
      '<div class="cat">' + (CATEGORY_LABELS[item.category] || item.category) + "</div>" +
      '<div class="title">' + item.title + "</div>" +
      "</div></div>";

    const openHandler = () => openLightbox(filteredItems.indexOf(item));
    el.addEventListener("click", openHandler);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openHandler();
      }
    });

    return el;
  }

  function renderMasonry(filter) {
    filteredItems =
      filter === "all" ? portfolioItems.slice() : portfolioItems.filter((i) => i.category === filter);

    masonryGrid.innerHTML = "";
    const fragment = document.createDocumentFragment();
    filteredItems.forEach((item, index) => fragment.appendChild(createMasonryItem(item, index)));
    masonryGrid.appendChild(fragment);
  }

  function renderFeatured(featured) {
    if (!featuredGrid) return;
    featuredGrid.innerHTML = "";
    featured.forEach((item) => {
      const card = document.createElement("div");
      card.className = "featured-card";
      card.setAttribute("data-aos", "zoom-in");
      card.innerHTML =
        '<img src="' + item.image + '" alt="' + item.title + ' — ' + item.category + '" loading="lazy" />' +
        '<div class="featured-overlay">' +
        '<span class="cat">' + item.category + "</span>" +
        "<h3>" + item.title + "</h3>" +
        '<span class="view-link">View Gallery <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></span>' +
        "</div>";
      card.addEventListener("click", () => setFilter(item.filter));
      featuredGrid.appendChild(card);
    });
  }

  function setFilter(filter) {
    const btn = filterTabs.querySelector('[data-filter="' + filter + '"]');
    if (btn) btn.click();
    document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });
  }

  // Delegate clicks on any element with data-filter (service links, footer links)
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-filter]");
    if (!target || target.closest("#filterTabs")) return;
    if (target.tagName === "A") e.preventDefault();
    setFilter(target.getAttribute("data-filter"));
  });

  if (filterTabs) {
    filterTabs.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterTabs.querySelectorAll(".filter-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderMasonry(btn.getAttribute("data-filter"));
    });
  }

  // ---------- Lightbox ----------
  function openLightbox(index) {
    if (index < 0 || index >= filteredItems.length) return;
    currentIndex = index;
    lastFocusedEl = document.activeElement;
    updateLightbox();
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    lightboxClose.focus();
    document.addEventListener("keydown", handleKeydown);
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleKeydown);
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  function updateLightbox() {
    const item = filteredItems[currentIndex];
    if (!item) return;
    lightboxImage.src = item.image;
    lightboxImage.alt = item.title;
    lightboxCaption.textContent = item.title + " — " + (CATEGORY_LABELS[item.category] || item.category);
    lightboxCounter.textContent = currentIndex + 1 + " / " + filteredItems.length;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    updateLightbox();
  }

  function handleKeydown(e) {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxNext.addEventListener("click", showNext);
  lightboxPrev.addEventListener("click", showPrev);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Swipe support
  let touchStartX = 0;
  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );
  lightbox.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) < 40) return;
      dx < 0 ? showNext() : showPrev();
    },
    { passive: true }
  );

  // ---------- Load data ----------
  fetch("data/portfolio.json")
    .then((res) => res.json())
    .then((data) => {
      portfolioItems = data.gallery || [];
      renderMasonry("all");
      renderFeatured(data.featured || []);
      if (window.initScrollAnimations) window.initScrollAnimations();
    })
    .catch((err) => {
      console.error("Could not load portfolio data:", err);
      masonryGrid.innerHTML = '<p style="color:#64748B">Unable to load portfolio right now.</p>';
    });
})();
