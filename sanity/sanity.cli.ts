
import {defineCliConfig} from 'sanity/cli'

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

if (!projectIdToUse) {
  projectIdToUse = fallbackProjectId;
  // Logging here might be noisy for CLI usage, but can be useful for debugging
  // console.log(`[Sanity CLI Config] Using fallback Project ID: "${fallbackProjectId}".`);
}

let datasetToUse = rawDatasetFromEnv || fallbackDataset;
// if (!rawDatasetFromEnv) {
//   console.log(`[Sanity CLI Config] Using fallback Dataset: "${fallbackDataset}".`);
// }


export default defineCliConfig({
  api: {
    projectId: projectIdToUse!, // Add non-null assertion
    dataset: datasetToUse
  },
  project: {
    basePath: '/studio'
  }
})
