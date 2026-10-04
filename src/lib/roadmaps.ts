import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getLanguageBySlug } from './languages';
import { getProjectsByLanguage } from './projects';
import { getAllMathDomains } from './mathematics';

export interface Roadmap {
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  featured: boolean;
  order: number;
  content: string; // The markdown content, if any
  url: string;
  relatedLanguages?: string[];
  imageUrl?: string;
  estimatedHours?: number;
  topicCount?: number;
  chapterCount?: number;
  tags?: string[];
}

export interface InHouseLesson {
  title: string;
  description: string;
  slug: string;
  url: string;
  badge?: string;
  readTime?: string;
}

export interface InHouseProjectItem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  repoUrl: string;
  goodFirstIssuesUrl?: string;
}

export interface InHouseMathLink {
  title: string;
  slug: string;
  url: string;
  description: string;
}

export interface ProductionChecklistItem {
  id: string;
  category: string;
  task: string;
  priority: 'P0' | 'P1' | 'P2';
  explanation: string;
}

export interface ComplexityBlueprint {
  timeComplexity: string;
  spaceComplexity: string;
  memoryModel: string;
  keyTradeOff: string;
}

export interface AwesomeToolItem {
  name: string;
  category: string;
  description: string;
  url: string;
  badge?: string;
}

export interface CodexArchitectureTenet {
  ruleNumber: number;
  title: string;
  principle: string;
  rationale: string;
}

export interface CodexQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface EditorialSummary {
  keyTakeaway: string;
  whenToUse: string;
  commonPitfalls: string[];
}

export interface RoadmapTopic {
  id: string;
  label: string;
  description?: string;
  status?: string;
  codeSnippet?: string;
  prerequisites?: string[];
  resources?: { title: string; url: string; type?: string }[];
  relatedLanguage?: string;
}

export interface RoadmapChapter {
  id: string;
  label: string;
  topics: RoadmapTopic[];
}

export interface SiteLanguageLink {
  name: string;
  slug: string;
  url: string;
  description: string;
  icon: string;
}

export const SITE_LANGUAGES_MAP: Record<string, SiteLanguageLink> = {
  python: { name: "Python", slug: "python", url: "/languages/python", description: "Master Python syntax, data structures, OOP, async, & modern standard libraries.", icon: "🐍" },
  javascript: { name: "JavaScript", slug: "javascript", url: "/languages/javascript", description: "Master ES6+, async/await, DOM, closures, engines, and modern JS development.", icon: "🟨" },
  typescript: { name: "TypeScript", slug: "typescript", url: "/languages/typescript", description: "Master static typing, generics, interfaces, and scalable application architecture.", icon: "🟦" },
  html: { name: "HTML5", slug: "html", url: "/languages/html", description: "Learn modern semantic HTML5 markup, accessibility standards, and SEO metadata.", icon: "🌐" },
  css: { name: "CSS3", slug: "css", url: "/languages/css", description: "Master Flexbox, CSS Grid, custom properties, animations, and design tokens.", icon: "🎨" },
  sql: { name: "SQL & Databases", slug: "sql", url: "/languages/sql", description: "Master relational queries, JOINs, indexing, schema design, and optimizations.", icon: "🗄️" },
  c: { name: "C Language", slug: "c", url: "/languages/c", description: "Low-level memory management, pointers, memory layout, and system programming.", icon: "⚙️" },
  cplusplus: { name: "C++", slug: "cplusplus", url: "/languages/cplusplus", description: "High-performance OOP, pointers, STL algorithms, and low-latency optimization.", icon: "⚡" },
  csharp: { name: "C# & .NET", slug: "csharp", url: "/languages/csharp", description: "Modern .NET core, LINQ queries, async tasks, and enterprise architectures.", icon: "🔷" },
  java: { name: "Java", slug: "java", url: "/languages/java", description: "JVM internals, enterprise OOP patterns, multithreading, and Spring Boot.", icon: "☕" },
  go: { name: "Go (Golang)", slug: "go", url: "/languages/go", description: "Goroutines, channels, microservices, and ultra-fast concurrent backend binaries.", icon: "🐹" },
  rust: { name: "Rust", slug: "rust", url: "/languages/rust", description: "Compile-time memory safety, ownership borrow checker, and high-performance cargo.", icon: "🦀" },
  kotlin: { name: "Kotlin", slug: "kotlin", url: "/languages/kotlin", description: "Concise type-safe language for Android development and modern JVM apps.", icon: "🎯" },
  swift: { name: "Swift", slug: "swift", url: "/languages/swift", description: "Native iOS, iPadOS, and macOS development with type-safe modern Swift.", icon: "🕊️" },
  dart: { name: "Dart", slug: "dart", url: "/languages/dart", description: "Multi-platform client-optimized language powering Flutter applications.", icon: "🎯" },
  php: { name: "PHP", slug: "php", url: "/languages/php", description: "Server-side web development, Laravel framework, and RESTful API APIs.", icon: "🐘" },
  ruby: { name: "Ruby", slug: "ruby", url: "/languages/ruby", description: "Dynamic object-oriented programming, metaprogramming, and Ruby on Rails.", icon: "💎" },
  shell: { name: "Shell / Bash", slug: "shell", url: "/languages/shell", description: "Linux terminal commands, shell scripts, CLI automation, and pipes.", icon: "💻" },
  solidity: { name: "Solidity", slug: "solidity", url: "/languages/solidity", description: "Smart contract development for Ethereum Virtual Machine (EVM) blockchains.", icon: "⯁" },
  zig: { name: "Zig", slug: "zig", url: "/languages/zig", description: "Next-gen systems programming language for fast, maintainable software.", icon: "⚡" }
};

export function detectRelatedSiteLanguage(data: { label: string; description?: string; relatedLanguage?: string }): SiteLanguageLink | null {
  if (data.relatedLanguage && SITE_LANGUAGES_MAP[data.relatedLanguage.toLowerCase()]) {
    return SITE_LANGUAGES_MAP[data.relatedLanguage.toLowerCase()];
  }

  const text = `${data.label} ${data.description || ''}`.toLowerCase();

  if (text.includes("python")) return SITE_LANGUAGES_MAP.python;
  if (text.includes("typescript") || text.includes(" ts ")) return SITE_LANGUAGES_MAP.typescript;
  if (text.includes("javascript") || text.includes(" js ") || text.includes("ecmascript")) return SITE_LANGUAGES_MAP.javascript;
  if (text.includes("html") || text.includes("semantic html")) return SITE_LANGUAGES_MAP.html;
  if (text.includes("css") || text.includes("flexbox") || text.includes("grid")) return SITE_LANGUAGES_MAP.css;
  if (text.includes("sql") || text.includes("postgresql") || text.includes("mysql") || text.includes("relational db")) return SITE_LANGUAGES_MAP.sql;
  if (text.includes("c++") || text.includes("cpp")) return SITE_LANGUAGES_MAP.cplusplus;
  if (text.includes("c#") || text.includes("csharp") || text.includes(".net")) return SITE_LANGUAGES_MAP.csharp;
  if (text.includes("java") && !text.includes("javascript")) return SITE_LANGUAGES_MAP.java;
  if (text.includes("golang") || text.includes(" go ") || text.includes("go language")) return SITE_LANGUAGES_MAP.go;
  if (text.includes("rust")) return SITE_LANGUAGES_MAP.rust;
  if (text.includes("kotlin")) return SITE_LANGUAGES_MAP.kotlin;
  if (text.includes("swift")) return SITE_LANGUAGES_MAP.swift;
  if (text.includes("dart") || text.includes("flutter")) return SITE_LANGUAGES_MAP.dart;
  if (text.includes("php")) return SITE_LANGUAGES_MAP.php;
  if (text.includes("ruby")) return SITE_LANGUAGES_MAP.ruby;
  if (text.includes("bash") || text.includes("shell") || text.includes("terminal")) return SITE_LANGUAGES_MAP.shell;
  if (text.includes("solidity") || text.includes("smart contract")) return SITE_LANGUAGES_MAP.solidity;
  if (text.includes("zig")) return SITE_LANGUAGES_MAP.zig;
  if (text.includes(" c ") || text.startsWith("c ")) return SITE_LANGUAGES_MAP.c;

  return null;
}

