
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {post} from './schemas/post' 

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

let projectIdToUse = sanitizeProjectId(rawProjectIdFromEnv);
let projectIdSource = 'environment variable NEXT_PUBLIC_SANITY_PROJECT_ID';


if (!projectIdToUse) {
  projectIdToUse = fallbackProjectId;
  projectIdSource = 'fallback value';
    if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') { // Log only on server-side during build/dev
      if (rawProjectIdFromEnv && rawProjectIdFromEnv.trim() !== '') {
        console.warn(
          `[Sanity Studio Config] Sanitized Project ID from NEXT_PUBLIC_SANITY_PROJECT_ID ("${rawProjectIdFromEnv}") was invalid. Using fallback: "${fallbackProjectId}".`
        );
      } else {
        console.log(
          `[Sanity Studio Config] NEXT_PUBLIC_SANITY_PROJECT_ID not set or empty. Using fallback Project ID: "${fallbackProjectId}".`
        );
      }
    }
}

let datasetToUse = rawDatasetFromEnv;
let datasetSource = 'environment variable NEXT_PUBLIC_SANITY_DATASET';

if(!datasetToUse) {
  datasetToUse = fallbackDataset;
  datasetSource = 'fallback value';
  if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
    console.log(
        `[Sanity Studio Config] NEXT_PUBLIC_SANITY_DATASET not set or empty. Using fallback Dataset: "${fallbackDataset}".`
      );
   }
}

if (typeof window === 'undefined' && process.env.NODE_ENV !== 'test') {
  console.log(`[Sanity Studio Config Initializing With]
    Project ID: ${projectIdToUse} (Source: ${projectIdSource})
    Dataset:    ${datasetToUse} (Source: ${datasetSource})`);
}


export default defineConfig({
  basePath: '/studio', 
  name: 'nocturnal_codex_studio',
  title: 'Nocturnal Codex Studio',

  projectId: projectIdToUse!, // Add non-null assertion as we ensure it has a value
  dataset: datasetToUse!,   // Add non-null assertion

  plugins: [
    structureTool(),
    visionTool() 
  ],

  schema: {
    types: [post], 
  },
})
