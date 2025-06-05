
import { MetadataRoute } from 'next';
import { allBlogPosts } from 'contentlayer/generated';
import { MOCK_THINK_TANK_ARTICLES, MOCK_WIKI_ARTICLES, MOCK_TOPICS, MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Ensure you have NEXT_PUBLIC_SITE_URL in .env

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/tags',
    '/think-tank',
    '/topics',
    '/wiki',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const blogPosts = allBlogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const thinkTankArticles = MOCK_THINK_TANK_ARTICLES.map((article) => ({
    url: `${BASE_URL}/think-tank/${article.slug}`,
    lastModified: new Date(article.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const wikiArticles = MOCK_WIKI_ARTICLES.map((article) => ({
    url: `${BASE_URL}/wiki/${article.slug}`,
    lastModified: new Date(article.lastUpdated).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const topicPages = MOCK_TOPICS.map((topic) => ({
    url: `${BASE_URL}/topics/${topic.slug}`,
    lastModified: new Date().toISOString(), // Assuming topics don't have a lastModified date in mock data
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  const languagePages = MOCK_PROGRAMMING_LANGUAGES.map((lang) => ({
    url: `${BASE_URL}/languages/${lang.slug}`,
    lastModified: new Date().toISOString(), 
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const uniqueTags = Array.from(
    new Set(allBlogPosts.flatMap((post) => post.tags || []))
  );
  const tagDetailPages = uniqueTags.map((tag) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...blogPosts,
    ...thinkTankArticles,
    ...wikiArticles,
    ...topicPages,
    ...languagePages,
    ...tagDetailPages,
  ];
}