const roadmapsDirectory = path.join(process.cwd(), 'src/content/roadmaps');
const roadmapContentDirectory = path.join(process.cwd(), 'public/roadmap-content');

export const DOMAIN_CHAPTER_DEFINITIONS: Record<string, { label: string; topicIds: string[] }[]> = {
  'frontend': [
    { label: 'Foundations & Semantic Web', topicIds: ['html', 'css', 'javascript'] },
    { label: 'Modern Tooling & Type Systems', topicIds: ['git', 'typescript', 'tailwind'] },
    { label: 'Component Architecture & State', topicIds: ['react', 'state-management'] },
    { label: 'Production Systems & Quality', topicIds: ['nextjs', 'testing'] },
  ],
  'backend': [
    { label: 'Runtimes & Persistence', topicIds: ['language', 'relational-db'] },
    { label: 'Network APIs & Caching', topicIds: ['nosql-cache', 'api-architecture'] },
    { label: 'Distributed Systems & Scale', topicIds: ['authentication', 'message-queues', 'docker-containers'] },
  ],
  'machine-learning': [
    { label: 'Mathematical & Data Foundations', topicIds: ['math-foundations', 'python-data'] },
    { label: 'Predictive Modeling & Neural Nets', topicIds: ['classical-ml', 'deep-learning'] },
    { label: 'Modern LLM & Generative Systems', topicIds: ['transformers-llms', 'inference-engineering'] },
  ],
  'full-stack': [
    { label: 'Client-Side Engineering', topicIds: ['web-foundation', 'frontend-core'] },
    { label: 'Server & Database Architecture', topicIds: ['backend-core', 'database-persistence'] },
    { label: 'Caching & Cloud Operations', topicIds: ['caching-layer', 'cloud-devops'] },
  ],
  'devops': [
    { label: 'Automation & CI/CD Pipelines', topicIds: ['linux-shell', 'git-ci'] },
    { label: 'Containers & Infrastructure as Code', topicIds: ['docker', 'terraform'] },
    { label: 'Orchestration & Site Observability', topicIds: ['kubernetes', 'observability'] },
  ],
  'cybersecurity': [
    { label: 'Systems & Network Foundations', topicIds: ['networking-protocols', 'os-security'] },
    { label: 'Application Defense & Cryptography', topicIds: ['web-security', 'cryptography'] },
    { label: 'Offensive & Defensive Operations', topicIds: ['pentesting', 'soc-defense'] },
  ],
  'mobile-development': [
    { label: 'Cross-Platform & iOS Paradigms', topicIds: ['cross-platform', 'native-ios'] },
    { label: 'Android Systems & Local Storage', topicIds: ['native-android', 'mobile-data'] },
    { label: 'Hardware Integration & App Release', topicIds: ['device-hardware'] },
  ],
  'game-development': [
    { label: '3D Mathematics & Engine Core', topicIds: ['game-math', 'game-engine'] },
    { label: 'Graphics Pipeline & Shaders', topicIds: ['graphics-shaders'] },
    { label: 'Game AI & Engine Optimization', topicIds: ['game-ai-systems', 'game-optimization'] },
  ],
  'embedded-systems': [
    { label: 'Low-Level Silicon & Embedded C', topicIds: ['embedded-c', 'mcu-arch'] },
    { label: 'Hardware Bus Protocols', topicIds: ['peripherals-comm'] },
    { label: 'Real-Time Kernels & HW Debugging', topicIds: ['rtos', 'hardware-debug'] },
  ],
};

let allRoadmapsCache: Roadmap[];

function getTopicCountFromJson(slug: string): { topicCount: number; chapterCount: number } {
    try {
        const filePath = path.join(roadmapContentDirectory, `${slug}.json`);
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            const nodes = data.nodes || [];
            const topicCount = nodes.filter((n: any) =>
                n.type !== 'section' && n.type !== 'info' && n.type !== 'label'
            ).length;

            const domainChapters = DOMAIN_CHAPTER_DEFINITIONS[slug];
            const chapterCount = domainChapters ? domainChapters.length : Math.max(1, Math.ceil(topicCount / 3));

            return { topicCount, chapterCount };
        }
    } catch {
        // silently fail
    }
    return { topicCount: 0, chapterCount: 0 };
}

function fetchAllRoadmaps(): Roadmap[] {
    if (allRoadmapsCache) {
        return allRoadmapsCache;
    }

    try {
        const fileNames = fs.readdirSync(roadmapsDirectory);
        const allRoadmapsData: Roadmap[] = fileNames.map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(roadmapsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            const frontmatter = matterResult.data as Omit<Roadmap, 'slug' | 'content' | 'url'>;
            const counts = getTopicCountFromJson(slug);

            return {
                ...frontmatter,
                slug: slug,
                content: matterResult.content,
                url: `/roadmaps/${slug}`,
                topicCount: counts.topicCount,
                chapterCount: counts.chapterCount,
            } as Roadmap;
        });
        
        allRoadmapsCache = allRoadmapsData.sort((a, b) => a.order - b.order);
        return allRoadmapsCache;

    } catch (error) {
        console.error("Could not read roadmaps directory:", error);
        return [];
    }
}

export function getAllRoadmaps(): Roadmap[] {
  return fetchAllRoadmaps();
}

export function getRoadmapBySlug(slug: string): Roadmap | undefined {
  return fetchAllRoadmaps().find(roadmap => roadmap.slug === slug);
}

/**
 * Parse a roadmap JSON into structured chapters with ordered topics.
 * Uses curated domain chapter definitions when available, or groups topics logically.
 */
