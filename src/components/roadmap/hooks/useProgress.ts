
import { useState, useEffect, useCallback, useMemo } from 'react';
import { type Node } from '@xyflow/react';
import { getProgressPercentage, calculateEstimatedCompletionTime, getNextRecommendedNodes } from '@/lib/roadmap-utils';
import { type RoadmapNodeData, type RoadmapProgress } from '@/types/roadmap';

interface UseProgressReturn {
  progress: RoadmapProgress;
  toggleNodeCompletion: (nodeId: string) => void;
  markNodeComplete: (nodeId: string) => void;
  markNodeIncomplete: (nodeId: string) => void;
  resetProgress: () => void;
  getProgressPercentage: () => number;
  getEstimatedTimeRemaining: () => string;
  getNextRecommendedNodes: () => Node<RoadmapNodeData>[];
  exportProgress: () => string;
  importProgress: (jsonString: string) => boolean;
}

export function useProgress(
  roadmapSlug: string,
  nodes: Node<RoadmapNodeData>[],
  edges: any[] = []
): UseProgressReturn {
  const [progress, setProgress] = useState<RoadmapProgress>({
    userId: 'local', // For now, use local storage
    roadmapSlug,
    completedNodes: [],
    lastAccessed: new Date(),
    totalProgress: 0,
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const storageKey = `roadmap-progress-${roadmapSlug}`;
    const savedProgress = localStorage.getItem(storageKey);
    
    if (savedProgress) {
      try {
        const parsed = JSON.parse(savedProgress);
        setProgress({
          ...parsed,
          lastAccessed: new Date(),
        });
      } catch (error) {
        console.error('Failed to parse saved progress:', error);
      }
    }
  }, [roadmapSlug]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const storageKey = `roadmap-progress-${roadmapSlug}`;
    localStorage.setItem(storageKey, JSON.stringify(progress));
  }, [progress, roadmapSlug]);

  const toggleNodeCompletion = useCallback((nodeId: string) => {
    setProgress(prev => {
      const isCompleted = prev.completedNodes.includes(nodeId);
      const newCompletedNodes = isCompleted
        ? prev.completedNodes.filter(id => id !== nodeId)
        : [...prev.completedNodes, nodeId];

      return {
        ...prev,
        completedNodes: newCompletedNodes,
        lastAccessed: new Date(),
        totalProgress: Math.round((newCompletedNodes.length / nodes.length) * 100),
      };
    });

    // Optional: Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      const isNowCompleted = !progress.completedNodes.includes(nodeId);
      (window as any).gtag('event', isNowCompleted ? 'roadmap_node_complete' : 'roadmap_node_uncomplete', {
        event_category: 'roadmap',
        event_label: roadmapSlug,
        node_id: nodeId,
      });
    }
  }, [progress.completedNodes, nodes.length, roadmapSlug]);

  const markNodeComplete = useCallback((nodeId: string) => {
    if (!progress.completedNodes.includes(nodeId)) {
      toggleNodeCompletion(nodeId);
    }
  }, [progress.completedNodes, toggleNodeCompletion]);

  const markNodeIncomplete = useCallback((nodeId: string) => {
    if (progress.completedNodes.includes(nodeId)) {
      toggleNodeCompletion(nodeId);
    }
  }, [progress.completedNodes, toggleNodeCompletion]);

  const resetProgress = useCallback(() => {
    setProgress(prev => ({
      ...prev,
      completedNodes: [],
      lastAccessed: new Date(),
      totalProgress: 0,
    }));

    // Optional: Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'roadmap_progress_reset', {
        event_category: 'roadmap',
        event_label: roadmapSlug,
      });
    }
  }, [roadmapSlug]);

  const getProgressPercentageValue = useCallback(() => {
    return getProgressPercentage(
      nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          completed: progress.completedNodes.includes(node.id)
        }
      }))
    );
  }, [nodes, progress.completedNodes]);

  const getEstimatedTimeRemaining = useCallback(() => {
    return calculateEstimatedCompletionTime(nodes, progress.completedNodes);
  }, [nodes, progress.completedNodes]);

  const getNextRecommendedNodesValue = useCallback(() => {
    return getNextRecommendedNodes(nodes, edges, progress.completedNodes);
  }, [nodes, edges, progress.completedNodes]);

  const exportProgressData = useCallback(() => {
    const exportData = {
      roadmapSlug: progress.roadmapSlug,
      completedNodes: progress.completedNodes,
      totalProgress: progress.totalProgress,
      exportDate: new Date().toISOString(),
      totalNodes: nodes.length,
    };
    
    return JSON.stringify(exportData, null, 2);
  }, [progress, nodes.length]);

  const importProgressData = useCallback((jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      
      if (data.roadmapSlug !== roadmapSlug) {
        console.error('Progress data is for a different roadmap');
        return false;
      }
      
      if (!Array.isArray(data.completedNodes)) {
        console.error('Invalid progress data format');
        return false;
      }

      setProgress(prev => ({
        ...prev,
        completedNodes: data.completedNodes,
        lastAccessed: new Date(),
        totalProgress: Math.round((data.completedNodes.length / nodes.length) * 100),
      }));

      return true;
    } catch (error) {
      console.error('Failed to import progress:', error);
      return false;
    }
  }, [roadmapSlug, nodes.length]);

  return {
    progress,
    toggleNodeCompletion,
    markNodeComplete,
    markNodeIncomplete,
    resetProgress,
    getProgressPercentage: getProgressPercentageValue,
    getEstimatedTimeRemaining,
    getNextRecommendedNodes: getNextRecommendedNodesValue,
    exportProgress: exportProgressData,
    importProgress: importProgressData,
  };
}
