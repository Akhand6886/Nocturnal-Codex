# System Execution & Data Flow — Nocturnal Codex

**Project:** Nocturnal Codex  
**Document:** `docs/flow.md`  

This document details the complete end-to-end execution and data flow lifecycles across Nocturnal Codex:
1. Static Site Generation & ISR Build Lifecycle
2. Markdown & Curriculum Content Resolution Flow
3. Interactive Roadmap Hydration & React Flow Lifecycle
4. Contentful Headless CMS Ingestion & Fallback Flow
5. User Navigation & Client-Side Transition Flow

---

## 1. Static Site Generation & ISR Lifecycle

```mermaid
flowchart TD
    A["Next.js Build Process (`npm run build`)"] --> B["Scanning Dynamic Slugs (`generateStaticParams`)"]
    B --> C1["Languages: `src/content/languages/**/*.md`"]
    B --> C2["Mathematics: `src/content/mathematics/**/*.md`"]
    B --> C3["Roadmaps: `src/content/roadmaps/*.md` & `public/roadmap-content/*.json`"]
    B --> C4["Projects: `src/content/projects/**/*.md`"]
    B --> C5["Contentful CMS (if credentials provided)"]

    C1 & C2 & C3 & C4 --> D["Server Pre-rendering HTML & JSON Payloads"]
    C5 -->|Missing Tokens| D_Fallback["Graceful Empty States (`__no-content__`)"]
    C5 -->|Valid Tokens| D

    D --> E["Output: 635 Static HTML/RSC Files"]
    E --> F["Static Delivery via CDN / Edge Runtime"]
```

---

## 2. Markdown Curriculum Content Flow

```mermaid
sequenceDiagram
    participant Client as User / Browser
    participant Server as Next.js Server Component (`/languages/[slug]/[topicSlug]`)
    participant FS as Local File System (`src/content/languages/`)
    participant GrayMatter as `gray-matter` & `remark`
    participant UI as Lesson Presentation Component

    Client->>Server: Request `/languages/python/variables`
    Server->>FS: Read `src/content/languages/python/variables.md`
    FS-->>Server: Raw markdown with YAML frontmatter
    Server->>GrayMatter: Parse frontmatter (title, slug, level) & body
    GrayMatter-->>Server: Structured metadata + parsed markdown string
    Server->>UI: Render Server Component with syntax highlighting
    UI-->>Client: Fully formed semantic HTML response (Zero client waterfall)
```

---

## 3. Interactive Roadmap Hydration & React Flow Engine

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant RSC as Server Page (`/roadmaps/[roadmapId]`)
    participant ClientRenderer as `EditorRoadmapRenderer` (`use client`)
    participant Drawer as `RoadmapDrawer`

    User->>Browser: Navigate to `/roadmaps/frontend`
    Browser->>RSC: GET `/roadmaps/frontend`
    RSC->>RSC: Read `public/roadmap-content/frontend.json` on Server
    RSC->>Browser: Render semantic HTML tree (`sr-only` for SEO) + pass `initialRoadmapData`
    Note over Browser, ClientRenderer: Instant Hydration (No client fetch required)
    Browser->>ClientRenderer: Hydrate `@xyflow/react` canvas with `initialRoadmapData`
    ClientRenderer->>User: Displays Neo-Brutalist infographic nodes

    User->>ClientRenderer: Click Topic Node ("CSS Flexbox")
    ClientRenderer->>Drawer: Open Drawer with `node.data.resources` & code snippet
    Drawer->>User: Slides out resource panel with external guides & tutorial links
```

---

## 4. Contentful Headless CMS & Graceful Fallback Flow

```mermaid
flowchart TD
    Req["Request for Blog / Think Tank"] --> CheckEnv{"CONTENTFUL_SPACE_ID & ACCESS_TOKEN defined?"}
    CheckEnv -- Yes --> API["Fetch Contentful GraphQL / REST API"]
    API -- Success --> RenderContent["Render Rich Text Document & Metadata"]
    API -- Error / Timeout --> CatchError["Log Warning & Render Safe Empty State"]
    CheckEnv -- No --> Fallback["Return Empty Array / Fallback UI without throwing"]
    Fallback --> RenderEmpty["Render 'No Posts Published' / Pre-launch Placeholder"]
```

---

## 5. Contact Form Boundary & User Journey Flow

```mermaid
sequenceDiagram
    participant User
    participant Form as `ContactForm` (Client Component)
    participant Zod as Zod Schema Validation
    participant Toast as Feedback Notification

    User->>Form: Enters Name, Email, Subject, Message
    User->>Form: Clicks "Send Message"
    Form->>Zod: Validate fields against strict schema
    alt Invalid Input
        Zod-->>Form: Return validation errors
        Form-->>User: Display red inline error messages under respective inputs
    else Valid Input
        Form->>Form: Set `isSubmitting = true` (Spinner on Button)
        Form->>Toast: Trigger success toast notification
        Form->>Form: Reset form fields to empty
        Form-->>User: Display "Message sent successfully!"
    end
```

