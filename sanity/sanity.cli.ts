
import {defineCliConfig} from 'sanity/cli'

// Function to sanitize projectId
function sanitizeProjectId(id?: string): string | undefined {
  if (!id) return undefined;
  return id.toLowerCase().replace(/[^a-z0-9-]/g, '-'); // Ensure only valid characters
}

const rawProjectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const projectId = sanitizeProjectId(rawProjectIdFromEnv) || 'hxzbjy6y'; // Updated placeholder
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineCliConfig({
  api: {
    projectId,
    dataset
  },
  project: {
    basePath: '/studio'
  }
})
