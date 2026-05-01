import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export interface Project {
  id: string;
  slug: string;
  language: string;
  title: string;
  repoUrl: string;
  goodFirstIssuesUrl: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  content: string;
}

export function getAllLanguagesWithProjects() {
  if (!fs.existsSync(projectsDirectory)) return [];
  return fs.readdirSync(projectsDirectory).filter(file => {
    return fs.statSync(path.join(projectsDirectory, file)).isDirectory();
  });
}

export function getProjectsByLanguage(language: string): Project[] {
  const languageDir = path.join(projectsDirectory, language);
  if (!fs.existsSync(languageDir)) return [];

  const fileNames = fs.readdirSync(languageDir);
  const allProjectsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(languageDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id: `${language}-${slug}`,
      slug,
      language,
      content,
      ...(data as { 
        title: string; 
        repoUrl: string; 
        goodFirstIssuesUrl: string; 
        description: string; 
        difficulty: 'Beginner' | 'Intermediate' | 'Advanced'; 
        tags: string[]; 
      }),
    };
  });

  return allProjectsData.sort((a, b) => {
    const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
}

export function getAllProjects(): Project[] {
  const languages = getAllLanguagesWithProjects();
  return languages.flatMap(lang => getProjectsByLanguage(lang));
}
