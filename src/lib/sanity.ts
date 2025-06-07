
import {createClient, type SanityClient, type SanityDocument} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

function sanitizeProjectId(id: string | undefined): string | undefined {
  if (!id) return undefined;
  let sanitized = id.toLowerCase();
  sanitized = sanitized.replace(/[^a-z0-9-]/g, '-'); // Replace invalid chars with hyphen
  sanitized = sanitized.replace(/-+/g, '-'); // Collapse multiple hyphens
  sanitized = sanitized.replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  return sanitized === '' ? undefined : sanitized;
}

const rawProjectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const envDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const defaultProjectId = 'hxzbjy6y';
const defaultDataset = 'production';

export const projectId = sanitizeProjectId(rawProjectIdFromEnv) || defaultProjectId;
export const dataset = envDataset || defaultDataset;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'; // Updated apiVersion

if ((!rawProjectIdFromEnv || rawProjectIdFromEnv === 'your-sanity-project-id' || rawProjectIdFromEnv === 'hxzbjy6y' || rawProjectIdFromEnv === '0tkhb307') && process.env.NODE_ENV !== 'test' && projectId === defaultProjectId) {
  console.warn(
    `Sanity project ID from environment variable NEXT_PUBLIC_SANITY_PROJECT_ID is preferred or ensure it's not a generic placeholder. Currently using: ${projectId}. Ensure it's correctly set in your .env file and deployment environment.`
  );
}


export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set useCdn to false as per snippet
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
  image?: Image & { alt?: string; dataAiHint?: string; caption?: string }; // Adding 'image' as it's used in post snippet
  tags?: string[];
  category?: string;
  seriesId?: string;
  seriesOrder?: number;
  featured?: boolean;
  body?: any[]; 
}

