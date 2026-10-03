'use client';

import React from 'react';
import { ArrowDown, CheckCircle, GitBranch } from 'lucide-react';

interface TimelineSidebarProps {
  totalTopics: number;
  totalChapters: number;
}

export function TimelineSidebar({ totalTopics, totalChapters }: TimelineSidebarProps) {
  const scrollToFirstChapter = () => {
    const timeline = document.querySelector('[data-roadmap-timeline]');
    if (timeline) {
      timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-24">
      <div className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm">
        {/* Section Label */}
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/50 mb-3">
          HOW TO USE THIS MAP
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-3 leading-snug">
          One chapter at a time.
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
          Read from top to bottom. Open a chapter to see every topic; select a topic for its place in the path and a link to start.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          The sequence is a guide. You can revisit any chapter.
        </p>

        {/* Legend */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span className="text-sm text-muted-foreground">Completed in your path</span>
          </div>
          <div className="flex items-center gap-2.5">
            <GitBranch className="w-4 h-4 text-muted-foreground/50" />
            <span className="text-sm text-muted-foreground">Optional branches and extras</span>
          </div>
        </div>

        {/* Stats */}
        <div className="text-[11px] font-mono text-muted-foreground/50 mb-5 pb-4 border-b border-border/30">
          {totalChapters} {totalChapters === 1 ? 'chapter' : 'chapters'} · {totalTopics} topics
        </div>

        {/* CTA */}
        <button
          onClick={scrollToFirstChapter}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-border/60 bg-background hover:bg-muted/50 text-sm font-medium text-foreground transition-colors duration-200"
        >
          Find my next topic
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
