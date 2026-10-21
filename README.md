# Workspot demo

A clickable prototype of **Workspot**, a mobile app that helps UZH and ETH students find places to work and study in Zurich: coworking spaces, cafés, libraries and open-air spots.

- Live demo: https://stanislawq.github.io/workspot-demo/
- Clickable prototype on Proto.io: https://pr.to/52IRNX/

Best viewed at phone size (375 × 812) or on a phone. On iPhone: Share, then Add to Home Screen, to run it full screen.

This is a front-end mock-up only, without a backend. Any @uzh.ch or @ethz.ch email (subdomains included), any password and any 6-digit code are accepted, no emails are sent, and nothing is saved on a server. All places, ratings and reviews are fictional.

## What you can try

- Sign in, Create account and Forgot password (UZH and ETH emails only)
- Map with pins, quick filters, the Filters sheet, sorting and the list sheet
- A place in the sheet, the full place page, reviews, Write a review and Edit place
- Weather tab: live Zurich weather from Open-Meteo, the Rain shield and Simulate rain
- Add a place (+), Saved and Profile (Appearance: Light, Dark, System)

## Run locally

There is no build step. Serve the folder with any static web server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Leaflet, the map tiles and the weather need an internet connection.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole app: HTML, CSS and JavaScript in one file |
| `sw.js` | Service worker that caches the app for offline use |
| `manifest.json`, `icons/` | Home screen settings and app icons |
| `media/p/` | Photos of the sample places |
| `data/places_seed.json` | The 17 sample places as JSON, to seed the database of the real app |
| `.github/workflows/pages.yml` | Deploys the demo to GitHub Pages on every push to `main` |

## Credits

Map data © OpenStreetMap contributors, map tiles © CARTO, map library Leaflet. Weather data by Open-Meteo.com (CC BY 4.0). Photos from Unsplash.
