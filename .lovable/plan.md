## Goal
Redirect `/ads.txt` on `sizemybag.com` to Ezoic's Ads.txt Manager URL: `https://srv.adstxtmanager.com/19390/sizemybag.com`.

## Context
- `sizemybag.com` is served by **Netlify** (confirmed earlier via response headers).
- Netlify honors `public/_redirects`, including 301s to external URLs and the `!` force flag (which lets the rule win over an existing static file of the same name).
- Current `public/_redirects` only has the SPA catch-all.
- Current `public/ads.txt` is a static file with a single Google AdSense line — it will be superseded by the redirect.

## Changes

### 1. `public/_redirects`
Add the Ezoic redirect **before** the SPA catch-all:

```
/ads.txt  https://srv.adstxtmanager.com/19390/sizemybag.com  301!
/*        /index.html                                        200
```

Order matters (Netlify processes top-to-bottom). `301!` forces the redirect even though `ads.txt` exists as a static asset.

### 2. `public/ads.txt`
Delete the file so there's a single source of truth (Ezoic's manager). Not strictly required because of `301!`, but avoids future confusion.

## Verification (after Netlify redeploys)
```
curl -I https://sizemybag.com/ads.txt
```
Expect `HTTP/2 301` with `location: https://srv.adstxtmanager.com/19390/sizemybag.com`. Following it should return Ezoic's managed ads.txt contents.

## Notes
- This only takes effect once Netlify rebuilds from the repo. If Netlify is wired to your Lovable GitHub repo, pushing these changes triggers it automatically. If Netlify deploys from a different source, the same two edits need to land in that source.
- The Lovable preview (`luggagechecker.lovable.app`) does not process `_redirects` — the redirect only works on the Netlify-hosted `sizemybag.com`. That's fine; Ezoic only cares about the canonical domain.
