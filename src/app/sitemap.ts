
import { MetadataRoute } from 'next';
import { MOCK_WIKI_ARTICLES } from '@/lib/data';
import { fetchBlogPosts, fetchThinkTankArticles } from '@/lib/contentful';
import { getAllLanguages } from '@/lib/languages';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    '/',
    '/about',
    '/blog',
    '/contact',
    '/tags',
    '/categories',
    '/think-tank',
    '/wiki',
    '/languages',
    '/roadmaps'
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));

  const blogPostsData = await fetchBlogPosts() || [];
  const blogPosts: MetadataRoute.Sitemap = blogPostsData.map((post) => ({
    url: `${BASE_URL}${post.url}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const thinkTankArticlesData = (await fetchThinkTankArticles()) || [];
  const thinkTankArticles: MetadataRoute.Sitemap = thinkTankArticlesData.map((article) => ({
    url: `${BASE_URL}${article.url}`,
    lastModified: new Date(article.date).toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const wikiArticles: MetadataRoute.Sitemap = MOCK_WIKI_ARTICLES.map((article) => ({
    url: `${BASE_URL}/wiki/${article.slug}`,
    lastModified: new Date(article.lastUpdated).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));
  
  const allLanguages = getAllLanguages();
  const languagePages: MetadataRoute.Sitemap = allLanguages.map(lang => ({
      url: `${BASE_URL}/languages/${lang.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.6,
  }));

  const uniqueTags = Array.from(new Set(blogPostsData.flatMap(post => post.tags || [])));
  const tagDetailPages: MetadataRoute.Sitemap = uniqueTags.map((tag) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const uniqueCategories = Array.from(new Set(blogPostsData.map(post => post.category).filter(Boolean)));
  const categoryDetailPages: MetadataRoute.Sitemap = uniqueCategories.map((category) => ({
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
    ...languagePages,
    ...tagDetailPages,
    ...categoryDetailPages,
  ];
}
