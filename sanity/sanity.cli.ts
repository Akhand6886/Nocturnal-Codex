
import {defineCliConfig} from 'sanity/cli'

// Function to sanitize projectId
function sanitizeProjectId(id?: string): string | undefined {
  if (!id || typeof id !== 'string' || id.trim() === '') return undefined;

  let sanitized = id.toLowerCase();
  sanitized = sanitized.replace(/[^a-z0-9-]+/g, '-'); 
  sanitized = sanitized.replace(/-+/g, '-');          
  sanitized = sanitized.replace(/^-+|-+$/g, '');      

  if (sanitized === '') return undefined;
  return sanitized;
}

const rawProjectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const fallbackProjectId = 'hxzbjy6y';
const datasetToUse = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

let projectIdToUse = sanitizeProjectId(rawProjectIdFromEnv);

if (!projectIdToUse) {
  projectIdToUse = fallbackProjectId;
  // No console.warn here as this config is also used by CLI.
}

export default defineCliConfig({
  api: {
    projectId: projectIdToUse,
    dataset: datasetToUse
  },
  project: {
    basePath: '/studio'
  }
})
