
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `blog/**/*.md`, // Matches files in content/blog
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    excerpt: { type: 'string', required: true },
    imageUrl: { type: 'string' },
    dataAiHint: { type: 'string' },
    seriesId: { type: 'string' },
    seriesOrder: { type: 'number' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\/?/, ''),
    },
    id: { // Keep 'id' consistent with previous structure, typically same as slug for blog posts
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\/?/, ''),
    }
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost],
  mdx: { // ensure mdx options are correctly set if you use mdx, otherwise markdown options
    remarkPlugins: [], // add remark-html or other remark plugins if needed for markdown processing
    rehypePlugins: [],
  },
})