export function parseRoadmapChapters(
  roadmapData: { nodes: any[]; edges: any[] },
  slug?: string
): RoadmapChapter[] {
  const { nodes } = roadmapData;

  const topicNodes = nodes.filter(n =>
    n.type !== 'section' && n.type !== 'info' && n.type !== 'label'
  );

  const topicMap = new Map<string, RoadmapTopic>();
  for (const n of topicNodes) {
    topicMap.set(n.id, {
      id: n.id,
      label: n.data?.label || n.id,
      description: n.data?.description,
      status: n.data?.status,
      codeSnippet: n.data?.codeSnippet,
      prerequisites: n.data?.prerequisites,
      resources: n.data?.resources,
      relatedLanguage: n.data?.relatedLanguage,
    });
  }

  // Check for curated domain chapters
  const domainDefs = slug ? DOMAIN_CHAPTER_DEFINITIONS[slug] : undefined;
  if (domainDefs && domainDefs.length > 0) {
    const chapters: RoadmapChapter[] = [];
    const usedIds = new Set<string>();

    domainDefs.forEach((def, index) => {
      const chapterTopics: RoadmapTopic[] = [];
      for (const tid of def.topicIds) {
        const found = topicMap.get(tid);
        if (found) {
          chapterTopics.push(found);
          usedIds.add(tid);
        }
      }
      if (chapterTopics.length > 0) {
        chapters.push({
          id: `chapter-${index + 1}`,
          label: def.label,
          topics: chapterTopics,
        });
      }
    });

    // Any leftover topics not in definition:
    const leftover = topicNodes.filter(n => !usedIds.has(n.id));
    if (leftover.length > 0) {
      chapters.push({
        id: `chapter-${chapters.length + 1}`,
        label: 'Advanced & Specialized Topics',
        topics: leftover.map(n => topicMap.get(n.id)!),
      });
    }

    if (chapters.length > 0) {
      return chapters;
    }
  }

  // If there are multiple explicit section nodes in the data
  const sections = nodes.filter(n => n.type === 'section');
  if (sections.length > 1) {
    const sortedTopics = [...topicNodes].sort((a, b) => a.position.y - b.position.y);
    const sortedSections = [...sections].sort((a, b) => a.position.y - b.position.y);
    const chapters: RoadmapChapter[] = [];

    for (let i = 0; i < sortedSections.length; i++) {
      const section = sortedSections[i];
      const nextSection = sortedSections[i + 1];

      const chapterTopics = sortedTopics.filter(t => {
        const afterCurrent = t.position.y >= section.position.y;
        const beforeNext = nextSection ? t.position.y < nextSection.position.y : true;
        return afterCurrent && beforeNext;
      });

      if (chapterTopics.length > 0) {
        chapters.push({
          id: section.id,
          label: section.data?.label || `Chapter ${i + 1}`,
          topics: chapterTopics.map(n => topicMap.get(n.id)!),
        });
      }
    }

    if (chapters.length > 0) {
      return chapters;
    }
  }

  // Fallback: auto-chunk topics into groups of 3
  const sortedTopics = [...topicNodes].sort((a, b) => a.position.y - b.position.y);
  const CHUNK_SIZE = 3;
  const chapters: RoadmapChapter[] = [];
  const titles = [
    'Foundations & Core Principles',
    'Applied Architecture & Patterns',
    'Production Systems & Scale',
    'Advanced Techniques & Optimization',
    'Ecosystem & Next Steps'
  ];

  for (let i = 0; i < sortedTopics.length; i += CHUNK_SIZE) {
    const chunkIndex = Math.floor(i / CHUNK_SIZE);
    const chunkTopics = sortedTopics.slice(i, i + CHUNK_SIZE);
    chapters.push({
      id: `chapter-${chunkIndex + 1}`,
      label: titles[chunkIndex] || `Chapter ${chunkIndex + 1}: Further Exploration`,
      topics: chunkTopics.map(n => topicMap.get(n.id)!),
    });
  }

  return chapters;
}

export function getAllRoadmapTopics(): { roadmapSlug: string; topicId: string }[] {
  const roadmaps = getAllRoadmaps();
  const all: { roadmapSlug: string; topicId: string }[] = [];
  for (const r of roadmaps) {
    try {
      const filePath = path.join(roadmapContentDirectory, `${r.slug}.json`);
      if (fs.existsSync(filePath)) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const topicNodes = (data.nodes || []).filter((n: any) =>
          n.type !== 'section' && n.type !== 'info' && n.type !== 'label'
        );
        for (const t of topicNodes) {
          all.push({ roadmapSlug: r.slug, topicId: t.id });
        }
      }
    } catch {
      // ignore
    }
  }
  return all;
}

export interface RoadmapTopicDetailsResult {
  roadmap: Roadmap;
  chapter: RoadmapChapter;
  topic: RoadmapTopic;
  chapterIndex: number;
  topicIndexInChapter: number;
  totalTopics: number;
  currentPosition: number;
  prevTopic: { topic: RoadmapTopic; chapter: RoadmapChapter; chIndex: number; indexInCh: number } | null;
  nextTopic: { topic: RoadmapTopic; chapter: RoadmapChapter; chIndex: number; indexInCh: number } | null;
  relatedLanguage: SiteLanguageLink | null;
  inHouseLessons: InHouseLesson[];
  inHouseProjects: InHouseProjectItem[];
  inHouseMath: InHouseMathLink[];
  architectureTenets: CodexArchitectureTenet[];
  masteryQuiz: CodexQuizQuestion[];
  editorialSummary: EditorialSummary;
  productionChecklist: ProductionChecklistItem[];
  complexityBlueprint: ComplexityBlueprint;
  awesomeTools: AwesomeToolItem[];
}

