
import { MetadataRoute } from 'next';
import { MOCK_THINK_TANK_ARTICLES, MOCK_WIKI_ARTICLES, MOCK_TOPICS, MOCK_PROGRAMMING_LANGUAGES } from '@/lib/data';
import { client, type SanityPost } from '@/lib/sanity'; // Import Sanity client

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

  // Fetch blog posts from Sanity
  const sanityPostsQuery = `*[_type == "post" && defined(slug.current) && defined(publishedAt)]{ "slug": slug.current, "publishedAt": publishedAt, "updatedDate": _updatedAt }`;
  const sanityBlogPosts = await client.fetch<Array<{ slug: string; publishedAt: string; updatedDate: string }>>(sanityPostsQuery);
  
  const blogPosts = sanityBlogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate || post.publishedAt).toISOString(),
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

  // Fetch unique tags from Sanity
  const tagsQuery = `array::unique(*[_type == "post" && defined(tags) && count(tags) > 0].tags[])`;
  const uniqueTagsFromSanity = await client.fetch<string[]>(tagsQuery);
  const tagDetailPages = uniqueTagsFromSanity.filter(Boolean).map((tag) => ({
    url: `${BASE_URL}/tags/${encodeURIComponent(tag.toLowerCase())}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  // Fetch unique categories from Sanity
  const categoriesQuery = `array::unique(*[_type == "post" && defined(category)].category)`;
  const uniqueCategoriesFromSanity = await client.fetch<string[]>(categoriesQuery);
  const categoryDetailPages = uniqueCategoriesFromSanity.filter(Boolean).map((category) => ({
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
