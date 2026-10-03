'use client';

import React from 'react';
import { ArrowDown, CheckCircle, GitBranch, RotateCcw, Trophy } from 'lucide-react';

interface TimelineSidebarProps {
  totalTopics: number;
  totalChapters: number;
  completedCount?: number;
  onFindNextTopic: () => void;
  onResetProgress?: () => void;
}

export function TimelineSidebar({
  totalTopics,
  totalChapters,
  completedCount = 0,
  onFindNextTopic,
  onResetProgress,
}: TimelineSidebarProps) {
  const percent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  const isComplete = totalTopics > 0 && completedCount >= totalTopics;

  return (
    <div className="sticky top-24">
      <div className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm shadow-sm">
        {/* Section Label */}
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/60 mb-3">
          HOW TO USE THIS MAP
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug">
          One chapter at a time.
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Follow the numbered sequence from top to bottom. Click any topic to open its guide, code snippets, and in-depth codex lessons.
        </p>

        {/* Interactive Progress Card */}
        <div className="p-3.5 rounded-xl bg-background/80 border border-border/60 mb-5">
          <div className="flex items-center justify-between text-xs font-medium mb-2">
            <span className="text-foreground flex items-center gap-1.5 font-semibold">
              {isComplete ? (
                <>
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  Roadmap Mastered!
                </>
              ) : (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  Your Progress
                </>
              )}
            </span>
            <span className="font-mono text-muted-foreground">
              {completedCount} / {totalTopics} ({percent}%)
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isComplete
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : 'bg-primary'
              }`}
              style={{ width: `${percent}%` }}
            />
          </div>

          {completedCount > 0 && (
            <div className="flex justify-end mt-2">
              <button
                onClick={onResetProgress}
                className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                title="Reset completed topics on this roadmap"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="space-y-2.5 mb-5 pb-5 border-b border-border/40">
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
            </div>
            <span className="text-xs text-muted-foreground">Click circle on topic to mark completed</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full border border-border/80 bg-muted/30 flex items-center justify-center">
              <GitBranch className="w-3 h-3 text-muted-foreground/60" />
            </div>
            <span className="text-xs text-muted-foreground">Linear path with deep-dive codex folios</span>
          </div>
        </div>

        {/* Stats */}
        <div className="text-[11px] font-mono text-muted-foreground/60 mb-5">
          {totalChapters} {totalChapters === 1 ? 'chapter' : 'chapters'} · {totalTopics} topics
        </div>

        {/* CTA */}
        <button
          onClick={onFindNextTopic}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-border/70 bg-background hover:bg-muted/60 text-sm font-semibold text-foreground transition-all duration-200 shadow-xs group"
        >
          <span>{isComplete ? 'Review starting topic' : 'Find my next topic'}</span>
          <ArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
