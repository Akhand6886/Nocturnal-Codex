# Software Requirements Specification (SRS)
**Project:** Nocturnal Codex

This document details the functional and technical requirements of the Nocturnal Codex platform, specifically detailing *how* the underlying technologies are utilized to achieve the project's goals.

## 1. System Overview

Nocturnal Codex is a modern web application designed for developers to explore programming languages, theoretical concepts, and structured learning roadmaps. It prioritizes a fast, static-first architecture combined with dynamic client-side rendering for complex interactive elements.

## 2. Technology Stack & Usage

### 2.1 Next.js 15 (App Router)
The foundation of the application is Next.js using the App Router (`src/app`).
- **Server Components (RSC)**: The default component type. Used extensively for data fetching. For example, `src/app/languages/page.tsx` fetches local markdown files directly on the server, avoiding client-side waterfalls.
- **Client Components**: Designated by the `'use client'` directive. Used where browser APIs or interactivity are required, such as `EditorRoadmapRenderer.tsx` which needs `useState` and DOM manipulation for React Flow.
- **Routing**: File-system based routing. Dynamic routes like `/languages/[slug]/[topicSlug]` handle deeply nested content dynamically mapping to files in `src/content/`.

### 2.2 UI and Styling
- **Tailwind CSS**: Used for all styling via utility classes, ensuring a small CSS bundle and rapid iteration. The configuration (`tailwind.config.ts`) extends the default theme to include custom colors and fonts (e.g., the `.roadmap-font` utility).
- **Shadcn/UI & Radix UI**: Provides accessible, unstyled, headless UI components (like Drawers, Modals, Accordions) which are then styled with Tailwind. This is crucial for maintaining a cohesive design system without being locked into a rigid component library.

### 2.3 React Flow (`@xyflow/react`)
React Flow is the engine powering the interactive developer roadmaps. 

**How it is used:**
Unlike typical diagramming tools where users build graphs, Nocturnal Codex uses React Flow strictly as a **read-only rendering engine**.
- **Static Configuration**: In `EditorRoadmapRenderer.tsx`, interactions like panning, zooming, and node dragging are explicitly disabled (`zoomOnScroll={false}`, `panOnDrag={false}`, `nodesDraggable={false}`). This transforms the node-edge graph into a static-feeling, highly stylized infographic.
- **Custom Nodes**: The platform does not use default React Flow nodes. It defines a dictionary of custom node types (`nodeTypes = { topic: TopicNode, section: SectionNode, ... }`). These custom nodes are standard React components tailored to look like sleek UI cards.
- **Auto-Fitting**: The `FitViewUpdater` custom hook ensures that when the roadmap loads, the graph automatically scales to fit the user's viewport perfectly, regardless of the device size.
- **Interaction**: While the graph layout is locked, the nodes themselves are interactive. Clicking a specific node (e.g., a `topic`) triggers the `onNodeClick` handler, which opens a `RoadmapDrawer` containing detailed resources.

### 2.4 Content Management Strategy
The platform utilizes a hybrid approach to content management:
1.  **Local Markdown (`gray-matter`)**: Used for highly structured, developer-focused content (Languages curriculum). Markdown files located in `src/content/languages/` are parsed by the `gray-matter` library during the Next.js build step or server request. This separates the metadata (Frontmatter: title, slug, description) from the body content.
2.  **Local JSON**: Used for roadmap graph structures. React Flow requires exact X/Y coordinates and strict node/edge relationship arrays. This is too complex for Markdown, so `public/roadmap-content/*.json` files hold this specific data.
3.  **Contentful CMS**: Used for unstructured or frequently updated content like the Blog and Think Tank articles, allowing non-technical editors to publish without touching the codebase.

## 3. Functional Requirements

- **Roadmap Visualization**: The system must render complex dependency graphs (roadmaps) natively in the DOM, avoiding static images, to allow for text selection, accessibility, and interactive clicks.
- **Responsive Design**: The React Flow canvas must automatically center and scale to fit mobile screens without breaking the node layout.
- **Content Pre-rendering**: All language and topic pages must be pre-rendered on the server to ensure maximum SEO performance.

## 4. Performance Constraints

- **Client Bundle Size**: Heavy libraries like `@xyflow/react` must only be loaded on the `/roadmaps/[roadmapId]` route. They must not bleed into the global application bundle.
- **Static Asset Delivery**: Roadmap JSON files are placed in `public/roadmap-content/` so they can be fetched efficiently by the client side via standard HTTP requests without going through a complex API layer.
