import { type Node, type Edge } from '@xyflow/react';
import { type RoadmapFlowData, type RoadmapNodeData, type TopicContent } from '@/types/roadmap';

export function transformToReactFlow(
  blueprint: RoadmapFlowData,
  topicsContent: Record<string, TopicContent>
): {
  nodes: Node<RoadmapNodeData>[];
  edges: Edge[];
} {
  const nodes: Node<RoadmapNodeData>[] = blueprint.nodes?.map((node) => ({
    id: node.id,
    type: 'roadmapNode',
    position: node.position || { x: 0, y: 0 },
    data: {
      id: node.id,
      label: topicsContent[node.id]?.title || node.label || 'Untitled',
      category: node.category,
      content: topicsContent[node.id],
      status: 'pending', 
      highlighted: false,
    },
    draggable: true,
    selectable: true,
    style: {
      ...node.style,
    }
  })) || [];

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
