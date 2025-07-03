// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var TutorialPost = defineDocumentType(() => ({
  name: "TutorialPost",
  filePathPattern: `tutorials/**/*.md`,
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
  documentTypes: [TutorialPost]
});
export {
  TutorialPost,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-NOUJSJJL.mjs.map
