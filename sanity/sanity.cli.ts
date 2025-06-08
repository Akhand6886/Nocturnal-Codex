
import {defineCliConfig} from 'sanity/cli'

// Function to sanitize projectId (ensure it's robust)
function sanitizeProjectId(id?: string): string | undefined {
  if (!id) return undefined;
  let sanitized = id.toLowerCase();
  sanitized = sanitized.replace(/[^a-z0-9-]+/g, '-'); // Allow hyphens, replace others
  sanitized = sanitized.replace(/-+/g, '-');          // Collapse multiple hyphens
  sanitized = sanitized.replace(/^-+|-+$/g, '');       // Remove leading/trailing hyphens
  return sanitized === '' ? undefined : sanitized;
}

const rawProjectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const defaultProjectId = '0tkhb307'; // Updated default
const datasetFromEnv = process.env.NEXT_PUBLIC_SANITY_DATASET;
const defaultDataset = 'production';

const projectId = sanitizeProjectId(rawProjectIdFromEnv) || defaultProjectId;
const dataset = datasetFromEnv || defaultDataset;

if ((!rawProjectIdFromEnv || rawProjectIdFromEnv === 'your-sanity-project-id' || rawProjectIdFromEnv === '0tkhb307') && process.env.NODE_ENV !== 'test' && projectId === defaultProjectId) {
  console.warn(
    `Sanity CLI Config Warning: NEXT_PUBLIC_SANITY_PROJECT_ID is not set or uses a placeholder. Falling back to default projectId: "${defaultProjectId}" for CLI. Ensure environment variables are correctly set.`
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset
  },
  project: {
    basePath: '/studio' // Optional: If your studio is part of a monorepo or has a specific project base
  }
})
