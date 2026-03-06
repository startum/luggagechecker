

## SEO Audit for SizeMyBag.com

After reviewing the full codebase, here are the issues that could be contributing to your impression drops, ordered by impact:

---

### Critical Issues

**1. Stale Sitemap dates (all showing 2025-09-02)**
Every URL in `sitemap.xml` has `lastmod` set to `2025-09-02` -- over 6 months ago. Google uses lastmod as a signal; stale dates suggest the site hasn't been updated. All dates should be updated to the current date (2026-03-06) and ideally kept current going forward.

**2. Missing `<Helmet>` on 4 pages (no dynamic meta tags)**
These pages rely solely on the `index.html` hardcoded meta tags, meaning they show the homepage title/description in search results:
- **`/` (Index/Homepage)** -- no Helmet at all, relies on index.html defaults
- **`/compare`** -- no Helmet
- **`/article`** (article listing page) -- no Helmet
- **`/privacy-policy`** and **`/terms`** -- no Helmet

The homepage and `/compare` are high-traffic pages that need unique titles and descriptions.

**3. SPA rendering -- no SSR/prerendering for crawlers**
As a React SPA, Google needs to render JavaScript to see content. This is the most likely cause of impression drops. Consider adding a prerendering service (e.g., prerender.io) or at minimum ensuring Google can render the JS. This is an architectural limitation but worth noting.

---

### Medium Issues

**4. Missing canonical tags on several pages**
Pages with Helmet have canonical tags, but `Index`, `Compare`, and `Article` listing pages don't. This can cause duplicate content issues.

**5. Missing `og:image` on most subpages**
Only `index.html` has an og:image. Pages like `/airlines`, `/bag-sizer`, `/results/:id` don't specify one, reducing social sharing appeal and potentially rich result display.

**6. 404 page has no meta tags or `noindex`**
The NotFound page should have `<meta name="robots" content="noindex">` to prevent indexing of 404 pages, and it doesn't use the Layout component.

**7. `window.location.origin` used for canonical URLs**
In `Airlines.tsx`, canonical and og:url use `window.location.origin` which will resolve to the preview/staging URL in dev, not `sizemybag.com`. Should be hardcoded to `https://sizemybag.com`.

---

### Minor Issues

**8. Missing `alt` text optimization**
The hero image alt text is decent but could be more keyword-rich across the site.

**9. No `hreflang` tags**
Not critical if single-language, but noted.

**10. `MeasureBagDimensions.tsx` wraps in an extra `<HelmetProvider>`**
This is redundant since `main.tsx` already provides one. While not breaking, it's unnecessary.

---

### Implementation Plan

1. **Add `<Helmet>` to Index page** with unique title, description, canonical, and og tags
2. **Add `<Helmet>` to Compare page** with unique meta tags
3. **Add `<Helmet>` to Article listing page** with unique meta tags
4. **Add `<Helmet>` to PrivacyPolicy and TermsAndConditions pages** with `noindex` or appropriate meta
5. **Update sitemap.xml** -- change all `lastmod` dates to `2026-03-06`
6. **Fix 404 page** -- add `noindex` meta tag via Helmet, use Layout component
7. **Fix Airlines.tsx** -- replace `window.location.origin` with hardcoded domain
8. **Add `og:image`** fallback to pages missing it
9. **Remove redundant `HelmetProvider`** wrapper in MeasureBagDimensions

