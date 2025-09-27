// src/components/roadmap/hooks/useNodeSelection.ts
'use client';

import { useState, useCallback } from 'react';
import { type Node } from '@xyflow/react';
import { type RoadmapNodeData } from '@/types/roadmap';

export function useNodeSelection() {
  const [selectedNode, setSelectedNode] = useState<Node<RoadmapNodeData> | null>(
    null
  );

  const selectNode = useCallback((node: Node<RoadmapNodeData>) => {
    setSelectedNode(node);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return {
    selectedNode,
    selectNode,
    clearSelection,
  };
}
