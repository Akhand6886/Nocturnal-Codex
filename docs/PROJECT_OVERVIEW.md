
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
├── content/          # Contains local markdown files for content.
│   └── languages/    # Markdown files for each programming language.
├── public/           # Static assets like images and fonts.
│   └── roadmap-content/ # JSON files that define the structure of developer roadmaps.
├── src/
│   ├── app/          # The core of the Next.js App Router. Each folder represents a URL route.
│   │   ├── blog/       # Contains pages for listing and displaying blog posts.
│   │   ├── roadmaps/   # Contains pages for listing and displaying roadmaps.
│   │   ├── ... (other routes)
│   │   ├── globals.css # Global styles and Tailwind CSS theme variables.
│   │   └── layout.tsx  # The root layout for the entire application.
│   ├── components/     # Reusable React components, organized by function.
│   │   ├── content/    # Components specifically for displaying content (e.g., BlogPostCard).
│   │   ├── forms/      # Form components (e.g., ContactForm).
│   │   ├── layout/     # Major layout components (Navbar, Footer, Breadcrumbs).
│   │   └── ui/         # Core UI elements from ShadCN (Button, Card, etc.).
│   ├── lib/            # Utility functions, data sources, and API clients.
│   │   ├── contentful.ts # Functions for fetching blog and think tank data from Contentful.
│   │   ├── languages.ts  # Functions for reading language data from local markdown.
│   │   ├── data.ts       # Mock data for site navigation.
│   │   └── utils.ts      # General utility functions (e.g., cn for classnames).
│   └── types/          # TypeScript type definitions (e.g., BlogPost, ThinkTankArticle).
└── next.config.ts    # Configuration for Next.js, including image remote patterns.
```

## 3. Data Structures and Component Architecture

The application's architecture is designed around a clear data flow: **Data Source -> Library -> Page -> Component**.

### Data Structures

The core data models are defined in `src/types/index.ts` to ensure type safety.

-   **`BlogPost`**: Represents a single blog post.
    ```typescript
    interface BlogPost {
      id: string;
      slug: string;
      title: string;
      date: string;
      shortDescription: string;
      content: Document; // From Contentful's rich-text-types
      featuredImage: ContentfulImage | null;
      author: string;
      tags: string[];
      category: string;
      featured: boolean;
      url: string;
    }
    ```
-   **`ThinkTankArticle`**: Represents a research article.
    ```typescript
    interface ThinkTankArticle {
      id: string;
      slug: string;
      title: string;
      date: string;
      abstract: Document;
      content: Document;
      featuredImage: ContentfulImage | null;
      authors: string[];
      tags: string[];
      url: string;
    }
    ```
-   **`Language`**: Represents a programming language.
    ```typescript
    interface Language {
      id: string;
      name: string;
      slug: string;
      description: string;
      iconName: string;
      content: string; // Markdown content
      url: string;
    }
    ```
-   **`Roadmap`**: The roadmap data is split into two parts:
    1.  **Metadata**: An object containing `title`, `description`, `category`, `difficulty`, etc. This is currently hardcoded in the page components but will be migrated to a more robust system.
    2.  **Graph Data**: An object with `nodes` and `edges` arrays, conforming to the `@xyflow/react` library's structure. This is stored in JSON files.

### Component Structure and Data Flow

1.  **Data Fetching Layer (`src/lib`)**: This layer is responsible for abstracting the data sources.
    -   `lib/contentful.ts` fetches data from the Contentful API.
    -   `lib/languages.ts` reads and parses markdown files from the `content/` directory.

2.  **Page Layer (`src/app/**/page.tsx`)**: These are server components that orchestrate data fetching and UI composition.
    -   They call the functions from the `lib` directory (e.g., `await fetchBlogPosts()`).
    -   They pass the fetched data as props to presentation components.
    -   **Example (`/blog/page.tsx`)**: Fetches an array of `BlogPost` objects and maps over them, rendering a `BlogPostCard` for each.

3.  **Presentation Component Layer (`src/components`)**: These components are responsible for rendering the UI based on the props they receive. They are generally "dumb" and don't fetch data themselves.
    -   `components/content/BlogPostCard.tsx`: Receives a single `post` object and renders the title, image, and description in a `<Card>`.
    -   `components/contentful/RichTextRenderer.tsx`: Receives a Contentful `Document` and renders it into styled HTML.
    -   `components/EditorRoadmap/EditorRoadmapRenderer.tsx`: A client component responsible for fetching the roadmap JSON and rendering the interactive graph using `@xyflow/react`.

This layered architecture creates a clean separation of concerns, making the application easier to test, maintain, and scale.

## 4. Routing

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
-   `/contact`: `src/app/contact/page.tsx`

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
