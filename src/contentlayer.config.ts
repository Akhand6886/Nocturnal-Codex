
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

export const Roadmap = defineDocumentType(() => ({
  name: 'Roadmap',
  filePathPattern: `roadmaps/*.md`,
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
    filePathPattern: `languages/*.md`,
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
  documentTypes: [Roadmap, TutorialPost, LanguagePost],
});
