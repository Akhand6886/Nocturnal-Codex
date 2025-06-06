
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `blog/**/*.md`, // Matches files in content/blog
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    updatedDate: { type: 'date', required: false },
    author: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    category: { type: 'string', required: false },
    excerpt: { type: 'string', required: true },
    imageUrl: { type: 'string' },
    dataAiHint: { type: 'string' },
    seriesId: { type: 'string', required: false }, 
    seriesOrder: { type: 'number', required: false },
    featured: { type: 'boolean', default: false, required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\/?/, ''),
    },
    id: { 
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\/?/, ''),
    }
  },
}))

export const PythonTutorial = defineDocumentType(() => ({
  name: "PythonTutorial",
  filePathPattern: `tutorials/python/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    order: { type: "number", required: true },
    description: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/tutorial/python/${doc.slug}`,
    },
  },
}))

export const TutorialPost = defineDocumentType(() => ({
  name: 'TutorialPost',
  filePathPattern: `tutorials/python/**/*.md`, // Specific to Python tutorials for now
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    slug: { type: 'string', required: true }, // Slug from frontmatter for URL
    order: { type: 'number', required: true },
    description: { type: 'string', required: true },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    language: {
      type: 'string',
      resolve: (doc) => {
        // Extracts 'python' from 'tutorials/python/filename.md'
        const parts = doc._raw.sourceFileDir.split('/');
        return parts.length > 1 ? parts[1] : 'unknown';
      }
    },
    // id can be the path or just the slug if slugs are unique per language
    id: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    }
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost, PythonTutorial], // Removed TutorialPost
  mdx: { 
    remarkPlugins: [], 
    rehypePlugins: [],
  },
})
