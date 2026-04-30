# Architecture Document
**Project:** Nocturnal Codex

This document provides a deep dive into the structural design of the Nocturnal Codex application, detailing how the components interact and how specific sub-systems, like the interactive roadmaps, are engineered.

## 1. Global Application Architecture

Nocturnal Codex utilizes a layered architecture based on the Next.js App Router paradigm. The flow of data strictly follows a unidirectional pattern:

1.  **Data Source Layer**: Where the raw data lives.
    *   `src/content/`: Local Markdown files for Languages.
    *   `public/roadmap-content/`: Local JSON files for Roadmap graph data.
    *   `Contentful CMS`: Remote API for Blog and Think Tank articles.
2.  **Library/Utility Layer (`src/lib/`)**: Responsible for fetching and parsing data from the Data Source Layer. Files like `languages.ts` and `roadmaps.ts` act as services. They abstract away the complexity of `fs` reads, `gray-matter` parsing, or Contentful API calls.
3.  **Server Component Layer (`src/app/`)**: The routing layer. Pages here are Server Components by default. They call the functions in `src/lib/` directly on the server, ensuring credentials (like Contentful tokens) or filesystem operations (`fs`) never leak to the client.
4.  **Client Component Layer (`src/components/`)**: The presentation layer. These components receive data via props from the Server Components. If they require interactivity (like standard React state or event listeners), they are marked with `'use client'`.

---

## 2. Roadmap Sub-system Architecture

The interactive developer roadmaps are a core feature. They are built using `@xyflow/react` (React Flow), but the implementation is highly customized to serve as a read-only, interactive infographic rather than a diagramming tool.

### 2.1 The Data Structure
Roadmap data is separated into two parts:
- **Metadata**: Title, description, difficulty. This is stored in `src/content/roadmaps/*.md` and parsed by `src/lib/roadmaps.ts`.
- **Graph Data**: The exact nodes, edges, and coordinates. This is stored in `public/roadmap-content/[roadmapId].json`. This file is fetched *client-side* because the graph rendering happens entirely in the browser.

### 2.2 The Rendering Engine (`EditorRoadmapRenderer.tsx`)

Located in `src/components/EditorRoadmap/EditorRoadmapRenderer.tsx`, this is the heart of the roadmap feature.

**Code Walkthrough:**
1.  **Initialization**: The component receives a `roadmapId` prop. It uses standard React `useState` to manage `roadmapData`, `loading`, and `error` states.
2.  **Fetching**: A `useEffect` hook triggers a standard `fetch()` call to `/roadmap-content/[roadmapId].json`.
3.  **Mapping Node Types**: React Flow doesn't know what a "TopicNode" is. We tell it by passing a `nodeTypes` object:
    ```typescript
    const nodeTypes = {
      topic: TopicNode,
      section: SectionNode,
      subtopic: SubtopicNode,
      // ...
    };
    ```
    When React Flow reads the JSON and sees a node with `type: 'topic'`, it renders the `TopicNode` component.
4.  **The `<ReactFlow>` Canvas**: The component returns the main `<ReactFlow>` wrapper. Crucially, props like `panOnDrag={false}` and `zoomOnScroll={false}` are passed to lock the canvas in place.
5.  **Click Handling**: The `onNodeClick` function is passed to React Flow. When a user clicks a node, this function intercepts the event. It reads the specific data attached to that node (e.g., `node.data.resources`) and saves it to the `selectedNode` state.
6.  **The Drawer**: Finally, it flips the `drawerOpen` state to `true`, which slides out the `<RoadmapDrawer>` component, passing the `selectedNode` data into it.

### 2.3 The Component Library (`src/components/Roadmaps/`)

The specific look and feel of the roadmap nodes are defined in `src/components/Roadmaps/`. 

- **`nodes/TopicNode.tsx`**: Represents a major milestone. It's a React component that receives `data` (the node's specific info) from React Flow. It uses Tailwind to style itself as a white card with a subtle shadow and border radius. It also includes the `Handle` components from `@xyflow/react`, which are the invisible "connection points" where the edges attach.
- **`nodes/SectionNode.tsx`**: A larger, distinctively styled node used to group topics (e.g., "Internet Fundamentals").
- **`edges/RoadmapEdge.tsx`**: A custom SVG path renderer. Instead of standard straight lines, we use a custom edge component to draw animated or uniquely colored lines between the nodes.
- **`RoadmapDrawer.tsx`**: A sliding side-panel (built with Shadcn/Radix UI). When it receives `selectedNode` data, it maps over the `resources` array to display links to articles, videos, and tutorials relevant to the clicked node.
