
import {createClient, type SanityClient, type SanityDocument} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url';
import type { Image } from 'sanity';

// Function to sanitize projectId
function sanitizeProjectId(id?: string): string | undefined {
  if (!id || typeof id !== 'string' || id.trim() === '') return undefined;

  let sanitized = id.toLowerCase();
  // Replace any character that is not a-z, 0-9 with a hyphen.
  // Handles sequences of invalid chars as a single hyphen.
  sanitized = sanitized.replace(/[^a-z0-9]+/g, '-');
  // Remove leading and trailing hyphens.
  sanitized = sanitized.replace(/^-+|-+$/g, '');

  if (sanitized === '') return undefined; // Return undefined if sanitization results in empty string
  return sanitized;
}

const rawProjectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const fallbackProjectId = '0tkhb307'; // Updated fallback Project ID
const rawDatasetFromEnv = process.env.NEXT_PUBLIC_SANITY_DATASET;
const fallbackDataset = 'production';

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

let projectIdToUse = sanitizeProjectId(rawProjectIdFromEnv);
let projectIdSource = 'environment variable NEXT_PUBLIC_SANITY_PROJECT_ID';

if (!projectIdToUse) {
  projectIdToUse = fallbackProjectId; // Sanitization of fallback is not strictly needed if it's always valid
  projectIdSource = 'fallback value';
  if (process.env.NODE_ENV !== 'test') {
    if (rawProjectIdFromEnv && rawProjectIdFromEnv.trim() !== '') {
      // This case means the env var was set but sanitized to an empty/invalid string
      console.warn(
        `[Sanity Client Setup] Sanitized Project ID from NEXT_PUBLIC_SANITY_PROJECT_ID ("${rawProjectIdFromEnv}") was invalid. Using fallback: "${fallbackProjectId}".`
      );
    } else {
      // This case means the env var was not set or was empty
      console.log(
        `[Sanity Client Setup] NEXT_PUBLIC_SANITY_PROJECT_ID not set or empty. Using fallback Project ID: "${fallbackProjectId}".`
      );
    }
  }
}


let datasetToUse = rawDatasetFromEnv;
let datasetSource = 'environment variable NEXT_PUBLIC_SANITY_DATASET';

if(!datasetToUse) {
  datasetToUse = fallbackDataset;
  datasetSource = 'fallback value';
   if (process.env.NODE_ENV !== 'test') {
    console.log(
        `[Sanity Client Setup] NEXT_PUBLIC_SANITY_DATASET not set or empty. Using fallback Dataset: "${fallbackDataset}".`
      );
   }
}


export const projectId = projectIdToUse;
export const dataset = datasetToUse;


// Log the final values being used, especially during development/build
if (process.env.NODE_ENV !== 'test') {
  console.log(`[Sanity Client Initializing With]
    Project ID: ${projectId} (Source: ${projectIdSource})
    Dataset:    ${dataset} (Source: ${datasetSource})
    API Version: ${apiVersion}
    Use CDN: false`); // Updated useCdn to false as per previous request
}


export const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false for fresh data, true for cached data (production)
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
  updatedDate?: string; // from Sanity _updatedAt
  author?: string;
  excerpt?: string;
  mainImage?: Image & { alt?: string; dataAiHint?: string; caption?: string };
  image?: Image & { alt?: string; dataAiHint?: string; caption?: string }; // Added this from user's code
  tags?: string[];
  category?: string;
  seriesId?: string;
  seriesOrder?: number;
  featured?: boolean;
  body?: any[]; // Portable Text
}
