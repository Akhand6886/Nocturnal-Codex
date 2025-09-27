
import { useState, useCallback } from 'react';
import { type Node } from '@xyflow/react';
import { type RoadmapNodeData } from '@/types/roadmap';

interface UseNodeSelectionReturn {
  selectedNode: Node<RoadmapNodeData> | null;
  selectNode: (node: Node<RoadmapNodeData>) => void;
  clearSelection: () => void;
  isNodeSelected: (nodeId: string) => boolean;
}

export function useNodeSelection(): UseNodeSelectionReturn {
  const [selectedNode, setSelectedNode] = useState<Node<RoadmapNodeData> | null>(null);

  const selectNode = useCallback((node: Node<RoadmapNodeData>) => {
    setSelectedNode(node);
    
    // Optional: Track analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'roadmap_node_click', {
        event_category: 'roadmap',
        event_label: node.data.label,
        node_id: node.id,
      });
    }
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const isNodeSelected = useCallback((nodeId: string) => {
    return selectedNode?.id === nodeId;
  }, [selectedNode]);

  return {
    selectedNode,
    selectNode,
    clearSelection,
    isNodeSelected,
  };
}
