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
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full border-l border-border bg-background/95 backdrop-blur-xl shadow-2xl p-0">
        {/* Header */}
        <SheetHeader className="p-6 pb-5 border-b border-border bg-card/40 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 text-[11px] font-mono tracking-widest uppercase text-primary font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{chapterLabel ? `${chapterLabel} // TOPIC` : 'TOPIC DOSSIER // FOLIO REF'}</span>
              </div>
              <SheetTitle className="text-2xl font-serif font-normal tracking-tight text-foreground leading-snug">
                {data.label}
              </SheetTitle>
              {data.description && (
                <SheetDescription className="mt-3 font-serif italic text-sm text-foreground/80 leading-relaxed border-l-2 border-primary/40 pl-3.5">
                  &ldquo;{data.description}&rdquo;
                </SheetDescription>
              )}
            </div>
            {onToggleComplete && (
              <button
                onClick={onToggleComplete}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-muted/40 border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
                title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
              >
                <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-500 fill-emerald-500/20' : 'text-muted-foreground/40'}`} />
                {isCompleted ? 'Completed' : 'Mark Complete'}
              </button>
            )}
          </div>
        </SheetHeader>
        
        {/* Content */}
        <ScrollArea className="flex-1 p-6 space-y-6">
          {/* Featured In-House Language Codex Link Card */}
          {relatedLang && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-transparent border-2 border-primary/30 shadow-lg relative overflow-hidden">
              <div className="flex items-start gap-3 mb-2">
                <span className="text-2xl flex-shrink-0" role="img" aria-label={relatedLang.name}>{relatedLang.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-sm text-foreground">
                      Learn {relatedLang.name} on Nocturnal Codex
                    </h4>
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-primary/20 text-primary font-mono font-bold">
                      IN-HOUSE GUIDE
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {relatedLang.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3 border-t border-border/40">
                <Button asChild size="sm" className="h-8 text-xs font-bold rounded-lg gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                  <Link href={relatedLang.url}>
                    <GraduationCap className="w-4 h-4" />
                    Open {relatedLang.name} Codex Guide
                  </Link>
                </Button>
              </div>
            </div>
          )}
          {/* Code Snippet Example Section */}
          {data.codeSnippet && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-3 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                Key Concept / Code Example
              </h3>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto whitespace-pre-wrap shadow-inner leading-relaxed">
                {data.codeSnippet}
              </pre>
            </div>
          )}

          {/* Prerequisites */}
          {data.prerequisites && data.prerequisites.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-3 flex items-center gap-2">
                <Play className="w-3.5 h-3.5 text-accent" />
                Prerequisites
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.prerequisites.map((prereq, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs font-medium px-2.5 py-1 rounded-md">
                    {prereq}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Resources List */}
          {data.resources && data.resources.length > 0 ? (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-primary" />
                Recommended Resources ({data.resources.length})
              </h3>
              <ul className="space-y-2.5">
                {data.resources.map((resource, index) => {
                  const typeIcon = resource.type ? RESOURCE_TYPE_ICONS[resource.type.toLowerCase()] || '📎' : '📎';
                  return (
                    <li key={index}>
                      <a 
                        href={resource.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-card hover:bg-primary/5 hover:border-primary/40 transition-all duration-200 shadow-sm"
                      >
                        <span className="text-lg flex-shrink-0" role="img" aria-label={resource.type || 'resource'}>
                          {typeIcon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                            {resource.title}
                          </p>
                          {resource.type && (
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                              {resource.type}
                            </span>
                          )}
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-primary flex-shrink-0 transition-colors" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : (
            <div className="text-center py-10 rounded-xl bg-muted/10 border border-dashed border-border/50">
              <Sparkles className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm text-muted-foreground font-medium">Curated Resources Loaded</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Explore official documentation and guide topics above</p>
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-card/60 flex items-center justify-between gap-3">
          {onToggleComplete ? (
            <button
              onClick={onToggleComplete}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-all ${
                isCompleted
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25'
                  : 'bg-background border-border/80 text-foreground hover:bg-muted/60'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${isCompleted ? 'text-emerald-500 fill-emerald-500/20' : 'text-muted-foreground/50'}`} />
              {isCompleted ? 'Topic Mastered ✓' : 'Mark as Done'}
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            {hasNextTopic && onNextTopic && (
              <Button
                onClick={onNextTopic}
                size="sm"
                className="rounded-lg text-xs font-semibold gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Next Topic
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            )}
            <SheetClose asChild>
              <Button variant="outline" size="sm" className="rounded-lg text-xs">
                Close
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
