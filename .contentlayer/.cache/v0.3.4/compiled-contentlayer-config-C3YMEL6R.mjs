// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var PythonTutorial = defineDocumentType(() => ({
  name: "PythonTutorial",
  filePathPattern: `tutorials/python/*.md`,
  // Matches files in content/tutorials/python
  contentType: "markdown",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    // Used for the URL segment
    order: { type: "number", required: true },
    // For ordering tutorials in a series
    description: { type: "string", required: false }
    // Short summary
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/tutorial/python/${doc.slug}`
      // Example: /tutorial/python/getting-started
    }
    // If you want an 'id' field similar to BlogPost for consistency, you could add:
    // id: {
    //   type: 'string',
    //   resolve: (doc) => doc._raw.flattenedPath.replace(/^tutorials\/python\/?/, ''),
    // }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [PythonTutorial],
  // Only PythonTutorial is left
  mdx: {
    remarkPlugins: [],
    rehypePlugins: []
  }
});
export {
  PythonTutorial,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-C3YMEL6R.mjs.map
