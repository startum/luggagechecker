# Fix broken airline logos

## Problem
Airline logo URLs in `airlines_data` point at 3rd-party hosts (wikimedia, logos-world.net, cdnlogo, easyjet.com, britishairways media centre, etc.). Several of these either hotlink-block, 404, or return HTML pages instead of images, which is why some cards render the fallback Unsplash airport photo instead of the real logo.

Rather than hand-fix ~15 URLs (which will rot again), switch to Logo.dev, which serves consistent brand logos by domain.

## Changes

### 1. Connect Logo.dev
Link the Logo.dev connector so `VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY` is available in the frontend.

### 2. Build logo URL from the airline's own domain
In `src/utils/supabaseService.ts`, when mapping DB rows to the `Airline` type:

- Extract the hostname from `record.website_url` (strip protocol, `www.`, and path).
- If a domain is available AND the Logo.dev publishable key is present, set  
  `logo = https://img.logo.dev/{domain}?token={key}&size=200&format=png&fallback=monogram`
- Otherwise fall back to `record.logo_url`, then to the existing Unsplash placeholder.

The existing `onError` handler on `<img>` in `AirlineCard` stays as a last-resort fallback.

### 3. No DB writes
`airlines_data.logo_url` is left untouched; the frontend just derives a better URL at read time. This keeps the fix reversible and doesn't touch policy data.

## Out of scope
- No changes to baggage data or the "last updated" badges.
- The stray `Sample Jet` test row is not removed here — flag it separately if you want it cleaned up.

## Files
- `src/utils/supabaseService.ts` — domain extraction + Logo.dev URL builder
- Connector link (Logo.dev) via the connect tool
