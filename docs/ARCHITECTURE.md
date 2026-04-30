# Architecture Document
**Project:** Nocturnal Codex

This document provides an in-depth, component-by-component breakdown of the Nocturnal Codex application. It is designed to act as a definitive guide to how the system is engineered, with a specific focus on the complex interactive Roadmap engine.

---

## 1. Global Application Architecture

Nocturnal Codex utilizes a layered architecture based on the Next.js App Router. The flow of data strictly follows a unidirectional pattern to ensure security and performance:

1.  **Data Source Layer**: 
    *   `src/content/`: Local Markdown files for Programming Languages.
    *   `public/roadmap-content/`: Local JSON files containing React Flow graph coordinates and data.
    *   `Contentful CMS`: Remote GraphQL API for Blog and Think Tank articles.
2.  **Library/Utility Layer (`src/lib/`)**: Responsible for fetching and parsing data. 
    *   `languages.ts` uses `fs.readFileSync` and `gray-matter` to parse markdown.
    *   `contentful.ts` manages the Contentful client and API calls.
3.  **Server Component Layer (`src/app/`)**: The routing layer. Pages here are Next.js Server Components. They securely call functions in `src/lib/` directly on the server, ensuring credentials never leak to the browser.
4.  **Client Component Layer (`src/components/`)**: The presentation layer. If components require DOM manipulation, React hooks (`useState`, `useEffect`), or user events (`onClick`), they are marked with `'use client'`.

---

## 2. Roadmap Sub-system Architecture

The interactive developer roadmaps are built using `@xyflow/react` (React Flow). However, the library is configured to act as a **read-only infographic rendering engine** rather than a drag-and-drop diagram builder.

### 2.1 Core Engine: `EditorRoadmapRenderer.tsx`

Located in `src/components/EditorRoadmap/EditorRoadmapRenderer.tsx`, this file is the heart of the application. 

#### Code Explanation & Lifecycle:
1. **State Management**: It initializes state for `roadmapData`, `loading`, `error`, `drawerOpen`, and `selectedNode`.
2. **Data Fetching**: A `useEffect` hook makes a client-side `fetch()` call to `/roadmap-content/[roadmapId].json`. This JSON contains strict arrays of `nodes` (with exact X/Y coordinates) and `edges`.
3. **Node Dictionary**: The engine maps string types from the JSON to actual React Components:
   ```typescript
   const nodeTypes = {
     topic: TopicNode,
     section: SectionNode,
     subtopic: SubtopicNode,
     // ...
   };
   ```
4. **Canvas Configuration**: The `<ReactFlow>` component is instantiated with aggressive restrictions to make it feel like a static webpage rather than a canvas:
   ```tsx
   <ReactFlow
     nodes={roadmapData.nodes}
     edges={roadmapData.edges}
     zoomOnScroll={false}       // Prevents zooming when scrolling the page
     panOnDrag={false}          // Prevents dragging the canvas
     nodesDraggable={false}     // Locks nodes in place
     elementsSelectable={true}  // Allows clicking
   >
   ```
5. **Event Handling**: The `onNodeClick` function intercepts clicks. If a node is a `topic`, it extracts the attached `data.resources` payload, sets it to `selectedNode`, and opens the `RoadmapDrawer`.

---

## 3. Detailed Component Breakdown (`src/components/Roadmaps/`)

This directory contains the granular building blocks that React Flow uses to draw the graph. The project uses a distinct "Neo-Brutalist" design language across these components.

### 3.1 Node Components

#### `TopicNode.tsx`
This is the primary interactive element on the roadmap.
*   **Code Explanation**: It accepts `data` and `selected` props from React Flow.
*   **Styling**: It implements neo-brutalism using pure CSS in JS:
    ```tsx
    style={{
      background: '#FEF015', // Bright yellow
      border: '2px solid #000', // Thick borders
      boxShadow: selected ? '0 0 0 2px #3b82f6' : '4px 4px 0px #000', // Hard drop-shadow
      transition: 'transform 0.15s ease',
    }}
    ```
*   **Status Badges**: It dynamically renders a colored circular badge (e.g., green for "Alternative", purple for "Recommended") based on the `data.status` property.
*   **Handles**: It explicitly defines 4 invisible `<Handle>` components (Top, Bottom, Left, Right) with `style={{ opacity: 0 }} isConnectable={false}`. These tell React Flow where lines can connect, without letting the user draw new lines.

#### `SectionNode.tsx`
Used for massive, non-interactive grouping text (e.g., "Frontend Basics").
*   **Code Explanation**: Unlike `TopicNode`, this component strips away all backgrounds and borders. Crucially, it uses `pointerEvents: 'none'` and `userSelect: 'none'` so it cannot be clicked or highlighted, acting purely as background typography.

### 3.2 Edge Components

#### `RoadmapEdge.tsx`
This component dictates how the lines connecting the nodes are drawn.
*   **Code Explanation**: It uses React Flow's `getSmoothStepPath` utility. This forces all lines to draw at strict 90-degree angles with slightly rounded corners (`borderRadius: 10`), rather than bezier curves.
*   **Styling**: Returns a `<BaseEdge>` with a hardcoded blue stroke (`stroke: '#3B82F6'`) and a `strokeWidth` of 2.

### 3.3 The UI Overlay

#### `RoadmapDrawer.tsx`
This is the side-panel that slides in when a `TopicNode` is clicked.
*   **Code Explanation**: It is built on top of Shadcn's `<Sheet>` component (which wraps Radix UI's Dialog primitive).
*   **Props**: It receives `open`, `onOpenChange`, and `data` (of type `SelectedNodeData`).
*   **Rendering**: 
    1. It renders the node's `label` and `description` in the header.
    2. It maps over the `data.resources` array. For each resource, it generates an `<a>` tag wrapped in a stylized card, complete with an `ExternalLink` icon and hover animations (`group-hover:scale-110`).
    3. If `resources` is empty, it displays a fallback empty state.
