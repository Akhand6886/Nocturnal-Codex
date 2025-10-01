
import { type RoadmapFlowData } from '@/types/roadmap';
import fs from 'fs/promises';
import path from 'path';

export async function loadRoadmapFlowData(slug: string): Promise<RoadmapFlowData | null> {
  try {
    // Construct a direct path to the file in the public directory
    const filePath = path.join(process.cwd(), 'public', 'roadmap-data', `${slug}.json`);
    
    // Read the file directly from the filesystem
    const fileContents = await fs.readFile(filePath, 'utf8');

    if (!fileContents) {
      console.log(`No interactive roadmap data found for ${slug}. Falling back to static content.`);
      return null;
    }
    
    return JSON.parse(fileContents);
  } catch (error: any) {
    // A "file not found" error is expected for static roadmaps, so we don't log it as a critical error.
    if (error.code === 'ENOENT') {
      console.log(`No interactive roadmap file found for slug: ${slug}`);
    } else {
      // Log other, unexpected errors.
      console.error(`Error loading or parsing roadmap data for ${slug}:`, error);
    }
    return null;
  }
}
