# psm.observer

Personal portfolio site for Parker — plain HTML/CSS/JS, no build step, deployed to Cloudflare Workers with static assets.

## Structure

- `public/` — everything served as static assets
  - `index.html` — single-page card layout
  - `style.css` — dark blue/purple gradient theme
  - `script.js` — scroll reveal + footer year
  - `resume.pdf` — downloadable resume
  - `robots.txt`, `favicon.svg`
- `worker.js` — redirects `www.psm.observer` → `psm.observer`, serves assets
- `wrangler.jsonc` — Worker config, custom domains, asset serving

## Local preview

```sh
npx wrangler dev
# open http://localhost:8787
```

## Deploy

Push to the GitHub repo connected to the Cloudflare Workers build (deploy command: `npx wrangler deploy`). Custom domains `psm.observer` and `www.psm.observer` are configured in `wrangler.jsonc`.

## Customize

- Projects live in `index.html` (`#projects`).
- Replace `public/resume.pdf` and the resume is served as-is.
- Contact links are in `index.html` (`#contact`).
