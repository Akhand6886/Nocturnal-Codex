
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
  estimatedHours?: number;
  topicCount?: number;
  chapterCount?: number;
  tags?: string[];
}

export interface RoadmapTopic {
  id: string;
  label: string;
  description?: string;
  status?: string;
  codeSnippet?: string;
  prerequisites?: string[];
  resources?: { title: string; url: string; type?: string }[];
  relatedLanguage?: string;
}

export interface RoadmapChapter {
  id: string;
  label: string;
  topics: RoadmapTopic[];
}

const roadmapsDirectory = path.join(process.cwd(), 'src/content/roadmaps');
const roadmapContentDirectory = path.join(process.cwd(), 'public/roadmap-content');

let allRoadmapsCache: Roadmap[];

function getTopicCountFromJson(slug: string): { topicCount: number; chapterCount: number } {
    try {
        const filePath = path.join(roadmapContentDirectory, `${slug}.json`);
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const nodes = data.nodes || [];
            const topicCount = nodes.filter((n: any) =>
                n.type !== 'section' && n.type !== 'info' && n.type !== 'label'
            ).length;
            const chapterCount = nodes.filter((n: any) => n.type === 'section').length;
            return { topicCount, chapterCount };
        }
    } catch {
        // silently fail
    }
    return { topicCount: 0, chapterCount: 0 };
}

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
            const counts = getTopicCountFromJson(slug);

            return {
                ...frontmatter,
                slug: slug,
                content: matterResult.content,
                url: `/roadmaps/${slug}`,
                topicCount: counts.topicCount,
                chapterCount: counts.chapterCount,
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

/**
 * Parse a roadmap JSON into structured chapters with ordered topics.
 * Groups topics under section nodes. Topics without a section go into
 * a synthetic "Topics" chapter.
 */
export function parseRoadmapChapters(roadmapData: { nodes: any[]; edges: any[] }): RoadmapChapter[] {
  const { nodes, edges } = roadmapData;

  // Build edge adjacency: source -> target
  const adjacency = new Map<string, string[]>();
  for (const edge of edges) {
    if (!adjacency.has(edge.source)) {
      adjacency.set(edge.source, []);
    }
    adjacency.get(edge.source)!.push(edge.target);
  }

  // Separate sections and topics
  const sections = nodes.filter(n => n.type === 'section');
  const topicNodes = nodes.filter(n =>
    n.type !== 'section' && n.type !== 'info' && n.type !== 'label'
  );

  // Sort topics by vertical position to get the path order
  const sortedTopics = [...topicNodes].sort((a, b) => a.position.y - b.position.y);

  // If there's only one section (header), treat it as a single-chapter roadmap
  // Group all topics under that section
  if (sections.length <= 1) {
    const chapter: RoadmapChapter = {
      id: sections[0]?.id || 'main',
      label: sections[0]?.data?.label || 'Learning Path',
      topics: sortedTopics.map(n => ({
        id: n.id,
        label: n.data?.label || n.id,
        description: n.data?.description,
        status: n.data?.status,
        codeSnippet: n.data?.codeSnippet,
        prerequisites: n.data?.prerequisites,
        resources: n.data?.resources,
        relatedLanguage: n.data?.relatedLanguage,
      })),
    };
    return [chapter];
  }

  // Multiple sections: group topics by proximity to section Y positions
  const sortedSections = [...sections].sort((a, b) => a.position.y - b.position.y);
  const chapters: RoadmapChapter[] = [];

  for (let i = 0; i < sortedSections.length; i++) {
    const section = sortedSections[i];
    const nextSection = sortedSections[i + 1];

    const chapterTopics = sortedTopics.filter(t => {
      const afterCurrent = t.position.y >= section.position.y;
      const beforeNext = nextSection ? t.position.y < nextSection.position.y : true;
      return afterCurrent && beforeNext;
    });

    chapters.push({
      id: section.id,
      label: section.data?.label || `Chapter ${i + 1}`,
      topics: chapterTopics.map(n => ({
        id: n.id,
        label: n.data?.label || n.id,
        description: n.data?.description,
        status: n.data?.status,
        codeSnippet: n.data?.codeSnippet,
        prerequisites: n.data?.prerequisites,
        resources: n.data?.resources,
        relatedLanguage: n.data?.relatedLanguage,
      })),
    });
  }

  return chapters.filter(c => c.topics.length > 0);
}