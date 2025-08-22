
import { MetadataRoute } from 'next';
import { MOCK_WIKI_ARTICLES, MOCK_TOPICS } from '@/lib/data';
import { fetchBlogPosts, fetchThinkTankArticles } from '@/lib/contentful';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/tags',
    '/categories',
    '/think-tank',
    '/topics',
    '/wiki',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const blogPostsData = await fetchBlogPosts() || [];
  const blogPosts = blogPostsData.map((post) => ({
    url: `${BASE_URL}${post.url}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const thinkTankArticlesData = (await fetchThinkTankArticles()) || [];
  const thinkTankArticles = thinkTankArticlesData.map((article) => ({
    url: `${BASE_URL}${article.url}`,
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
    lastModified: new Date().toISOString(), 
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  const uniqueTags = Array.from(new Set(blogPostsData.flatMap(post => post.tags || [])));
  const tagDetailPages = uniqueTags.map((tag) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const uniqueCategories = Array.from(new Set(blogPostsData.map(post => post.category).filter(Boolean)));
  const categoryDetailPages = uniqueCategories.map((category) => ({
    url: `${BASE_URL}/categories/${encodeURIComponent(category.toLowerCase().replace(/\s+/g, '-'))}`,
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
    ...tagDetailPages,
    ...categoryDetailPages,
  ];
}
