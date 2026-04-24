
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Roadmap {
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  featured: boolean;
  order: number;
  content: string; // The markdown content, if any
  url: string;
  relatedLanguages?: string[];
  imageUrl?: string;
}

const roadmapsDirectory = path.join(process.cwd(), 'content/roadmaps');

let allRoadmapsCache: Roadmap[];

function fetchAllRoadmaps(): Roadmap[] {
    if (allRoadmapsCache) {
        return allRoadmapsCache;
    }

    try {
        const fileNames = fs.readdirSync(roadmapsDirectory);
        const allRoadmapsData: Roadmap[] = fileNames.map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(roadmapsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            const frontmatter = matterResult.data as Omit<Roadmap, 'slug' | 'content' | 'url'>;

            return {
                ...frontmatter,
                slug: slug,
                content: matterResult.content,
                url: `/roadmaps/${slug}`,
            } as Roadmap;
        });
        
        allRoadmapsCache = allRoadmapsData.sort((a, b) => a.order - b.order);
        return allRoadmapsCache;

    } catch (error) {
        console.error("Could not read roadmaps directory:", error);
        return [];
    }
}


export function getAllRoadmaps(): Roadmap[] {
  return fetchAllRoadmaps();
}

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  return fetchAllRoadmaps().find(roadmap => roadmap.slug === slug);
}

    