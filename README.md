# World Clock

A clean, dependency-free world clock that runs entirely in the browser.

- Asia/Taipei, UTC, New York, London and Tokyo by default
- Add any IANA time zone (with autocomplete) and remove cards with ✕
- Correct DST and half-hour offsets via the built-in `Intl` API
- 12/24-hour toggle; your choices are saved in `localStorage`
- Plain HTML + JavaScript, no build step

## Run locally
Open `index.html` in a browser, or:
```bash
python3 -m http.server 8000
```

## Deploy to GitHub Pages
Settings → Pages → Deploy from branch → `main` / root.

## Tests
```bash
npm test
```

## License
MIT
