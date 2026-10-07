# AGENTS.md

Context for AI assistants (and future me) working on this repo.

## What this is

Personal website of **Parker McEachern** — cybersecurity-focused CS student at Tennessee Tech (Cybersecurity concentration, expected May 2029), CompTIA Network+, red team focus, Proxmox home lab. Live at **https://parkermceachern.dev** (also www → apex 301).

## Architecture

- **Hosting**: Cloudflare Workers with static assets. No build step, plain HTML/CSS/JS.
- **Deploy flow**: `git push` to `master` (github.com/psmmastap/parkermceachern.dev) → Cloudflare Workers build runs `npx wrangler deploy` → live in ~1 min. Never deploy manually unless asked.
- **`wrangler.jsonc`**: custom domains `parkermceachern.dev` + `www.parkermceachern.dev` (`workers_dev: false`, so no *.workers.dev URL), assets from `public/`, `not_found_handling: "404-page"`.
- **`worker.js`**: tiny fetch handler — redirects `www.parkermceachern.dev` → apex, otherwise serves assets (`run_worker_first: true`).
- **Assets root is `public/`** — only that directory is deployed. Root-level files (README, wrangler.jsonc, worker.js, AGENTS.md) are never served.

## Page structure

- `/` — hub: hero (typed name, circular avatar), about, projects, page links
- `/experience/` — cyber activities + work history (from resume)
- `/resume/` — `wget resume.pdf` CTA + inline **PDF.js** viewer (`pdf-view.js`, pinned pdfjs-dist@4.10.38 from jsdelivr, same-origin fetch of `../resume.pdf`)
- `/blog/` — placeholder, posts will live at `/blog/<post-name>/`
- `/contact/` — GitHub (psmmastap), LinkedIn, email
- `/resources/` — `ls -la`-style TOC linking to sections: Offensive/, Defensive/, omarchy/, Online_Resources/
- `/404.html` — terminal "command not found" page (echoes requested path)

## Design decisions (do not casually undo)

- **Terminal/console aesthetic**: monospace throughout, prompt kickers (`parker@parkermceachern.dev:~$`), shell-style nav verbs (`cd`, `cat`, `ls`, `ping`), `# section` comment headings.
- **Minimal gradient**: the blue→purple gradient (`--grad` in style.css) exists ONLY in the hero avatar ring. Everything else is solid muted slate/blue. All glows removed.
- Avatar: circular, gradient ring, 160px hero / none in nav (removed by owner's choice). Source photo: `~/Downloads/aura_pic.jpeg`, processed crop → `public/profile.webp` (subject framed upper-right of crop).
- Owner's resume: `~/Downloads/resume/Updated_Resume_Fall_2026.pdf` (also copied to `public/resume.pdf`). Contains real PII — fine to serve, don't redistribute elsewhere.

## Conventions / gotchas

- **Relative asset paths** in all pages (`../style.css` from subpages) so local previews work. Exception: `404.html` uses root-absolute paths because it's served at arbitrary depths.
- Do **not** move assets back to repo root — `wrangler dev` watching the root caused an infinite reload loop; `public/` fixed it.
- `.assetsignore` in `public/` exists as belt-and-suspenders; root `.git`/secrets must never be deployable (an early deploy once leaked `.git/` — fixed).
- Never commit secrets/API tokens. Anything committed is permanently public (repo is public).
- Local preview: `npx wrangler dev` (port 8787), NOT a static file server — wrangler exercises the real 404/trailing-slash behavior.
- Campus DNS (tntech.edu) negative-caches new DNS records up to 30 min; "site not resolving" right after adding domains is usually that, not a deploy problem.

## Decisions made (don't relitigate without asking)

- Site stays on **Cloudflare**, not self-hosted on the Proxmox server (availability for a portfolio site beats the learning value; the owner has a home lab already).
- If home-hosting services later: use **cloudflared tunnel**, never open router ports.
- Card-based layout was tried and rejected; terminal layout is the keeper.
- Domain: **parkermceachern.dev** (owned, on Cloudflare). Previously `psm.observer` — migrated Oct 2026 (repo, worker, and domain all renamed).
