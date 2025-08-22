
import type { Entry, EntryCollection } from 'contentful';
import type { BlogPost, ThinkTankArticle, ContentfulImage } from '@/types';
import type { Document } from '@contentful/rich-text-types';

const SPACE = process.env.CONTENTFUL_SPACE_ID;
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!SPACE || !TOKEN) {
  console.warn("Contentful environment variables (CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN) are not set. API calls will be disabled.");
}

const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE}/environments/master`;

// Generic fetch function for Contentful with Next.js caching
async function cfFetch<T>(endpoint: string, ttl = 60): Promise<T | null> {
  if (!SPACE || !TOKEN) {
    return null; // Return null if Contentful is not configured
  }
  
  const url = `${BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: ttl },
    });

    if (!res.ok) {
        console.error(`Contentful fetch error: ${res.status} ${res.statusText}`);
        const errorBody = await res.text();
        console.error(`Error body: ${errorBody}`);
        return null;
    }
    return await res.json() as T;
  } catch(error) {
    console.error("Failed to fetch from Contentful:", error);
    return null;
  }
}

// Helper to extract and parse linked assets from a Contentful response
function parseLinkedAssets(data: any): Record<string, ContentfulImage> {
  const assets: Record<string, ContentfulImage> = {};
  if (data?.includes?.Asset) {
    for (const asset of data.includes.Asset) {
      const parsedImage = parseContentfulImage(asset);
      if (parsedImage) {
        assets[asset.sys.id] = parsedImage;
      }
    }
  }
  return assets;
}

function parseContentfulImage(asset: any): ContentfulImage | null {
    if (!asset?.fields?.file?.url) {
      return null;
    }
    return {
      url: asset.fields.file.url.startsWith('//') ? `https:${asset.fields.file.url}` : asset.fields.file.url,
      width: asset.fields.file.details.image?.width || 0,
      height: asset.fields.file.details.image?.height || 0,
      alt: asset.fields.title || '',
      dataAiHint: asset.fields.description || '',
    };
}


// --- BLOG POSTS ---

function parseBlogPost(item: any, linkedAssets: Record<string, ContentfulImage>): BlogPost {
    const fields = item.fields;
    const featuredImageId = fields.featuredImage?.sys?.id;
    const authorId = fields.author?.sys?.id;

    // This part requires you to also fetch the linked author entry, or adjust the type.
    // For now, let's assume author is simpler or handled differently.
    // A robust solution would fetch linked entries.
    const authorName = "The Nocturnist"; // Placeholder

    const categories: any[] = (fields.category as any[]) || [];
    const categoryNames: string[] = categories.map(cat => cat?.fields?.name as string || '').filter(Boolean);

    return {
        id: item.sys.id,
        title: fields.title || '',
        slug: fields.slug || '',
        date: fields.date || new Date().toISOString(),
        shortDescription: fields.shortDescription || '',
        content: fields.content || null,
        featuredImage: featuredImageId ? linkedAssets[featuredImageId] : null,
        author: authorName,
        tags: categoryNames,
        category: categoryNames[0] || 'Uncategorized',
        featured: fields.featured || false,
        url: `/blog/${fields.slug || ''}`,
    };
}


export async function fetchBlogPosts(options?: { limit?: number; featured?: boolean }): Promise<BlogPost[]> {
    let query = `/entries?content_type=blog&order=-fields.date&include=2`;
    if (options?.limit) query += `&limit=${options.limit}`;
    if (typeof options?.featured === 'boolean') query += `&fields.featured=${options.featured}`;
    
    const data = await cfFetch<any>(query);

    if (!data || !data.items) return [];

    const linkedAssets = parseLinkedAssets(data);
    return data.items.map((item: any) => parseBlogPost(item, linkedAssets));
}


export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const query = `/entries?content_type=blog&fields.slug=${slug}&limit=1&include=2`;
    const data = await cfFetch<any>(query);

    if (!data || !data.items || data.items.length === 0) return null;

    const linkedAssets = parseLinkedAssets(data);
    return parseBlogPost(data.items[0], linkedAssets);
}


// --- THINK TANK ARTICLES ---

function parseThinkTankArticle(item: any, linkedAssets: Record<string, ContentfulImage>): ThinkTankArticle {
    const fields = item.fields;
    const featuredImageId = fields.featuredImage?.sys?.id;

    return {
        id: item.sys.id,
        title: fields.title || '',
        slug: fields.slug || '',
        date: fields.date || new Date().toISOString(),
        abstract: fields.abstract as Document || null,
        content: fields.content as Document || null,
        featuredImage: featuredImageId ? linkedAssets[featuredImageId] : null,
        authors: (fields.authors as string[]) || ['The Nocturnist'],
        tags: (fields.tags as string[]) || [],
        url: `/think-tank/${fields.slug || ''}`,
    };
}


export async function fetchThinkTankArticles(options?: { limit?: number }): Promise<ThinkTankArticle[]> {
    let query = `/entries?content_type=thinkTankArticle&order=-fields.date&include=2`;
    if (options?.limit) query += `&limit=${options.limit}`;

    const data = await cfFetch<any>(query);
    if (!data || !data.items) return [];

    const linkedAssets = parseLinkedAssets(data);
    return data.items.map((item: any) => parseThinkTankArticle(item, linkedAssets));
}


export async function fetchThinkTankArticleBySlug(slug: string): Promise<ThinkTankArticle | null> {
    const query = `/entries?content_type=thinkTankArticle&fields.slug=${slug}&limit=1&include=2`;
    const data = await cfFetch<any>(query);

    if (!data || !data.items || data.items.length === 0) return null;

    const linkedAssets = parseLinkedAssets(data);
    return parseThinkTankArticle(data.items[0], linkedAssets);
}
