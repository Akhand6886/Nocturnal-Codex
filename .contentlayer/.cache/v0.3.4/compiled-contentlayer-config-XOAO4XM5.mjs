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
    updatedDate: { type: "date", required: false },
    author: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
    category: { type: "string", required: false },
    excerpt: { type: "string", required: true },
    imageUrl: { type: "string" },
    dataAiHint: { type: "string" },
    seriesId: { type: "string", required: false },
    seriesOrder: { type: "number", required: false },
    featured: { type: "boolean", default: false, required: false }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\/?/, "")
    },
    id: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\/?/, "")
    }
  }
}));
var PythonTutorial = defineDocumentType(() => ({
  name: "PythonTutorial",
  filePathPattern: `tutorials/python/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    order: { type: "number", required: true },
    description: { type: "string", required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/tutorial/python/${doc.slug}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost, PythonTutorial],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});
export {
  BlogPost,
  PythonTutorial,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-XOAO4XM5.mjs.map
