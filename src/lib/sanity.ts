
import {createClient, type SanityClient, type SanityDocument} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

// Function to sanitize projectId for robustness
function sanitizeProjectId(id: string | undefined): string | undefined {
  if (!id) return undefined;
  let sanitized = id.toLowerCase();
  // Replace any sequence of non-alphanumeric characters (excluding hyphen) with a single hyphen
  sanitized = sanitized.replace(/[^a-z0-9-]+/g, '-');
  // Collapse multiple hyphens into one
  sanitized = sanitized.replace(/-+/g, '-');
  // Remove leading or trailing hyphens
  sanitized = sanitized.replace(/^-+|-+$/g, '');
  return sanitized === '' ? undefined : sanitized; // Return undefined if sanitization results in empty string
}

const rawProjectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const envDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const defaultProjectId = '0tkhb307'; // Ensure this is the new correct default
const defaultDataset = 'production';

export const projectId = sanitizeProjectId(rawProjectIdFromEnv) || defaultProjectId;
export const dataset = envDataset || defaultDataset;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Improved logging
console.log(`Sanity Client Initializing:
  - Raw Project ID from Env: ${rawProjectIdFromEnv}
  - Raw Dataset from Env: ${envDataset}
  - Sanitized/Used Project ID: ${projectId}
  - Used Dataset: ${dataset}
  - API Version: ${apiVersion}
`);

if ((!rawProjectIdFromEnv || rawProjectIdFromEnv === 'your-sanity-project-id' || rawProjectIdFromEnv === '0tkhb307') && process.env.NODE_ENV !== 'test' && projectId === defaultProjectId) {
  console.warn(
    `Sanity Client Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set or uses a placeholder. Falling back to default projectId: "${defaultProjectId}". Ensure environment variables are correctly set for your project.`
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
  image?: Image & { alt?: string; dataAiHint?: string; caption?: string };
  tags?: string[];
  category?: string;
  seriesId?: string;
  seriesOrder?: number;
  featured?: boolean;
  body?: any[];
}
