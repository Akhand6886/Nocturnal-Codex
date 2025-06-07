
import {createClient, type SanityClient, type SanityDocument} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity'; // Import the Image type from Sanity

// Function to sanitize projectId
function sanitizeProjectId(id?: string): string | undefined {
  if (!id || typeof id !== 'string' || id.trim() === '') return undefined;

  let sanitized = id.toLowerCase();
  // Replace any character that is not a-z, 0-9, or hyphen with a hyphen.
  // Multiple invalid characters in a row become a single hyphen.
  sanitized = sanitized.replace(/[^a-z0-9-]+/g, '-');
  // Collapse multiple hyphens into one.
  sanitized = sanitized.replace(/-+/g, '-');
  // Remove leading and trailing hyphens.
  sanitized = sanitized.replace(/^-+|-+$/g, '');

  if (sanitized === '') return undefined; // If sanitization results in empty, treat as invalid
  return sanitized;
}

const rawProjectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const fallbackProjectId = 'hxzbjy6y';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-08-20';

let projectIdToUse = sanitizeProjectId(rawProjectIdFromEnv);

if (!projectIdToUse) {
  projectIdToUse = fallbackProjectId;
  if (process.env.NODE_ENV !== 'test' && rawProjectIdFromEnv && rawProjectIdFromEnv.trim() !== '') {
    // Warn only if there was an attempt to set it via env var but it was invalid
    console.warn(
      `Sanity project ID from environment variable NEXT_PUBLIC_SANITY_PROJECT_ID ("${rawProjectIdFromEnv}") was invalid after sanitization. Using fallback project ID: "${fallbackProjectId}". Ensure NEXT_PUBLIC_SANITY_PROJECT_ID is correctly set.`
    );
  } else if (!rawProjectIdFromEnv && process.env.NODE_ENV !== 'test') {
    // Warn if env var was not set at all
     console.warn(
      `Sanity project ID from environment variable NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Using fallback project ID: "${fallbackProjectId}". Ensure NEXT_PUBLIC_SANITY_PROJECT_ID is correctly set in your .env file and deployment environment.`
    );
  }
}


export const projectId = projectIdToUse;

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production, false in development for fresher data
});

const builder = imageUrlBuilder(client);

export function urlFor(source: Image | undefined | null) {
  if (!source || !source.asset) {
    return undefined; 
  }
  return builder.image(source);
}

export interface SanityPost extends SanityDocument {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string; 
  updatedDate?: string; 
  author?: string;
  excerpt?: string;
  mainImage?: Image & { alt?: string; dataAiHint?: string; caption?: string };
  tags?: string[];
  category?: string;
  seriesId?: string;
  seriesOrder?: number;
  featured?: boolean;
  body?: any[]; 
}
