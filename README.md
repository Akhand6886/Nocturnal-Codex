
# Nocturnal Codex: Project Documentation

Welcome to the Nocturnal Codex, a digital sanctuary for deep dives into computer science, mathematics, and theoretical domains. This document provides a comprehensive overview of the project's architecture, technology stack, data management, and core functionalities.

## 1. Technology Stack

This project is built with a modern, server-rendered web stack designed for performance, type safety, and a great developer experience.

-   **Framework**: [Next.js](https://nextjs.org/) (v15) - A React framework for building full-stack web applications with a focus on performance and developer experience. It utilizes the App Router for server components and advanced routing.
-   **Language**: [TypeScript](https://www.typescriptlang.org/) - A statically typed superset of JavaScript that enhances code quality and maintainability.
-   **UI Library**: [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
-   **UI Components**: [ShadCN/UI](https://ui.shadcn.com/) - A collection of beautifully designed, reusable UI components built on top of Radix UI and Tailwind CSS.
-   **Content Management (Headless CMS)**: [Contentful](https://www.contentful.com/) - Used for managing dynamic content like blog posts and think tank articles.
-   **Deployment**: The project is configured for deployment on platforms that support Next.js, such as Vercel or Firebase Hosting.

## 2. Project Structure

The project follows a standard Next.js App Router structure. Here are the key directories:

```
nocturnal-codex/
├── content/          # Markdown files for languages and roadmaps.
│   ├── languages/
│   └── roadmaps/
├── public/           # Static assets like images and fonts.
│   └── roadmap-content/ # JSON files for developer roadmaps.
├── src/
│   ├── app/          # The core of the Next.js App Router.
│   │   ├── (folders)/  # Each folder represents a URL route (e.g., /blog, /roadmaps).
│   │   │   ├── page.tsx      # The main UI for a route.
│   │   │   ├── layout.tsx    # A shared UI layout for a route and its children.
│   │   │   └── loading.tsx   # (Optional) A loading UI for a route.
│   │   ├── globals.css   # Global styles and Tailwind CSS theme variables.
│   │   └── layout.tsx    # The root layout for the entire application.
│   ├── components/     # Reusable React components.
│   │   ├── content/      # Components specifically for displaying content (e.g., BlogPostCard).
│   │   ├── forms/        # Form components (e.g., ContactForm).
│   │   ├── layout/       # Major layout components (Navbar, Footer).
│   │   └── ui/           # Core UI elements from ShadCN (Button, Card, etc.).
│   ├── lib/            # Utility functions, data sources, and API clients.
│   │   ├── contentful.ts # Functions for fetching data from Contentful.
│   │   ├── languages.ts  # Functions for reading language data from markdown.
│   │   ├── roadmaps.ts   # Functions for reading roadmap data from markdown.
│   │   └── utils.ts      # General utility functions (e.g., cn for classnames).
│   └── types/          # TypeScript type definitions (e.g., BlogPost, ThinkTankArticle).
└── next.config.ts    # Configuration for Next.js.
```

## 3. Routing

The application's routing is file-system based, managed by the Next.js App Router.

-   `/` (Home Page): `src/app/page.tsx`
-   `/about`: `src/app/about/page.tsx`
-   `/blog`: `src/app/blog/page.tsx` (Lists all blog posts)
-   `/blog/[slug]`: `src/app/blog/[slug]/page.tsx` (Displays a single blog post)
-   `/think-tank`: `src/app/think-tank/page.tsx` (Lists all think tank articles)
-   `/think-tank/[slug]`: `src/app/think-tank/[slug]/page.tsx` (Displays a single article)
-   `/roadmaps`: `src/app/roadmaps/page.tsx` (Lists all available developer roadmaps)
-   `/roadmaps/[roadmapId]`: `src/app/roadmaps/[roadmapId]/page.tsx` (Displays an interactive roadmap)
-   `/languages`: `src/app/languages/page.tsx` (Lists all programming languages)
-   `/languages/[slug]`: `src/app/languages/[slug]/page.tsx` (Displays a single language)
-   `/contact`: `src/app/contact/page.tsx`

## 4. Data Fetching & Content Management

The site uses a hybrid approach for content, sourcing it from a Headless CMS and local Markdown/JSON files.

### Contentful API (Blog & Think Tank)

-   **Purpose**: Manages dynamic, long-form content that may be updated frequently by content editors. This includes all blog posts and think tank articles.
-   **Implementation**: The `src/lib/contentful.ts` file contains the logic to connect to the Contentful Delivery API.

### Local Markdown Files (Languages & Roadmaps)

-   **Purpose**: Manages the metadata and content for individual programming languages and developer roadmaps. This approach is great for content that is version-controlled alongside the codebase.
-   **Implementation**:
    -   `src/lib/languages.ts` uses Node.js `fs` and the `gray-matter` library to read and parse the markdown files located in the `content/languages/` directory.
    -   `src/lib/roadmaps.ts` uses the same technique for markdown files in `content/roadmaps/`.

### Static JSON (Developer Roadmaps)

-   **Purpose**: Manages the complex, structured data required for the interactive developer roadmaps.
-   **Implementation**: The `EditorRoadmapRenderer` component in `src/components/EditorRoadmap/EditorRoadmapRenderer.tsx` fetches the corresponding JSON file (e.g., `frontend.json`) from the `public/roadmap-content/` directory and renders it using `@xyflow/react`.

## 5. Static Site Generation (SSG) & Incremental Static Regeneration (ISR)

The website is highly optimized for performance by leveraging Next.js's rendering strategies.

-   **Static Generation**: Most pages are pre-rendered into static HTML at build time. This is achieved using the `generateStaticParams()` function in dynamic route pages (e.g., `src/app/blog/[slug]/page.tsx`). This function tells Next.js which pages to pre-build based on the available slugs from the data sources.
-   **Incremental Static Regeneration (ISR)**: To ensure content remains fresh without requiring a full site rebuild, ISR is used. The `export const revalidate = 60;` line in page components tells Next.js to re-generate the page in the background at most once every 60 seconds if a new request comes in. This provides the benefits of static sites (speed, reliability) with the flexibility of dynamic content.

## 6. How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    -   Create a file named `.env` in the root of the project.
    -   Add your Contentful credentials to this file for the blog and think tank to work:
        ```
        CONTENTFUL_SPACE_ID=your_space_id
        CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
