# AiFyn website

React (Vite) site + a small Cloudflare Worker API, hosted on Cloudflare Workers.

Live: https://web.aifyn.in (also https://aifyn.kartik-kinbox.workers.dev)

```
src/            React app (pages, components, data/*.js = editable site content)
public/         favicon, posters/ (images), videos/ (drop .mp4 files here — see src/config/media.js)
worker/index.js API: POST /api/leads, /api/admin/* (lead desk at /admin)
migrations/     D1 (SQLite) schema for leads
wrangler.jsonc  Cloudflare config
```

## Develop

```bash
npm install
npm run db:migrate:local
npm run preview          # builds + serves site and API at http://localhost:8787
```

Local admin password lives in `.dev.vars` (`ADMIN_PASSWORD=...`).

## Deploy

```bash
npm run deploy           # build + upload to Cloudflare
```

- Admin password (production): `npx wrangler secret put ADMIN_PASSWORD`
- New DB migration: add `migrations/000N_*.sql`, then `npm run db:migrate`
- Custom domain: Cloudflare dashboard → Workers → aifyn → Settings → Domains & Routes,
  then set `VITE_SITE_URL` in `.env` to the new domain and redeploy (updates canonical tags, sitemap, robots).
- Demo videos: put files named as in `src/config/media.js` into `public/videos/` and redeploy;
  until then, posters with the animated AI overlay are shown.
