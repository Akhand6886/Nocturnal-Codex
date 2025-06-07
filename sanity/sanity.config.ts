
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {post} from './schemas/post' // We will create this schema next

// Function to sanitize projectId
function sanitizeProjectId(id?: string): string | undefined {
  if (!id) return undefined;
  return id.toLowerCase().replace(/[^a-z0-9-]/g, '-'); // Ensure only valid characters
}

// Replace these with your actual project ID and dataset
const rawProjectIdFromEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const projectId = sanitizeProjectId(rawProjectIdFromEnv) || 'hxzbjy6y'; // Updated placeholder
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  basePath: '/studio', // This will be the path to your Sanity Studio in the Next.js app
  name: 'nocturnal_codex_studio',
  title: 'Nocturnal Codex Studio',

  projectId,
  dataset,

  plugins: [
    structureTool(),
    visionTool() // Vision tool for querying data in the Studio
  ],

  schema: {
    types: [post], // Add your schemas here
  },
})
