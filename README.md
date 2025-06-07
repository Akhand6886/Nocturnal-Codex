
# Nocturnal Codex

Welcome to Nocturnal Codex, a digital sanctuary for deep dives into computer science, mathematics, and theoretical domains. This project is built for hackers, theorists, builders, and learners.

## Tech Stack

Nocturnal Codex is built with a modern, robust technology stack:

*   **Framework**: [Next.js](https://nextjs.org/) (App Router) - A React framework for production-grade applications, enabling Server Components, ISR, and static site generation.
*   **Language**: [TypeScript](https://www.typescriptlang.org/) - For type safety and improved developer experience.
*   **UI Components**: [ShadCN UI](https://ui.shadcn.com/) - Beautifully designed components that you can copy and paste into your apps.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
*   **Content Management (Blog)**: [Sanity.io](https://www.sanity.io/) - A headless CMS for structured content, used for managing blog posts.
*   **Content Management (Tutorials - Python)**: [Contentlayer](https://www.contentlayer.dev/) - Manages local Markdown files for Python tutorials, converting them into type-safe JSON data. (Note: The `contentlayer build` step in `package.json` uses `|| true` as a workaround for potential CLI errors unrelated to Python tutorial generation.)
*   **AI Integration (Planned)**: [Genkit (Firebase Genkit)](https://firebase.google.com/docs/genkit) - An open-source framework for building AI-powered features. (Note: Genkit setup is present but not actively used in core features yet).
*   **Deployment**: [Vercel](https://vercel.com/) - For seamless deployment, CI/CD, and hosting.

## CMS Usage

The project utilizes a hybrid approach for content management:

### 1. Sanity.io (for Blog Posts)

*   **Purpose**: Manages all blog posts, including titles, slugs, publication dates, authors, excerpts, main images, tags, categories, series information, featured status, and the main body content (Portable Text).
*   **Accessing the Studio**: The Sanity Studio is embedded within this Next.js application and can typically be accessed at `/studio` (e.g., `http://localhost:3000/studio` in development).
*   **Content Model**: The schema for blog posts is defined in `sanity/schemas/post.ts`.
*   **Fetching Content**: The Next.js app fetches blog content from Sanity using the official `next-sanity` client and GROQ queries. See `src/lib/sanity.ts` for client configuration and `src/app/blog/**` for example usage.
*   **Environment Variables for Sanity**:
    *   `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID (e.g., `hxzbjy6y`).
    *   `NEXT_PUBLIC_SANITY_DATASET`: The dataset to use (e.g., `production`).
    *   `NEXT_PUBLIC_SANITY_API_VERSION`: The API version (e.g., `2024-08-20`).
    *   `SANITY_STUDIO_API_READ_TOKEN` (Optional, for more advanced Studio features or secured datasets, managed in Sanity project settings if needed).

### 2. Contentlayer (for Python Tutorials)

*   **Purpose**: Manages Python tutorial content, which is stored as Markdown files in the `content/tutorials/python/` directory.
*   **Content Model**: The schema for `PythonTutorial` is defined in `contentlayer.config.ts`. Contentlayer processes these Markdown files, including frontmatter, into type-safe JSON data accessible within the app.
*   **Fetching Content**: Tutorials are imported directly from `contentlayer/generated`. See `src/app/tutorial/python/**` for usage.
*   **Build Step**: Contentlayer generates the data during the build process (`contentlayer build`). The build command in `package.json` uses `contentlayer build || true` to allow the Next.js build to proceed even if Contentlayer encounters non-critical errors.

## Local Development

1.  **Clone the repository.**
2.  **Install dependencies**: `npm install`
3.  **Set up Environment Variables**:
    *   Create a `.env` file in the project root (a `.env.example` or a default `.env` with placeholders might be provided).
    *   Add your Sanity project details:
        ```env
        NEXT_PUBLIC_SANITY_PROJECT_ID=hxzbjy6y
        NEXT_PUBLIC_SANITY_DATASET=production
        NEXT_PUBLIC_SANITY_API_VERSION=2024-08-20
        # Add other necessary variables
        ```
4.  **Run the development server**: `npm run dev`
    This will start the Next.js app (usually on `http://localhost:3000`) and the Contentlayer build watcher.
5.  **Access Sanity Studio**: Navigate to `http://localhost:3000/studio` to manage blog content. Log in with your Sanity account.

## Deployment

The application is designed for easy deployment on [Vercel](https://vercel.com/).

1.  **Connect GitHub Repository to Vercel**:
    *   Sign up or log in to Vercel.
    *   Create a new project and import your GitHub repository for Nocturnal Codex.
2.  **Configure Build Settings**:
    *   Vercel typically auto-detects Next.js projects.
    *   **Build Command**: `npm run build` (as defined in `package.json`).
    *   **Output Directory**: `.next` (default for Next.js).
    *   **Install Command**: `npm install`.
3.  **Set Environment Variables in Vercel**:
    *   In your Vercel project settings, go to "Environment Variables".
    *   Add the same Sanity variables required for local development:
        *   `NEXT_PUBLIC_SANITY_PROJECT_ID`
        *   `NEXT_PUBLIC_SANITY_DATASET`
        *   `NEXT_PUBLIC_SANITY_API_VERSION`
    *   (Optional but Recommended) `SANITY_WEBHOOK_SECRET`: A secret string for verifying Sanity webhooks if you configure them.
4.  **Set up Sanity Webhook for Rebuilds (Recommended for ISR)**:
    *   **In Vercel**:
        *   Go to your project settings -> Deploy Hooks.
        *   Create a new deploy hook. Give it a name (e.g., "Sanity Content Update").
        *   Copy the generated Vercel deploy hook URL.
    *   **In Sanity Manage Dashboard** ([sanity.io/manage](https://sanity.io/manage)):
        *   Select your project.
        *   Go to API -> Webhooks.
        *   Create a new webhook.
        *   **Name**: e.g., "Vercel Build Trigger"
        *   **URL**: Paste the Vercel deploy hook URL.
        *   **Dataset**: Select the dataset that should trigger builds (e.g., `production`).
        *   **Trigger on**: Choose "Create", "Update", "Delete" for documents of type `post` (or other relevant types).
        *   **Filter** (Optional): You can add a GROQ filter to specify exactly which document changes trigger the hook (e.g., `_type == "post"`).
        *   **Secret** (Optional but Recommended): If you set `SANITY_WEBHOOK_SECRET` in Vercel, enter the same secret here. This helps Vercel verify that the webhook request is genuinely from Sanity.
        *   Save the webhook.
5.  **Push to GitHub**:
    *   Any push to your main branch (or the branch Vercel is configured to deploy from) will automatically trigger a new deployment on Vercel.
    *   When content is published, updated, or deleted in Sanity (and a webhook is configured), it will trigger a Vercel deployment, ensuring your live site reflects the latest content through ISR revalidation.

---

Happy coding and exploring the Nocturnal Codex!
