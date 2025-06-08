
import {createClient, type SanityClient, type SanityDocument} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

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

  if (sanitized === '') return undefined;
  return sanitized;
}

const rawProjectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const fallbackProjectId = 'hxzbjy6y'; // User-provided project ID
const rawDatasetFromEnv = process.env.NEXT_PUBLIC_SANITY_DATASET;
const fallbackDataset = 'production'; // User-confirmed dataset name

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'; // Updated API version

let projectIdToUse = sanitizeProjectId(rawProjectIdFromEnv);
let projectIdSource = 'environment variable';

if (!projectIdToUse) {
  projectIdToUse = fallbackProjectId;
  projectIdSource = 'fallback';
  if (process.env.NODE_ENV !== 'test') {
    if (rawProjectIdFromEnv && rawProjectIdFromEnv.trim() !== '') {
      console.warn(
        `[Sanity Client Setup] Sanitized Project ID from NEXT_PUBLIC_SANITY_PROJECT_ID ("${rawProjectIdFromEnv}") was invalid. Using fallback: "${fallbackProjectId}".`
      );
    } else {
      console.log(
        `[Sanity Client Setup] NEXT_PUBLIC_SANITY_PROJECT_ID not set or empty. Using fallback Project ID: "${fallbackProjectId}".`
      );
    }
  }
}

export const dataset = rawDatasetFromEnv || fallbackDataset;
const datasetSource = rawDatasetFromEnv ? 'environment variable' : 'fallback';

export const projectId = projectIdToUse;

if (process.env.NODE_ENV !== 'test') {
  console.log(`[Sanity Client Initializing With]
    Project ID: ${projectId} (Source: ${projectIdSource})
    Dataset:    ${dataset} (Source: ${datasetSource})
    API Version: ${apiVersion}
    Use CDN: ${process.env.NODE_ENV === 'production'}`);
}

export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // As per user request
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
  image?: Image & { alt?: string; dataAiHint?: string; caption?: string }; // Added from user's post page snippet
}
