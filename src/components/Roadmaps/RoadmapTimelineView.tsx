'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { RoadmapTimeline } from './RoadmapTimeline';
import { CheckCircle, Trophy, ArrowRight, RotateCcw } from 'lucide-react';
import type { RoadmapChapter, RoadmapTopic } from '@/lib/roadmaps';

interface RoadmapTimelineViewProps {
  chapters: RoadmapChapter[];
  roadmapTitle: string;
  roadmapSlug: string;
}

export function RoadmapTimelineView({ chapters, roadmapTitle, roadmapSlug }: RoadmapTimelineViewProps) {
  const [completedTopicIds, setCompletedTopicIds] = useState<Set<string>>(new Set());

  const storageKey = `nocturnal_roadmap_completed_${roadmapSlug}`;

  // Load completed topics from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCompletedTopicIds(new Set(parsed));
        }
      }
    } catch (e) {
      console.warn('Could not read completed topics from localStorage', e);
    }
  }, [storageKey]);

  // Persist completed topics
  const toggleTopicComplete = useCallback((topicId: string) => {
    setCompletedTopicIds(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)));
      } catch (e) {
        console.warn('Could not save completed topics to localStorage', e);
      }
      return next;
    });
  }, [storageKey]);

  const resetProgress = useCallback(() => {
    if (window.confirm('Reset all completed lessons for this roadmap?')) {
      setCompletedTopicIds(new Set());
      try {
        localStorage.removeItem(storageKey);
      } catch (e) {
        console.warn('Could not clear localStorage', e);
      }
    }
  }, [storageKey]);

  // All topics flattened in sequence
  const allTopics = useMemo(() => {
    const list: { topic: RoadmapTopic; chapter: RoadmapChapter }[] = [];
    for (const ch of chapters) {
      for (const t of ch.topics) {
        list.push({ topic: t, chapter: ch });
      }
    }
    return list;
  }, [chapters]);

  const totalTopics = allTopics.length;
  const completedCount = completedTopicIds.size;
  const percent = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
  const isComplete = totalTopics > 0 && completedCount >= totalTopics;

  // Next incomplete topic
  const nextIncompleteItem = allTopics.find(item => !completedTopicIds.has(item.topic.id)) || allTopics[0];

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Progress & Quick Navigation Banner */}
      <div className="my-8 p-5 sm:p-6 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2.5">
            {isComplete ? (
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 flex-shrink-0">
                <Trophy className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary flex-shrink-0">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
            <div>
              <h2 className="text-sm font-bold text-foreground">
                {isComplete ? 'Roadmap Fully Mastered!' : 'Your Learning Path'}
              </h2>
              <p className="text-xs text-muted-foreground">
                {completedCount} of {totalTopics} lessons completed ({percent}%)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center">
            {completedCount > 0 && (
              <button
                onClick={resetProgress}
                className="text-[11px] font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors px-2 py-1"
                title="Reset completed lessons"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}

            {nextIncompleteItem && (
              <Link
                href={`/roadmaps/${roadmapSlug}/${nextIncompleteItem.topic.id}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-border/70 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary text-xs font-semibold transition-all duration-200 shadow-xs group"
              >
                <span>{isComplete ? 'Review Start' : 'Next Lesson'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            )}
          </div>
        </div>

        {/* Horizontal Progress Bar */}
        <div className="w-full h-2 rounded-full bg-muted/70 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              isComplete
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : 'bg-primary'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Main Wide Timeline */}
      <main className="w-full">
        <RoadmapTimeline
          chapters={chapters}
          roadmapSlug={roadmapSlug}
          roadmapTitle={roadmapTitle}
          completedTopicIds={completedTopicIds}
          onToggleTopicComplete={toggleTopicComplete}
        />
      </main>
    </div>
  );
}
