
import {defineCliConfig} from 'sanity/cli'

// Function to sanitize projectId
function sanitizeProjectId(id?: string): string | undefined {
  if (!id) return undefined;
  return id.toLowerCase().replace(/_/g, '-');
}

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const projectId = sanitizeProjectId(rawProjectId) || 'your-project-id'; // Corrected placeholder format and sanitization
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
