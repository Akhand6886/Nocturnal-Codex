// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `blog/**/*.md`,
  // Matches files in content/blog
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    category: { type: "string", required: false },
    excerpt: { type: "string", required: true },
    imageUrl: { type: "string" },
    dataAiHint: { type: "string" },
    seriesId: { type: "string", required: false },
    seriesOrder: { type: "number", required: false },
    featured: { type: "boolean", default: false, required: false }
    // Added featured flag
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\/?/, "")
    },
    id: {
      // Keep 'id' consistent with previous structure, typically same as slug for blog posts
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\/?/, "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost],
  mdx: {
    // ensure mdx options are correctly set if you use mdx, otherwise markdown options
    remarkPlugins: [],
    // add remark-html or other remark plugins if needed for markdown processing
    rehypePlugins: []
  }
});
export {
  BlogPost,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-BT7PGXOE.mjs.map
