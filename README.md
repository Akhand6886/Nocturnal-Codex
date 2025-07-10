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
-   **Content from Files**: [Contentlayer](https://www.contentlayer.dev/) - A content SDK that validates and transforms content from local files (like Markdown) into type-safe JSON data, making it easy to import into the application.
-   **Deployment**: The project is configured for deployment on platforms that support Next.js, such as Vercel or Firebase Hosting.

## 2. Project Structure

The project follows a standard Next.js App Router structure. Here are the key directories:

```
nocturnal-codex/
├── .contentlayer/    # (Auto-generated) Cache and generated data from Contentlayer.
├── content/          # Source directory for local content (e.g., Markdown tutorials).
│   └── tutorials/
│       └── python/   # Contains Markdown files for Python tutorials.
├── public/           # Static assets like images and fonts.
├── src/
│   ├── app/          # The core of the Next.js App Router.
│   │   ├── (folders)/  # Each folder represents a URL route (e.g., /blog, /topics).
│   │   │   ├── page.tsx      # The main UI for a route.
│   │   │   ├── layout.tsx    # A shared UI layout for a route and its children.
│   │   │   └── loading.tsx   # (Optional) A loading UI for a route.
│   │   ├── globals.css   # Global styles and Tailwind CSS theme variables.
│   │   └── layout.tsx    # The root layout for the entire application.
│   ├── components/     # Reusable React components.
│   │   ├── content/      # Components specifically for displaying content (e.g., BlogPostCard).
│   │   ├── forms/        # Form components (e.g., ContactForm).
│   │   ├── layout/       # Major layout components (Navbar, Footer, Sidebar).
│   │   └── ui/           # Core UI elements from ShadCN (Button, Card, etc.).
│   ├── hooks/          # Custom React hooks (e.g., useToast, useIsMobile).
│   ├── lib/            # Utility functions, data sources, and API clients.
│   │   ├── contentful.ts # Functions for fetching data from Contentful.
│   │   ├── data.ts       # Mock data for topics, wiki articles, and navigation.
│   │   └── utils.ts      # General utility functions (e.g., cn for classnames).
│   └── types/          # TypeScript type definitions (e.g., BlogPost, ThinkTankArticle).
└── contentlayer.config.ts # Configuration file for Contentlayer.
```

## 3. Routing

The application's routing is file-system based, managed by the Next.js App Router.

-   `/` (Home Page): `src/app/page.tsx`
-   `/about`: `src/app/about/page.tsx`
-   `/blog`: `src/app/blog/page.tsx` (Lists all blog posts)
-   `/blog/[slug]`: `src/app/blog/[slug]/page.tsx` (Displays a single blog post)
-   `/think-tank`: `src/app/think-tank/page.tsx` (Lists all think tank articles)
-   `/think-tank/[slug]`: `src/app/think-tank/[slug]/page.tsx` (Displays a single article)
-   `/topics`: `src/app/topics/page.tsx` (Lists all high-level topics)
-   `/topics/[topicSlug]`: `src/app/topics/[topicSlug]/page.tsx` (Details for a specific topic)
-   `/languages/[languageSlug]`: `src/app/languages/[languageSlug]/page.tsx` (Details for a programming language)
-   `/wiki`: `src/app/wiki/page.tsx` (The main wiki page)
-   `/wiki/[slug]`: `src/app/wiki/[slug]/page.tsx` (A specific wiki article)
-   `/tutorial/[language]`: `src/app/tutorial/[language]/page.tsx` (Index of tutorials for a language)
-   `/tutorial/[language]/[slug]`: `src/app/tutorial/[language]/[slug]/page.tsx` (A specific language tutorial)

## 4. Data Fetching & Content Management

The site uses a hybrid approach for content, sourcing it from a Headless CMS, local Markdown files, and static mock data.

### Contentful API (Blog & Think Tank)

-   **Purpose**: Manages dynamic, long-form content that may be updated frequently by content editors.
-   **Implementation**: The `src/lib/contentful.ts` file contains the logic to connect to the Contentful Delivery API.
    -   `createClient()`: Initializes the Contentful client using environment variables for the Space ID and Access Token.
    -   `fetchBlogPosts()`, `fetchThinkTankArticles()`: These functions query the Contentful API for collections of entries based on their Content Type ID (`blogPost` and `thinkTankArticle`, respectively). They fetch multiple entries, sort them by date, and parse them into a structured format defined in `src/types/index.ts`.
    -   `fetchBlogPostBySlug()`, `fetchThinkTankArticleBySlug()`: These functions fetch a single entry by its unique slug.
    -   `parseBlogPost()`, `parseThinkTankArticle()`: Helper functions that transform the raw API response from Contentful into the application's specific `BlogPost` and `ThinkTankArticle` types, ensuring data consistency.

### Contentlayer (Language Tutorials from Markdown)

-   **Purpose**: Manages content that is version-controlled with the codebase, ideal for technical documentation like programming tutorials. This allows developers to write content in Markdown and leverage Git for history and collaboration.
-   **How it Works**:
    1.  **Schema Definition**: The `contentlayer.config.ts` file defines a schema for a `TutorialPost`. This schema specifies the expected fields in the frontmatter of the Markdown files (like `title`, `slug`, `order`). It also includes a `computedField` to automatically determine the programming language from the file's directory path.
    2.  **Content Creation**: Markdown files are created in subdirectories within `content/tutorials/`. For example, a Python tutorial would go in `content/tutorials/python/`, and a Java tutorial in `content/tutorials/java/`. Each file's YAML frontmatter must match the `TutorialPost` schema.
    3.  **Build Process**: During the build (`next build`), Contentlayer reads all Markdown files under `content/tutorials/`, validates them against the schema, converts the Markdown body to HTML, and generates type-safe JSON data in the `.contentlayer/generated` directory.
    4.  **Usage in App**: This generated data can be directly and safely imported into React components. For example: `import { allTutorialPosts } from 'contentlayer/generated'`. Pages can then filter this array to display tutorials for a specific language.

### Mock Data (Topics, Languages & Wiki)

-   **Purpose**: For foundational site content that is relatively static and integral to the site's structure. This includes the main topics, programming language overviews, and wiki articles. This content could also be migrated to Contentlayer in the future for easier management.
-   **Implementation**: The file `src/lib/data.ts` contains exported arrays of TypeScript objects (e.g., `MOCK_TOPICS`, `MOCK_PROGRAMMING_LANGUAGES`, `MOCK_WIKI_ARTICLES`). This approach is extremely fast and provides full type-safety, but it requires a developer to update the content directly in the code. This is suitable for content that doesn't change often.

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
    -   Add your Contentful credentials to this file:
        ```
        CONTENTFUL_SPACE_ID=your_space_id
        CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This command will first run `contentlayer build` to process the local Markdown files and then start the Next.js development server.

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
