
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './data';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getSortedPostsData(): BlogPost[] {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // Filter out non-markdown files
    .map((fileName) => {
      // Remove ".md" from file name to get id (slug)
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
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
        seriesId: matterResult.data.seriesId,
        seriesOrder: matterResult.data.seriesOrder,
      } as BlogPost;
    });

  // Sort posts by date
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

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // Combine the data with the slug and contentHtml
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
      seriesId: matterResult.data.seriesId,
      seriesOrder: matterResult.data.seriesOrder,
    } as BlogPost;
  } catch (err) {
    console.error(`Error reading blog post ${slug}:`, err);
    return null; // Or handle as a 404 more explicitly if preferred
  }
}