export function resolveInHouseLessons(
  topicId: string,
  relatedLang: SiteLanguageLink | null,
  topicLabel: string
): InHouseLesson[] {
  const tid = topicId.toLowerCase();
  const label = topicLabel.toLowerCase();

  // Curated deep modules for CSS
  if (tid === 'css' || label.includes('css') || label.includes('flexbox') || label.includes('grid')) {
    return [
      {
        title: 'Flexbox Layout & 1D Alignment',
        description: 'Main vs cross axis distribution, flex-grow/shrink ratios, auto margins, and wrapping mechanics.',
        slug: 'flexbox',
        url: '/languages/css/flexbox',
        badge: 'Interactive Lesson',
        readTime: '5 min read',
      },
      {
        title: 'CSS Grid 2D Orchestration',
        description: 'Two-dimensional grid tracks, fractional units (fr), minmax(), explicit template areas, and auto-placement.',
        slug: 'grid',
        url: '/languages/css/grid',
        badge: 'Core Architecture',
        readTime: '7 min read',
      },
      {
        title: 'Advanced Grid & Subgrid',
        description: 'Nested card alignment, named line positioning, responsive card decks, and subgrid track inheritance.',
        slug: 'grid-mastery',
        url: '/languages/css/grid-mastery',
        badge: 'Deep Dive',
        readTime: '8 min read',
      },
      {
        title: 'Custom Properties & Design Tokens',
        description: 'Runtime theme switching, CSS variable inheritance, dynamic math calculations, and design token scales.',
        slug: 'custom-properties',
        url: '/languages/css/custom-properties',
        badge: 'Design Systems',
        readTime: '6 min read',
      },
      {
        title: 'Container Queries (@container)',
        description: 'Context-aware responsive styling decoupled from global viewport widths for modular component libraries.',
        slug: 'container-queries',
        url: '/languages/css/container-queries',
        badge: 'Modern Standard',
        readTime: '6 min read',
      },
      {
        title: 'Responsive Design & Fluid Sizing',
        description: 'Mobile-first breakpoint architecture, fluid clamp() formulas, and modern viewport units (dvh, svh, lvh).',
        slug: 'responsive-design',
        url: '/languages/css/responsive-design',
        badge: 'Production Guide',
        readTime: '6 min read',
      },
      {
        title: 'The Modern Box Model & Sizing',
        description: 'box-sizing: border-box mechanics, padding bounds, margin collapsing, and stacking context formation.',
        slug: 'box-model',
        url: '/languages/css/box-model',
        badge: 'Foundations',
        readTime: '4 min read',
      },
      {
        title: 'Animations & GPU Compositing',
        description: 'GPU-accelerated transforms, opacity transitions, @keyframes, cubic-bezier timing curves, and 60fps rendering.',
        slug: 'animations-transitions',
        url: '/languages/css/animations-transitions',
        badge: 'Performance',
        readTime: '7 min read',
      },
    ];
  }

  // Curated deep modules for HTML
  if (tid === 'html' || label.includes('html') || label.includes('semantic')) {
    return [
      {
        title: 'Semantic HTML5 Elements',
        description: 'Accessible document outlines using <main>, <article>, <section>, <nav>, <aside>, and meaningful tag hierarchies.',
        slug: 'semantic-elements',
        url: '/languages/html/semantic-elements',
        badge: 'Core Standard',
        readTime: '5 min read',
      },
      {
        title: 'Accessibility (A11y) & ARIA',
        description: 'WCAG compliance, landmark roles, accessible names, keyboard focus trap management, and screen-reader readiness.',
        slug: 'accessibility',
        url: '/languages/html/accessibility',
        badge: 'Production A11y',
        readTime: '7 min read',
      },
      {
        title: 'SEO & Social Graph Metadata',
        description: 'Open Graph protocols, Twitter Cards, canonical link tags, viewport directives, and search engine crawling controls.',
        slug: 'seo-meta',
        url: '/languages/html/seo-meta',
        badge: 'SEO Masterclass',
        readTime: '6 min read',
      },
      {
        title: 'HTML Document Structure & Head',
        description: 'Doctype standards, character encoding, preload/prefetch hints, and script execution sequencing (defer/async).',
        slug: 'html-document-structure',
        url: '/languages/html/html-document-structure',
        badge: 'Foundations',
        readTime: '5 min read',
      },
      {
        title: 'Forms & Native Validation',
        description: 'Client-side constraint validation APIs, accessible labels, specialized input types, and robust submission UX.',
        slug: 'forms',
        url: '/languages/html/forms',
        badge: 'Interactive Forms',
        readTime: '6 min read',
      },
      {
        title: 'Web Components & Shadow DOM',
        description: 'Custom elements, Shadow DOM encapsulation, HTML templates, and framework-agnostic component engineering.',
        slug: 'web-components',
        url: '/languages/html/web-components',
        badge: 'Modular Architecture',
        readTime: '8 min read',
      },
    ];
  }

  // Curated deep modules for JavaScript
  if (tid === 'javascript' || label.includes('javascript') || label.includes('es6')) {
    return [
      {
        title: 'The Event Loop & Concurrency',
        description: 'Call stack execution, microtask queue (Promises), macrotask queue (I/O, setTimeout), and non-blocking runtime.',
        slug: 'event-loop',
        url: '/languages/javascript/event-loop',
        badge: 'Core Runtime',
        readTime: '8 min read',
      },
      {
        title: 'Async/Await & Structured Concurrency',
        description: 'Modern asynchronous control flow, error propagation, Promise.allSettled, and AbortController cancellation.',
        slug: 'async-await',
        url: '/languages/javascript/async-await',
        badge: 'Async Patterns',
        readTime: '7 min read',
      },
      {
        title: 'High-Performance DOM Manipulation',
        description: 'DocumentFragments, event delegation, layout thrashing prevention, MutationObservers, and batched render cycles.',
        slug: 'dom-manipulation',
        url: '/languages/javascript/dom-manipulation',
        badge: 'Browser Engine',
        readTime: '6 min read',
      },
      {
        title: 'Prototypes & Object Model',
        description: 'Prototype delegation chain, Object.create, property descriptors, and modern ES6 class desugaring.',
        slug: 'prototypes',
        url: '/languages/javascript/prototypes',
        badge: 'Object Mechanics',
        readTime: '7 min read',
      },
      {
        title: 'ES6 Module Architecture (ESM)',
        description: 'Static imports, dynamic import(), tree-shaking, circular dependencies, and ESM vs CommonJS interop.',
        slug: 'modules',
        url: '/languages/javascript/modules',
        badge: 'Tooling & Bundling',
        readTime: '5 min read',
      },
      {
        title: 'Memory Management & Garbage Collection',
        description: 'V8 memory spaces, generational mark-and-sweep, memory leaks from closures/timers, and heap profiling.',
        slug: 'memory-gc',
        url: '/languages/javascript/memory-gc',
        badge: 'Performance',
        readTime: '7 min read',
      },
    ];
  }

  // Curated deep modules for TypeScript
  if (tid === 'typescript' || label.includes('typescript') || label.includes('type system')) {
    return [
      {
        title: 'Generics & Polymorphism',
        description: 'Generic constraints (T extends U), default type parameters, and reusable high-order type abstractions.',
        slug: 'generics',
        url: '/languages/typescript/generics',
        badge: 'Type Systems',
        readTime: '7 min read',
      },
      {
        title: 'Type Narrowing & Discriminated Unions',
        description: 'Tagged unions, user-defined type predicates (arg is Type), exhaustive switch verification, and typeof guards.',
        slug: 'type-guards',
        url: '/languages/typescript/type-guards',
        badge: 'Runtime Safety',
        readTime: '6 min read',
      },
      {
        title: 'Advanced Utility Types',
        description: 'Deep dives into Pick, Omit, Partial, Required, Record, ReturnType, Parameters, and conditional utility types.',
        slug: 'utility-types',
        url: '/languages/typescript/utility-types',
        badge: 'Metaprogramming',
        readTime: '6 min read',
      },
      {
        title: 'Conditional & Mapped Types',
        description: 'T extends U ? X : Y patterns, distributive conditional types, infer keyword, and key remapping via as.',
        slug: 'conditional-types',
        url: '/languages/typescript/conditional-types',
        badge: 'Advanced Types',
        readTime: '8 min read',
      },
      {
        title: 'Production Tsconfig Architecture',
        description: 'strict: true, noImplicitAny, exactOptionalPropertyTypes, project references, and build performance tuning.',
        slug: 'tsconfig-json',
        url: '/languages/typescript/tsconfig-json',
        badge: 'Architecture',
        readTime: '5 min read',
      },
    ];
  }

  // Curated deep modules for Python
  if (tid.includes('python') || label.includes('python')) {
    return [
      {
        title: 'Python Data Structures & Hash Tables',
        description: 'Lists, dictionaries, sets, memory layouts, collision handling, and algorithmic Big-O characteristics.',
        slug: 'dictionaries',
        url: '/languages/python/dictionaries',
        badge: 'Data Structures',
        readTime: '6 min read',
      },
      {
        title: 'Decorators & Metaprogramming',
        description: 'First-class function wrappers, @functools.wraps, parameterized decorators, and cross-cutting concerns.',
        slug: 'decorators',
        url: '/languages/python/decorators',
        badge: 'Design Patterns',
        readTime: '7 min read',
      },
      {
        title: 'Asyncio & Coroutines',
        description: 'Non-blocking I/O event loops, async def, await, asyncio.gather, and asynchronous context managers.',
        slug: 'asyncio-event-loop',
        url: '/languages/python/asyncio-event-loop',
        badge: 'Concurrency',
        readTime: '8 min read',
      },
      {
        title: 'OOP Architecture & Data Classes',
        description: 'Dunder methods (__repr__, __eq__, __hash__), @dataclass, slots for memory efficiency, and ABCs.',
        slug: 'classes-objects',
        url: '/languages/python/classes-objects',
        badge: 'OOP Design',
        readTime: '6 min read',
      },
      {
        title: 'Generators & Stream Processing',
        description: 'yield, generator expressions, pipeline processing of large datasets without exhausting system memory.',
        slug: 'generators',
        url: '/languages/python/generators',
        badge: 'Data Streaming',
        readTime: '6 min read',
      },
    ];
  }

  // Curated deep modules for SQL & Relational Databases
  if (tid === 'relational-db' || tid === 'database-persistence' || label.includes('database') || label.includes('sql')) {
    return [
      {
        title: 'Indexing Optimization & B-Tree Execution',
        description: 'B-tree index architectures, multi-column composite indexes, covering indexes, and EXPLAIN ANALYZE interpretation.',
        slug: 'indexing-optimization',
        url: '/languages/sql/indexing-optimization',
        badge: 'Performance & Scale',
        readTime: '7 min read',
      },
      {
        title: 'ACID Transactions & Concurrency Isolation',
        description: 'Read Committed vs Repeatable Read vs Serializable, phantom reads, write skew, and deadlock resolution.',
        slug: 'transactions',
        url: '/languages/sql/transactions',
        badge: 'Core Reliability',
        readTime: '8 min read',
      },
      {
        title: 'Advanced Joins & Query Plans',
        description: 'Nested loops, hash joins, merge joins, Cartesian products, and cost-based optimizer heuristics.',
        slug: 'joins',
        url: '/languages/sql/joins',
        badge: 'Query Engine',
        readTime: '6 min read',
      },
      {
        title: 'Window Functions & Analytical SQL',
        description: 'OVER clauses, PARTITION BY, sliding frame windows, RANK(), DENSE_RANK(), and cumulative aggregations.',
        slug: 'window-functions',
        url: '/languages/sql/window-functions',
        badge: 'Advanced SQL',
        readTime: '6 min read',
      },
      {
        title: 'CTEs & Recursive Hierarchy Traversals',
        description: 'Common table expressions, WITH RECURSIVE, organizational trees, graph traversals, and query readability.',
        slug: 'ctes-recursive-queries',
        url: '/languages/sql/ctes-recursive-queries',
        badge: 'Data Structures',
        readTime: '5 min read',
      },
    ];
  }

  // Curated deep modules for Linux & Shell
  if (tid === 'linux-shell' || tid === 'bash' || label.includes('linux') || label.includes('shell')) {
    return [
      {
        title: 'Linux Process Management & Systemd',
        description: 'Process trees, signals (SIGTERM, SIGKILL), nice values, systemd unit services, and memory limits.',
        slug: 'process-management',
        url: '/languages/shell/process-management',
        badge: 'Kernel Internals',
        readTime: '7 min read',
      },
      {
        title: 'Unix I/O Redirection & Pipe Streams',
        description: 'Standard streams (stdin, stdout, stderr), file descriptors (0, 1, 2), named pipes, and subshell pipelines.',
        slug: 'i-o-redirection',
        url: '/languages/shell/i-o-redirection',
        badge: 'Core Unix',
        readTime: '6 min read',
      },
      {
        title: 'Sed & Awk Text Processing',
        description: 'Stream editing, pattern scanning, field delimiters, AWK associative arrays, and high-speed data parsing.',
        slug: 'sed-awk',
        url: '/languages/shell/sed-awk',
        badge: 'Data Wrangling',
        readTime: '7 min read',
      },
      {
        title: 'Regular Expressions & Grep Mastery',
        description: 'PCRE syntax, capture groups, lookaheads, ripgrep performance, and log searching at scale.',
        slug: 'grep-regular-expressions',
        url: '/languages/shell/grep-regular-expressions',
        badge: 'CLI Mastery',
        readTime: '6 min read',
      },
    ];
  }

  // Curated deep modules for Go & Concurrency
  if (tid === 'language' || tid === 'go' || label.includes('go ') || label.includes('golang')) {
    return [
      {
        title: 'Goroutines & M:N Work-Stealing Runtime',
        description: 'Lightweight user-space threads (2KB initial stack), Go runtime scheduler (G, M, P), and cooperative preemption.',
        slug: 'goroutines',
        url: '/languages/go/goroutines',
        badge: 'Concurrency Engine',
        readTime: '7 min read',
      },
      {
        title: 'Channels & CSP Communication',
        description: 'Buffered vs unbuffered channels, select statements, channel closing semantics, and deadlock prevention.',
        slug: 'channels',
        url: '/languages/go/channels',
        badge: 'Architecture',
        readTime: '8 min read',
      },
      {
        title: 'Context Propagation & Cancellation',
        description: 'context.WithTimeout, context.WithCancel, request-scoped metadata, and clean microservice shutdown.',
        slug: 'context',
        url: '/languages/go/context',
        badge: 'Production Go',
        readTime: '6 min read',
      },
      {
        title: 'Low-Level Synchronization (sync Package)',
        description: 'sync.Mutex, sync.RWMutex, atomic operations, sync.Pool memory recycling, and race detector tooling.',
        slug: 'sync-package',
        url: '/languages/go/sync-package',
        badge: 'Low-Level Concurrency',
        readTime: '7 min read',
      },
    ];
  }

  // Dynamic fallback: read from related language's topics in Nocturnal Codex
  if (relatedLang) {
    try {
      const langData = getLanguageBySlug(relatedLang.slug);
      if (langData && langData.topics) {
        const lessons: InHouseLesson[] = [];
        for (const section of langData.topics) {
          for (const item of section.items) {
            if (item.slug && !item.link) {
              lessons.push({
                title: item.title,
                description: item.description || `Master ${item.title} with interactive Nocturnal Codex in-house tutorials.`,
                slug: item.slug,
                url: `/languages/${relatedLang.slug}/${item.slug}`,
                badge: section.section || 'In-House Lesson',
                readTime: '5 min read',
              });
              if (lessons.length >= 6) return lessons;
            }
          }
        }
        if (lessons.length > 0) return lessons;
      }
    } catch {
      // fallback
    }
  }

  return [];
}

