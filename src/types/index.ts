
import type { Document } from '@contentful/rich-text-types';

export interface ContentfulImage {
  url: string;
  width: number;
  height: number;
  alt: string;
  dataAiHint?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO date string
  excerpt: string;
  content: Document; // Rich text content
  featuredImage: ContentfulImage | null;
  author: string;
  tags: string[];
  category: string;
  featured: boolean;
  url: string;
}

export interface ThinkTankArticle {
  id: string;
  slug: string;
  title: string;
  date: string; // ISO date string
  abstract: string;
  content: Document;
  featuredImage: ContentfulImage | null;
  authors: string[];
  tags: string[];
  url: string;
}
