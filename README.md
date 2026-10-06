# psm.observer

Personal portfolio site for Parker — plain HTML/CSS/JS, no build step.

## Files

- `index.html` — single-page layout
- `style.css` — dark security-researcher theme
- `script.js` — smooth scroll + scroll reveal
- `robots.txt`, `favicon.svg`

## Local preview

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to Cloudflare Pages

1. Push this directory to a GitHub repo.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repo. Build settings:
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/` (or the repo root, e.g. `.`)
4. Deploy. Pages will serve the static files directly.
5. Custom domain: **Custom domains → Set up a domain** → enter `psm.observer` and follow the DNS instructions.

## Customize

- Replace project placeholders in `index.html` (`#projects`).
- Drop your resume PDF in the repo and update the Resume link.
- Update the contact email in `index.html` (`#contact`).
