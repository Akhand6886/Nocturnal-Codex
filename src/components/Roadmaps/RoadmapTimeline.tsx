'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ArrowRight,
  Search,
  X,
  ChevronUp,
  Check,
  CheckCircle2,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import type { RoadmapChapter, RoadmapTopic } from '@/lib/roadmaps';

interface RoadmapTimelineProps {
  chapters: RoadmapChapter[];
  roadmapSlug: string;
  roadmapTitle: string;
  completedTopicIds?: Set<string>;
  onToggleTopicComplete?: (topicId: string) => void;
}

export function RoadmapTimeline({
  chapters,
  roadmapSlug,
  roadmapTitle,
  completedTopicIds = new Set(),
  onToggleTopicComplete,
}: RoadmapTimelineProps) {
  // First two chapters expanded by default for quick scanning
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(() => {
    return new Set(chapters.map(c => c.id));
  });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleChapter = useCallback((id: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedChapters(new Set(chapters.map(c => c.id)));
  }, [chapters]);

  const collapseAll = useCallback(() => {
    setExpandedChapters(new Set());
  }, []);

  // Filter chapters/topics by search
  const filteredChapters = useMemo(() => {
    if (!searchQuery.trim()) return chapters;
    const q = searchQuery.trim().toLowerCase();
    return chapters
      .map(chapter => ({
        ...chapter,
        topics: chapter.topics.filter(t =>
          t.label.toLowerCase().includes(q) ||
          t.description?.toLowerCase().includes(q)
        ),
      }))
      .filter(chapter =>
        chapter.topics.length > 0 ||
        chapter.label.toLowerCase().includes(q)
      );
  }, [chapters, searchQuery]);

  const totalTopics = chapters.reduce((sum, c) => sum + c.topics.length, 0);
  const matchingTopicsCount = filteredChapters.reduce((sum, c) => sum + c.topics.length, 0);

  return (
    <div className="w-full">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter curriculum topics or keywords..."
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl bg-background border border-border/70 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1 rounded-md"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Counter & Expand / Collapse */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-mono text-muted-foreground">
          {searchQuery && (
            <span className="text-foreground/80 font-medium">
              {matchingTopicsCount} matching {matchingTopicsCount === 1 ? 'topic' : 'topics'}
            </span>
          )}
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="hover:text-foreground transition-colors px-2.5 py-1 rounded-lg border border-border/50 bg-card/40 hover:bg-card"
            >
              Expand all
            </button>
            <button
              onClick={collapseAll}
              className="hover:text-foreground transition-colors px-2.5 py-1 rounded-lg border border-border/50 bg-card/40 hover:bg-card"
            >
              Collapse all
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Start Marker */}
      <div className="flex items-center gap-3 ml-[22px] mb-6">
        <div className="w-3.5 h-3.5 rounded-full border-2 border-primary bg-background ring-4 ring-primary/10" />
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground/80 font-bold">
          Curriculum Route
        </span>
      </div>

      {/* Chapters Container */}
      <div className="relative">
        {/* Continuous Vertical timeline stem */}
        <div className="absolute left-[28px] top-3 bottom-6 w-px bg-border/70" />

        {filteredChapters.map((chapter, idx) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const chapterNum = String(idx + 1).padStart(2, '0');
          const chapterCompletedCount = chapter.topics.filter(t => completedTopicIds.has(t.id)).length;
          const isChapterComplete = chapter.topics.length > 0 && chapterCompletedCount === chapter.topics.length;

          return (
            <div key={chapter.id} className="relative mb-8 last:mb-0">
              <div className="flex items-start gap-0">
                {/* Chapter Number Node */}
                <div className="relative z-10 flex-shrink-0 w-[58px] flex justify-center">
                  <div
                    className={`w-11 h-11 rounded-2xl border flex items-center justify-center text-sm font-mono font-bold transition-all shadow-xs ${
                      isChapterComplete
                        ? 'bg-emerald-500/15 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 ring-4 ring-emerald-500/10'
                        : 'bg-card border-border/80 text-foreground ring-4 ring-background'
                    }`}
                  >
                    {isChapterComplete ? <Check className="w-4 h-4 stroke-[2.5]" /> : chapterNum}
                  </div>
                </div>

                {/* Chapter Card (Full Width) */}
                <div className="flex-1 ml-3 sm:ml-4">
                  <div
                    className={`
                      w-full rounded-2xl border transition-all duration-300 overflow-hidden
                      ${isExpanded
                        ? 'bg-card/90 border-border/80 shadow-sm'
                        : 'bg-card/50 border-border/50 hover:bg-card hover:border-border/70 shadow-xs'
                      }
                    `}
                  >
                    {/* Chapter Header Bar */}
                    <div
                      onClick={() => toggleChapter(chapter.id)}
                      className="p-5 sm:p-6 cursor-pointer select-none flex items-start justify-between gap-4 group hover:bg-muted/20 transition-colors"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleChapter(chapter.id);
                        }
                      }}
                    >
                      <div className="flex-1 min-w-0">
                        {/* Domain Eyebrow & Badges */}
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 font-semibold">
                            CHAPTER {chapterNum}
                          </span>
                          {isChapterComplete ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                              Chapter Mastered ✓
                            </span>
                          ) : chapterCompletedCount > 0 ? (
                            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                              {chapterCompletedCount}/{chapter.topics.length} done
                            </span>
                          ) : null}
                        </div>

                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {chapter.label}
                        </h2>

                        {/* Topic count info */}
                        <div className="text-[11px] font-mono text-muted-foreground/60 mt-1">
                          {chapter.topics.length} {chapter.topics.length === 1 ? 'lesson' : 'lessons in sequence'}
                        </div>
                      </div>

                      {/* Expand / Collapse Icon */}
                      <div className="w-8 h-8 rounded-xl border border-border/60 bg-background/60 flex items-center justify-center flex-shrink-0 group-hover:border-border group-hover:bg-background transition-all">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Chapter Topics List */}
                    {isExpanded && chapter.topics.length > 0 && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-border/40">
                        <div className="space-y-2.5 mt-3">
                          {chapter.topics.map((topic, topicIdx) => {
                            const isTopicCompleted = completedTopicIds.has(topic.id);
                            const topicHref = `/roadmaps/${roadmapSlug}/${topic.id}`;

                            return (
                              <div
                                key={topic.id}
                                data-topic-id={topic.id}
                                className={`
                                  group relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-200
                                  ${isTopicCompleted
                                    ? 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/25'
                                    : 'bg-background/60 hover:bg-background border-border/60 hover:border-primary/40 hover:shadow-xs'
                                  }
                                `}
                              >
                                {/* Left Section: Checkbox + Number + Title & Description */}
                                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                                  {/* Completion Toggle Button */}
                                  {onToggleTopicComplete && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onToggleTopicComplete(topic.id);
                                      }}
                                      className={`
                                        w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 flex-shrink-0 mt-0.5
                                        ${isTopicCompleted
                                          ? 'bg-emerald-500 border-emerald-500 text-white shadow-xs'
                                          : 'border-border/80 hover:border-emerald-500 hover:bg-emerald-500/10 text-transparent'
                                        }
                                      `}
                                      title={isTopicCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                                      aria-label={`Toggle completed for ${topic.label}`}
                                    >
                                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    </button>
                                  )}

                                  {/* Lesson Number Pill */}
                                  <div className="w-6 h-6 rounded-md border border-border/60 bg-muted/40 flex items-center justify-center text-[10px] font-mono text-muted-foreground/80 flex-shrink-0 mt-0.5">
                                    {topicIdx + 1}
                                  </div>

                                  {/* Direct Link to Topic Guide */}
                                  <Link href={topicHref} className="flex-1 min-w-0 block">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className={`text-base font-semibold transition-colors duration-200 leading-snug ${
                                        isTopicCompleted
                                          ? 'text-muted-foreground line-through decoration-emerald-500/40'
                                          : 'text-foreground group-hover:text-primary'
                                      }`}>
                                        {topic.label}
                                      </span>
                                      {topic.status === 'recommended' && (
                                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">
                                          Core
                                        </span>
                                      )}
                                      {topic.relatedLanguage && (
                                        <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-muted text-muted-foreground">
                                          {topic.relatedLanguage}
                                        </span>
                                      )}
                                    </div>

                                    {topic.description && (
                                      <p className="text-xs text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                                        {topic.description}
                                      </p>
                                    )}
                                  </Link>
                                </div>

                                {/* Right Section: Direct Navigation Action */}
                                <div className="flex items-center gap-2.5 self-end sm:self-center flex-shrink-0 pl-10 sm:pl-0">
                                  <Link
                                    href={topicHref}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-card/60 hover:bg-primary hover:text-primary-foreground hover:border-primary text-xs font-mono text-foreground transition-all duration-200 group/btn"
                                  >
                                    <span>Open Lesson</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                  </Link>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline End Marker */}
      {filteredChapters.length > 0 && (
        <div className="flex items-center gap-3 ml-[22px] mt-8 mb-16">
          <div className="relative z-10 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-emerald-400 ring-4 ring-emerald-500/20" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground/80 font-bold">
            Curriculum Complete · {totalTopics} Lessons
          </span>
        </div>
      )}

      {/* No Results Filter State */}
      {filteredChapters.length === 0 && searchQuery && (
        <div className="text-center py-16 p-8 rounded-2xl border border-dashed border-border/60 bg-muted/10">
          <p className="text-muted-foreground text-sm mb-2">No curriculum topics match &ldquo;{searchQuery}&rdquo;</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-primary font-mono hover:underline"
          >
            Clear search filter
          </button>
        </div>
      )}
    </div>
  );
}
