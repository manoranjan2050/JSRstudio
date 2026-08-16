# DEPLOYMENT.md — GitHub Pages Setup for JSR Studio

Repository: **https://github.com/manoranjan2050/JSRstudio**

---

## 1. First-Time Deployment

The repository just needs the contents of this folder pushed to the
`main` branch — no build step.

```bash
git init
git remote add origin https://github.com/manoranjan2050/JSRstudio.git
git add .
git commit -m "Initial commit: JSR Studio photography website"
git branch -M main
git push -u origin main
```

## 2. Enable GitHub Pages

1. Go to the repository on GitHub: `https://github.com/manoranjan2050/JSRstudio`
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Build and deployment** → **Source**, choose **Deploy from a
   branch**.
4. Under **Branch**, select **`main`** and folder **`/ (root)`**.
5. Click **Save**.
6. Wait 1–2 minutes. Your site will be live at:

   ```
   https://manoranjan2050.github.io/JSRstudio/
   ```

GitHub shows the live URL at the top of the Pages settings page once the
first deployment finishes.

## 3. Updating the Live Site

Any push to `main` redeploys automatically:

```bash
git add .
git commit -m "Update portfolio photos"
git push
```

Changes are usually live within 1–2 minutes.

## 4. Custom Domain Setup (optional)

If JSR Studio buys a domain (e.g. `jsrstudio.in`):

1. In your domain registrar's DNS settings, add:
   - For an apex domain (`jsrstudio.in`): four **A** records pointing to
     GitHub Pages' IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - For a subdomain (`www.jsrstudio.in`): a **CNAME** record pointing to
     `manoranjan2050.github.io`.
2. In the repo, go to **Settings → Pages → Custom domain**, enter the
   domain, and save. GitHub creates a `CNAME` file in the repo root
   automatically — do not delete it.
3. Wait for DNS to propagate (can take a few hours), then enable
   **Enforce HTTPS** in the same settings panel once the certificate is
   issued.
4. Update `js/config.js`? Not required — the config has no hard-coded
   domain. Just update `og:url` / `canonical` meta tags and the JSON-LD in
   `index.html` if you want them to reflect the new domain exactly (they
   currently point at the `github.io` URL).

## 5. Verifying the Deployment

After enabling Pages, check:

- [ ] Site loads at the GitHub Pages URL with no 404
- [ ] All images load (placeholders will show blue gradient graphics until
      replaced — see [CONFIG.md](CONFIG.md#how-to-add-new-photos))
  - [ ] Mobile menu opens/closes correctly
  - [ ] Portfolio filters and lightbox work
  - [ ] `tel:` and `wa.me` links work on a phone
  - [ ] No horizontal scrolling on mobile widths (320px–428px)
  - [ ] On Chrome for Android, an install prompt/banner appears (or the
        header's "Install App" button becomes visible) — confirms the PWA
        manifest + service worker registered correctly over HTTPS
  - [ ] On iOS Safari, **Share → Add to Home Screen** shows the JSR Studio
        icon and name correctly
  - [ ] The contact QR code in the Contact section scans and offers to save
        JSR Studio as a contact

## Notes

- This site uses **relative paths only** (`images/...`, `css/...`, `js/...`)
  — it works correctly whether hosted at a domain root or under a
  GitHub Pages project path like `/JSRstudio/`. No path changes are needed
  when switching between `github.io/JSRstudio/` and a custom domain.
- No environment variables, secrets, or server config are required —
  this is a fully static site.
