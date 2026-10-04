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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { RoadmapTopic, RoadmapChapter, Roadmap, SiteLanguageLink } from '@/lib/roadmaps';

interface RoadmapTopicPageViewProps {
  roadmap: Roadmap;
  chapter: RoadmapChapter;
  topic: RoadmapTopic;
  chapterIndex: number;
  topicIndexInChapter: number;
  totalTopics: number;
  currentPosition: number;
  relatedLanguage: SiteLanguageLink | null;
  prevTopic: { topic: RoadmapTopic; chapter: RoadmapChapter; chIndex: number; indexInCh: number } | null;
  nextTopic: { topic: RoadmapTopic; chapter: RoadmapChapter; chIndex: number; indexInCh: number } | null;
}

export function RoadmapTopicPageView({
  roadmap,
  chapter,
  topic,
  chapterIndex,
  topicIndexInChapter,
  totalTopics,
  currentPosition,
  relatedLanguage,
  prevTopic,
  nextTopic,
}: RoadmapTopicPageViewProps) {
  const storageKey = `nocturnal_roadmap_completed_${roadmap.slug}`;
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

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

  const copyCode = useCallback(() => {
    if (topic.codeSnippet) {
      navigator.clipboard.writeText(topic.codeSnippet);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  }, [topic.codeSnippet]);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Breadcrumbs & Progress Bar */}
      <div className="border-b border-border/50 bg-card/40 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          {/* Back to Roadmap */}
          <Link
            href={`/roadmaps/${roadmap.slug}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>{roadmap.title}</span>
          </Link>

          {/* Chapter / Topic Index Pill */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-muted-foreground hidden sm:inline">
              Chapter 0{chapterIndex} · Topic {topicIndexInChapter}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground/60">
              ({currentPosition}/{totalTopics})
            </span>

            {/* Toggle Status Pill */}
            <button
              onClick={toggleComplete}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all border ${
                isCompleted
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                  : 'bg-background border-border/70 text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-500 fill-emerald-500/20' : 'text-muted-foreground/40'}`} />
              <span>{isCompleted ? 'Mastered ✓' : 'Mark Done'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 pt-10">
        {/* Eyebrow & Chapter Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary font-bold">
              {roadmap.title.toUpperCase().replace(' ROADMAP', '')} // CHAPTER 0{chapterIndex}
            </span>
            <span className="text-muted-foreground/40 font-mono text-xs">/</span>
            <span className="text-xs font-mono text-muted-foreground">
              {chapter.label}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            {topic.label}
          </h1>

          {/* Topic Quote / Summary */}
          {topic.description && (
            <div className="mt-5 p-5 rounded-2xl bg-card/60 border border-border/60 relative overflow-hidden">
              <p className="text-base sm:text-lg text-foreground/90 font-serif italic leading-relaxed">
                &ldquo;{topic.description}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* In-House Language Codex Link Card */}
        {relatedLanguage && (
          <div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-transparent border border-primary/30 shadow-sm relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0" role="img" aria-label={relatedLanguage.name}>
                  {relatedLanguage.icon}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="font-bold text-base text-foreground">
                      Learn {relatedLanguage.name} on Nocturnal Codex
                    </h3>
                    <Badge variant="secondary" className="text-[10px] font-mono bg-primary/20 text-primary border-primary/30">
                      IN-HOUSE GUIDE
                    </Badge>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {relatedLanguage.description}
                  </p>
                </div>
              </div>

              <Button asChild size="default" className="rounded-xl font-semibold gap-2 flex-shrink-0 shadow-sm">
                <Link href={relatedLanguage.url}>
                  <GraduationCap className="w-4 h-4" />
                  Open {relatedLanguage.name} Guide
                </Link>
              </Button>
            </div>
          </div>
        )}

        {/* Key Concept / Code Example Section */}
        {topic.codeSnippet && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/80 font-bold flex items-center gap-2">
                <Code2 className="w-4 h-4 text-primary" />
                Key Concept & Implementation
              </h2>
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
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-border/80 shadow-md">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                  <span className="ml-2 font-semibold text-slate-300">{topic.relatedLanguage || 'snippet'}</span>
                </div>
                <span>Architecture Pattern</span>
              </div>
              <pre className="p-5 bg-slate-950 text-cyan-300 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                <code>{topic.codeSnippet}</code>
              </pre>
            </div>
          </section>
        )}

        {/* Prerequisites */}
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

        {/* Recommended Official Documentation & Resources */}
        {topic.resources && topic.resources.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground/80 font-bold mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              Curated Documentation & Deep Dives ({topic.resources.length})
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
