# parkermceachern.dev

Personal website of Parker McEachern — cybersecurity-focused CS student at Tennessee Tech.
Live at **https://parkermceachern.dev**. Plain HTML/CSS/JS, no build step, hosted on Cloudflare Workers with static assets.

## Pages

| Path | Contents |
|---|---|
| `/` | Hero (typed name, avatar), about, projects, links to all pages |
| `/experience/` | Cybersecurity activities + work history |
| `/resume/` | Inline PDF.js resume viewer + `wget resume.pdf` download |
| `/blog/` | Blog placeholder — posts will live at `/blog/<post-name>/` |
| `/contact/` | GitHub, LinkedIn, email |
| `/resources/` | Security/learning resources with an `ls`-style table of contents |
| any 404 | Terminal-style "command not found" page |

## Structure

- `public/` — everything served as static assets (the site root)
  - `index.html`, `experience/`, `resume/`, `blog/`, `contact/`, `resources/`, `404.html`
  - `style.css` — terminal theme, monospace, dark navy (gradient only in the avatar ring)
  - `script.js` — typing effect (home only), footer year, scroll fade
  - `pdf-view.js` — PDF.js resume viewer (pinned CDN build, only loaded on `/resume/`)
  - `resume.pdf`, `profile.webp`, `favicon.svg`, `robots.txt`
- `worker.js` — redirects `www.parkermceachern.dev` → `parkermceachern.dev`, otherwise serves assets
- `wrangler.jsonc` — Worker config: custom domains, `public/` assets root, 404 handling
- `AGENTS.md` — project context and conventions for AI assistants / future contributors

## Local preview

```sh
npx wrangler dev
# open http://localhost:8787
```

Use `wrangler dev` rather than a static file server — it matches production behavior (trailing-slash redirects, custom 404 page).

## Deploy

Pushing to `master` on GitHub triggers the Cloudflare Workers build (`npx wrangler deploy`); the site is live in about a minute.

Custom domains `parkermceachern.dev` and `www.parkermceachern.dev` are configured in `wrangler.jsonc`; `workers.dev` and preview URLs are disabled.

## Customizing

- **Projects / about text** — `public/index.html`
- **Experience entries** — `public/experience/index.html`
- **Resume** — replace `public/resume.pdf`; the viewer picks it up automatically
- **Resources** — `public/resources/index.html` (add sections + a row in the `ls` TOC linking to the section `id`)
- **Contact links** — `public/contact/index.html`
- **Colors / theme** — CSS custom properties at the top of `public/style.css` (`--bg`, `--accent`, `--grad`, ...)
- **New page** — create `public/<name>/index.html`, copy the header/footer from an existing page, and add a nav link; it's served at `/<name>/` automatically
