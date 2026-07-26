# The System: Python Ascension Protocol

A fully static Next.js learning experience built around eleven Python dungeon
gates. The public site has two routes only:

- `/` — Ascension Protocol learning HUD
- `/admin` — browser-local telemetry dashboard

The project includes its technical guides in `docs/`, the dungeon data in
`src/lib/dungeons.ts`, Python curriculum notes in `src/content/languages/python/`,
and soundtrack assets in `public/music/`.

## GitHub Pages

The workflow at `.github/workflows/deploy-pages.yml` creates a static export in
`out/` and deploys it to GitHub Pages. No server, API route, CMS, or database is
required. Hunter progress, guilds, and telemetry are browser-local demo data.

Set GitHub Pages to use **GitHub Actions**, then push to `master`.
