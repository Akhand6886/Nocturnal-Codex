
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost } from './data'; // Ensure BlogPost type is imported
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getSortedPostsData(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      return {
        id,
        slug: id,
        title: matterResult.data.title || 'Untitled Post',
        date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : new Date().toISOString(),
        author: matterResult.data.author || 'Anonymous',
        tags: matterResult.data.tags || [],
        excerpt: matterResult.data.excerpt || '',
        content: matterResult.content, // Raw markdown content
        imageUrl: matterResult.data.imageUrl,
        dataAiHint: matterResult.data.dataAiHint, // Added this field
        seriesId: matterResult.data.seriesId,
        seriesOrder: matterResult.data.seriesOrder,
      } as BlogPost;
    });

  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        slug: fileName.replace(/\.md$/, ''),
      };
    });
}

export async function getPostData(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      id: slug,
      slug,
      title: matterResult.data.title || 'Untitled Post',
      date: matterResult.data.date ? new Date(matterResult.data.date).toISOString() : new Date().toISOString(),
      author: matterResult.data.author || 'Anonymous',
      tags: matterResult.data.tags || [],
      excerpt: matterResult.data.excerpt || '',
      content: contentHtml, // HTML content
      imageUrl: matterResult.data.imageUrl,
      dataAiHint: matterResult.data.dataAiHint, // Added this field
      seriesId: matterResult.data.seriesId,
      seriesOrder: matterResult.data.seriesOrder,
    } as BlogPost;
  } catch (err) {
    console.error(`Error reading blog post ${slug}:`, err);
    return null;
  }
}
