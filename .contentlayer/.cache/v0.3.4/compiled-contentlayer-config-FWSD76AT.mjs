// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
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
  documentTypes: [PythonTutorial]
});
export {
  PythonTutorial,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-FWSD76AT.mjs.map
