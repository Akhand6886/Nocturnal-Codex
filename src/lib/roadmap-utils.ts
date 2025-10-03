import { type Node, type Edge } from '@xyflow/react';
import { type RoadmapFlowData, type RoadmapNodeData, type TopicContent } from '@/types/roadmap';

export function transformToReactFlow(
  blueprint: RoadmapFlowData,
  topicsContent: Record<string, TopicContent> | null
): {
  nodes: Node<RoadmapNodeData>[];
  edges: Edge[];
} {
  // If there's no topic content, we can still render the blueprint shape
  const hasContent = !!topicsContent;

  const nodes: Node<RoadmapNodeData>[] = blueprint.nodes?.map((node) => {
    const content = hasContent ? topicsContent[node.id] : null;
    
    return {
      id: node.id,
      type: 'roadmapNode',
      position: node.position || { x: 0, y: 0 },
      data: {
        id: node.id,
        // Use content title if available, otherwise fallback to blueprint label
        label: content?.title || node.label || 'Untitled',
        category: node.category,
        // Embed the full content object into the node's data
        content: content || {
          id: node.id,
          title: node.label || 'Untitled',
          description: 'Content is being prepared for this topic.',
          objectives: [],
          resources: [],
          rawContent: '',
        },
        status: 'pending', 
        highlighted: false,
      },
      draggable: true,
      selectable: true,
      style: {
        ...node.style,
      }
    };
  }) || [];

  const edges: Edge[] = blueprint.edges?.map((edge: any) => ({
    id: edge.id || `${edge.source}-${edge.target}`,
    source: edge.source,
    target: edge.target,
    type: edge.type || 'smoothstep',
    animated: edge.animated || false,
    style: {
      strokeWidth: edge.style?.strokeWidth || 1.5,
      stroke: edge.style?.stroke || '#a1a1aa', // neutral-400
      ...(edge.style || {})
    },
    markerEnd: {
      type: 'arrowclosed',
      width: 15,
      height: 15,
      color: edge.style?.stroke || '#a1a1aa',
    }
  })) || [];

  return { nodes, edges };
}
