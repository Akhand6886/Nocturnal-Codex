# **App Name**: Nocturnal Codex

## Core Features:

- **Roadmap System**: Interactive yet static-first learning paths (Frontend, Backend, DevOps, etc.) utilizing a Neo-Brutalist design system. Supports custom node types (Topics, Subtopics, Sections) and rich edge connectors.
- **Topic Navigation**: Topic Explorer: Browse curated content tiles organized by computer science domain.
- **Admin-Blog & Think Tank**: Integrated with Contentful CMS for real-time publishing.
    - **Blog**: Chronological posts with Markdown/Rich-Text support.
    - **Think Tank**: Scholarly research articles supporting Series, Disciplines, Citations, and PDF downloads.
- **Programming Languages**: Offer clean, reference articles for deep-dive language learning.
- **Random Theory Drop**: Each page load displays a randomly selected fun fact or theory.
- **Advanced CMS Pipeline**: On-Demand ISR via Webhooks and Draft Mode for instant content updates and secure previews.

## Style Guidelines:

### Design Language: Neo-Brutalist
- **Core Aesthetic**: High contrast, bold borders (2px black), and sharp drop shadows (4px/2px).
- **Color Palette**:
    - **Background**: Stone-based neutrals (#fafaf9) for content areas; deep desaturated blues (#0A0E14) for core UI.
    - **Primary**: Vibrant Purple (#A78BFA) for accents and branding.
    - **Roadmap Specific**: Bright Yellow (#FEF015) for main topics, Cream (#FEFCE8) for subtopics, and Solid Blue (#3B82F6) for edge connectors.
- **Typography**: Modern sans-serif (Inter/Outfit) paired with high-readability monospaced fonts for code snippets.
- **Layout**: Grid-based topic explorers and a centered 1000px-fixed column for roadmap viewing to ensure "poster-like" visual fidelity.

## Technical Architecture:
- **Framework**: Next.js 15 (App Router) with Turbopack.
- **CMS**: Contentful (Rich Text & Assets).
- **Graph Engine**: React Flow (configured for static-viewing/non-interactive precision).
- **Styling**: Tailwind CSS with custom Neo-Brutalist utility classes.
- **Performance**: On-Demand ISR for sub-second content refresh upon CMS publishing.