
import { MetadataRoute } from 'next';
import { MOCK_THINK_TANK_ARTICLES, MOCK_WIKI_ARTICLES, MOCK_TOPICS, MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { client, type SanityPost } from '@/lib/sanity';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function getSanityBlogPostsForSitemap(): Promise<Pick<SanityPost, 'slug' | 'publishedAt' | '_updatedAt'>[]> {
  const query = `*[_type == "post" && defined(slug.current) && defined(publishedAt)]{
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }`;
  return client.fetch<Pick<SanityPost, 'slug' | 'publishedAt' | '_updatedAt'>[]>(query);
}

async function getSanityTagsAndCategories(): Promise<{tags: string[], categories: string[]}> {
  const query = `*[_type == "post"]{tags, category}`;
  const results = await client.fetch<{tags?: string[], category?: string}[]>(query);
  
  const allTags = new Set<string>();
  const allCategories = new Set<string>();

  results.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => allTags.add(tag));
    }
    if (post.category) {
      allCategories.add(post.category);
    }
  });

  return {
    tags: Array.from(allTags),
    categories: Array.from(allCategories),
  };
}


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

  const sanityBlogPosts = await getSanityBlogPostsForSitemap();
  const blogPosts = sanityBlogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt || post.publishedAt).toISOString(),
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
    lastModified: new Date().toISOString(), 
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
  
  const languagePages = MOCK_PROGRAMMING_LANGUAGES.map((lang) => ({
    url: `${BASE_URL}/languages/${lang.slug}`,
    lastModified: new Date().toISOString(), 
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const { tags: uniqueTags, categories: uniqueCategories } = await getSanityTagsAndCategories();

  const tagDetailPages = uniqueTags.map((tag) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

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
    ...languagePages,
    ...tagDetailPages,
    ...categoryDetailPages,
  ];
}
