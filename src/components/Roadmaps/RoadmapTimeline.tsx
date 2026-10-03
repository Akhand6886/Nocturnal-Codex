'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown, ArrowRight, Search, X, ChevronUp, Check, CheckCircle2 } from 'lucide-react';
import type { RoadmapChapter, RoadmapTopic } from '@/lib/roadmaps';

interface RoadmapTimelineProps {
  chapters: RoadmapChapter[];
  onTopicClick: (topic: RoadmapTopic, chapter: RoadmapChapter) => void;
  roadmapTitle: string;
  completedTopicIds?: Set<string>;
  onToggleTopicComplete?: (topicId: string) => void;
}

export function RoadmapTimeline({
  chapters,
  onTopicClick,
  roadmapTitle,
  completedTopicIds = new Set(),
  onToggleTopicComplete,
}: RoadmapTimelineProps) {
  // First chapter expanded by default
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(() => {
    return new Set(chapters.length > 0 ? [chapters[0].id] : []);
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
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chapters or topics..."
            className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl bg-background border border-border/70 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
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

        {/* Expand/Collapse */}
        <div className="flex items-center justify-between sm:justify-start gap-3 text-xs font-mono text-muted-foreground px-1">
          {searchQuery && (
            <span className="text-foreground/80">
              {matchingTopicsCount} matching {matchingTopicsCount === 1 ? 'topic' : 'topics'}
            </span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={expandAll}
              className="hover:text-foreground transition-colors whitespace-nowrap px-2 py-1 rounded hover:bg-muted/50"
            >
              Expand all
            </button>
            <span>·</span>
            <button
              onClick={collapseAll}
              className="hover:text-foreground transition-colors whitespace-nowrap px-2 py-1 rounded hover:bg-muted/50"
            >
              Collapse all
            </button>
          </div>
        </div>
      </div>

      {/* Timeline Start Marker */}
      <div className="flex items-center gap-3 ml-[22px] mb-4">
        <div className="w-3 h-3 rounded-full border-2 border-primary/40 bg-primary/20 ring-4 ring-primary/10" />
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70 font-semibold">
          Curriculum Start
        </span>
      </div>

      {/* Chapter List */}
      <div className="relative">
        {/* Vertical timeline stem */}
        <div className="absolute left-[27px] top-2 bottom-4 w-px bg-border/80" />

        {filteredChapters.map((chapter, idx) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const chapterNum = String(idx + 1).padStart(2, '0');
          const chapterCompletedCount = chapter.topics.filter(t => completedTopicIds.has(t.id)).length;
          const isChapterComplete = chapter.topics.length > 0 && chapterCompletedCount === chapter.topics.length;

          return (
            <div key={chapter.id} className="relative mb-5 last:mb-0">
              <div className="flex items-start gap-0">
                {/* Chapter Number Node */}
                <div className="relative z-10 flex-shrink-0 w-[55px] flex justify-center">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-sm font-mono font-bold transition-colors shadow-xs ${
                    isChapterComplete
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
                      : 'bg-card border-border/80 text-foreground'
                  }`}>
                    {isChapterComplete ? <Check className="w-4 h-4 stroke-[2.5]" /> : chapterNum}
                  </div>
                </div>

                {/* Chapter Card */}
                <div className="flex-1 ml-2">
                  <div
                    className={`
                      w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden
                      ${isExpanded
                        ? 'bg-card/90 border-border/80 shadow-md ring-1 ring-border/30'
                        : 'bg-card/50 border-border/50 hover:bg-card hover:border-border/70 shadow-xs'
                      }
                    `}
                  >
                    {/* Chapter Header (Clickable for toggle) */}
                    <div
                      onClick={() => toggleChapter(chapter.id)}
                      className="p-5 cursor-pointer select-none flex items-start justify-between gap-4 group"
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
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60">
                            {roadmapTitle.toUpperCase().replace(' ROADMAP', '')} // CHAPTER {chapterNum}
                          </span>
                          {isChapterComplete && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                              Complete ✓
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">
                          {chapter.label}
                        </h3>

                        {/* Chapter Stats */}
                        <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground/60 mt-1.5">
                          <span>{chapter.topics.length} {chapter.topics.length === 1 ? 'topic' : 'topics'}</span>
                          {chapterCompletedCount > 0 && !isChapterComplete && (
                            <>
                              <span>·</span>
                              <span className="text-emerald-600 dark:text-emerald-400">
                                {chapterCompletedCount} of {chapter.topics.length} completed
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Expand / Collapse Icon */}
                      <div className="w-8 h-8 rounded-lg border border-border/50 bg-background/50 flex items-center justify-center flex-shrink-0 group-hover:border-border transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Content: Topic List */}
                    {isExpanded && chapter.topics.length > 0 && (
                      <div className="px-5 pb-5 pt-1 border-t border-border/40">
                        {/* Chapter Description */}
                        {chapter.topics[0]?.description && (
                          <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed py-3">
                            {chapter.topics.length > 1
                              ? `${chapter.topics.length} sequenced learning modules covering fundamental architecture, real-world patterns, and code implementations.`
                              : chapter.topics[0].description
                            }
                          </p>
                        )}

                        {/* Topic Items */}
                        <div className="space-y-1 mt-1">
                          {chapter.topics.map((topic, topicIdx) => {
                            const isTopicCompleted = completedTopicIds.has(topic.id);

                            return (
                              <div
                                key={topic.id}
                                data-topic-id={topic.id}
                                onClick={() => onTopicClick(topic, chapter)}
                                className={`
                                  group/topic flex items-center gap-3 py-3 px-3.5 -mx-1 rounded-xl cursor-pointer transition-all duration-200 border
                                  ${isTopicCompleted
                                    ? 'bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20'
                                    : 'bg-background/40 hover:bg-card hover:border-border/80 border-transparent hover:shadow-xs'
                                  }
                                `}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onTopicClick(topic, chapter);
                                  }
                                }}
                              >
                                {/* Completion Check Toggle */}
                                {onToggleTopicComplete && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onToggleTopicComplete(topic.id);
                                    }}
                                    className={`
                                      w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 flex-shrink-0
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

                                {/* Step Number */}
                                <div className="w-6 h-6 rounded-md border border-border/50 bg-muted/30 flex items-center justify-center text-[10px] font-mono text-muted-foreground/80 flex-shrink-0">
                                  {topicIdx + 1}
                                </div>

                                {/* Topic Name & Subtext */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className={`text-sm font-medium leading-snug transition-colors duration-200 ${
                                      isTopicCompleted
                                        ? 'text-muted-foreground line-through decoration-emerald-500/40'
                                        : 'text-foreground group-hover/topic:text-primary'
                                    }`}>
                                      {topic.label}
                                    </span>
                                    {topic.status === 'recommended' && (
                                      <span className="hidden sm:inline-block text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-primary/10 text-primary">
                                        Core
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Arrow Indicator */}
                                <div className="flex items-center gap-1 flex-shrink-0">
                                  <span className="text-[11px] font-mono text-muted-foreground/40 group-hover/topic:text-primary transition-colors hidden sm:inline">
                                    Inspect folio
                                  </span>
                                  <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover/topic:text-primary group-hover/topic:translate-x-1 transition-all duration-200" />
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
        <div className="flex items-center gap-3 ml-[22px] mt-6">
          <div className="relative z-10 w-3 h-3 rounded-full bg-emerald-500 border-2 border-emerald-400 ring-4 ring-emerald-500/20" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground/70 font-semibold">
            Path Complete · {totalTopics} Topics
          </span>
        </div>
      )}

      {/* No Results */}
      {filteredChapters.length === 0 && searchQuery && (
        <div className="text-center py-16 p-8 rounded-2xl border border-dashed border-border/60 bg-muted/10">
          <p className="text-muted-foreground text-sm mb-2">No chapters or topics match &ldquo;{searchQuery}&rdquo;</p>
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
