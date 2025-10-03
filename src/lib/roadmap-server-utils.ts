
import { type RoadmapFlowData, type TopicContent } from '@/types/roadmap';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

// Loads the JSON blueprint for the roadmap graph structure
export async function loadRoadmapBlueprint(slug: string): Promise<RoadmapFlowData | null> {
  try {
    // The JSON blueprints are now located in src/data/roadmaps/
    const filePath = path.join(process.cwd(), 'src', 'data', 'roadmaps', `${slug}.json`);
    const fileContents = await fs.readFile(filePath, 'utf8');

    if (!fileContents) {
      console.log(`No interactive roadmap blueprint found for ${slug}.`);
      return null;
    }
    
    return JSON.parse(fileContents);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log(`No blueprint file found for slug: ${slug}`);
    } else {
      console.error(`Error loading or parsing roadmap blueprint for ${slug}:`, error);
    }
    return null;
  }
}


// Loads all markdown content for the topics within a single roadmap
export async function loadTopicContent(slug: string): Promise<Record<string, TopicContent> | null> {
  const contentDir = path.join(process.cwd(), 'src', 'data', 'roadmaps', slug);
  try {
    const filenames = await fs.readdir(contentDir);
    const topics: Record<string, TopicContent> = {};

    for (const filename of filenames) {
      if (path.extname(filename) === '.md') {
        const filePath = path.join(contentDir, filename);
        const fileContents = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContents);
        const topicId = path.basename(filename, '.md');
        
        topics[topicId] = {
          id: topicId,
          title: data.title || 'Untitled Topic',
          description: data.description || '',
          objectives: data.objectives || [],
          resources: data.resources || data.links || [], // Support for 'links' as fallback
          rawContent: content,
        };
      }
    }
    return Object.keys(topics).length > 0 ? topics : null;

  } catch (error: any) {
     if (error.code === 'ENOENT') {
      console.log(`No content directory found for roadmap slug: ${slug}`);
    } else {
      console.error(`Error loading topic content for ${slug}:`, error);
    }
    return null;
  }
}
