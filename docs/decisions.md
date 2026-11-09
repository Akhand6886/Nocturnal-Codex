# Architectural Decision Records (ADRs) — Nocturnal Codex

**Project:** Nocturnal Codex  
**Document:** `docs/decisions.md`  

This document logs significant architectural, structural, and design decisions made throughout the lifecycle of the Nocturnal Codex platform.

---

## ADR 001: Selection of Next.js 15 App Router & Turbopack
- **Date:** 2026-05-10
- **Status:** Accepted
- **Context:** The platform requires pre-rendering over 600+ deep-dive technical articles, roadmaps, and curricula while maintaining sub-second initial paint times and zero client-side waterfalls.
- **Decision:** Adopt Next.js 15 with the App Router and Turbopack compiler. Use React Server Components (RSC) by default for data fetching and markdown parsing, reserving Client Components strictly for interactive UI controls.
- **Consequences:** Maximizes SEO indexing, eliminates runtime client waterfalls, and compiles 635 static pages in ~25 seconds.

---

## ADR 002: React Flow as a Read-Only Infographic Engine
- **Date:** 2026-05-15
- **Status:** Accepted
- **Context:** Standard diagramming tools provide free-form drag-and-drop canvases which break responsive layouts and feel disjointed on content websites.
- **Decision:** Configure `@xyflow/react` strictly as a locked, read-only infographic visualizer (`zoomOnScroll={false}`, `panOnDrag={false}`, `nodesDraggable={false}`). Use custom Neo-Brutalist nodes with strict coordinate arrays loaded from static JSON.
- **Consequences:** Users get interactive node selection and resource drawers without the erratic disorientation of panning an unconstrained canvas.

---

## ADR 003: Hybrid SEO Server Pre-Rendering for Roadmaps
- **Date:** 2026-05-18
- **Status:** Accepted
- **Context:** Canvas-based libraries (like React Flow or SVG graphs) are opaque to standard search engine crawlers and screen readers.
- **Decision:** In `/roadmaps/[roadmapId]`, the Server Component pre-reads the JSON canvas file and emits an accessible semantic HTML hierarchy (`<h2>`, `<h3>`, `<ul>`, `<a>`) marked with Tailwind's `sr-only` class directly in the server response. The same JSON is passed as `initialRoadmapData` to the client canvas for instant hydration.
- **Consequences:** 100% crawlable by search engines and screen readers; eliminates client loading spinners.

---

## ADR 004: Decoupled Headless CMS with Graceful Fallback
- **Date:** 2026-06-01
- **Status:** Accepted
- **Context:** Technical articles (Blog and Think Tank) benefit from a headless CMS (Contentful), but local development or CI build environments may lack production API tokens.
- **Decision:** Wrap all Contentful API requests in strict boundary handlers that detect missing credentials and return empty arrays or fallback placeholder responses instead of throwing unhandled build-time exceptions.
- **Consequences:** The application builds reliably and without failure in any environment regardless of whether Contentful secrets are provisioned.

---

## ADR 005: Multi-Tiered Content Management
- **Date:** 2026-06-12
- **Status:** Accepted
- **Context:** Managing hundreds of educational topics across 22+ programming languages in an external CMS creates high latency, rate limits, and fragile version control.
- **Decision:** Split content management into two distinct domains:
  1. **Local Markdown & JSON (`src/content/` & `public/roadmap-content/`):** Version-controlled directly in Git for curriculum and roadmaps.
  2. **Contentful Headless CMS:** Reserved exclusively for editorial and research articles.
- **Consequences:** Curricula benefit from Git review workflows and zero API quotas, while dynamic articles remain editable without code deploys.

---

## ADR 006: Dynamic Sitemap & Search Engine Crawler Indexing
- **Date:** 2026-11-09
- **Status:** Accepted
- **Context:** An outdated legacy configuration hardcoded `['/', '/admin']` in `sitemap.ts`, indexing a non-existent Netlify CMS path while omitting all 600+ static educational pathways, roadmaps, and language curricula.
- **Decision:** Architect a dynamic, build-time sitemap generator in `src/app/sitemap.ts` that queries all data registries (`getAllRoadmaps()`, `getAllLanguages()`, `getAllMathDomains()`) alongside core static pages, outputting prioritized XML urlsets. Configure `src/app/robots.ts` with clean crawl directives.
- **Consequences:** Guarantees 100% crawl coverage for search engines, eliminates 404 indexing errors, and dynamically updates as new markdown curricula are introduced.

---

## ADR 007: Landing Page Curriculum & Open-Source Synthesis
- **Date:** 2026-11-09
- **Status:** Accepted
- **Context:** Visitors arriving at the home landing page lacked immediate discovery pathways to the Mathematics foundations and curated Open Source projects directories.
- **Decision:** Elevate Mathematics Domains and Open Source Projects into prominent feature sections on `src/app/page.tsx`, directly linking theoretical study with practical GitHub repositories and "Good First Issues".
- **Consequences:** Enhances user engagement, clarifies the platform's end-to-end educational journey (Learn -> Understand Theory -> Contribute to Open Source), and maintains consistent visual hierarchy.


