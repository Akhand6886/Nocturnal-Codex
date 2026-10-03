'use client';

import React, { useState, useCallback } from 'react';
import { RoadmapTimeline } from './RoadmapTimeline';
import { TimelineSidebar } from './TimelineSidebar';
import { RoadmapDrawer, type SelectedNodeData } from './RoadmapDrawer';
import type { RoadmapChapter, RoadmapTopic } from '@/lib/roadmaps';

interface RoadmapTimelineViewProps {
  chapters: RoadmapChapter[];
  roadmapTitle: string;
}

export function RoadmapTimelineView({ chapters, roadmapTitle }: RoadmapTimelineViewProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeData | null>(null);

  const totalTopics = chapters.reduce((sum, c) => sum + c.topics.length, 0);

  const onTopicClick = useCallback((topic: RoadmapTopic) => {
    setSelectedNode({
      id: topic.id,
      label: topic.label,
      description: topic.description,
      resources: topic.resources,
      codeSnippet: topic.codeSnippet,
      prerequisites: topic.prerequisites,
      relatedLanguage: topic.relatedLanguage,
    });
    setDrawerOpen(true);
  }, []);

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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <aside className="w-full lg:w-[340px] flex-shrink-0 order-2 lg:order-1">
            <TimelineSidebar
              totalTopics={totalTopics}
              totalChapters={chapters.length}
            />
          </aside>

          {/* Right Timeline */}
          <main className="flex-1 min-w-0 order-1 lg:order-2">
            <RoadmapTimeline
              chapters={chapters}
              onTopicClick={onTopicClick}
              roadmapTitle={roadmapTitle}
            />
          </main>
        </div>
      </div>

      {/* Drawer */}
      <RoadmapDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        data={selectedNode}
      />
    </>
  );
}
