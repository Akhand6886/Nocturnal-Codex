// src/components/roadmap/hooks/useProgress.ts
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { type Node } from '@xyflow/react';
import { type RoadmapNodeData, type RoadmapProgress } from '@/types/roadmap';

const getInitialProgress = (roadmapSlug: string, totalNodes: number): RoadmapProgress => {
  if (typeof window === 'undefined') {
    return {
      userId: 'anonymous',
      roadmapSlug,
      completedNodes: [],
      lastAccessed: new Date(),
      totalProgress: 0,
    };
  }

  try {
    const savedProgress = localStorage.getItem(`progress-${roadmapSlug}`);
    if (savedProgress) {
      const parsed = JSON.parse(savedProgress) as RoadmapProgress;
      // Ensure data integrity
      if (Array.isArray(parsed.completedNodes)) {
         parsed.totalProgress = Math.round((parsed.completedNodes.length / totalNodes) * 100);
         return parsed;
      }
    }
  } catch (error) {
    console.error('Failed to load progress from localStorage:', error);
  }

  return {
    userId: 'anonymous',
    roadmapSlug,
    completedNodes: [],
    lastAccessed: new Date(),
    totalProgress: 0,
  };
};

export function useProgress(roadmapSlug: string, nodes: Node<RoadmapNodeData>[]) {
  const [progress, setProgress] = useState<RoadmapProgress>(() => getInitialProgress(roadmapSlug, nodes.length));

  useEffect(() => {
    try {
      localStorage.setItem(`progress-${roadmapSlug}`, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
    }
  }, [progress, roadmapSlug]);

  const toggleNodeCompletion = useCallback((nodeId: string) => {
    setProgress((prev) => {
      const completedNodes = new Set(prev.completedNodes);
      if (completedNodes.has(nodeId)) {
        completedNodes.delete(nodeId);
      } else {
        completedNodes.add(nodeId);
      }
      const newCompleted = Array.from(completedNodes);
      return {
        ...prev,
        completedNodes: newCompleted,
        lastAccessed: new Date(),
        totalProgress: Math.round((newCompleted.length / nodes.length) * 100),
      };
    });
  }, [nodes.length]);

  const getProgressPercentage = useCallback(() => {
    if (nodes.length === 0) return 0;
    return Math.round((progress.completedNodes.length / nodes.length) * 100);
  }, [progress.completedNodes.length, nodes.length]);

  return {
    progress,
    toggleNodeCompletion,
    getProgressPercentage,
  };
}
