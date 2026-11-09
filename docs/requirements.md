# Requirements Document — Nocturnal Codex

**Document Status:** Approved / Baseline  
**Project Name:** Nocturnal Codex (`nocturnal-codex`)  
**Website Type:** Educational Engineering Platform / Technical Knowledge Base & Learning HUD  
**Framework & Stack:** Next.js 15 (App Router, Turbopack), React 18, TypeScript 5, Tailwind CSS, Radix UI / Shadcn, React Flow (`@xyflow/react`), Contentful CMS  

---

## 1. Executive Summary & Purpose

Nocturnal Codex is an educational platform and digital sanctuary designed for software engineers, systems hackers, computer science theorists, and builders. It bridges deep theoretical foundations (mathematics, language internals, systems architecture) with practical execution (interactive learning roadmaps, curated open-source projects, and technical research articles).

### Target Audience
- **Self-Directed Learners & Engineers:** Developers seeking structured, authoritative learning paths through modern technologies.
- **Computer Science Theorists & Hackers:** Technologists diving into low-level systems, programming language design, discrete mathematics, and AI/ML foundations.
- **Open-Source Contributors:** Developers seeking curated entry points into production-grade open-source repositories.

---

## 2. Information Architecture & Required Pages

| Route | Page Name | Primary Purpose | Rendering Strategy |
| :--- | :--- | :--- | :--- |
| `/` | **Home / Hub** | Visual gateway, featured roadmaps, random theory drops, featured languages, and blog teasers. | Static (ISR: 60s) |
| `/roadmaps` | **Roadmaps Index** | Catalog of interactive learning pathways across engineering domains. | Static (ISR: 1h) |
| `/roadmaps/[roadmapId]` | **Interactive Roadmap HUD** | React Flow canvas rendering interactive pathways with deep-dive side drawer. | Static (ISR: 1h) + Client Canvas |
| `/roadmaps/[roadmapId]/[topicId]` | **Topic Deep Dive** | Semantic, detailed syllabus for individual roadmap nodes. | Static (SSG: 1h) |
| `/languages` | **Languages Index** | Directory of 22+ programming language curricula. | Static (ISR: 1h) |
| `/languages/[slug]` | **Language Overview** | Detailed introduction, syntax cheat-sheets, and module syllabus. | Static (SSG: 1h) |
| `/languages/[slug]/[topicSlug]` | **Curriculum Lesson** | Deep-dive markdown lesson with syntax-highlighted code and navigation. | Static (SSG: 1h) |
| `/mathematics` | **Mathematics Index** | Directory of mathematical foundations (Linear Algebra, Calculus, Graph Theory). | Static (ISR: 1h) |
| `/mathematics/[slug]` | **Domain Overview** | Topic breakdown for specific mathematics discipline. | Static (SSG: 1h) |
| `/mathematics/[slug]/[topicSlug]`| **Math Topic Lesson** | KaTeX/math-formatted lessons covering theorems, proofs, and AI applications. | Static (SSG: 1h) |
| `/projects` | **Open-Source Projects** | Curated beginner/intermediate repositories per language with issue trackers. | Static (SSG: 1h) |
| `/blog` | **Technical Blog Index** | Articles fetched dynamically from Contentful Headless CMS. | Static (ISR: 60s, graceful fallback) |
| `/blog/[slug]` | **Blog Post Page** | Rich-text rendered article with author metadata and tag taxonomy. | Static (ISR: 60s, graceful fallback) |
| `/think-tank` | **Think Tank Index** | Theoretical research papers and opinionated architectural essays. | Static (ISR: 60s, graceful fallback) |
| `/think-tank/[slug]` | **Research Article** | Academic-grade layout with abstract, citations, and rich content. | Static (ISR: 60s, graceful fallback) |
| `/about` | **About & Philosophy** | Platform mission, manifesto, and technological transparency. | Static (ISR: 60s) |
| `/contact` | **Contact & Inquiries** | Validated inquiry form with feedback states and security boundaries. | Static (ISR: 60s) |
| `/tags`, `/categories` | **Taxonomy Indexes** | Cross-linked content discovery by concept or tech domain. | Static (ISR: 60s) |

---

## 3. Core Features & Functional Requirements

### 3.1 Interactive Roadmap HUD (`@xyflow/react`)
- **Visual Graph Rendering:** Render node-edge dependency trees using custom Neo-Brutalist nodes (`TopicNode`, `SectionNode`, `SubtopicNode`, `BlueNode`, `InfoNode`).
- **Interaction Constraints:** Fixed canvas layout (`zoomOnScroll={false}`, `panOnDrag={false}`, `nodesDraggable={false}`) to preserve infographic hierarchy while retaining interactive node selection.
- **Resource Drawer:** Clicking a node opens a slide-out drawer (`RoadmapDrawer`) populated with descriptions, prerequisite checklists, code snippets, and external links.
- **Dual SEO & Accessibility Rendering:** Server-rendered hidden semantic tree (`sr-only`) ensures search engine crawlers index complete syllabus hierarchies without running client JavaScript.

### 3.2 Hybrid Content Engine
- **Markdown-Driven Curricula:** Over 500+ structured markdown files for Languages and Mathematics parsed using `gray-matter` and `remark` pipeline.
- **Decoupled Headless CMS:** Contentful integration for dynamic blog and think-tank publications with zero-crash fallback during offline or missing-credential builds.
- **Syntax Highlighting & Formatting:** Accessible code syntax highlighting with dark/light theme awareness and copy-to-clipboard functionality.

### 3.3 Theme System & Responsive Layout
- **Dual Theme Support:** Custom Warm-Beige Canvas for daylight focus, Pure OLED Pitch Black for nocturnal reading sessions.
- **Mobile-Responsive Navigation:** Sheet drawer for mobile viewports, sticky blur-backed header on desktop, full keyboard navigation with visible focus rings.

---

## 4. Non-Functional & Technical Constraints

1. **Build Reliability:** Zero build errors, zero TypeScript errors (`tsc --noEmit`), full static page generation across 635+ pre-rendered pages.
2. **Graceful Degradation:** When Contentful API credentials are not supplied, the platform builds successfully using empty fallback states without throwing unhandled exceptions.
3. **Accessibility (WCAG 2.1 AA):** All interactive buttons and links must provide visible `:focus-visible` outlines, semantic ARIA labels, and appropriate color contrast ratios.
4. **Performance:** Under 100ms initial DOM paint via server-rendered HTML; lazy load heavy canvas dependencies only on active roadmap routes.
5. **No Destructive Operations:** Existing curricula, assets, and route structures must remain preserved and non-breaking.

---

## 5. Measurable Acceptance Criteria

| ID | Category | Criterion | Verification Method |
| :--- | :--- | :--- | :--- |
| **AC-01** | Type Safety | Zero TypeScript compilation errors in strict mode. | `npm run typecheck` exits 0. |
| **AC-02** | Static Generation | All dynamic routes pre-render without unhandled promise rejections. | `npm run build` exits 0 with 635+ static routes. |
| **AC-03** | SEO Completeness | Valid `robots.txt` and `sitemap.xml` dynamically generated at root. | Verified via `/robots.txt` and `/sitemap.xml`. |
| **AC-04** | Responsive Design | Clean layout rendering across Mobile (375px), Tablet (768px), and Desktop (1280px+). | Viewport inspection. |
| **AC-05** | CMS Fallback | Build passes cleanly when Contentful env vars are missing. | Verified via CI build step without `.env`. |
| **AC-06** | Canvas Interactivity | Clicking any roadmap topic node reliably triggers the drawer with valid metadata. | Manual / E2E verification. |

