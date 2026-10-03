'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RoadmapTimeline } from './RoadmapTimeline';
import { TimelineSidebar } from './TimelineSidebar';
import { RoadmapDrawer, type SelectedNodeData } from './RoadmapDrawer';
import type { RoadmapChapter, RoadmapTopic } from '@/lib/roadmaps';

interface RoadmapTimelineViewProps {
  chapters: RoadmapChapter[];
  roadmapTitle: string;
  roadmapSlug: string;
}

export function RoadmapTimelineView({ chapters, roadmapTitle, roadmapSlug }: RoadmapTimelineViewProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(null);
  const [selectedChapterLabel, setSelectedChapterLabel] = useState<string | undefined>(undefined);
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
    if (window.confirm('Are you sure you want to reset your progress for this roadmap?')) {
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

  const onTopicClick = useCallback((topic: RoadmapTopic, chapter: RoadmapChapter) => {
    setSelectedNode({
      id: topic.id,
      label: topic.label,
      description: topic.description,
      resources: topic.resources,
      codeSnippet: topic.codeSnippet,
      prerequisites: topic.prerequisites,
      relatedLanguage: topic.relatedLanguage,
    });
    setSelectedChapterLabel(chapter.label);
    setDrawerOpen(true);
  }, []);

  // Smart Find Next Topic
  const onFindNextTopic = useCallback(() => {
    // Find first incomplete topic
    const nextItem = allTopics.find(item => !completedTopicIds.has(item.topic.id)) || allTopics[0];
    if (!nextItem) return;

    // Scroll to the element
    const elem = document.querySelector(`[data-topic-id="${nextItem.topic.id}"]`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
      elem.classList.add('ring-2', 'ring-primary', 'ring-offset-2');
      setTimeout(() => {
        elem.classList.remove('ring-2', 'ring-primary', 'ring-offset-2');
      }, 1800);
    }

    onTopicClick(nextItem.topic, nextItem.chapter);
  }, [allTopics, completedTopicIds, onTopicClick]);

  // Drawer Next Topic Handler
  const currentTopicIndex = selectedNode
    ? allTopics.findIndex(item => item.topic.id === selectedNode.id)
    : -1;

  const hasNextTopic = currentTopicIndex >= 0 && currentTopicIndex < allTopics.length - 1;

  const onNextTopic = useCallback(() => {
    if (hasNextTopic && currentTopicIndex >= 0) {
      const nextItem = allTopics[currentTopicIndex + 1];
      onTopicClick(nextItem.topic, nextItem.chapter);
    }
  }, [hasNextTopic, currentTopicIndex, allTopics, onTopicClick]);

  return (
    <>
      {/* Section Divider */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4">
          <div className="flex-1 border-t border-dashed border-border/50" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground/40 whitespace-nowrap">
            follow the path
          </span>
          <div className="flex-1 border-t border-dashed border-border/50" />
        </div>
      </div>

      {/* Two-Column Layout */}
      <div className="max-w-5xl mx-auto px-4 pb-20" data-roadmap-timeline>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[340px] flex-shrink-0 order-2 lg:order-1">
            <TimelineSidebar
              totalTopics={totalTopics}
              totalChapters={chapters.length}
              completedCount={completedTopicIds.size}
              onFindNextTopic={onFindNextTopic}
              onResetProgress={resetProgress}
            />
          </aside>

          {/* Right Timeline */}
          <main className="flex-1 min-w-0 order-1 lg:order-2 w-full">
            <RoadmapTimeline
              chapters={chapters}
              onTopicClick={onTopicClick}
              roadmapTitle={roadmapTitle}
              completedTopicIds={completedTopicIds}
              onToggleTopicComplete={toggleTopicComplete}
            />
          </main>
        </div>
      </div>

      {/* Drawer */}
      <RoadmapDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        data={selectedNode}
        chapterLabel={selectedChapterLabel}
        isCompleted={selectedNode ? completedTopicIds.has(selectedNode.id) : false}
        onToggleComplete={selectedNode ? () => toggleTopicComplete(selectedNode.id) : undefined}
        onNextTopic={onNextTopic}
        hasNextTopic={hasNextTopic}
      />
    </>
  );
}
