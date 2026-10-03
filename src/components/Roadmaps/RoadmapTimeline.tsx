'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { ChevronDown, ArrowRight, Search, X, ChevronUp } from 'lucide-react';
import type { RoadmapChapter, RoadmapTopic } from '@/lib/roadmaps';

interface RoadmapTimelineProps {
  chapters: RoadmapChapter[];
  onTopicClick: (topic: RoadmapTopic) => void;
  roadmapTitle: string;
}

export function RoadmapTimeline({ chapters, onTopicClick, roadmapTitle }: RoadmapTimelineProps) {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(() => {
    // First chapter expanded by default
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
            placeholder="Find a chapter or topic"
            className="w-full pl-9 pr-9 py-2.5 text-sm rounded-lg bg-background border border-border/60 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Expand/Collapse */}
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={expandAll}
            className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            Expand all
          </button>
          <button
            onClick={collapseAll}
            className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
          >
            Collapse all
          </button>
        </div>
      </div>

      {/* Timeline Start Marker */}
      <div className="flex items-center gap-3 ml-[22px] mb-4">
        <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/30 bg-background" />
        <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground/50">
          Start here
        </span>
      </div>

      {/* Chapter List */}
      <div className="relative">
        {/* Vertical timeline stem */}
        <div className="absolute left-[27px] top-0 bottom-0 w-px bg-border/60" />

        {filteredChapters.map((chapter, idx) => {
          const isExpanded = expandedChapters.has(chapter.id);
          const chapterNum = String(idx + 1).padStart(2, '0');

          return (
            <div key={chapter.id} className="relative mb-4 last:mb-0">
              {/* Chapter Number Node */}
              <div className="flex items-start gap-0">
                {/* Number Circle */}
                <div className="relative z-10 flex-shrink-0 w-[55px] flex justify-center">
                  <div className="w-10 h-10 rounded-xl bg-card border border-border/70 flex items-center justify-center text-sm font-mono font-bold text-muted-foreground shadow-sm">
                    {chapterNum}
                  </div>
                </div>

                {/* Chapter Card */}
                <div className="flex-1 ml-2">
                  <button
                    onClick={() => toggleChapter(chapter.id)}
                    className={`
                      w-full text-left p-5 rounded-xl border transition-all duration-300
                      ${isExpanded
                        ? 'bg-card border-border/80 shadow-sm'
                        : 'bg-card/50 border-border/40 hover:bg-card hover:border-border/60'
                      }
                    `}
                  >
                    {/* Eyebrow */}
                    <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/50 mb-1">
                      {roadmapTitle.toUpperCase().replace(' ROADMAP', '')}
                    </div>

                    {/* Title Row */}
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-foreground leading-snug">
                        {chapter.label}
                      </h3>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground/50 flex-shrink-0" />
                      )}
                    </div>

                    {/* Topic Count */}
                    <div className="text-[11px] font-mono text-muted-foreground/50 mt-1.5">
                      {chapter.topics.length} {chapter.topics.length === 1 ? 'topic' : 'topics'}
                    </div>

                    {/* Expanded Content: Topic List */}
                    {isExpanded && chapter.topics.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border/40">
                        {/* Chapter Description (first topic's description as summary) */}
                        {chapter.topics[0]?.description && (
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                            {chapter.topics.length > 1
                              ? `${chapter.topics.length} topics covering core concepts in this domain.`
                              : chapter.topics[0].description
                            }
                          </p>
                        )}

                        {/* Topic Items */}
                        <div className="space-y-0.5">
                          {chapter.topics.map((topic, topicIdx) => (
                            <div
                              key={topic.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                onTopicClick(topic);
                              }}
                              className="group/topic flex items-center gap-3 py-3 px-3 -mx-1 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors duration-200"
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  onTopicClick(topic);
                                }
                              }}
                            >
                              {/* Step Number */}
                              <div className="w-7 h-7 rounded-full border border-border/60 bg-background flex items-center justify-center text-[11px] font-mono text-muted-foreground flex-shrink-0">
                                {topicIdx + 1}
                              </div>

                              {/* Topic Name */}
                              <span className="flex-1 text-sm text-foreground group-hover/topic:text-primary transition-colors duration-200 leading-snug">
                                {topic.label}
                              </span>

                              {/* Arrow */}
                              <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover/topic:text-primary group-hover/topic:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Timeline End Marker */}
      {filteredChapters.length > 0 && (
        <div className="flex items-center gap-3 ml-[22px] mt-4">
          <div className="relative z-10 w-3 h-3 rounded-full bg-primary/60 border-2 border-primary" />
          <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-muted-foreground/50">
            Path complete · {totalTopics} topics
          </span>
        </div>
      )}

      {/* No Results */}
      {filteredChapters.length === 0 && searchQuery && (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-sm">No chapters or topics match &ldquo;{searchQuery}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
