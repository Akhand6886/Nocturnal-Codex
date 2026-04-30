
# Development Log: Nocturnal Codex

This document chronicles the key development stages, challenges encountered, and architectural decisions made during the creation and refinement of the Nocturnal Codex application.

## Initial State & Core Problem

The project began with a solid foundation using Next.js, TypeScript, and ShadCN components. However, it was plagued by persistent build failures that prevented successful deployment. The root cause was identified as issues related to the `contentlayer` package, which was being used to source content from local markdown files.

The primary goal of the initial development phase was to stabilize the application by systematically removing `contentlayer` and replacing its functionality with more robust, custom solutions.

## Phase 1: Removing Contentlayer and Stabilizing the Build

The `contentlayer` package, while powerful, was introducing complex build-time dependencies and type-related conflicts that made the project brittle.

**Actions Taken:**

1.  **Dependency Removal**: The `contentlayer` and `next-contentlayer` packages were removed from `package.json`.
2.  **Configuration Cleanup**: The `contentlayer.config.ts` file, which defined the data schema for Contentlayer, was deleted.
3.  **Data Fetching Replacement**:
    *   **Languages**: The logic for fetching programming language data was moved into a new `src/lib/languages.ts` file. This file uses Node.js's built-in `fs` module and the `gray-matter` library to read from `content/languages/*.md` directly. This removed the build-time dependency on Contentlayer.
    *   **Roadmaps**: Roadmap content was migrated from markdown files into static JSON files located in `public/roadmap-content/`. This simplified the data structure and made it easier for the client-side roadmap renderer (`@xyflow/react`) to fetch and display the data.

## Phase 2: Resolving Cascading Type Errors

After removing Contentlayer, a series of cascading TypeScript errors emerged. These were subtle and often had misleading error messages, pointing to a deeper issue with how Next.js's App Router handles props and types for dynamic pages.

The most common error was:
`Type '{...}' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]`

This error appeared in multiple dynamic page files (`src/app/blog/[slug]/page.tsx`, `src/app/categories/[categorySlug]/page.tsx`, etc.).

**Investigation & Solution:**

The error misleadingly suggested that the `params` object needed to be a Promise. The actual root cause was a type mismatch between the props expected by the page component, the `generateMetadata` function, and the data returned by `generateStaticParams`.

The definitive solution was to **remove custom `PageProps` interfaces** and use simpler, inline type annotations directly in the function signatures.

**Example Fix (in `src/app/blog/[slug]/page.tsx`):**

*   **Before:**
    ```typescript
    interface PageProps { params: Promise<{ slug: string }> } // Incorrect assumption
    export default async function PostPage({ params }: PageProps) {
        const { slug } = await params;
        // ...
    }
    ```
*   **After:**
    ```typescript
    interface PageProps { params: { slug: string } } // Corrected type
    export default async function PostPage({ params }: PageProps) {
        const { slug } = params; // No await needed
        // ...
    }
    ```

This pattern was applied to all affected dynamic pages, finally stabilizing the build.

## Phase 3: Code Cleanup and File System Consistency

The process of fixing build errors left behind some unused files and inconsistencies.

**Actions Taken:**

1.  **File Casing Error**: A build error `Already included file name ... differs from file name ... only in casing` was resolved. This was caused by two files: `src/components/layout/footer.tsx` and `src/components/Layout/Footer.tsx`. The duplicate with the incorrect casing was deleted, and the import statement in `src/app/layout.tsx` was verified to point to the correct lowercase path. This highlights the importance of maintaining strict file naming conventions in a case-sensitive build environment.
2.  **Sitemap Typing**: The build failed due to an error in `src/app/sitemap.ts`, where the `changeFrequency` property was being inferred as a generic `string` instead of a specific literal type (e.g., 'daily', 'weekly'). This was fixed by adding the explicit `MetadataRoute.Sitemap` type to the arrays being constructed.
3.  **Related Article Typing**: A similar type inference issue was found in `src/app/wiki/[slug]/page.tsx` where a `type` property was inferred as `string` instead of the required `'wiki'` literal. This was fixed by using an `as const` assertion (`type: 'wiki' as const`) to provide TypeScript with the specific type information.
4.  **Typo Correction**: A runtime error was prevented by fixing a typo (`MOCK_WICKI_ARTICLES` -> `MOCK_WIKI_ARTICLES`) in `src/app/wiki/[slug]/page.tsx`.

## Phase 4: Documentation Consolidation

To ensure the project's state was clearly understood after the significant changes, comprehensive documentation was created.

1.  **`PROJECT_OVERVIEW.md`**: This file was created to serve as the primary architectural document. It details the technology stack, the updated project structure, routing, and—most importantly—the new data fetching strategies (Contentful API, static JSON, local mock data).
2.  **`README.md`**: The main README was updated to reflect the removal of `contentlayer` and point to the new data sources, ensuring that anyone cloning the project has an accurate, high-level overview.

This development log stands as a testament to the iterative process of debugging, refactoring, and documenting a modern web application.
