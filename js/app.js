/**
 * ============================================================
 * JSR Studio — Main App Script
 * Header behaviour, mobile nav, config-driven content,
 * scroll animations, stats counter, testimonial carousel.
 * ============================================================
 */

(function () {
  "use strict";

  const config = window.studioConfig || {};

  /* ---------------- Config-driven content ---------------- */

  function socialIconMeta(key) {
    const map = {
      instagram: { icon: "fa-brands fa-instagram", label: "Instagram" },
      facebook: { icon: "fa-brands fa-facebook-f", label: "Facebook" },
      youtube: { icon: "fa-brands fa-youtube", label: "YouTube" },
      twitter: { icon: "fa-brands fa-x-twitter", label: "Twitter / X" },
      googleBusiness: { icon: "fa-brands fa-google", label: "Google Business" },
      whatsapp: { icon: "fa-brands fa-whatsapp", label: "WhatsApp" },
    };
    return map[key] || { icon: "fa-solid fa-link", label: key };
  }

  function renderSocialLinks(container) {
    if (!container || !config.social) return;
    container.innerHTML = "";
    Object.keys(config.social).forEach((key) => {
      const url = config.social[key];
      if (!url) return;
      const meta = socialIconMeta(key);
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", meta.label);
      a.innerHTML = '<i class="' + meta.icon + '" aria-hidden="true"></i>';
      container.appendChild(a);
    });
  }

  ["heroSocial", "contactSocial", "footerSocial"].forEach((id) =>
    renderSocialLinks(document.getElementById(id))
  );

  // Contact + CTA + footer links from config
  const phoneLinks = document.querySelectorAll('a[href^="tel:+919777111281"]');
  const waLinks = document.querySelectorAll('a[href*="wa.me/919777111281"]');
  if (config.phone) {
    phoneLinks.forEach((a) => (a.href = "tel:" + config.phone));
  }
  if (config.whatsapp) {
    const waHref = config.whatsappMessage
      ? config.whatsapp + "?text=" + encodeURIComponent(config.whatsappMessage)
      : config.whatsapp;
    waLinks.forEach((a) => (a.href = waHref));
  }
  const mapsBtn = document.getElementById("contactMaps");
  if (mapsBtn && config.maps) mapsBtn.href = config.maps;

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Header scroll state ---------------- */
  const header = document.getElementById("siteHeader");
  function updateHeaderState() {
    if (window.scrollY > 40) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* ---------------- Mobile nav ---------------- */
  const navToggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");

  function closeMobileNav() {
    navToggle.classList.remove("active");
    mobileNav.classList.remove("active");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", () => {
    const isActive = navToggle.classList.toggle("active");
    mobileNav.classList.toggle("active", isActive);
    navToggle.setAttribute("aria-expanded", String(isActive));
  });

  mobileNav.querySelectorAll(".nav-link, .btn").forEach((link) =>
    link.addEventListener("click", closeMobileNav)
  );

  /* ---------------- Active nav link on scroll ---------------- */
  const sections = ["home", "about", "services", "portfolio", "why-us", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = document.querySelectorAll(".nav-link");

  function setActiveNav(id) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === "#" + id;
      link.classList.toggle("active", isActive);
    });
  }

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveNav(entry.target.id);
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => navObserver.observe(section));

  /* ---------------- Scroll-triggered fade animations ---------------- */
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initScrollAnimations() {
    const items = document.querySelectorAll("[data-aos]:not(.aos-in)");
    if (prefersReducedMotion) {
      items.forEach((el) => el.classList.add("aos-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => observer.observe(el));
  }
  window.initScrollAnimations = initScrollAnimations;
  initScrollAnimations();

  /* ---------------- Stats counter ---------------- */
  const statsGrid = document.getElementById("statsGrid");
  if (statsGrid && Array.isArray(config.stats)) {
    statsGrid.innerHTML = config.stats
      .map(
        (stat, i) =>
          '<div class="stat-item"><div class="stat-number" data-value="' +
          stat.value +
          '" data-suffix="' +
          stat.suffix +
          '">0</div><div class="stat-label">' +
          stat.label +
          "</div></div>"
      )
      .join("");

    const statNumbers = statsGrid.querySelectorAll(".stat-number");
    let counted = false;

    function animateCount(el) {
      const target = parseInt(el.getAttribute("data-value"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      if (prefersReducedMotion) {
        el.textContent = target + suffix;
      } else {
        requestAnimationFrame(tick);
      }
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counted) {
            counted = true;
            statNumbers.forEach(animateCount);
          }
        });
      },
      { threshold: 0.4 }
    );
    statsObserver.observe(statsGrid);
  }

  /* ---------------- Testimonial carousel ---------------- */
  const track = document.getElementById("testimonialTrack");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");

  if (track && prevBtn && nextBtn) {
    function scrollByCard(direction) {
      const card = track.querySelector(".testimonial-card");
      if (!card) return;
      const gap = 24;
      const amount = card.offsetWidth + gap;
      track.scrollBy({ left: direction * amount, behavior: "smooth" });
    }
    prevBtn.addEventListener("click", () => scrollByCard(-1));
    nextBtn.addEventListener("click", () => scrollByCard(1));
  }

  /* ---------------- PWA: service worker + install prompt ---------------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch((err) => {
        console.warn("Service worker registration failed:", err);
      });
    });
  }

  let deferredInstallPrompt = null;
  const installBtns = document.querySelectorAll(".install-app-btn");

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    installBtns.forEach((btn) => (btn.hidden = false));
  });

  installBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      if (!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = null;
      installBtns.forEach((b) => (b.hidden = true));
    });
  });

  window.addEventListener("appinstalled", () => {
    installBtns.forEach((btn) => (btn.hidden = true));
  });
})();
