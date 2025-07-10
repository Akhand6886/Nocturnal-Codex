
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

// No document types are defined as the content is now fully remote or static.
// If you add local markdown files back, you'll need to define their schemas here.

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [], // Empty array since there are no local content types
})
