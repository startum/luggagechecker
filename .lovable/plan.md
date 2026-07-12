# Redirect /ads.txt to Ezoic's Ads.txt Manager

## Context
This is a static Vite SPA hosted on Lovable — there's no Apache, Nginx, PHP, WordPress, or cron available. The site already ships a static `public/ads.txt` and uses `public/_redirects` (Netlify-style) for SPA routing. Lovable's hosting honors `_redirects` rules, including 301s to external URLs, so that's the right hook for the Ezoic "Server Redirects" pattern.

Domain: `sizemybag.com` (from canonical config).

## Changes

### 1. `public/_redirects`
Add a 301 for `/ads.txt` **before** the SPA catch-all so it isn't swallowed:

```
/ads.txt  https://srv.adstxtmanager.com/19390/sizemybag.com  301!
/*        /index.html                                        200
```

The `301!` force flag ensures the redirect wins over the existing static `ads.txt` asset.

### 2. `public/ads.txt`
Delete the static file so there's no confusion about which version is authoritative (the redirect now serves the live Ezoic list). Safe because the redirect takes over `/ads.txt`.

## Verification
After deploy, `curl -I https://sizemybag.com/ads.txt` should return `301` pointing at `srv.adstxtmanager.com/19390/sizemybag.com`, and following the redirect returns Ezoic's managed list.

## Out of scope
- No WordPress plugin (not a WP site).
- No cron/curl automation (no server).
- Preview URL (`*.lovable.app`) will also redirect — Ezoic keys off the manager URL, not the requesting host, so that's fine.
