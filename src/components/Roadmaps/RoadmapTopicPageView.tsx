'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Code2,
  Copy,
  Check,
  ExternalLink,
  GraduationCap,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Compass,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  CheckCircle2,
  XCircle,
  FolderGit2,
  Binary,
  FileText,
  Terminal,
  CheckSquare,
  Square,
  Cpu,
  Clock,
  HardDrive,
  Scale,
  Wrench,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { RoadmapTopicDetailsResult } from '@/lib/roadmaps';

interface RoadmapTopicPageViewProps {
  details: RoadmapTopicDetailsResult;
}

export function RoadmapTopicPageView({ details }: RoadmapTopicPageViewProps) {
  const {
    roadmap,
    chapter,
    topic,
    chapterIndex,
    topicIndexInChapter,
    totalTopics,
    currentPosition,
    prevTopic,
    nextTopic,
    relatedLanguage,
    inHouseLessons,
    inHouseProjects,
    inHouseMath,
    architectureTenets,
    masteryQuiz,
    editorialSummary,
    productionChecklist,
    complexityBlueprint,
    awesomeTools,
    deepDiveGuide,
  } = details;

  const storageKey = `nocturnal_roadmap_completed_${roadmap.slug}`;
  const checklistStorageKey = `nocturnal_chk_${roadmap.slug}_${topic.id}`;

  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedRecipeIndex, setCopiedRecipeIndex] = useState<number | null>(null);
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);

  const copyRecipe = useCallback((idx: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedRecipeIndex(idx);
    setTimeout(() => setCopiedRecipeIndex(null), 2000);
  }, []);

  const copyText = useCallback((id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2000);
  }, []);

  // Interactive Quiz state: questionIndex -> selectedOptionIndex
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});

  // Interactive Checklist state: checklistItemId -> boolean
  const [checkedChecklist, setCheckedChecklist] = useState<Record<string, boolean>>({});

  // Sync completion state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const arr = JSON.parse(saved);
        if (Array.isArray(arr)) {
          setIsCompleted(arr.includes(topic.id));
        }
      }
    } catch {
      // ignore
    }
  }, [storageKey, topic.id]);

  // Sync checklist state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(checklistStorageKey);
      if (saved) {
        setCheckedChecklist(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, [checklistStorageKey]);

  const toggleComplete = useCallback(() => {
    setIsCompleted(prev => {
      const nextState = !prev;
      try {
        const saved = localStorage.getItem(storageKey);
        let arr: string[] = saved ? JSON.parse(saved) : [];
        if (!Array.isArray(arr)) arr = [];
        if (nextState) {
          if (!arr.includes(topic.id)) arr.push(topic.id);
        } else {
          arr = arr.filter(id => id !== topic.id);
        }
        localStorage.setItem(storageKey, JSON.stringify(arr));
      } catch (e) {
        console.warn('Could not persist completed state', e);
      }
      return nextState;
    });
  }, [storageKey, topic.id]);

  const toggleChecklistItem = (id: string) => {
    setCheckedChecklist(prev => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(checklistStorageKey, JSON.stringify(next));
      } catch (e) {
        console.warn('Could not persist checklist state', e);
      }
      return next;
    });
  };

  const resetChecklist = () => {
    setCheckedChecklist({});
    try {
      localStorage.removeItem(checklistStorageKey);
    } catch {
      // ignore
    }
  };

  const copyCode = useCallback(() => {
    if (topic.codeSnippet) {
      navigator.clipboard.writeText(topic.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  }, [topic.codeSnippet]);

  const selectQuizOption = (qIdx: number, optionIdx: number) => {
    setQuizAnswers(prev => ({
      ...prev,
      [qIdx]: optionIdx,
    }));
  };

  const resetQuiz = () => {
    setQuizAnswers({});
  };

  const totalChecklistItems = productionChecklist?.length || 0;
  const completedChecklistCount = Object.values(checkedChecklist).filter(Boolean).length;
  const checklistPercentage = totalChecklistItems > 0 ? Math.round((completedChecklistCount / totalChecklistItems) * 100) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Breadcrumbs & Navigation Sticky Bar */}
      <div className="border-b border-border/50 bg-card/60 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
          {/* Back to Roadmap */}
          <Link
            href={`/roadmaps/${roadmap.slug}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">{roadmap.title}</span>
          </Link>

          {/* Center Topic Tracking */}
          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
            <span className="px-2 py-0.5 rounded-md bg-muted/60 border border-border/50">
              Chapter 0{chapterIndex}
            </span>
            <span className="text-muted-foreground/50">·</span>
            <span>Topic {topicIndexInChapter} of {chapter.topics.length}</span>
            <span className="text-muted-foreground/40 font-mono">({currentPosition}/{totalTopics})</span>
          </div>

          {/* Toggle Status Pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleComplete}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all border ${
                isCompleted
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'bg-background border-border/70 text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-500 fill-emerald-500/20' : 'text-muted-foreground/40'}`} />
              <span>{isCompleted ? 'Mastered ✓' : 'Mark Done'}</span>
            </button>
          </div>
        </div>

        {/* Quick Anchor Sub-navigation */}
        <div className="max-w-5xl mx-auto px-4 py-1.5 flex items-center gap-4 text-[11px] font-mono text-muted-foreground overflow-x-auto border-t border-border/30 scrollbar-none">
          <span className="text-muted-foreground/40 uppercase tracking-widest text-[9px]">Jump:</span>
          {inHouseLessons.length > 0 && (
            <a href="#in-house-modules" className="hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0">
              <BookOpen className="w-3 h-3 text-primary" />
              <span>In-House Lessons ({inHouseLessons.length})</span>
            </a>
          )}
          <a href="#architecture-tenets" className="hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0">
            <Layers className="w-3 h-3 text-primary" />
            <span>Architecture & Code</span>
          </a>
          {deepDiveGuide && (
            <a href="#deep-dive-guide" className="hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0">
              <Terminal className="w-3 h-3 text-indigo-400" />
              <span>Deep-Dive Guide</span>
            </a>
          )}
          {productionChecklist && productionChecklist.length > 0 && (
            <a href="#production-checklist" className="hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Checklist ({completedChecklistCount}/{totalChecklistItems})</span>
            </a>
          )}
          {complexityBlueprint && (
            <a href="#complexity-blueprint" className="hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0">
              <Cpu className="w-3 h-3 text-cyan-500" />
              <span>Complexity</span>
            </a>
          )}
          {inHouseProjects.length > 0 && (
            <a href="#project-labs" className="hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0">
              <FolderGit2 className="w-3 h-3 text-primary" />
              <span>Project Labs ({inHouseProjects.length})</span>
            </a>
          )}
          {awesomeTools && awesomeTools.length > 0 && (
            <a href="#awesome-tools" className="hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0">
              <Wrench className="w-3 h-3 text-amber-500" />
              <span>Awesome Tools</span>
            </a>
          )}
          {inHouseMath.length > 0 && (
            <a href="#math-theory" className="hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0">
              <Binary className="w-3 h-3 text-primary" />
              <span>Mathematics</span>
            </a>
          )}
          {masteryQuiz.length > 0 && (
            <a href="#mastery-quiz" className="hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0">
              <HelpCircle className="w-3 h-3 text-primary" />
              <span>Mastery Quiz</span>
            </a>
          )}
          {topic.resources && topic.resources.length > 0 && (
            <a href="#curated-resources" className="hover:text-primary transition-colors flex items-center gap-1 flex-shrink-0">
              <Compass className="w-3 h-3 text-primary" />
              <span>Official Specs</span>
            </a>
          )}
        </div>
      </div>

      {/* Main Reading Container */}
      <main className="max-w-5xl mx-auto px-4 pt-10">
        {/* Eyebrow & Chapter Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary font-bold">
              {roadmap.title.toUpperCase().replace(' ROADMAP', '')} // CHAPTER 0{chapterIndex}
            </span>
            <span className="text-muted-foreground/40 font-mono text-xs">/</span>
            <span className="text-xs font-mono text-muted-foreground">
              {chapter.label}
            </span>
            <span className="text-muted-foreground/40 font-mono text-xs">/</span>
            <span className="text-xs font-mono text-muted-foreground/70">
              Lesson {currentPosition} of {totalTopics}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.12]">
            {topic.label}
          </h1>

          {/* Topic Quote / Executive Description */}
          {topic.description && (
            <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-card/60 border border-border/70 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              <p className="text-base sm:text-lg text-foreground/90 font-serif italic leading-relaxed">
                &ldquo;{topic.description}&rdquo;
              </p>
            </div>
          )}

          {/* Executive Architecture Synthesis (Key Takeaway & When to Use) */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-border/60">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-bold mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-primary" />
                <span>Core Mental Model</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {editorialSummary.keyTakeaway}
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-border/60">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground/90 font-bold mb-2">
                <Compass className="w-3.5 h-3.5 text-muted-foreground" />
                <span>When To Apply</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {editorialSummary.whenToUse}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: In-House Nocturnal Codex Curriculum (Featured First) */}
        {inHouseLessons.length > 0 && (
          <section id="in-house-modules" className="mb-14 scroll-mt-24">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-[10px] font-mono bg-primary/20 text-primary border-primary/30 uppercase tracking-widest">
                    Nocturnal Codex Curriculum
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    {inHouseLessons.length} In-House Tutorials
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  In-House Codex Modules & Tutorials
                </h2>
              </div>

              {relatedLanguage && (
                <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-mono gap-1.5 h-8">
                  <Link href={relatedLanguage.url}>
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    Open Full {relatedLanguage.name} Codex →
                  </Link>
                </Button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mb-5 leading-relaxed">
              Every lesson below is an original, production-tested interactive guide written specifically for Nocturnal Codex. Click any module to dive into practical code examples, mental models, and deep-dive explanations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inHouseLessons.map((lesson, idx) => (
                <Link
                  key={idx}
                  href={lesson.url}
                  className="group p-5 rounded-2xl border border-border/70 bg-card/60 hover:bg-card hover:border-primary/50 transition-all duration-200 shadow-xs relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 font-semibold">
                        {lesson.badge || 'Codex Lesson'}
                      </span>
                      {lesson.readTime && (
                        <span className="text-[10px] font-mono text-muted-foreground/60">
                          {lesson.readTime}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors flex items-center justify-between gap-2">
                      <span>{lesson.title}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </h3>

                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {lesson.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px] font-mono text-muted-foreground/70 group-hover:text-primary transition-colors">
                    <span className="flex items-center gap-1.5">
                      <FileText className="w-3 h-3" />
                      Read in-house guide
                    </span>
                    <span className="font-semibold">Explore →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: Architecture Tenets & Production Code */}
        <section id="architecture-tenets" className="mb-14 scroll-mt-24">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest text-primary border-primary/30">
                Production Standards
              </Badge>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Codex Engineering Tenets
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Architectural rules of thumb and design patterns enforced across senior engineering teams.
            </p>
          </div>

          {/* Tenet Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {architectureTenets.map((tenet) => (
              <div
                key={tenet.ruleNumber}
                className="p-5 rounded-2xl border border-border/70 bg-card/50 relative overflow-hidden"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center font-mono text-xs font-bold text-primary flex-shrink-0">
                    0{tenet.ruleNumber}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                      {tenet.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/80 mt-1.5 leading-relaxed font-medium">
                      {tenet.principle}
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-2 leading-relaxed bg-muted/40 p-2.5 rounded-xl border border-border/40">
                      <span className="font-semibold text-foreground/80">Rationale: </span>
                      {tenet.rationale}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Concept / Code Example */}
          {topic.codeSnippet && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  <Terminal className="w-3.5 h-3.5 text-primary" />
                  <span>Canonical Implementation Pattern</span>
                </div>
                <button
                  onClick={copyCode}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground px-2.5 py-1 rounded-lg border border-border/50 hover:bg-muted/40 transition-colors"
                  title="Copy code snippet"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Pattern</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-md">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                    <span className="ml-2 font-semibold text-slate-300">
                      {topic.relatedLanguage || 'snippet'}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">Production Pattern</span>
                </div>
                <pre className="p-5 bg-slate-950 text-cyan-300 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                  <code>{topic.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Production Pitfalls & Anti-Patterns */}
          {editorialSummary.commonPitfalls && editorialSummary.commonPitfalls.length > 0 && (
            <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold mb-3">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Common Production Anti-Patterns to Avoid</span>
              </div>
              <ul className="space-y-2">
                {editorialSummary.commonPitfalls.map((pitfall, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                    <span className="text-amber-500 font-bold mt-0.5">•</span>
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* SECTION: Deep-Dive Engineering Runbook & Technical Guide */}
        {deepDiveGuide && (
          <section id="deep-dive-guide" className="mb-14 scroll-mt-24">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 border-indigo-500/30 bg-indigo-500/10">
                    Production Runbook & Deep-Dive
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Internals · Recipes · Incidents · CLI
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                  Engineering Deep-Dive & SRE Runbook
                </h2>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              {deepDiveGuide.executiveOverview}
            </p>

            {/* Sub-block 1: Core System & Runtime Internals */}
            <div className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-sm mb-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold mb-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>{deepDiveGuide.coreInternals.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
                {deepDiveGuide.coreInternals.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {deepDiveGuide.coreInternals.mechanisms.map((mech, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-border/60 bg-muted/30">
                    <div className="text-xs font-bold text-foreground font-mono mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{mech.name}</span>
                    </div>
                    <p className="text-[12px] text-muted-foreground leading-relaxed">
                      {mech.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-block 2: Production Code Recipes */}
            {deepDiveGuide.productionRecipes && deepDiveGuide.productionRecipes.length > 0 && (
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground font-bold">
                  <Code2 className="w-4 h-4 text-primary" />
                  <span>Production Code Recipes & Architecture Patterns</span>
                </div>

                {deepDiveGuide.productionRecipes.map((recipe, idx) => (
                  <div key={idx} className="rounded-2xl border border-border/80 bg-card/60 overflow-hidden shadow-xs">
                    <div className="p-4 sm:p-5 border-b border-border/60 flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-semibold">
                            Recipe 0{idx + 1}
                          </span>
                          <span className="text-xs font-mono text-muted-foreground/60">
                            {recipe.language.toUpperCase()}
                          </span>
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-foreground">
                          {recipe.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {recipe.description}
                        </p>
                      </div>

                      <button
                        onClick={() => copyRecipe(idx, recipe.code)}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-lg border border-border/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                      >
                        {copiedRecipeIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Code</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-zinc-950/90 text-zinc-100 p-4 sm:p-5 overflow-x-auto font-mono text-xs leading-relaxed border-b border-border/40">
                      <pre className="selection:bg-primary/30">
                        <code>{recipe.code}</code>
                      </pre>
                    </div>

                    <div className="p-4 bg-muted/20 text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{recipe.explanation}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sub-block 3: Incident Post-Mortems & Production Failure Modes */}
            {deepDiveGuide.incidentPostMortems && deepDiveGuide.incidentPostMortems.length > 0 && (
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-rose-500 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>Production Incident Post-Mortems & Failure Modes</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {deepDiveGuide.incidentPostMortems.map((incident, idx) => (
                    <div key={idx} className="p-5 rounded-2xl border border-rose-500/30 bg-rose-500/5 shadow-xs">
                      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-500 border border-rose-500/30">
                          {incident.severity}
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          Case Study #{idx + 1}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-foreground mb-2">
                        {incident.title}
                      </h4>

                      <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                        <strong className="text-foreground font-semibold">Root Cause: </strong>
                        {incident.rootCause}
                      </p>

                      {/* Symptoms */}
                      <div className="mb-3">
                        <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider font-semibold block mb-1.5">
                          Observed Symptoms:
                        </span>
                        <ul className="space-y-1">
                          {incident.symptoms.map((symptom, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2 text-xs text-foreground/80">
                              <span className="text-rose-500 font-bold mt-0.5">•</span>
                              <span>{symptom}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Diagnostic command */}
                      <div className="mb-3">
                        <span className="text-[11px] font-mono uppercase text-muted-foreground tracking-wider font-semibold block mb-1">
                          Diagnostic Command:
                        </span>
                        <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-zinc-950 font-mono text-xs text-rose-300 border border-border/60">
                          <code className="truncate">{incident.diagnosticCommand}</code>
                          <button
                            onClick={() => copyText(`cmd-${idx}`, incident.diagnosticCommand)}
                            className="text-zinc-400 hover:text-white p-1 rounded transition-colors flex-shrink-0"
                            title="Copy command"
                          >
                            {copiedTextId === `cmd-${idx}` ? (
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Resolution & Prevention */}
                      <div className="pt-3 border-t border-rose-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <strong className="text-foreground font-semibold block mb-0.5">Emergency Fix:</strong>
                          <span className="text-muted-foreground">{incident.resolution}</span>
                        </div>
                        <div>
                          <strong className="text-foreground font-semibold block mb-0.5">Permanent Prevention:</strong>
                          <span className="text-muted-foreground">{incident.prevention}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-block 4: Diagnostic CLI Arsenal */}
            {deepDiveGuide.diagnosticArsenal && deepDiveGuide.diagnosticArsenal.length > 0 && (
              <div className="p-5 rounded-2xl border border-border/80 bg-card/60 mb-6 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-500 font-bold mb-3">
                  <Terminal className="w-4 h-4 text-cyan-500" />
                  <span>Production Diagnostic & Telemetry Arsenal</span>
                </div>

                <div className="space-y-2.5">
                  {deepDiveGuide.diagnosticArsenal.map((diag, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-border/60 bg-muted/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 font-mono text-xs text-foreground font-semibold">
                        <code className="bg-zinc-950 text-cyan-400 px-2.5 py-1 rounded-md border border-border/50">
                          {diag.command}
                        </code>
                        {diag.flagsExplained && (
                          <span className="text-[11px] font-mono text-muted-foreground/60 hidden md:inline">
                            ({diag.flagsExplained})
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground sm:text-right">
                        {diag.purpose}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-block 5: SRE Production Golden Rules */}
            {deepDiveGuide.sreGoldenRules && deepDiveGuide.sreGoldenRules.length > 0 && (
              <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-500 font-bold mb-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>SRE Production Golden Rules</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {deepDiveGuide.sreGoldenRules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* SECTION 3: Production Readiness Checklist (Interactive Audit) */}
        {productionChecklist && productionChecklist.length > 0 && (
          <section id="production-checklist" className="mb-14 scroll-mt-24">
            <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest text-emerald-500 border-emerald-500/30">
                    Production Readiness Checklist
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Front-End & SRE Audit
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  Production Deployment Checklist
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  {completedChecklistCount} of {totalChecklistItems} verified ({checklistPercentage}%)
                </span>
                {completedChecklistCount > 0 && (
                  <button
                    onClick={resetChecklist}
                    className="text-[11px] font-mono text-muted-foreground hover:text-foreground underline"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Checklist Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-muted/60 mb-5 overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${checklistPercentage}%` }}
              />
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mb-4 leading-relaxed">
              Verify these critical production criteria before deploying into live production environments. Items persist automatically to your local workspace.
            </p>

            <div className="space-y-3">
              {productionChecklist.map((item) => {
                const isChecked = !!checkedChecklist[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleChecklistItem(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isChecked
                        ? 'border-emerald-500/40 bg-emerald-500/5'
                        : 'border-border/70 bg-card/60 hover:bg-card hover:border-border'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0 text-emerald-500">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 fill-emerald-500/20" />
                      ) : (
                        <Square className="w-4 h-4 text-muted-foreground/40" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/40 font-semibold">
                          {item.category}
                        </span>
                        <Badge
                          variant="secondary"
                          className={`text-[9px] font-mono uppercase tracking-wider ${
                            item.priority === 'P0'
                              ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                              : item.priority === 'P1'
                              ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                              : 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30'
                          }`}
                        >
                          {item.priority}
                        </Badge>
                      </div>

                      <h4 className={`text-sm font-semibold leading-snug transition-colors ${isChecked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {item.task}
                      </h4>

                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 4: System & Algorithmic Complexity Blueprint */}
        {complexityBlueprint && (
          <section id="complexity-blueprint" className="mb-14 scroll-mt-24">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest text-cyan-500 border-cyan-500/30">
                  Computer Systems & Complexity
                </Badge>
                <span className="text-[11px] font-mono text-muted-foreground">
                  OSSU & Algorithms Reference
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-500" />
                Algorithmic & Memory Blueprint
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Rigorous time/space complexity analysis and memory layout implications for high-throughput systems.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-border/70 bg-card/60">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-500 font-bold mb-2">
                  <Clock className="w-4 h-4 text-cyan-500" />
                  <span>Time Complexity & Runtime Flow</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 font-mono leading-relaxed">
                  {complexityBlueprint.timeComplexity}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border/70 bg-card/60">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-bold mb-2">
                  <HardDrive className="w-4 h-4 text-primary" />
                  <span>Space Complexity & Footprint</span>
                </div>
                <p className="text-xs sm:text-sm text-foreground/90 font-mono leading-relaxed">
                  {complexityBlueprint.spaceComplexity}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border/70 bg-card/60">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-500 font-bold mb-2">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>Memory Model & Cache Hierarchy</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {complexityBlueprint.memoryModel}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-border/70 bg-card/60">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-500 font-bold mb-2">
                  <Scale className="w-4 h-4 text-amber-500" />
                  <span>Primary Architectural Trade-Off</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {complexityBlueprint.keyTradeOff}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SECTION 5: Hands-On In-House Projects & Open Source Repos */}
        {inHouseProjects.length > 0 && (
          <section id="project-labs" className="mb-14 scroll-mt-24">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest text-primary border-primary/30">
                    Open Source Practice
                  </Badge>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Real-world Repositories
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5 text-primary" />
                  Hands-On Project Labs
                </h2>
              </div>

              <Button asChild variant="outline" size="sm" className="rounded-xl text-xs font-mono gap-1.5 h-8">
                <Link href="/projects">
                  Browse All Projects →
                </Link>
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mb-5 leading-relaxed">
              Transition theory into real code. Practice by contributing to or studying these curated repositories from Nocturnal Codex’s open-source library.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {inHouseProjects.map((project) => (
                <div
                  key={project.id}
                  className="p-5 rounded-2xl border border-border/70 bg-card/60 flex flex-col justify-between hover:border-primary/40 transition-all shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-bold text-base text-foreground line-clamp-1">
                        {project.title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={`text-[9px] font-mono uppercase tracking-wider ${
                          project.difficulty === 'Beginner'
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : project.difficulty === 'Intermediate'
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30'
                        }`}
                      >
                        {project.difficulty}
                      </Badge>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed mb-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/40">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-border/40 text-xs font-mono">
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold transition-colors"
                    >
                      <span>Repository</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {project.goodFirstIssuesUrl && (
                      <a
                        href={project.goodFirstIssuesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-border/60 hover:bg-muted/60 text-muted-foreground hover:text-foreground font-semibold transition-colors"
                      >
                        <span>Issues</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 6: Awesome Ecosystem & Tooling Grid */}
        {awesomeTools && awesomeTools.length > 0 && (
          <section id="awesome-tools" className="mb-14 scroll-mt-24">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest text-amber-500 border-amber-500/30">
                  Awesome Ecosystem
                </Badge>
                <span className="text-[11px] font-mono text-muted-foreground">
                  sindresorhus/awesome Reference
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <Wrench className="w-5 h-5 text-amber-500" />
                Curated Awesome Tooling & CLIs
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Battle-tested utilities, linters, and developer toolchains used across senior engineering teams.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {awesomeTools.map((tool, idx) => (
                <a
                  key={idx}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 rounded-2xl border border-border/70 bg-card/60 hover:bg-card hover:border-amber-500/50 transition-all flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/40 font-semibold">
                        {tool.category}
                      </span>
                      {tool.badge && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                          {tool.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-base text-foreground group-hover:text-amber-500 transition-colors flex items-center justify-between gap-2">
                      <span>{tool.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-amber-500 transition-colors flex-shrink-0" />
                    </h3>

                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-border/40 text-[11px] font-mono text-muted-foreground/70 group-hover:text-amber-500 transition-colors flex items-center justify-between">
                    <span>Explore Tool</span>
                    <span>→</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 7: In-House Mathematics & Theory (when applicable) */}
        {inHouseMath.length > 0 && (
          <section id="math-theory" className="mb-14 scroll-mt-24">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="text-[10px] font-mono uppercase tracking-widest text-primary border-primary/30">
                  Theoretical Foundations
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                <Binary className="w-5 h-5 text-primary" />
                In-House Mathematics & Theory
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Rigorous mathematical principles underlying algorithms and computational pipelines in Nocturnal Codex.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {inHouseMath.map((m, idx) => (
                <Link
                  key={idx}
                  href={m.url}
                  className="group p-5 rounded-2xl border border-border/70 bg-card/60 hover:bg-card hover:border-primary/50 transition-all shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                      {m.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {m.description}
                  </p>
                  <div className="mt-3 text-[11px] font-mono text-primary font-semibold">
                    Read Math Module →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 8: Interactive Codex Mastery Check (Comprehension Quiz) */}
        {masteryQuiz.length > 0 && (
          <section id="mastery-quiz" className="mb-14 scroll-mt-24">
            <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-[10px] font-mono bg-primary/20 text-primary border-primary/30 uppercase tracking-widest">
                    Comprehension Check
                  </Badge>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary" />
                  Codex Mastery Quiz
                </h2>
              </div>

              {Object.keys(quizAnswers).length > 0 && (
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-xl border border-border/60 hover:bg-muted/40 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Quiz</span>
                </button>
              )}
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground mb-6 leading-relaxed">
              Verify your comprehension of the core architectural principles before continuing to the next curriculum lesson.
            </p>

            <div className="space-y-6">
              {masteryQuiz.map((q, qIdx) => {
                const selectedOption = quizAnswers[qIdx];
                const hasAnswered = selectedOption !== undefined;
                const isCorrect = hasAnswered && selectedOption === q.correctIndex;

                return (
                  <div
                    key={qIdx}
                    className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                      hasAnswered
                        ? isCorrect
                          ? 'border-emerald-500/40 bg-emerald-500/5'
                          : 'border-rose-500/40 bg-rose-500/5'
                        : 'border-border/70 bg-card/60'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-mono font-bold text-primary flex-shrink-0 mt-0.5">
                        Q{qIdx + 1}
                      </span>
                      <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug">
                        {q.question}
                      </h3>
                    </div>

                    <div className="space-y-2.5 mb-4 pl-9">
                      {q.options.map((option, optIdx) => {
                        const isThisSelected = selectedOption === optIdx;
                        const isThisCorrect = optIdx === q.correctIndex;

                        let optionStyle = 'border-border/60 bg-background hover:bg-muted/40 text-foreground';
                        if (hasAnswered) {
                          if (isThisCorrect) {
                            optionStyle = 'border-emerald-500/60 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold';
                          } else if (isThisSelected) {
                            optionStyle = 'border-rose-500/60 bg-rose-500/10 text-rose-700 dark:text-rose-300';
                          } else {
                            optionStyle = 'border-border/40 bg-background/50 text-muted-foreground opacity-60';
                          }
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => selectQuizOption(qIdx, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-5 h-5 rounded-md border border-current/30 flex items-center justify-center font-mono text-[10px] flex-shrink-0">
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              <span>{option}</span>
                            </div>

                            {hasAnswered && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                            )}
                            {hasAnswered && isThisSelected && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {hasAnswered && (
                      <div className="pl-9 pt-3 border-t border-border/40">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-mono font-bold ${isCorrect ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {isCorrect ? 'Correct ✓' : 'Incorrect ✗'}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* SECTION 9: Prerequisites */}
        {topic.prerequisites && topic.prerequisites.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/80 font-bold mb-3 flex items-center gap-2">
              <Play className="w-3.5 h-3.5 text-primary" />
              Recommended Prerequisites
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {topic.prerequisites.map((prereq, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-1.5 rounded-xl border border-border/70 bg-card/60 text-xs sm:text-sm font-medium text-foreground"
                >
                  {prereq}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 10: Recommended Official Documentation & Resources */}
        {topic.resources && topic.resources.length > 0 && (
          <section id="curated-resources" className="mb-12 scroll-mt-24">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/80 font-bold mb-4 flex items-center gap-2">
              <Compass className="w-4 h-4 text-primary" />
              Official Specifications & External RFCs ({topic.resources.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {topic.resources.map((res, index) => (
                <a
                  key={index}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3.5 p-4 rounded-2xl border border-border/60 bg-card/70 hover:bg-card hover:border-primary/50 transition-all duration-200 shadow-xs"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {res.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                        {res.type || 'Resource'}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary flex-shrink-0 transition-colors mt-0.5" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Section Divider */}
        <div className="border-t border-dashed border-border/60 my-10" />

        {/* Bottom Pagination & Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {prevTopic ? (
            <Link
              href={`/roadmaps/${roadmap.slug}/${prevTopic.topic.id}`}
              className="group flex-1 p-4 rounded-2xl border border-border/60 bg-card/60 hover:bg-card hover:border-border transition-all"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 mb-1 flex items-center gap-1.5">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                Previous Lesson
              </div>
              <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {prevTopic.topic.label}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextTopic ? (
            <Link
              href={`/roadmaps/${roadmap.slug}/${nextTopic.topic.id}`}
              className="group flex-1 p-4 rounded-2xl border border-border/60 bg-card/60 hover:bg-card hover:border-border transition-all text-right"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/60 mb-1 flex items-center justify-end gap-1.5">
                Next Lesson
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {nextTopic.topic.label}
              </div>
            </Link>
          ) : (
            <Link
              href={`/roadmaps/${roadmap.slug}`}
              className="group flex-1 p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-right"
            >
              <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold mb-1">
                Roadmap Complete
              </div>
              <div className="text-sm font-bold text-foreground">
                Back to Roadmap Overview →
              </div>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
