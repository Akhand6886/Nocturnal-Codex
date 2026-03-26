import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TopicItem {
  title: string;
  slug?: string;
  description?: string;
  link?: string;
}

export interface TopicSection {
  section: string;
  description?: string;
  items: TopicItem[];
}

export interface Language {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  content: string;
  url: string;
  // Extended metadata
  year?: number;
  creator?: string;
  paradigm?: string[];
  useCases?: string[];
  website?: string;
  category?: string;
  featured?: boolean;
  difficulty?: string;
  // Tutorial curriculum
  topics?: TopicSection[];
}

export interface TopicContent {
  title: string;
  description?: string;
  content: string;
}

const languagesDirectory = path.join(process.cwd(), 'content/languages');

let allLanguagesCache: Language[];

function fetchAllLanguages(): Language[] {
    if (allLanguagesCache) {
        return allLanguagesCache;
    }

    try {
        const entries = fs.readdirSync(languagesDirectory, { withFileTypes: true });
        const allLanguagesData = entries
            .filter(entry => entry.isDirectory())
            .map((dir) => {
                const id = dir.name;
                const fullPath = path.join(languagesDirectory, dir.name, 'index.md');
                
                if (!fs.existsSync(fullPath)) return null;
                
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const matterResult = matter(fileContents);

                const frontmatter = matterResult.data as Omit<Language, 'content' | 'url'>;

                return {
                    ...frontmatter,
                    content: matterResult.content,
                    url: `/languages/${frontmatter.slug}`,
                } as Language;
            })
            .filter(Boolean) as Language[];

        allLanguagesCache = allLanguagesData.sort((a, b) => a.name.localeCompare(b.name));
        return allLanguagesCache;

    } catch (error) {
        console.error("Could not read languages directory:", error);
        return [];
    }
}

export function getLanguageTopic(langSlug: string, topicSlug: string): TopicContent | null {
  try {
    const fullPath = path.join(languagesDirectory, langSlug, `${topicSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    return {
      title: matterResult.data.title || topicSlug,
      description: matterResult.data.description,
      content: matterResult.content,
    };
  } catch (error) {
    console.error(`Could not read topic ${topicSlug} for language ${langSlug}:`, error);
    return null;
  }
}


export function getAllLanguages(): Language[] {
  return fetchAllLanguages();
}

export function getLanguageBySlug(slug: string): Language | undefined {
  return fetchAllLanguages().find(lang => lang.slug === slug);
}
