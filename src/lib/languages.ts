import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface TopicItem {
  title: string;
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

const languagesDirectory = path.join(process.cwd(), 'content/languages');

let allLanguagesCache: Language[];

function fetchAllLanguages(): Language[] {
    if (allLanguagesCache) {
        return allLanguagesCache;
    }

    try {
        const fileNames = fs.readdirSync(languagesDirectory);
        const allLanguagesData = fileNames.map((fileName) => {
            const id = fileName.replace(/\.md$/, '');
            const fullPath = path.join(languagesDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            const frontmatter = matterResult.data as Omit<Language, 'content' | 'url'>;

            return {
                ...frontmatter,
                content: matterResult.content,
                url: `/languages/${frontmatter.slug}`,
            } as Language;
        });

        allLanguagesCache = allLanguagesData.sort((a, b) => a.name.localeCompare(b.name));
        return allLanguagesCache;

    } catch (error) {
        console.error("Could not read languages directory:", error);
        return [];
    }
}


export function getAllLanguages(): Language[] {
  return fetchAllLanguages();
}

export function getLanguageBySlug(slug: string): Language | undefined {
  return fetchAllLanguages().find(lang => lang.slug === slug);
}
