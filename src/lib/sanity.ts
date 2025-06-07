
import {createClient, type SanityClient, type SanityDocument} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity'; // Import the Image type from Sanity

// Function to sanitize projectId
function sanitizeProjectId(id?: string): string | undefined {
  if (!id) return undefined;
  return id.toLowerCase().replace(/_/g, '-');
}

// Replace these with your actual project ID and dataset from sanity.io/manage
const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const projectId = sanitizeProjectId(rawProjectId) || 'your-project-id'; // Corrected placeholder format and sanitization
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-08-20'; // Use a recent API version

if (!rawProjectId || rawProjectId === 'your-project-id' || projectId === 'your-project-id') {
  console.warn(
    `Sanity project ID is not set or is using the default placeholder. Please update NEXT_PUBLIC_SANITY_PROJECT_ID in your .env file. The ID used is: ${projectId}`
  );
}
if (!dataset) {
  console.warn(
    `Sanity dataset is not set. Please update NEXT_PUBLIC_SANITY_DATASET in your .env file or replace 'production' if needed.`
  );
}


export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production, false in development for fresher data
});

const builder = imageUrlBuilder(client);

export function urlFor(source: Image | undefined | null) {
  if (!source || !source.asset) {
    // Return a placeholder or null if the source is invalid
    // For example, return 'https://placehold.co/600x400.png?text=Image+Not+Available';
    return undefined; // Or a specific placeholder URL
  }
  return builder.image(source);
}

// Define a TypeScript type for your Sanity blog posts
// This should match the fields you've defined in your Sanity schema (sanity/schemas/post.ts)
export interface SanityPost extends SanityDocument {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string; // ISO date string
  updatedDate?: string; // Added from blog/[slug] page, maps to _updatedAt
  author?: string;
  excerpt?: string;
  mainImage?: Image & { alt?: string; dataAiHint?: string; caption?: string };
  tags?: string[];
  category?: string;
  seriesId?: string;
  seriesOrder?: number;
  featured?: boolean;
  body?: any[]; // Portable Text content
}