export function resolveInHouseProjects(
  relatedLang: SiteLanguageLink | null,
  topicLabel: string
): InHouseProjectItem[] {
  let langKey = relatedLang ? relatedLang.slug : '';

  if (!langKey) {
    const lbl = topicLabel.toLowerCase();
    if (lbl.includes('css') || lbl.includes('style') || lbl.includes('flex') || lbl.includes('grid')) langKey = 'css';
    else if (lbl.includes('html') || lbl.includes('markup')) langKey = 'html';
    else if (lbl.includes('javascript') || lbl.includes('react') || lbl.includes('node')) langKey = 'javascript';
    else if (lbl.includes('typescript')) langKey = 'typescript';
    else if (lbl.includes('python') || lbl.includes('data')) langKey = 'python';
    else if (lbl.includes('go') || lbl.includes('golang')) langKey = 'go';
    else if (lbl.includes('rust')) langKey = 'rust';
    else if (lbl.includes('sql') || lbl.includes('database')) langKey = 'sql';
  }

  if (langKey) {
    try {
      const projects = getProjectsByLanguage(langKey);
      if (projects && projects.length > 0) {
        return projects.slice(0, 3).map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          difficulty: p.difficulty,
          tags: p.tags || [langKey.toUpperCase()],
          repoUrl: p.repoUrl,
          goodFirstIssuesUrl: p.goodFirstIssuesUrl,
        }));
      }
    } catch {
      // ignore
    }
  }

  return [];
}

