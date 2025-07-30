
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `blog/**/*.md*`,
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    category: { type: 'string', required: true },
    excerpt: { type: 'string', required: true },
    imageUrl: { type: 'string' },
    dataAiHint: { type: 'string' },
    seriesId: { type: 'string' },
    seriesOrder: { type: 'number' },
    featured: { type: 'boolean' },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('blog/','')}`,
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/',''),
    },
    id: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/',''),
    },
  },
}));

export const TutorialPost = defineDocumentType(() => ({
  name: "TutorialPost",
  filePathPattern: `tutorials/**/*.md`, 
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true }, 
    order: { type: "number", required: true }, 
    description: { type: "string", required: false }, 
    category: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/tutorial/${doc._raw.sourceFileDir.split('/')[1]}/${doc.slug}`,
    },
    language: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileDir.split('/')[1],
    }
  },
}))


export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost, TutorialPost],
})
