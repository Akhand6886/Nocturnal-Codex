
import { useState, useEffect, useCallback, useMemo } from 'react';
import { type Node } from '@xyflow/react';
import { type RoadmapNodeData, type RoadmapProgress, type ProgressStatus } from '@/types/roadmap';
import useLocalStorage from './useLocalStorage';

interface UseProgressReturn {
  progress: RoadmapProgress;
  updateNodeStatus: (nodeId: string, status: ProgressStatus) => void;
  getNodeStatus: (nodeId: string) => ProgressStatus;
  getCompletedCount: () => number;
  getProgressPercentage: () => number;
}

export function useProgress(
  roadmapSlug: string,
  nodes: Node<RoadmapNodeData>[]
): UseProgressReturn {
  const [progress, setProgress] = useLocalStorage<RoadmapProgress>(
    `roadmap-progress-${roadmapSlug}`,
    {}
  );

  const updateNodeStatus = useCallback((nodeId: string, status: ProgressStatus) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      if (status === 'pending') {
        delete newProgress[nodeId];
      } else {
        newProgress[nodeId] = status;
      }
      return newProgress;
    });
  }, [setProgress]);

  const getNodeStatus = useCallback((nodeId: string): ProgressStatus => {
    return progress[nodeId] || 'pending';
  }, [progress]);
  
  const getCompletedCount = useCallback(() => {
    return Object.values(progress).filter(status => status === 'done').length;
  }, [progress]);

  const getProgressPercentage = useCallback(() => {
    if (nodes.length === 0) return 0;
    const completedCount = getCompletedCount();
    return Math.round((completedCount / nodes.length) * 100);
  }, [nodes.length, getCompletedCount]);

  return {
    progress,
    updateNodeStatus,
    getNodeStatus,
    getCompletedCount,
    getProgressPercentage,
  };
}