export function resolveInHouseMath(roadmapSlug: string, topicId: string): InHouseMathLink[] {
  const rs = roadmapSlug.toLowerCase();
  const tid = topicId.toLowerCase();

  if (rs === 'machine-learning' || tid.includes('math') || tid.includes('data')) {
    return [
      {
        title: 'Linear Algebra for Machine Learning',
        slug: 'linear-algebra',
        url: '/mathematics/linear-algebra',
        description: 'Vector spaces, matrix decomposition, singular value decomposition (SVD), and principal component analysis.',
      },
      {
        title: 'Neural Network Mathematics & Calculus',
        slug: 'neural-networks',
        url: '/mathematics/neural-networks',
        description: 'Multivariate chain rule, computational graphs, backpropagation calculus, and loss gradient dynamics.',
      },
      {
        title: 'Probability & Statistical Inference',
        slug: 'probability-statistics',
        url: '/mathematics/probability-statistics',
        description: 'Bayesian conditioning, probability distributions, expectations, variance, and maximum likelihood estimation.',
      },
      {
        title: 'Optimization Theory & Gradient Descent',
        slug: 'optimization-theory',
        url: '/mathematics/optimization-theory',
        description: 'Convex optimization, Lagrange multipliers, stochastic gradient descent (SGD), momentum, and Adam.',
      },
    ];
  }

  if (rs === 'game-development' || tid.includes('game-math')) {
    return [
      {
        title: '3D Geometry & Linear Transformations',
        slug: 'linear-algebra',
        url: '/mathematics/linear-algebra',
        description: 'Affine transformation matrices, quaternions for gimbal-lock-free rotation, vector dot/cross products.',
      },
    ];
  }

  if (rs === 'cybersecurity' || tid.includes('crypto')) {
    return [
      {
        title: 'Advanced Cryptography & Number Theory',
        slug: 'advanced-cryptography',
        url: '/mathematics/advanced-cryptography',
        description: 'Elliptic curve arithmetic, modular algebra, RSA prime generation, zero-knowledge proofs, and hash functions.',
      },
    ];
  }

  return [];
}

export function resolveArchitectureTenets(
  topicId: string,
  topicLabel: string,
  roadmapSlug: string
): CodexArchitectureTenet[] {
  const tid = topicId.toLowerCase();
  const lbl = topicLabel.toLowerCase();

  if (tid === 'css' || lbl.includes('css') || lbl.includes('flexbox') || lbl.includes('grid')) {
    return [
      {
        ruleNumber: 1,
        title: 'Strict Layout Separation: 2D Grid vs 1D Flexbox',
        principle: 'Use CSS Grid for two-dimensional page containers and card decks; reserve Flexbox strictly for one-dimensional inline distributions (navbars, tags, toolbars).',
        rationale: 'Forcing Flexbox into multi-row grid emulation requires fragile negative margin hacks and breaks equal-height column alignments on wrap.',
      },
      {
        ruleNumber: 2,
        title: 'Tokenized Variable-First Theming',
        principle: 'Declare all design variables (colors, radii, spacing, elevations) as CSS Custom Properties at the :root and [data-theme] level.',
        rationale: 'Provides instantaneous runtime theme switching without stylesheet reloads or class churn, and allows nested component-level property overrides.',
      },
      {
        ruleNumber: 3,
        title: 'Context-Agnostic Modular Components with @container',
        principle: 'Prefer container queries (@container) over global viewport media queries for reusable UI components.',
        rationale: 'Components should respond to the width of their container, allowing the same card to look compact in a sidebar and expansive in a main grid.',
      },
      {
        ruleNumber: 4,
        title: 'Compositor-Only Hardware Acceleration',
        principle: 'Only animate transform and opacity. Never animate layout-triggering properties like width, height, top, or margin.',
        rationale: 'Transform and opacity execute on the GPU compositor thread without forcing CPU layout recalculations (reflow) or paint cycles, ensuring solid 60/120fps.',
      },
    ];
  }

  if (tid === 'html' || lbl.includes('html') || lbl.includes('semantic')) {
    return [
      {
        ruleNumber: 1,
        title: 'Semantic Landmarks Over Generic Containers',
        principle: 'Structure views with <header>, <main>, <nav>, <section>, <article>, and <footer> instead of arbitrary <div> wrappers.',
        rationale: 'Search engine crawlers and screen readers rely on landmarks to parse document hierarchy and surface relevant navigation skip links.',
      },
      {
        ruleNumber: 2,
        title: 'The First Rule of ARIA: Use Native Elements',
        principle: 'Always prefer native interactive elements (<button>, <dialog>, <input>) over custom <div> elements augmented with ARIA roles.',
        rationale: 'Native elements come with keyboard focus management, Enter/Space key triggers, and accessibility tree integration without manual scripting.',
      },
      {
        ruleNumber: 3,
        title: 'Non-Blocking Critical Rendering Path',
        principle: 'Keep critical CSS above the fold, preload vital fonts, and load all secondary scripts with defer or async.',
        rationale: 'Eliminates render-blocking network round-trips and guarantees First Contentful Paint (FCP) occurs under 1.2 seconds on mobile networks.',
      },
      {
        ruleNumber: 4,
        title: 'Zero Layout Shift via Explicit Media Ratios',
        principle: 'Always supply explicit width/height attributes or CSS aspect-ratio properties on all images, video frames, and dynamic embeds.',
        rationale: 'Prevents Cumulative Layout Shift (CLS) penalties by allowing browser engines to reserve viewport space before media assets finish downloading.',
      },
    ];
  }

  if (tid === 'javascript' || lbl.includes('javascript') || lbl.includes('es6')) {
    return [
      {
        ruleNumber: 1,
        title: 'Respect Microtask Queue Precedence',
        principle: 'Remember that Promise callbacks and queueMicrotask drain completely before the runtime executes the next macrotask (setTimeout, setInterval).',
        rationale: 'Misunderstanding event loop queuing leads to subtle concurrency bugs and UI race conditions when synchronizing async state.',
      },
      {
        ruleNumber: 2,
        title: 'Immutable State Transitions in Core Logic',
        principle: 'Treat object and array state as immutable. Use spread syntax, Object.freeze, or structuredClone instead of mutating parameters in-place.',
        rationale: 'In-place state mutation produces unexpected side-effects across caller scopes and invalidates reactive memoization patterns.',
      },
      {
        ruleNumber: 3,
        title: 'Structured Cancellation with AbortController',
        principle: 'Always wire AbortSignal into asynchronous network requests, long polling, and expensive background computations.',
        rationale: 'Prevents unmounted component memory leaks, wasted network bandwidth, and stale asynchronous response overwrites.',
      },
      {
        ruleNumber: 4,
        title: 'Event Delegation for Dynamic Lists',
        principle: 'Attach a single event listener to a common ancestor rather than registering hundreds of individual listeners on dynamic child nodes.',
        rationale: 'Significantly reduces V8 memory footprint, garbage collection pauses, and simplifies DOM manipulation when items are added or removed.',
      },
    ];
  }

  if (tid === 'typescript' || lbl.includes('typescript') || lbl.includes('type system')) {
    return [
      {
        ruleNumber: 1,
        title: 'Model State as Discriminated Unions',
        principle: 'Represent UI and network states as tagged unions ({ status: "loading" } | { status: "success"; data: T }) rather than optional flags.',
        rationale: 'Makes impossible states unrepresentable at compile time and allows TypeScript to exhaustively narrow data payloads in conditional blocks.',
      },
      {
        ruleNumber: 2,
        title: 'Prohibit any; Enforce unknown with Type Guards',
        principle: 'Never use any for unvalidated boundaries (JSON.parse, API fetch). Use unknown and validate via custom predicates or Zod schemas.',
        rationale: 'The any type turns off the type checker entirely, allowing type errors to cascade silently into production runtime exceptions.',
      },
      {
        ruleNumber: 3,
        title: 'Single Source of Truth for Types & Schemas',
        principle: 'Infer TypeScript types directly from runtime validation schemas (z.infer<typeof Schema>) or database models.',
        rationale: 'Eliminates dual-maintenance drift where TypeScript interfaces fail to match actual server payloads.',
      },
      {
        ruleNumber: 4,
        title: 'Unconditional Strict Mode',
        principle: 'Always maintain strict: true, noImplicitAny, and exactOptionalPropertyTypes in production tsconfig.json configurations.',
        rationale: 'Loosening strictness reintroduces the "billion-dollar mistake" of unexpected null and undefined runtime exceptions.',
      },
    ];
  }

  // Fallback production tenets for general engineering topics
  return [
    {
      ruleNumber: 1,
      title: 'Architect for Idempotency & Fault Isolation',
      principle: 'Design components and routines so that duplicate invocations produce identical side effects without corrupting persistent state.',
      rationale: 'Distributed networks, retries, and client reconnections inevitably cause duplicate requests; non-idempotent handlers trigger severe data corruption.',
    },
    {
      ruleNumber: 2,
      title: 'Explicit Failure Boundaries & Observability',
      principle: 'Never swallow exceptions silently. Log structured error context and provide graceful fallbacks at subsystem boundaries.',
      rationale: 'Silently caught errors turn simple debugging tasks into catastrophic production outages with zero diagnostic telemetry.',
    },
    {
      ruleNumber: 3,
      title: 'Minimize Working Set & Allocation Pressure',
      principle: 'Profile memory allocations early. Reuse buffers, stream large datasets, and dispose of unneeded listeners and timers.',
      rationale: 'Excessive object churn triggers frequent garbage collection pauses, leading to visible stutter in UI and latency spikes in backend services.',
    },
    {
      ruleNumber: 4,
      title: 'Decouple Interface Contracts from Concrete Implementations',
      principle: 'Depend upon abstractions and explicit interfaces rather than hard-coded concrete dependencies.',
      rationale: 'Enables painless unit testing with mock implementations and allows swapping underlying libraries without rewriting core domain logic.',
    },
  ];
}

