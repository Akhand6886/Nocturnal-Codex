// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `blog/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: false, default: "The Nocturnist" },
    tags: { type: "list", of: { type: "string" }, required: false },
    category: { type: "string", required: false, default: "General" },
    excerpt: { type: "string", required: true },
    imageUrl: { type: "string", required: false },
    dataAiHint: { type: "string", required: false },
    seriesId: { type: "string", required: false },
    seriesOrder: { type: "number", required: false },
    featured: { type: "boolean", required: false, default: false }
  },
  computedFields: {
    url: { type: "string", resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace("blog/", "")}` },
    slug: { type: "string", resolve: (doc) => doc._raw.flattenedPath.replace("blog/", "") },
    id: { type: "string", resolve: (doc) => doc._raw.flattenedPath.replace("blog/", "") }
  }
}));
var TutorialPost = defineDocumentType(() => ({
  name: "TutorialPost",
  filePathPattern: `tutorials/**/*.md`,
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    order: { type: "number", required: true },
    description: { type: "string", required: true },
    category: { type: "string", required: true }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/tutorial/${doc._raw.sourceFileDir.split("/")[1]}/${doc.slug}`
    },
    language: {
      type: "string",
      resolve: (doc) => doc._raw.sourceFileDir.split("/")[1]
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [BlogPost, TutorialPost]
});
export {
  BlogPost,
  TutorialPost,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-76KW6SLZ.mjs.map
