# Quality Assurance & Testing Strategy — Nocturnal Codex

**Project:** Nocturnal Codex  
**Document:** `docs/testing.md`  

This document defines the comprehensive verification matrix, automated test commands, manual testing procedures, and quality standards for Nocturnal Codex.

---

## 1. Automated Verification Commands

| Scope | Command | Purpose | Expected Result |
| :--- | :--- | :--- | :--- |
| **Type Checking** | `npm run typecheck` | Validates TypeScript types across the entire project in strict mode. | Exit code `0`, `0 errors`. |
| **Production Build** | `npm run build` | Compiles application with Turbopack and pre-renders static HTML/RSC. | Exit code `0`, `635/635` static pages generated. |
| **Build Artifact Preview** | `npm run start` | Boots the compiled Next.js standalone server for local verification. | Server listens on `http://localhost:3000`. |

---

## 2. Quality Assurance Checklist (Phase 5)

### 2.1 Build & Syntax Integrity
- [x] TypeScript compiler succeeds with zero diagnostics (`tsc --noEmit`).
- [x] Next.js compilation succeeds with zero unhandled errors.
- [x] No deprecated imports or missing module resolutions.
- [x] No hardcoded production credentials, tokens, or environment-specific private URLs.

### 2.2 Route & Rendering Verification Matrix
- [x] **Home (`/`):** Hero section, gradient typography, featured roadmaps, random theory drops, featured languages render without console warnings.
- [x] **Roadmaps (`/roadmaps`):** All 9 roadmap categories display valid cards with metadata, status badges, and working links.
- [x] **Roadmap HUD (`/roadmaps/[roadmapId]`):** `@xyflow/react` canvas hydrates correctly; hidden SEO tree (`sr-only`) is present in raw HTML; node clicks trigger drawer.
- [x] **Languages (`/languages`):** 22+ languages listed with correct SVG icons and lesson counters.
- [x] **Curriculum Lessons (`/languages/[slug]/[topicSlug]`):** 400+ lesson pages load with markdown syntax highlighting, pagination, and breadcrumbs.
- [x] **Mathematics (`/mathematics`):** Math topics render with proper KaTeX formulas and visual representations.
- [x] **Open Source Projects (`/projects`):** Curated repositories render with difficulty badges, tag pills, GitHub repository links, and issue tracker links.
- [x] **SEO & Metadata:** `/robots.txt` and `/sitemap.xml` dynamically generate and reference correct canonical URLs.

### 2.3 Accessibility (a11y) Verification
- [x] **Keyboard Navigation:** Tab key visits all interactive elements in logical order with visible `:focus-visible` outlines.
- [x] **ARIA Semantics:** Drawers and dialogs manage focus, trap focus when opened, and close on `Esc`.
- [x] **Screen Reader Support:** Canvas nodes mirror content in semantic hidden text (`sr-only`) trees.
- [x] **Color Contrast:** Text meets WCAG 2.1 AA 4.5:1 minimum contrast ratio across both light (parchment) and dark (OLED) themes.

### 2.4 Responsive Layout Verification
- [x] **Mobile (375px - 480px):** Hamburger menu activates sheet navigation; roadmaps scale to fit screen; zero horizontal scrollbar overflow.
- [x] **Tablet (768px - 1024px):** Two-column card grids; responsive navigation controls.
- [x] **Desktop (1280px+):** Full multi-column grids, fixed sidebars, expanded roadmap canvas viewports.

---

## 3. Defect & Regression Protocol

1. **Build Gate:** Any code change that causes `npm run typecheck` or `npm run build` to fail cannot be merged.
2. **Missing CMS Fallback:** Never allow missing Contentful credentials to crash the application during build or runtime.
3. **No Placeholders in Production:** Never silently replace functional components or requested data with fake dummy mocks without clear documentation.