export function resolveMasteryQuiz(topicId: string, topicLabel: string): CodexQuizQuestion[] {
  const tid = topicId.toLowerCase();
  const lbl = topicLabel.toLowerCase();

  if (tid === 'css' || lbl.includes('css') || lbl.includes('flexbox') || lbl.includes('grid')) {
    return [
      {
        question: 'When is it architecturally correct to use CSS Grid over Flexbox?',
        options: [
          'Whenever you need a single horizontal row of navigation links',
          'When designing two-dimensional layouts controlling both columns and rows simultaneously',
          'Flexbox is deprecated in modern CSS specifications, so Grid must always be used',
          'Grid should only be applied to mobile device layouts',
        ],
        correctIndex: 1,
        explanation: 'CSS Grid is a 2D layout system designed to manage both rows and columns simultaneously. Flexbox is optimized for 1D content alignment along a single axis (either row or column).',
      },
      {
        question: 'Why is global "box-sizing: border-box" the universal industry standard in modern front-end development?',
        options: [
          'It forces all elements to render with 3D hardware-accelerated borders',
          'It includes padding and border widths inside the element’s declared width and height, preventing layout breakage',
          'It eliminates the need for CSS margin properties entirely',
          'It automatically centers all elements inside their respective parent containers',
        ],
        correctIndex: 1,
        explanation: 'With standard content-box, adding 20px padding to a 100px element expands its actual rendered width to 140px. With border-box, the declared 100px remains the total outer width, with padding absorbed inside.',
      },
    ];
  }

  if (tid === 'html' || lbl.includes('html') || lbl.includes('semantic')) {
    return [
      {
        question: 'What is the primary architectural drawback of replacing <button> with <div onClick=...> in a web application?',
        options: [
          'Div elements execute JavaScript significantly slower than button tags',
          'Divs lack native keyboard focus, Tab order, Enter/Space activation, and accessibility role announcements out of the box',
          'Web browsers charge extra bandwidth for non-button clickable elements',
          'Modern search engines penalize websites that contain more than 100 divs',
        ],
        correctIndex: 1,
        explanation: 'Native <button> elements provide keyboard navigation (Tab), keyboard triggering (Enter/Space), disabled states, and screen-reader accessibility roles automatically. Divs require manual ARIA attributes and keyboard event handlers to replicate this.',
      },
      {
        question: 'What effect does adding the "defer" attribute have on a <script> tag located in the <head>?',
        options: [
          'It completely blocks HTML parsing until the script has finished downloading and executing',
          'It moves script execution to a background Web Worker thread',
          'It downloads the script in parallel with HTML parsing and executes it in order after the document has finished parsing',
          'It cancels script download if the user is on a metered mobile connection',
        ],
        correctIndex: 2,
        explanation: 'The defer attribute allows the browser to download scripts asynchronously without interrupting HTML parsing, and guarantees execution in document order right before DOMContentLoaded fires.',
      },
    ];
  }

  if (tid === 'javascript' || lbl.includes('javascript') || lbl.includes('es6')) {
    return [
      {
        question: 'In what exact sequence will the logs appear for: console.log("1"); setTimeout(() => console.log("2"), 0); Promise.resolve().then(() => console.log("3")); console.log("4");',
        options: [
          '1, 2, 3, 4',
          '1, 4, 3, 2',
          '1, 4, 2, 3',
          '3, 1, 4, 2',
        ],
        correctIndex: 1,
        explanation: 'Synchronous code runs first (1, 4). The microtask queue (Promise .then) drains immediately after synchronous execution completes (3). Macrotasks (setTimeout) execute on the subsequent event loop tick (2).',
      },
      {
        question: 'What is the consequence of mutating a shared object argument directly inside a utility function in JavaScript?',
        options: [
          'A runtime ReferenceError will be thrown unless "use strict" is disabled',
          'The mutation modifies the original object in the caller’s scope because objects are passed by reference',
          'JavaScript engines automatically spawn a cloned copy in hidden memory',
          'The function becomes asynchronous automatically',
        ],
        correctIndex: 1,
        explanation: 'In JavaScript, non-primitive objects and arrays are passed by reference value. Mutating properties directly modifies the caller’s memory reference, leading to difficult-to-trace state bugs.',
      },
    ];
  }

  // Default questions for other topics
  return [
    {
      question: `What is the core architectural goal when mastering ${topicLabel}?`,
      options: [
        'Memorizing API syntax without understanding underlying runtime behavior',
        'Understanding memory layouts, lifecycle mechanics, and production trade-offs to build resilient systems',
        'Replacing all existing application code with third-party external dependencies',
        'Executing code in an unmonitored environment without automated tests',
      ],
      correctIndex: 1,
      explanation: `Mastering ${topicLabel} requires understanding its runtime behavior, performance implications, and architecture patterns rather than just rote syntax memorization.`,
    },
    {
      question: 'Why should software engineers establish clear boundary interfaces between subsystems?',
      options: [
        'It allows each subsystem to be tested, refactored, and scaled independently without cascading regressions',
        'Boundary interfaces guarantee zero compilation time in all programming languages',
        'Interfaces are only required for enterprise Java applications',
        'It eliminates the need for software documentation',
      ],
      correctIndex: 0,
      explanation: 'Decoupling subsystems behind clear interface boundaries isolates failure modes, enables unit testing with mocks, and prevents tight coupling across modules.',
    },
  ];
}

