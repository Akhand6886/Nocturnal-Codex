import React from 'react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, BookOpen, CheckCircle, Clock, Circle, Sparkles, Code2, Play, GraduationCap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { NodeStatus } from '@/lib/roadmapProgress';

export interface RoadmapResource {
  title: string;
  url: string;
  type?: string;
}

export interface SelectedNodeData {
  id: string;
  label: string;
  description?: string;
  status?: NodeStatus;
  resources?: RoadmapResource[];
  codeSnippet?: string;
  prerequisites?: string[];
  relatedLanguage?: string;
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

export function detectRelatedSiteLanguage(data: SelectedNodeData): SiteLanguageLink | null {
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

export interface RoadmapDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SelectedNodeData | null;
  onStatusChange?: (nodeId: string, status: NodeStatus) => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  chapterLabel?: string;
  onNextTopic?: () => void;
  hasNextTopic?: boolean;
}

const STATUS_CONFIG: Record<NodeStatus, { icon: React.ReactNode; label: string; className: string }> = {
  done: {
    icon: <CheckCircle className="w-4 h-4" />,
    label: 'Mastered',
    className: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  learning: {
    icon: <Clock className="w-4 h-4" />,
    label: 'In Progress',
    className: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  pending: {
    icon: <Circle className="w-4 h-4" />,
    label: 'Unexplored',
    className: 'text-muted-foreground bg-muted/50 border-border',
  },
};

const RESOURCE_TYPE_ICONS: Record<string, string> = {
  video: '🎬',
  article: '📄',
  course: '🎓',
  docs: '📚',
  tool: '🛠️',
  github: '💻',
};

export function RoadmapDrawer({
  open,
  onOpenChange,
  data,
  isCompleted = false,
  onToggleComplete,
  chapterLabel,
  onNextTopic,
  hasNextTopic = false,
}: RoadmapDrawerProps) {
  if (!data) return null;

  const relatedLang = detectRelatedSiteLanguage(data);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full border-l border-[#272727] bg-[#141414] shadow-2xl p-0">
        {/* Header */}
        <SheetHeader className="p-6 pb-5 border-b border-[#272727] bg-[#181818]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 text-[10px] font-mono tracking-widest uppercase text-primary font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{chapterLabel ? `${chapterLabel} // TOPIC` : 'TOPIC DOSSIER // FOLIO REF'}</span>
              </div>
              <SheetTitle className="text-xl font-semibold tracking-tight text-foreground leading-snug">
                {data.label}
              </SheetTitle>
              {data.description && (
                <SheetDescription className="mt-2.5 text-xs text-muted-foreground leading-relaxed border-l border-primary/50 pl-3">
                  {data.description}
                </SheetDescription>
              )}
            </div>
            {onToggleComplete && (
              <button
                onClick={onToggleComplete}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                  isCompleted
                    ? 'bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-[#1F1F1F] border border-[#272727] text-muted-foreground hover:text-foreground'
                }`}
                title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
              >
                <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-muted-foreground/40'}`} />
                {isCompleted ? 'Completed' : 'Mark Complete'}
              </button>
            )}
          </div>
        </SheetHeader>
        
        {/* Content */}
        <ScrollArea className="flex-1 p-6 space-y-6">
          {/* Featured In-House Language Codex Link Card */}
          {relatedLang && (
            <div className="mb-6 p-4 rounded-lg bg-[#181818] border border-[#272727] relative overflow-hidden">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-xl flex-shrink-0" role="img" aria-label={relatedLang.name}>{relatedLang.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-xs text-foreground">
                      Learn {relatedLang.name} on Nocturnal Codex
                    </h4>
                    <span className="text-[9px] px-1.5 py-0.5 bg-[#E5A93C]/15 text-[#E5A93C] font-mono font-medium rounded border border-[#E5A93C]/30">
                      IN-HOUSE GUIDE
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {relatedLang.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#272727]">
                <Button asChild size="sm" variant="outline" className="h-7 text-xs font-mono rounded-md gap-1.5 border-[#272727] bg-[#1F1F1F] hover:bg-[#272727] text-foreground">
                  <Link href={relatedLang.url}>
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    Open {relatedLang.name} Codex Guide
                  </Link>
                </Button>
              </div>
            </div>
          )}
          {/* Code Snippet Example Section */}
          {data.codeSnippet && (
            <div className="mb-6">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-primary" />
                Key Concept / Code Example
              </h3>
              <pre className="p-3.5 rounded-lg bg-[#101010] border border-[#272727] text-[#EDEDED] font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {data.codeSnippet}
              </pre>
            </div>
          )}

          {/* Prerequisites */}
          {data.prerequisites && data.prerequisites.length > 0 && (
            <div className="mb-6">
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                <Play className="w-3 h-3 text-primary" />
                Prerequisites
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {data.prerequisites.map((prereq, idx) => (
                  <span key={idx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#181818] border border-[#272727] text-muted-foreground">
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Resources List */}
          {data.resources && data.resources.length > 0 ? (
            <div>
              <h3 className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-primary" />
                Recommended Resources ({data.resources.length})
              </h3>
              <ul className="space-y-2">
                {data.resources.map((resource, index) => {
                  const typeIcon = resource.type ? RESOURCE_TYPE_ICONS[resource.type.toLowerCase()] || '📎' : '📎';
                  return (
                    <li key={index}>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-2.5 rounded-lg border border-[#272727] bg-[#181818] hover:border-[#383838] hover:bg-[#1B1B1B] transition-all duration-200"
                      >
                        <span className="text-base flex-shrink-0" role="img" aria-label={resource.type || 'resource'}>
                          {typeIcon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-xs text-foreground group-hover:text-primary transition-colors truncate">
                            {resource.title}
                          </p>
                          {resource.type && (
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                              {resource.type}
                            </span>
                          )}
                        </div>
                        <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary flex-shrink-0 transition-colors" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="text-center py-8 rounded-lg bg-[#181818] border border-[#272727]">
              <Sparkles className="w-6 h-6 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground font-mono">Curated Resources Loaded</p>
              <p className="text-[11px] text-muted-foreground/60 mt-1">Explore official documentation and guide topics above</p>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-[#272727] bg-[#181818] flex items-center justify-between gap-3">
          {onToggleComplete ? (
            <button
              onClick={onToggleComplete}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono border transition-all ${
                isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-[#1F1F1F] border-[#272727] text-foreground hover:bg-[#272727]'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-muted-foreground/50'}`} />
              {isCompleted ? 'Mastered ✓' : 'Mark as Done'}
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            {hasNextTopic && onNextTopic && (
              <Button
                onClick={onNextTopic}
                size="sm"
                className="rounded-md text-xs font-mono gap-1.5 bg-primary text-black hover:bg-primary/90"
              >
                Next Topic
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
            <SheetClose asChild>
              <Button variant="outline" size="sm" className="rounded-md text-xs font-mono border-[#272727] bg-[#1F1F1F] hover:bg-[#272727]">
                Close
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
