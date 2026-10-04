import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

export function getRoadmapTopicDetails(roadmapSlug: string, topicId: string) {
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
    
    chapters.forEach((ch, chIdx) => {
      ch.topics.forEach((top, topIdx) => {
        flattened.push({ topic: top, chapter: ch, chIndex: chIdx + 1, indexInCh: topIdx + 1 });
        if (top.id === topicId) {
          foundChapter = ch;
          foundTopic = top;
          chapterIndex = chIdx + 1;
          topicIndexInChapter = topIdx + 1;
          globalIndex = flattened.length - 1;
        }
      });
    });

    if (!foundTopic || !foundChapter) return null;

    const prevTopic = globalIndex > 0 ? flattened[globalIndex - 1] : null;
    const nextTopic = globalIndex < flattened.length - 1 ? flattened[globalIndex + 1] : null;

    return {
      roadmap,
      chapter: foundChapter,
      topic: foundTopic,
      chapterIndex,
      topicIndexInChapter,
      totalTopics: flattened.length,
      currentPosition: globalIndex + 1,
      prevTopic,
      nextTopic,
    };
  } catch (e) {
    console.error(`Error loading topic ${topicId} for roadmap ${roadmapSlug}:`, e);
    return null;
  }
}