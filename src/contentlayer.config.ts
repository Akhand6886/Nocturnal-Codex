
import { defineDocumentType, makeSource, defineNestedType } from 'contentlayer/source-files'

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `blog/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    author: { type: 'string', required: false, default: 'The Nocturnist' },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    category: { type: 'string', required: false, default: 'General' },
    excerpt: { type: 'string', required: true },
    imageUrl: { type: 'string', required: false },
    dataAiHint: { type: 'string', required: false },
    seriesId: { type: 'string', required: false },
    seriesOrder: { type: 'number', required: false },
    featured: { type: 'boolean', required: false, default: false },
  },
  computedFields: {
    url: { type: 'string', resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('blog/', '')}` },
    slug: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.replace('blog/', '') },
    id: { type: 'string', resolve: (doc) => doc._raw.flattenedPath.replace('blog/', '') },
  },
}));

export const TutorialPost = defineDocumentType(() => ({
    name: 'TutorialPost',
    filePathPattern: `tutorials/**/*.md`, 
    contentType: 'markdown',
    fields: {
      title: { type: 'string', required: true },
      slug: { type: 'string', required: true }, 
      order: { type: 'number', required: true }, 
      description: { type: 'string', required: true }, 
      category: { type: 'string', required: true },
      tags: { type: 'list', of: { type: 'string' }, required: false },
    },
    computedFields: {
      url: {
        type: 'string',
        resolve: (doc) => `/tutorial/${doc._raw.sourceFileDir.split('/')[1]}/${doc.slug}`,
      },
      language: {
        type: 'string',
        resolve: (doc) => doc._raw.sourceFileDir.split('/')[1],
      }
    },
  }));

const RoadmapNode = defineNestedType(() => ({
    name: 'RoadmapNode',
    fields: {
      id: { type: 'string', required: true },
      title: { type: 'string', required: true },
      slug: { type: 'string', required: false },
      description: { type: 'string', required: false },
      isMainPath: { type: 'boolean', required: false },
      isGroup: { type: 'boolean', required: false },
    },
}));

RoadmapNode.addComputedFields({
    items: {
        type: 'list',
        of: RoadmapNode,
        resolve: (doc: any) => doc.items,
    }
})
  
const RoadmapColumn = defineNestedType(() => ({
    name: 'RoadmapColumn',
    fields: {
        left: { type: 'list', of: RoadmapNode, required: false },
        main: { type: 'list', of: RoadmapNode, required: false },
        right: { type: 'list', of: RoadmapNode, required: false },
    }
}))

const CodeSnippetItem = defineNestedType(() => ({
    name: 'CodeSnippetItem',
    fields: {
        id: { type: 'string', required: true },
        title: { type: 'string', required: true },
        language: { type: 'enum', options: ['python', 'javascript', 'typescript', 'html', 'css', 'json', 'markdown', 'csharp', 'java', 'go', 'rust', 'text', 'cplusplus'], required: true },
        code: { type: 'string', required: true },
        description: { type: 'string', required: false },
    }
}));

const WikiArticleStub = defineNestedType(() => ({
    name: 'WikiArticleStub',
    fields: {
        id: { type: 'string', required: true },
        title: { type: 'string', required: true },
        slug: { type: 'string', required: true },
    }
}));

const ThinkTankArticleStub = defineNestedType(() => ({
    name: 'ThinkTankArticleStub',
    fields: {
        id: { type: 'string', required: true },
        title: { type: 'string', required: true },
        slug: { type: 'string', required: true },
    }
}));


export const TopicPost = defineDocumentType(() => ({
    name: 'TopicPost',
    filePathPattern: `topics/**/*.md`,
    contentType: 'markdown',
    fields: {
      id: { type: 'string', required: true },
      name: { type: 'string', required: true },
      slug: { type: 'string', required: true },
      description: { type: 'string', required: true },
      category: { type: 'string', required: false },
      imageUrl: { type: 'string', required: false },
      dataAiHint: { type: 'string', required: false },
      codeSnippets: { type: 'list', of: CodeSnippetItem, required: false },
      references: { type: 'list', of: WikiArticleStub, required: false },
      thinkTankArticles: { type: 'list', of: ThinkTankArticleStub, required: false },
      roadmapColumns: { type: 'nested', of: RoadmapColumn, required: false },
    },
    computedFields: {
      url: {
        type: 'string',
        resolve: (doc) => `/topics/${doc.slug}`,
      },
    },
  }));

  export const LanguagePost = defineDocumentType(() => ({
    name: 'LanguagePost',
    filePathPattern: `languages/**/*.md`,
    fields: {
      id: { type: 'string', required: true },
      name: { type: 'string', required: true },
      slug: { type: 'string', required: true },
      description: { type: 'string', required: true },
      iconName: { type: 'string', required: false },
    },
    computedFields: {
      url: {
        type: 'string',
        resolve: (doc) => `/languages/${doc.slug}`,
      },
    },
  }));


export default makeSource({
  contentDirPath: 'content',
  documentTypes: [BlogPost, TutorialPost, TopicPost, LanguagePost],
})
