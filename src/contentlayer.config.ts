
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Roadmap = defineDocumentType(() => ({
  name: 'Roadmap',
  filePathPattern: `roadmaps/**/*.md`,
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    category: { type: 'string', required: true },
    difficulty: { type: 'string', required: true },
    featured: { type: 'boolean', default: false },
    imageUrl: { type: 'string', required: true },
    order: { type: 'number', default: 0 },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/roadmaps/${doc._raw.flattenedPath.replace('roadmaps/', '')}`,
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('roadmaps/', ''),
    },
  },
}));

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `blog/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: false, default: 'The Nocturnist' },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    category: { type: 'string', required: false, default: 'General' },
    excerpt: { type: 'string', required: true },
    imageUrl: { type: 'string', required: false },
    dataAiHint: { type: 'string', required: false },
    seriesId: { type: 'string', required: false },
    seriesOrder: { type: 'number', required: false },
    featured: { type: 'boolean', required: false, default: false },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('blog/', '')}` },
    slug: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.replace('blog/', '') },
    id: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.replace('blog/', '') },
  },
}));

export const TutorialPost = defineDocumentType(() => ({
    name: 'TutorialPost',
    filePathPattern: `tutorials/**/*.md`, 
    contentType: 'markdown',
    fields: {
      title: { type: 'string', required: true },
      slug: { type: 'string', required: true }, 
      order: { type: 'number', required: true }, 
      description: { type: 'string', required: true }, 
      category: { type: 'string', required: true },
      tags: { type: 'list', of: { type: 'string' }, required: false },
    },
    computedFields: {
      url: {
        type: 'string',
        resolve: (doc) => `/tutorial/${doc._raw.sourceFileDir.split('/')[1]}/${doc.slug}`,
      },
      language: {
        type: 'string',
        resolve: (doc) => doc._raw.sourceFileDir.split('/')[1],
      }
    },
}));

export const LanguagePost = defineDocumentType(() => ({
    name: 'LanguagePost',
    filePathPattern: `languages/**/*.md`,
    fields: {
      id: { type: 'string', required: true },
      name: { type: 'string', required: true },
      slug: { type: 'string', required: true },
      description: { type: 'string', required: true },
      iconName: { type: 'string', required: false },
    },
    computedFields: {
      url: {
        type: 'string',
        resolve: (doc) => `/languages/${doc.slug}`,
      },
    },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Roadmap, BlogPost, TutorialPost, LanguagePost],
});
