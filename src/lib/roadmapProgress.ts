'use client';

import { useState, useEffect } from 'react';

export type NodeStatus = 'done' | 'learning' | 'pending';

export interface RoadmapProgressState {
  completedNodeIds: string[];
  learningNodeIds: string[];
}

const STORAGE_PREFIX = 'nocturnal_roadmap_progress_';

export function getRoadmapProgress(roadmapId: string): RoadmapProgressState {
  if (typeof window === 'undefined') {
    return { completedNodeIds: [], learningNodeIds: [] };
  }

  try {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}${roadmapId}`);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load roadmap progress', e);
  }

  return { completedNodeIds: [], learningNodeIds: [] };
}

export function saveRoadmapProgress(roadmapId: string, state: RoadmapProgressState): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(`${STORAGE_PREFIX}${roadmapId}`, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save roadmap progress', e);
  }
}

export function useRoadmapProgress(roadmapId: string) {
  const [progress, setProgress] = useState<RoadmapProgressState>(() => getRoadmapProgress(roadmapId));

  useEffect(() => {
    setProgress(getRoadmapProgress(roadmapId));
  }, [roadmapId]);

  const setNodeStatus = (nodeId: string, status: NodeStatus) => {
    setProgress((prev) => {
      const completed = new Set(prev.completedNodeIds);
      const learning = new Set(prev.learningNodeIds);

      if (status === 'done') {
        completed.add(nodeId);
        learning.delete(nodeId);
      } else if (status === 'learning') {
        learning.add(nodeId);
        completed.delete(nodeId);
      } else {
        completed.delete(nodeId);
        learning.delete(nodeId);
      }

      const nextState: RoadmapProgressState = {
        completedNodeIds: Array.from(completed),
        learningNodeIds: Array.from(learning),
      };

      saveRoadmapProgress(roadmapId, nextState);
      return nextState;
    });
  };

  const getNodeStatus = (nodeId: string): NodeStatus => {
    if (progress.completedNodeIds.includes(nodeId)) return 'done';
    if (progress.learningNodeIds.includes(nodeId)) return 'learning';
    return 'pending';
  };

  const resetProgress = () => {
    const emptyState: RoadmapProgressState = { completedNodeIds: [], learningNodeIds: [] };
    saveRoadmapProgress(roadmapId, emptyState);
    setProgress(emptyState);
  };

  return {
    progress,
    setNodeStatus,
    getNodeStatus,
    resetProgress,
  };
}
