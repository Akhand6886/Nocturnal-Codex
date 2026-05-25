# Nocturnal Codex — Production Readiness Fixes

## Phase 1: Pre-Launch Critical ✅

- [x] Create `src/app/robots.ts` with sitemap reference
- [x] Create `/public/images/og-default.png` (1200×630 branded OG image)
- [x] Create `/public/images/logo.png` (site logo for JSON-LD)
- [x] Replace About page placeholder image with real image
- [x] Replace blog/think-tank card placeholder images with branded defaults
- [x] Fix GitHub footer link → actual repo URL
- [x] Remove SearchAction JSON-LD (no /search route exists)
- [x] Remove `public/admin/` directory (dead Netlify CMS)
- [x] Add autoprefixer to PostCSS config
- [x] Uncomment favicon/icon config in layout.tsx
- [x] Fix email domain in about & contact pages (nocturnalcortex → nocturnalcodex)
- [x] Remove placehold.co from next.config.ts remote patterns
- [x] Clean contact form demo labels
- [x] Fix Organization JSON-LD sameAs with actual GitHub link
- [x] Remove stale placeholder comments from JSON-LD configs

## Phase 2: Code Quality Polish ✅

- [x] Remove demo label from contact form button
- [x] Run production build to verify — **BUILD SUCCESSFUL (505 pages)**

## Phase 3: Deployment (User Action Required)

- [ ] Set `NEXT_PUBLIC_SITE_URL` in Vercel dashboard
- [ ] Set `CONTENTFUL_SPACE_ID` in Vercel dashboard
- [ ] Set `CONTENTFUL_ACCESS_TOKEN` in Vercel dashboard
- [ ] Set `CONTENTFUL_PREVIEW_ACCESS_TOKEN` in Vercel dashboard
- [ ] Set `CONTENTFUL_WEBHOOK_SECRET` in Vercel dashboard
- [ ] Set `CONTENTFUL_PREVIEW_SECRET` in Vercel dashboard
- [ ] Configure Contentful webhook → `https://yourdomain.com/api/revalidate`
- [ ] Set Node.js version to 20 in Vercel project settings
