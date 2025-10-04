import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Language {
  id: string;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  content: string;
  url: string;
}

const languagesDirectory = path.join(process.cwd(), 'content/languages');

export function getAllLanguages(): Language[] {
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

    return allLanguagesData.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error("Could not read languages directory:", error);
    return [];
  }
}
