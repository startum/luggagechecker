## Remove TinyAdz Script

Remove the single TinyAdz script tag from `index.html` (line 180):

```html
<script src="https://app.tinyadz.com/scripts/ads.js" site-id="683831ead066fb3fdec0e6b1" async></script>
```

No other references to TinyAdz exist in the codebase, so this is the only change needed.

### File to Modify
- `index.html` — delete line 180