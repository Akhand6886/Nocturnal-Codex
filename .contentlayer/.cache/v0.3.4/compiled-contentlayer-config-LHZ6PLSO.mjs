// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `blog/**/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" } },
    category: { type: "string", required: true },
    excerpt: { type: "string", required: true },
    imageUrl: { type: "string", required: true },
    dataAiHint: { type: "string" },
    seriesId: { type: "string" },
    seriesOrder: { type: "number" },
    featured: { type: "boolean", default: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace(/^blog\/?/, "")}`
    },
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
  documentTypes: [BlogPost, PythonTutorial]
});
export {
  BlogPost,
  PythonTutorial,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-LHZ6PLSO.mjs.map