export function resolveEditorialSummary(
  topicId: string,
  topicLabel: string,
  topicDescription?: string
): EditorialSummary {
  const tid = topicId.toLowerCase();
  const lbl = topicLabel.toLowerCase();

  if (tid === 'css' || lbl.includes('css') || lbl.includes('flexbox') || lbl.includes('grid')) {
    return {
      keyTakeaway:
        'Modern CSS is declarative and layout-engine driven. Modern layout is no longer about floats or positioning hacks; it is about orchestrating CSS Grid for macro structure and Flexbox for micro item distribution.',
      whenToUse:
        'Use CSS Grid for page wrappers, multi-column card galleries, and asymmetric editorial layouts. Use Flexbox for navigation bars, button groups, icon alignments, and centered modal contents.',
      commonPitfalls: [
        'Attempting to align individual flex items using justify-content instead of margin-auto or align-self.',
        'Animating properties like height, width, or top/left which force CPU layout reflows instead of transform and opacity.',
        'Omitting global box-sizing: border-box, leading to sizing miscalculations across nested component wrappers.',
      ],
    };
  }

  if (tid === 'html' || lbl.includes('html') || lbl.includes('semantic')) {
    return {
      keyTakeaway:
        'HTML is the accessibility tree, search engine index, and foundational document object model. Proper semantic elements grant keyboard navigation, ARIA landmarks, and SEO ranking out-of-the-box.',
      whenToUse:
        'Every page view must be anchored by semantic landmark elements (<header>, <main>, <nav>, <footer>) with explicit heading hierarchies (h1 through h6).',
      commonPitfalls: [
        'Replacing <button> or <a> with <div>, losing keyboard navigation and screen-reader accessibility.',
        'Omitting alt attributes on informative images or writing unhelpful alt text like "image.png".',
        'Nesting interactive elements inside other interactive elements (e.g., placing a <button> inside an <a> tag).',
      ],
    };
  }

  if (tid === 'javascript' || lbl.includes('javascript') || lbl.includes('es6')) {
    return {
      keyTakeaway:
        'JavaScript is single-threaded with an asynchronous, non-blocking concurrency model powered by the event loop. Mastering how tasks and microtasks execute is essential for building responsive applications.',
      whenToUse:
        'Leverage native async/await and promises for non-blocking network I/O; leverage pure functions and immutability for predictable application state transitions.',
      commonPitfalls: [
        'Unintentionally creating memory leaks via detached DOM references or forgotten setInterval timers.',
        'Using Array.prototype.forEach with async/await and incorrectly expecting sequential execution.',
        'Relying on loose equality (==) which performs implicit type coercion, leading to truthy/falsy bugs.',
      ],
    };
  }

  return {
    keyTakeaway:
      topicDescription ||
      `Mastering ${topicLabel} provides the foundational mental models, runtime knowledge, and architecture patterns necessary for senior software engineering.`,
    whenToUse:
      `Apply these ${topicLabel} patterns across production projects where scalability, reliability, and code clarity are paramount.`,
    commonPitfalls: [
      'Premature optimization before profiling real-world production metrics.',
      'Treating errors as strings instead of typed, inspectable error objects.',
      'Failing to isolate external side-effects from pure domain logic.',
    ],
  };
}

export function getRoadmapTopicDetails(roadmapSlug: string, topicId: string): RoadmapTopicDetailsResult | null {
  const roadmap = getRoadmapBySlug(roadmapSlug);
  if (!roadmap) return null;

  try {
    const filePath = path.join(roadmapContentDirectory, `${roadmapSlug}.json`);
    if (!fs.existsSync(filePath)) return null;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const chapters = parseRoadmapChapters(data, roadmapSlug);

    let foundChapter: RoadmapChapter | null = null;
    let foundTopic: RoadmapTopic | null = null;
    let chapterIndex = 0;
    let topicIndexInChapter = 0;
    let globalIndex = -1;

    const flattened: { topic: RoadmapTopic; chapter: RoadmapChapter; chIndex: number; indexInCh: number }[] = [];
    
    for (let chIdx = 0; chIdx < chapters.length; chIdx++) {
      const ch = chapters[chIdx];
      for (let topIdx = 0; topIdx < ch.topics.length; topIdx++) {
        const top = ch.topics[topIdx];
        flattened.push({ topic: top, chapter: ch, chIndex: chIdx + 1, indexInCh: topIdx + 1 });
        if (top.id === topicId) {
          foundChapter = ch;
          foundTopic = top;
          chapterIndex = chIdx + 1;
          topicIndexInChapter = topIdx + 1;
          globalIndex = flattened.length - 1;
        }
      }
    }

    if (!foundTopic || !foundChapter) return null;

    const resolvedTopic: RoadmapTopic = foundTopic;
    const resolvedChapter: RoadmapChapter = foundChapter;

    const prevTopic = globalIndex > 0 ? flattened[globalIndex - 1] : null;
    const nextTopic = globalIndex < flattened.length - 1 ? flattened[globalIndex + 1] : null;

    // Detect related language
    const relatedLanguage = detectRelatedSiteLanguage(resolvedTopic);

    // Resolve comprehensive in-house resources
    const inHouseLessons = resolveInHouseLessons(resolvedTopic.id, relatedLanguage, resolvedTopic.label);
    const inHouseProjects = resolveInHouseProjects(relatedLanguage, resolvedTopic.label);
    const inHouseMath = resolveInHouseMath(roadmapSlug, resolvedTopic.id);
    const architectureTenets = resolveArchitectureTenets(resolvedTopic.id, resolvedTopic.label, roadmapSlug);
    const masteryQuiz = resolveMasteryQuiz(resolvedTopic.id, resolvedTopic.label);
    const editorialSummary = resolveEditorialSummary(resolvedTopic.id, resolvedTopic.label, resolvedTopic.description);

    return {
      roadmap,
      chapter: resolvedChapter,
      topic: resolvedTopic,
      chapterIndex,
      topicIndexInChapter,
      totalTopics: flattened.length,
      currentPosition: globalIndex + 1,
      prevTopic,
      nextTopic,
      relatedLanguage,
      inHouseLessons,
      inHouseProjects,
      inHouseMath,
      architectureTenets,
      masteryQuiz,
      editorialSummary,
    };
  } catch (e) {
    console.error(`Error loading topic ${topicId} for roadmap ${roadmapSlug}:`, e);
    return null;
  }
}