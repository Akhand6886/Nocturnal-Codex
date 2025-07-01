
import { createClient, type Asset, type Entry, type EntryCollection } from 'contentful';
import type { BlogPost, ThinkTankArticle, ContentfulImage } from '@/types';
import type { Document } from '@contentful/rich-text-types';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client =
  space && accessToken
    ? createClient({
        space,
        accessToken,
      })
    : null;

// Helper to parse a Contentful asset into our smaller ContentfulImage type
function parseContentfulImage(asset?: Asset<'WITHOUT_UNRESOLVABLE_LINKS', 'en-US'>): ContentfulImage | null {
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

// Helper to parse a Contentful blog post entry
function parseBlogPost(entry: Entry<'WITHOUT_UNRESOLVABLE_LINKS', 'en-US'>): BlogPost {
  const fields = entry.fields;
  return {
    id: entry.sys.id,
    title: fields.title as string || '',
    slug: fields.slug as string || '',
    date: fields.date as string || new Date().toISOString(),
    excerpt: fields.excerpt as string || '',
    content: fields.content as Document || null,
    featuredImage: parseContentfulImage(fields.featuredImage as Asset<'WITHOUT_UNRESOLVABLE_LINKS', 'en-US'>),
    author: fields.author as string || 'The Nocturnist',
    tags: (fields.tags as string[]) || [],
    category: fields.category as string || 'Uncategorized',
    featured: fields.featured as boolean || false,
    url: `/blog/${fields.slug as string || ''}`,
  };
}

export async function fetchBlogPosts(options?: { limit?: number; featured?: boolean }): Promise<BlogPost[]> {
  if (!client) {
    console.warn("Contentful client not configured. Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN. Returning empty array.");
    return [];
  }
  
  const query: any = {
    content_type: 'blogPost',
    order: ['-fields.date'],
  };

  if (options?.limit) {
    query.limit = options.limit;
  }
  if (typeof options?.featured === 'boolean') {
    query['fields.featured'] = options.featured;
  }
  
  const collection: EntryCollection<'WITHOUT_UNRESOLVABLE_LINKS', 'en-US'> = await client.getEntries(query);
  return collection.items.map(parseBlogPost);
}

export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!client) {
    console.warn("Contentful client not configured. Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN. Returning null.");
    return null;
  }

  const collection: EntryCollection<'WITHOUT_UNRESOLVABLE_LINKS', 'en-US'> = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });

  if (collection.items.length === 0) {
    return null;
  }
  return parseBlogPost(collection.items[0]);
}

// --- THINK TANK ARTICLES ---

// Helper to parse a Contentful think tank article entry
function parseThinkTankArticle(entry: Entry<'WITHOUT_UNRESOLVABLE_LINKS', 'en-US'>): ThinkTankArticle {
    const fields = entry.fields;
    return {
        id: entry.sys.id,
        title: fields.title as string || '',
        slug: fields.slug as string || '',
        date: fields.date as string || new Date().toISOString(),
        abstract: fields.abstract as string || '',
        content: fields.content as Document || null,
        featuredImage: parseContentfulImage(fields.featuredImage as Asset<'WITHOUT_UNRESOLVABLE_LINKS', 'en-US'>),
        authors: (fields.authors as string[]) || ['The Nocturnist'],
        tags: (fields.tags as string[]) || [],
        url: `/think-tank/${fields.slug as string || ''}`,
    };
}

export async function fetchThinkTankArticles(options?: { limit?: number }): Promise<ThinkTankArticle[]> {
  if (!client) {
    console.warn("Contentful client not configured. Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN. Returning empty array.");
    return [];
  }

  const query: any = {
    content_type: 'thinkTankArticle',
    order: ['-fields.date'],
  };

  if (options?.limit) {
    query.limit = options.limit;
  }

  const collection: EntryCollection<'WITHOUT_UNRESOLVABLE_LINKS', 'en-US'> = await client.getEntries(query);
  return collection.items.map(parseThinkTankArticle);
}


export async function fetchThinkTankArticleBySlug(slug: string): Promise<ThinkTankArticle | null> {
    if (!client) {
      console.warn("Contentful client not configured. Missing CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN. Returning null.");
      return null;
    }

    const collection: EntryCollection<'WITHOUT_UNRESOLVABLE_LINKS', 'en-US'> = await client.getEntries({
      content_type: 'thinkTankArticle',
      'fields.slug': slug,
      limit: 1,
    });
  
    if (collection.items.length === 0) {
      return null;
    }
    return parseThinkTankArticle(collection.items[0]);
}
