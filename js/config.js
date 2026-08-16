/**
 * ============================================================
 * JSR Studio — Central Configuration
 * ============================================================
 * Edit THIS file to update studio info, contact details,
 * social links and Google Maps URL across the ENTIRE website.
 * No other file needs to be touched for these changes.
 * ============================================================
 */

const studioConfig = {
  name: "JSR Studio",
  tagline: "Capturing Moments • Creating Memories",

  phone: "+919777111281",
  phoneDisplay: "+91 97771 11281",

  whatsapp: "https://wa.me/919777111281",
  whatsappMessage: "Hi JSR Studio, I'd like to know more about your photography services.",

  email: "", // add studio email here when available

  address: {
    line1: "DENGAPOL BAZAR",
    line2: "Balikuda",
    line3: "Jagatsinghpur",
    state: "Odisha",
    pincode: "754108",
    country: "India",
  },

  // Replace with the real Google Maps share link for the studio.
  // Get it from Google Maps -> Share -> Copy link.
  maps: "https://maps.google.com/?q=Balikuda,Jagatsinghpur,Odisha,754108",

  // Only fill in the links you actually have — empty values are
  // automatically hidden across the site (header, contact, footer, hero).
  social: {
    instagram: "https://www.instagram.com/jsr_studio_dengapol/",
    facebook: "",
    youtube: "",
    twitter: "",
    googleBusiness: "",
    whatsapp: "https://wa.me/919777111281",
  },

  // Editable statistics — replace placeholder numbers with real ones.
  // "suffix" is appended after the counted number (e.g. "+").
  stats: [
    { value: 100, suffix: "+", label: "Events Captured" }, // PLACEHOLDER — update with real count
    { value: 5000, suffix: "+", label: "Moments Captured" }, // PLACEHOLDER — update with real count
    { value: 100, suffix: "+", label: "Happy Clients" }, // PLACEHOLDER — update with real count
    { value: 5, suffix: "+", label: "Years of Experience" }, // PLACEHOLDER — update with real count
  ],
};

// Expose globally for app.js / gallery.js (no build step / bundler used)
window.studioConfig = studioConfig;
